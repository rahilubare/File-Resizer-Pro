const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const net = require('net');

let mainWindow;
let serverProcess;

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

async function createWindow() {
  const isDev = !app.isPackaged;
  
  // 1. Find dynamic open network port
  const port = await getFreePort();
  console.log(`Starting background React Router Node instance on port ${port}...`);

  // 2. Launch the backend Node.js execution server
  // This relies on "asar: false" being set in package.json
  const serverPath = path.join(__dirname, '..', 'node_modules', '@react-router', 'serve', 'dist', 'cli.js');
  const targetScript = path.join(__dirname, '..', 'build', 'server', 'index.js');
  
  serverProcess = spawn(process.execPath, [serverPath, targetScript], {
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: '1',
      PORT: port.toString(),
      NODE_ENV: isDev ? 'development' : 'production'
    },
    cwd: path.join(__dirname, '..'),
    windowsHide: true // Hide terminal window internally on Windows 11
  });

  serverProcess.stdout.on('data', (data) => console.log(`[SSR]: ${data}`));
  serverProcess.stderr.on('data', (data) => console.error(`[SSR Error]: ${data}`));

  // 3. Spawns frontend Chromium window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "File Resizer Pro",
    backgroundColor: '#0f172a',
    show: false, // hide until loaded
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Polling architecture instead of hardcoded 1s wait timeout
  const tryLoad = setInterval(() => {
    fetch(`http://localhost:${port}`)
       .then(() => {
         clearInterval(tryLoad);
         mainWindow.loadURL(`http://localhost:${port}`);
         mainWindow.once('ready-to-show', () => {
           mainWindow.show();
           mainWindow.maximize();
         });
       })
       .catch(() => {}); // Server not ready yet
  }, 200);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Slaughter background process to drop zombies
app.on('before-quit', () => {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
});

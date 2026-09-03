const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let serverProcess;

function startServer() {
    console.log('Starting server process...');

    const serverPath = path.join(__dirname, 'server.cjs');

    console.log('Server path:', serverPath);

    // Use Electron executable to run the server script as a Node process
    serverProcess = spawn(process.execPath, [serverPath], {
        cwd: __dirname,
        env: {
            ...process.env,
            NODE_ENV: 'production',
            PORT: '4000',
            ELECTRON_RUN_AS_NODE: '1'
        },
        stdio: ['ignore', 'pipe', 'pipe']
    });

    serverProcess.stdout.on('data', (data) => {
        console.log(`[SERVER] ${data.toString().trim()}`);
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`[SERVER ERROR] ${data.toString().trim()}`);
    });

    serverProcess.on('error', (error) => {
        console.error('Failed to start server process:', error);
    });

    serverProcess.on('exit', (code, signal) => {
        console.log(`Server process exited with code ${code} and signal ${signal}`);
    });
}

function waitForServer(url, callback, attempts = 0) {
    const maxAttempts = 60; // 30 seconds

    if (attempts > maxAttempts) {
        console.error('Server failed to start after 30 seconds');
        // Open DevTools to show errors
        if (mainWindow) {
            mainWindow.webContents.openDevTools();
        }
        return;
    }

    const request = http.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log('✓ Server is ready!');
            callback();
        } else {
            setTimeout(() => waitForServer(url, callback, attempts + 1), 500);
        }
    });

    request.on('error', () => {
        if (attempts % 10 === 0) {
            console.log(`Waiting for server... (attempt ${attempts}/${maxAttempts})`);
        }
        setTimeout(() => waitForServer(url, callback, attempts + 1), 500);
    });
}

function createWindow() {
    console.log('Creating window...');

    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: false, // Don't show until ready
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        },
        icon: path.join(__dirname, 'app-icon.ico')
    });

    const url = 'http://localhost:4000/';

    // Wait for server to be ready before loading
    waitForServer(url, () => {
        console.log('Loading application...');
        mainWindow.loadURL(url);

        // Show window when ready
        mainWindow.once('ready-to-show', () => {
            mainWindow.show();
        });
    });

    // Open DevTools if page fails to load
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Page failed to load:', errorCode, errorDescription);
        mainWindow.webContents.openDevTools();
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    console.log('Electron app ready');
    console.log('App path:', app.getAppPath());

    startServer();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('will-quit', () => {
    console.log('Cleaning up...');
    if (serverProcess) {
        serverProcess.kill();
    }
});

const pngToIco = require('png-to-ico');
// Sometimes it's a default export
const convertFunc = typeof pngToIco === 'function' ? pngToIco : pngToIco.default;
const fs = require('fs');
const path = require('path');

async function convert() {
    try {
        const buf = await convertFunc(path.join(__dirname, 'icon.png'));
        fs.writeFileSync(path.join(__dirname, 'app-icon.ico'), buf);
        console.log('Successfully converted icon.png to app-icon.ico');
    } catch (err) {
        console.error('Error converting icon:', err);
        process.exit(1);
    }
}

convert();

const { app, BrowserWindow, autoUpdater } = require('electron')
const path = require('path');
const log = require('electron-log');

function isDev() {
    return process.mainModule.filename.indexOf('app.asar') === -1;
};

app.allowRendererProcessReuse = false
// Logger for autoUpdater
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
//needed for forcing update check in develop
// autoUpdater.forceDevUpdateConfig = true;
log.info('App starting...');

app.on('ready', function () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');

    if (!isDev()) {
        autoUpdater.checkForUpdates();
        autoUpdater.on('update-available', (event, info) => {
            log.info('update available');
            win.webContents.send('available', true);
        });
        autoUpdater.on('error', (event, error) => {
            log.info('error');
            win.webContents.send('error', error);
        });

        autoUpdater.on('update-downloaded', (event, info) => {
            autoUpdater.quitAndInstall();
            win.webContents.send('update-downloaded');
        });
    }
})


app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin')
    app.quit()
})
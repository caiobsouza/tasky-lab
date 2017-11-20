const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer-tray');
const MainWindow = require('./app/main-window');

const { app, ipcMain } = electron;
/**
 * @type {BrowserWindow}
 */
let mainWindow;

/**
 * @type {TimerTray}
 */
let tray;

function configureTray() {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    tray = new TimerTray(iconPath, mainWindow);
}

app.on('ready', () => {
    if (process.platform === 'darwin')
        app.dock.hide();

    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
    configureTray();
});

ipcMain.on('update-timer', (event, timeLeft) => {
    tray.setTitle(timeLeft);
});
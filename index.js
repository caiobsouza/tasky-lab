const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer-tray');

const { app, BrowserWindow, Tray } = electron;
/**
 * @type {BrowserWindow}
 */
let mainWindow;

/**
 * @type {TimerTray}
 */
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 250,
        frame: false,
        resizable: false,
        show: false
    });

    mainWindow.loadURL(`file://${__dirname}/src/index.html`);
}

function configureTray() {
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    tray = new TimerTray(iconPath, mainWindow);
}

app.on('ready', () => {
    createWindow();
    configureTray();
});
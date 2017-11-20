const electron = require('electron');
const { app, BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor() {
        super({
            height: 500,
            width: 250,
            frame: false,
            resizable: false,
            show: false,
            skipTaskbar: true
        });

        this.loadURL(`file://${__dirname}/../src/index.html`);
        this.on('blur', this.onBlur.bind(this));
    }

    onBlur() {
        this.hide();
    }
}

module.exports = MainWindow;
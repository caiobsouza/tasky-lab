const electron = require('electron');
const path = require('path');
const { app, Tray, Menu } = electron;

class TimerTray extends Tray {
    constructor(iconPath, window) {
        super(iconPath);

        this.window = window;
        this.setToolTip('Tasky!');
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this))
    }

    getIconPath() {
        const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
        return path.join(__dirname, `./src/assets/${iconName}`);
    }

    onClick(event, bounds) {
        const { x, y } = bounds;
        const { height, width } = this.window.getBounds();

        if (this.window.isVisible()) {
            this.window.hide();
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height;
            this.window.setBounds({
                x: Math.floor(x - width / 2),
                y: Math.floor(yPosition),
                height,
                width
            });
            this.window.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([{
            label: 'Quit',
            click: () => { app.quit(); }
        }]);

        this.popUpContextMenu(menuConfig);
    }
}

module.exports = TimerTray;
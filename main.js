const { app, BrowserWindow, ipcMain, Menu, screen, dialog  } = require('electron');
const path = require('path');
const { downloadComponent } = require('./downloadComponent');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 125, // Hauteur initiale de la fenêtre
        transparent: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: true,
        },
    });

    mainWindow.loadFile('index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    Menu.setApplicationMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('close-app', () => {
    app.quit();
});

ipcMain.on('resize-app', () => {
    // Redimensionner la fenêtre principale
    mainWindow.setSize(800, 700);

    // Récupérer les dimensions de l'écran
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Calculer la nouvelle position de la fenêtre pour la centrer
    const newX = Math.floor((width - 800) / 2);
    const newY = Math.floor((height - 700) / 2);

    // Définir la nouvelle position de la fenêtre
    mainWindow.setPosition(newX, newY);
});

ipcMain.on('download-video', (event, url, path) => {
    console.log(`URL de la vidéo à télécharger : ${url}`);
    downloadComponent(url, path);
});

ipcMain.on('open-directory-dialog', (event) => {
    const mainWindow = BrowserWindow.fromWebContents(event.sender);
    dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    }).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            event.sender.send('selected-directory', result.filePaths[0]);
        }
    }).catch(err => {
        console.log(err);
    });
});

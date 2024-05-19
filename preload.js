const { contextBridge, ipcRenderer } = require('electron');

// Expose les fonctions IPC aux scripts de rendu
contextBridge.exposeInMainWorld('electron', {
    closeApp: () => ipcRenderer.send('close-app'),
    downloadComponent: (url, path) => ipcRenderer.send('download-video', url, path),
    resizeApp: () => ipcRenderer.send('resize-app'),
    selectDirectory: () => ipcRenderer.send('open-directory-dialog'),
    receiveSelectedDirectory: (callback) => {
        ipcRenderer.on('selected-directory', (event, directory) => {
            callback(directory);
        });
    }
});

const { exec } = require('child_process');
const path = require('path');

function downloadComponent(url,dirpath) {
    const scriptPath = path.join(__dirname, 'download_video.py'); // Chemin absolu du script Python

    exec(`python "${scriptPath}" "${url}" "${dirpath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'execution du script : ${error}`);
            return;
        }
        console.log(`Sortie du script : ${stdout}`);
    });
}

module.exports = { downloadComponent };

from pytube import YouTube
import sys

def download_video_as_mp3(url, directory_path):
    try:
        # Créez un objet YouTube en utilisant l'URL
        yt = YouTube(url)

        # Obtenez la meilleure résolution audio (MP3)
        stream = yt.streams.filter(only_audio=True).first()

        # Téléchargez la vidéo au format MP3 dans le répertoire spécifié
        stream.download(output_path=directory_path)

        print(f"Telechargement termine ! Fichier MP3 enregistré sous : {directory_path}")
    except Exception as e:
        print(f"Erreur lors du téléchargement : {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Utilisation : python script.py <URL> <chemin_du_repertoire>")
        sys.exit(1)

    video_url = sys.argv[1]
    dir_path = sys.argv[2].replace('\\', '/')  # Remplace les barres obliques inverses par des barres obliques normales
    download_video_as_mp3(video_url, dir_path)

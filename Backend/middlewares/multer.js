// middleware pour gérer les requêtes HTTP avec envoi de fichiers

// importations
const multer = require("multer");

//dictionnaire des mimetypes
const MIME_TYPE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/gif" : "gif",
    "image/png" : "png"
}

//gérer la destination (répertoire) du fichier et générer un nom de fichier unique
//enregistre sur le disque
const storage = multer.diskStorage({
    //la destination de stockage de fichiers
    destination : (req, file, callback) => {
        callback(null, "images");
    },
    filename : (req, file, callback) => {
        //supprimer les espaces et les remplacer par des _
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPE[file.mimetype];
        //cela va nous sortir les milisecondes ce qui fait que ce chiffre est unique
        callback(null, name + "_" + Date.now() + "." + extension);
    }
})



//exportation du multer
//nous generons uniquement les téléchargerments de fichiers images
module.exports = multer({storage}).single("image");
//importer le module http de node pour avoir les outils pour créer le serveur
const http = require('http');
//importer l'implication
const app = require('./app');
//importer les variables d'environnement
const variablesEnv = require("dotenv");
const result = variablesEnv.config();

//paramètrage du port avec la méthode set
// si erreur app.set : app.js est vide 
app.set("port", process.env.PORT);

//crée le serveur
//la methode createServer prend en argument la fonction qui sera appelée à chaque requete recue par le serveur 
//les fonctions seront dans app.js
const server = http.createServer(app);

//demarre le serveur et ecoute les requetes sur le port
server.listen(process.env.PORT, () => {
    console.log("Vous etes sur le port " + process.env.PORT)
});


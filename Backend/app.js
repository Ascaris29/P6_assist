//app.js gère toutes les requetes envoyées par le serveur 
//--------------------------------------------------------- Importation modules ------------------------------------------------//
//importation express
const express = require('express')
//importation de morgan (loger(journal d'erreurs) http)
const morgan = require('morgan')
//importation connexion de la base de donnée
const mongoose = require('./db/database')
//importation modele de donnée user 
const userModel = require('./models/userModel')
//importation des routes
const userRoutes = require('./routes/userRoutes')
//const bodyparser = require('body-parser')
//------------------------------------------------------- Application ----------------------------------------------//
//crée une application express 
const app = express()
//-------------------------------------------------- Middlewares ----------------------------------------------------//
//logger les requetes et les reponses 
app.use(morgan("dev"));

// middleware poue les erreurs CORS .. s'applique sur toutes les routes
app.use((req, res, next)=>{
    // la fonction setHeader définit une valeur d'en tête
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content');
    next()
})


//importation de body parser qui analyse le corps des requetes et des reponses
app.use(express.json());

//route d'authentification signup 
//N'oublie pas la barre du debut car "api/auth" ne fonctionnera pas 
app.use("/api/auth", userRoutes)


//--------------------------------------------------------------- Exportation -------------------------------------------//
//exportation de app.js pour l'utiliser dans les autres fichiers
module.exports = app



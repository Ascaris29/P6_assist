//app.js gère toutes les requetes envoyées par le serveur 
//--------------------------------------------------------- Importation modules ------------------------------------------------//
//importation express
const express = require('express');
//importation de morgan (loger(journal d'erreurs) http)
const morgan = require('morgan');
//importation connexion de la base de donnée
const mongoose = require('./db/database');
//importation modele de donnée user 
const userModel = require('./models/userModel');
//importation des routes users
const userRoutes = require('./routes/userRoutes');
//importation des routes sauces
const saucesRoutes = require('./routes/saucesRoutes');
//importation path
const path = require('path');
//importation helmet
const helmet = require('helmet');
//encoding
const encoding = require('encoding');
//------------------------------------------------------- Application ----------------------------------------------//
//crée une application express 
const app = express();
//-------------------------------------------------- Middlewares appelés à chaque fois qu'une requête est envoyée au serveur ----------------------------------------------------//

//debeugeur base de données
//mongoose.set('debug', true)

// middleware poue les erreurs CORS .. s'applique sur toutes les routes
app.use((req, res, next) => {
    // la fonction setHeader définit une valeur d'en tête
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//logger les requetes et les reponses 
app.use(morgan("dev"));
//importation de body parser qui analyse le corps des requetes et des reponses
app.use(express.json());

//middleware d'authentification
//N'oublie pas la barre du debut car "api/auth" ne fonctionnera pas 
app.use("/api/auth", userRoutes);
// middleware sauces
app.use("/api/sauces", saucesRoutes);
//routage image
app.use('/images', express.static(path.join(__dirname, 'images')));
//helmet
//app.use(helmet());

//--------------------------------------------------------------- Exportation -------------------------------------------//
//exportation de app.js pour l'utiliser dans les autres fichiers
module.exports = app;




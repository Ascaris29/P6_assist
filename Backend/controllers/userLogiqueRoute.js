//importation modele de base de données user
const User = require('../models/userModel')

//importation de bcrypt pour hasher le password
const bcrypt = require('bcrypt')

//importation crypto-js pour chiffrer l'adresse email
const cryptojs = require('crypto-js');

//importation de variable d'environnement
const dotenv = require('dotenv').config()


//middleware signup
// création d'une donnée user à partir du modele dans le fichier userModel
// récupération des données user grace à req.body qui recupere le corps de la requete que l'utilisateur a tapé
exports.signup = (req, res) => {
    //chiffrer l'email avant de l'envoyer 
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL).toString();


    // hasher le mot de passe avant de l'envoyer en bdd
    // 10 = nombres de tours de l'algorithme
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        // ce qui va être envoyé dans la bdd avec le mot de passe hashé
        const user = new User({
            email : emailCryptoJs,
            password : hash
        });
    //enregistrer la donnée user dans la base de donnée
    user
    .save()
    .then(() => res.status(201).json({message : "Utilisateur crée et sauvegardé"}))
    .catch((error) => res.status(500).json({error}))

    })
    .catch((err) => res.status(500).json(err))
}



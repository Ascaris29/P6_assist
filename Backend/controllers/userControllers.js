//importation modele de base de données user
const User = require('../models/userModel');

//importation de bcrypt pour hasher le password
const bcrypt = require('bcrypt');

//importation crypto-js pour chiffrer l'adresse email
const cryptojs = require('crypto-js');

//importation de variable d'environnement
const dotenv = require('dotenv').config();

//importation du package token
const jwt = require('jsonwebtoken');




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
};
//middleware login 
//verification des données utilisateurs
exports.login = (req, res) => {

    //verification de l'adresse email 
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL).toString();
    User
    //cherche dans la base de données si l'utilisateur est bien présent grace à la fonction findOne
    .findOne({email: emailCryptoJs})
    //si le mail de l'user n'est pas présent dans la bdd, il n'existe pas
    .then((user) => {
        if(!user){
            res.status(401).json({message : "Utilisateur non existant !"})                    // a changer pour indiquer que la paire identifiant / mot de passe est incoreecte 
        }else{
            //s'il existe
            //verification du mot de passe 
            //fonction qui compare les passwords
            bcrypt.compare(req.body.password, user.password)
            .then((checkPassword) => {
                //si le mot de passe n'a pas été trouvé
                if(checkPassword == false){
                res.status(401).json({message : "mot de passe incorrect"});
                }else{
                    //si le mot de passe a bien été trouvé
                    //envoi du userId et du token dans la réponse
                    res.status(200).json({
                        //encodage du userId pour la création de nouvel objet (objet et userid seront liés)
                        userId : user._id,
                        //création d'un token
                        token : jwt.sign(
                            {userId : user._id},
                            process.env.JWT_KEY_TOKEN,
                            { expiresIn: "12h"}
                        )
                    })
                }
            })
            .catch((err) => res.status(500).json({err}))
        }
    })
    .catch((err) => res.status(500).json({err}))  
};

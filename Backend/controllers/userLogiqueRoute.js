//importation modele de base de données user
const User = require('../models/userModel')

//middleware signup
// création d'une donnée user à partir du modele dans le fichier userModel
// récupération des données user grace à req.body qui recupere le corps de la requete que l'utilisateur a tapé
exports.signup = (req, res) => {
    const user = new User({
        email : req.body.email,
        password : req.body.password
    });
    //enregistrer la donnée user dans la base de donnée
    user
    .save()
    .then(() => res.status(201).json({message : "Utilisateur crée et sauvegardé"}))
    .catch((error) => res.status(500).json({error}))


}



//importation du modèle pour la base de donnée
const sauceModel = require('../models/sauceModel');


exports.createSauce = (req, res, next) => {
    //on supprime l'id crée par mongodb automatiquement car on a déja l'id de l'user dans le req.body
    delete req.body._id;
    const sauce = new sauceModel({
        //l'operateur spread (...) copie toutes les données envoyées par le front
        ...req.body
    })
    //enregistrement des données dans la base de données
    sauce.save()
    .then(() => res.status(201).json({message : "Votre sauce a bien été crée"}))
    .catch((err) => res.status(400).json({err}));
}

exports.getAllSauces = (req, res, next) => {
    sauceModel.find()
    .then((allSauces)=>{
        res.status(200).json({allSauces})
    })
    .catch((err) => res.status(400).json({err}))
}
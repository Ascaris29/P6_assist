//importation du modèle pour la base de donnée
const sauceModel = require('../models/sauceModel');

//fonction pour créer une sauce
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
//fonction pour récuperer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    sauceModel.find()
    .then((allSauces)=>{
        res.status(200).json({allSauces})
    })
    .catch((err) => res.status(400).json({err}))
}

//fonction pour récupérer une sauce avec son _id
exports.getOneSauce = (req, res, next) => {
    // le paramètre req.params.id imprime uniquement le chiffre de l'id mais mongoDB veut un format comme celui ci : _id : 9829Z928289
    // le paramètre de la fonction findOne sera donc _id : 9083782787 plutot que juste 9083782787
    sauceModel.findOne({_id : req.params.id})
    //affiche la sauce correspondante à son _id
    .then((sauce) => res.status(200).json({sauce}))
    .catch((err) => res.status(400).json({err}))
}

//fonction pour modifier une sauce avec son _id
exports.modifyOneSauce = (req, res, next) => {
    //fonction updateOne prend en 1er argument l'_id de la sauce qui sera le filter
    // prend en 2eme argument tout ce qu'il y'a de nouveau dans le body et encore l'_id de la sauce par securité
    sauceModel.updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message : "Cette sauce a bien été modifiée !"}))
    .catch((err) => res.status(400).json({err}))
}

//fonction pour supprimer une sauce avec son _id
exports.deleteOneSauce = (req, res, next) => {
    sauceModel.deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({message : "Cette sauce a bien été supprimée !"}))
    .catch((err) => res.status(400).json({err}))
}

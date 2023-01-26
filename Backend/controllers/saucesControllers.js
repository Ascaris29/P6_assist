//importation du modèle pour la base de donnée
const sauceModel = require('../models/sauceModel');

//importation fs
const fs = require('fs');

//fonction pour créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceParse = JSON.parse(req.body.sauce);
    //on supprime l'id crée par mongodb automatiquement car on a déja l'id de l'user dans le req.body
    delete sauceParse._id;
    delete sauceParse._userId;
    const sauce = new sauceModel({
        //l'operateur spread (...) copie toutes les données envoyées par le front
        ...sauceParse,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : [],
        userId : req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    //enregistrement des données dans la base de données
    sauce
    .save()
    .then(() => res.status(201).json({message : "Votre sauce a bien été crée"}))
    .catch((err) => res.status(400).json({err}));
};

//fonction pour récuperer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    sauceModel
    .find()
    .then((allSauces)=> {
        res.status(200).json(allSauces)
    })
    .catch((err) => res.status(400).json({err}))
};

//fonction pour récupérer une sauce avec son _id
exports.getOneSauce = (req, res, next) => {
    // le paramètre req.params.id imprime uniquement le chiffre de l'id mais mongoDB veut un format comme celui ci : _id : 9829Z928289
    // le paramètre de la fonction findOne sera donc _id : 9083782787 plutot que juste 9083782787
    sauceModel
    .findOne({_id : req.params.id})
    //affiche la sauce correspondante à son _id
    .then((sauce) => res.status(200).json(sauce))
    .catch((err) => res.status(400).json({err}))
};

//fonction pour modifier une sauce avec son _id
// exports.modifyOneSauce = (req, res, next) => {
//     //fonction updateOne prend en 1er argument l'_id de la sauce qui sera le filter
//     // prend en 2eme argument tout ce qu'il y'a de nouveau dans le body et encore l'_id de la sauce par securité
//     console.log(req.body)
//     sauceModel
//     .updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
//     .then(() => res.status(200).json({message : "Cette sauce a bien été modifiée !"}))
//     .catch((err) => res.status(400).json({err}))
// };

exports.modifyOneSauce = (req, res, next) => {
    const sauceWithImage = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceWithImage._userId;
    sauceModel.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé !'});
            } else {
                sauceModel.updateOne({ _id: req.params.id}, { ...sauceWithImage, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
 };

//fonction pour supprimer une sauce avec son _id
exports.deleteOneSauce = (req, res, next) => {
    // sauceModel
    // .deleteOne({_id : req.params.id})
    // .then(() => res.status(200).json({message : "Cette sauce a bien été supprimée !"}))
    // .catch((err) => res.status(400).json({err}))
    sauceModel
    .findOne({_id : req.params.id})
    .then((sauce)=> {
        if(sauce.userId != req.auth.userId){
            res.status(401).json({message : "non autorisé !"})
        }else{
            const filename = sauce.imageUrl.split('/images')[1];
            fs.unlink(`images/${filename}`, () => {
                sauceModel
                .deleteOne({_id : req.params.id})
                .then(()=> { res.status(200).json({message : "Votre sauce a bien été supprimée !"})})
                .catch((err) => res.status(401).json({err}))
            })
        }
    })
    .catch((err)=> {res.status(401).json({err})})
};

//fonction pour liker une sauce
exports.likeSauce = (req, res, next) => {
    if(req.body.like == 1){                 //si il y'a un like dans le req.body
        sauceModel
        .updateOne({_id : req.params.id},  {$inc : { likes : 1}, $push : {usersLiked : req.auth.userId}})       //ajoute un like dans la bdd et ajoute l'utilisateur qui a liké
        .then(res.status(200).json({message : "vous avez aimé cette sauce !"}))
        .catch((err)=> res.status(400).json({message : "erreur lors du like"}))
    }else if(req.body.like == -1) {                         //si il y'a un -1 dans le req.body
        sauceModel
        .updateOne({_id : req.params.id},  {$inc : { dislikes : 1}, $push : {usersDisliked : req.auth.userId}})         //ajoute un dislike dans la bdd et ajoute un utilisateur qui a disliké
        .then(res.status(200).json({message : "vous n'avez pas aimé cette sauce !"}))
        .catch((err)=> res.status(400).json({message : "erreur lors du dislike"}))
    }else{
        sauceModel
        .findOne({_id : req.params.id})
        .then((sauce)=>{
                if (sauce.usersLiked.includes(req.auth.userId)){
                    sauceModel.updateOne({_id : req.params.id},  {$inc : { likes : - 1}, $pull : { usersLiked : req.auth.userId}})
                    .then(()=> {res.status(200).json({message :"Vous avez bien retiré votre like !"})})
                    .catch((error)=> res.status(500).json({message : "like non retiré"}))
                    console.log("deja present")
                }else if(sauce.usersDisliked.includes(req.auth.userId)){
                    sauceModel.updateOne({_id : req.params.id},  {$inc : { dislikes : -1}, $pull : {usersDisliked : req.auth.userId}})
                    .then(()=> {res.status(200).json({message : "vous avez retiré votre dislike !"})})
                    .catch((error)=> {res.status(500).json({message : "dislike non retiré"})})
                    console.log("pas present")
                }
            })
        .catch((err)=> res.status(400).json({message : "erreur lors du like"}))
}
}
    
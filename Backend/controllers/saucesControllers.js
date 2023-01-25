//importation du modèle pour la base de donnée
const sauceModel = require('../models/sauceModel');

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
exports.modifyOneSauce = (req, res, next) => {
    //fonction updateOne prend en 1er argument l'_id de la sauce qui sera le filter
    // prend en 2eme argument tout ce qu'il y'a de nouveau dans le body et encore l'_id de la sauce par securité
    sauceModel
    .updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message : "Cette sauce a bien été modifiée !"}))
    .catch((err) => res.status(400).json({err}))
};

//fonction pour supprimer une sauce avec son _id
exports.deleteOneSauce = (req, res, next) => {
    sauceModel
    .deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({message : "Cette sauce a bien été supprimée !"}))
    .catch((err) => res.status(400).json({err}))
};

//fonction pour liker une sauce
exports.likeSauce = (req, res, next) => {
    // if(req.auth.userId === sauceModel[usersLiked]) {
    //     res.status(400).json("Cet utilisateur a déja liké cette sauce !")
    // }
    // sauceModel
    // //essai findOneandUpdate echec
    // .updateOne({_id: req.params.id}, {$inc : {likes : 1}, $push : { usersLiked : req.auth.userId}})
    // .then(()=> res.status(200).json({message: "like validé !"}))
    // .catch((err) => res.status(400).json(err))
    const condition = false;
    sauceModel.findOne({_id : req.params.id})
        .then((res) => {
            console.log(res.usersLiked)
            if (res.userLiked !== req.auth.userId) {
                sauceModel
                .updateOne({_id: req.params.id}, {$inc : {likes : 1}, $push : { usersLiked : req.auth.userId}})
                .then(()=> res.status(200).json({message: "like validé !"}))
                .catch((err) => res.status(400).json(err))
            }
         })
        .catch((err)=> res.status(400).json(err))
       
}
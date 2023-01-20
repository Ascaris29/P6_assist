//importation du modèle pour la base de donnée
const sauceModel = require('../models/sauceModel');


exports.createSauce = (req, res, next) => {
    const sauce = ({
        userId : req.body._id,
        name : req.body.name,
        manufacturer : req.body.manufacturer, 
        description : req.body.description,
        mainPepper : req.body.mainPepper,
        imageUrl : req.body.image,
        heat : req.body.heat,
        likes : req.body.likes,
        dislikes : req.body.dislikes,
        usersLiked : req.body._id,
        usersDisliked : req.body._id
    })
}
//importation mongoose
const mongoose = require('mongoose');

//importation plugin email unique
const uniqueValidator = require('mongoose-unique-validator');

//création du modèle de donnée mongoose pour créer un utilisateur (sign up)
// ne pas oublier la clé unique pour que l'email soit unique
//ne pas oublier le hashage du mot de passe
//si erreur 11000, supprimer index email dans indexes, car option unique : true
const userModel = mongoose.Schema({
    email : {type : String, required : true, unique : true}, 
    password : {type : String, required : true}
});

//application du plugin uniqueValidator
userModel.plugin(uniqueValidator);


//exportation du module avec la méthode model
module.exports = mongoose.model('user', userModel);
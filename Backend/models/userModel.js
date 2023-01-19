//importation mongoose
const mongoose = require('mongoose');

//création du modèle de donnée mongoose pour créer un utilisateur (sign up)
// ne pas oublier la clé unique pour que l'email soit unique
//ne pas oublier le hashage du mot de passe
//si erreur 11000, supprimer index email dans indexes, car option unique : true
const userSchema = mongoose.Schema({
    email : {type : String, required : true, unique : true}, 
    // hasher le mot de passe avant de l'envoyer en bdd
    password : {type : String, required : true}
})




//exportation du module avec la méthode model
module.exports = mongoose.model('user', userSchema);
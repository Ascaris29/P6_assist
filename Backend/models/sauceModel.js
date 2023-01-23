//importation mongoose
const mongoose = require('mongoose'); 

const sauceModel = mongoose.Schema({
    userId : {type : String, required : true}, 
    name : { type : String, required : true},
    manufacturer : { type : String, required : true},
    description : { type : String, required : true}, 
    mainPepper : { type : String, required : true},
    imageUrl : { type : String, required : true}, 
    heat : {type : Number, required : true},
    likes : {type : Number, required : true},
    dislikes : { type: Number, required : true},
    usersLiked : { type : Array, required : true},
    usersDisliked : { type : Array, required : true}
})

//exporation du modèle de données
// le nom entre guillemets permets d'identifier les données dans mongoDB
module.exports = mongoose.model("sauces", sauceModel);
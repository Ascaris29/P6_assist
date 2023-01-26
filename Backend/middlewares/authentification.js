//authentification par token

//importations
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const authentificationByToken = (req, res, next) => {
    try{
        //recuperation du token dans le header authorisation : bearer token
        //n'hesite pas à console log pour voir tout ce que contient les headers
        const token = req.headers.authorization.split(" ")[1];
        //decodage du token
        const decodedToken = jwt.verify(token, process.env.JWT_KEY_TOKEN);
        //recuperation du user Id qu'il y'a à l'interieur du token décodé
        const userIdDecodedToken = decodedToken.userId;
        // rajout de l'userId à l'objet request
        
        req.auth = {
            userId : userIdDecodedToken
        };  
        next()
        //console.log(req.auth.userId)  
    }catch(err){
        res.status(401).json({
            message : "erreur d'authentification",
            error : err
        });
    }
};


module.exports = authentificationByToken;


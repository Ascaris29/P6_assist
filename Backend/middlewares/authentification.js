//authentification par token

//importations
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const authentificationByToken = (req, res, next) =>{
    try{

    }catch(err){
        res.status(400).json({err})
    }
};

module.exports = authentificationByToken;


// importation du plugin password validator qui verifie si le mot de passe est correcte
const passwordValidator = require('password-validator')

//création d'un schema de mot de passe ( aller voir la doc )
const schemaPassword = new passwordValidator();

// ajouter des propriété sur ce schema 
schemaPassword
.is().min(8)                                    // Minimum 8 caractères
.is().max(100)                                  // Maximum 100 caractères
.has().uppercase()                              // Majuscule
.has().lowercase()                              // Minuscule
.has().digits(2)                                // 2 chiffres
.has().not().spaces()                           // Pas d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // valeurs interdites 


// verification de la qualité du password par rapport au schema 
//fonction validate va venir verifier le format du mot de passe entré par l'utilisateur
const verificationQualityPassword = (req, res, next) => {
    if(schemaPassword.validate(req.body.password)){
        next()
    }else{
        res.status(400).json({message : `le mot de passe n'est pas correct ${schemaPassword.validate('req.body.password', {list : true})}`});
        next()
    }
}

//exporation de la fonction de verification de la qualté du password 
module.exports = verificationQualityPassword


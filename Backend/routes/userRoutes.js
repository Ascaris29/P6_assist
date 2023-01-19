//importation express
const express = require('express');
//importation middleware des fonctions pour les routes user 
const userLogique = require('../controllers/userLogiqueRoute')

//créer un routeur 
const router = express.Router();





//route signup 
//création d'un user, 
//signup = endpoint 
router.post("/signup", userLogique.signup);

//route login
//verification d'un user 
//router.get("/login", userLogique.login)


//exportation du module 
module.exports = router;
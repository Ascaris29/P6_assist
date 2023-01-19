//importation express
const express = require('express');
//importation controllers des fonctions pour les routes user 
const userLogique = require('../controllers/userLogiqueRoute')

//importation du middleware password qui verifie le mot de passe 
const password = require('../middlewares/password');

//créer un routeur 
const router = express.Router();





//route signup 
//création d'un user, 
//signup = endpoint 
router.post("/signup", password, userLogique.signup);

//route login
//verification d'un user 
//router.get("/login", userLogique.login)
router.post("/login", userLogique.login)

//exportation du module 
module.exports = router;
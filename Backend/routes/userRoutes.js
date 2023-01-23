//importation express
const express = require('express');
//importation controllers des fonctions pour les routes user 
const userControllers = require('../controllers/userControllers')

//importation du middleware password qui verifie le mot de passe 
const password = require('../middlewares/password');

//créer un routeur 
const router = express.Router();





//route signup 
//création d'un user, 
//signup = endpoint 
router.post("/signup", password, userControllers.signup);

//route login
//verification d'un user 
//router.get("/login", userLogique.login)
router.post("/login", userControllers.login)

//exportation du module 
module.exports = router;
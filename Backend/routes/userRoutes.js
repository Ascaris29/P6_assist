//importation express
const express = require('express');
//importation controllers des fonctions pour les routes user 
const userControllers = require('../controllers/userControllers');
//importation du middleware password qui verifie le mot de passe 
const password = require('../middlewares/password');
//créer un routeur 
const router = express.Router();

//------------------------------------------------------------------------Routes---------------------------------------------------------------//
//signup = endpoint 
router.post("/signup", password, userControllers.signup);

router.post("/login", userControllers.login);



//--------------------------------------------------------------- Exportation -----------------------------------------------------------------//

//exportation du module 
module.exports = router;
//importation express
const express = require('express');
//importation logique routes
const sauceControllers = require('../controllers/saucesControllers');
//importation authentification
const authentification = require('../middlewares/authentification');
//importation multer
const multer = require("../middlewares/multer");
//création routeur
const router = express.Router();

//-------------------------------------------------------Routes------------------------------------------------------------------//

//création d'une route pour créer des sauces
router.post("/", authentification,  multer, sauceControllers.createSauce);

//récupération de toutes les sauces
router.get('/', authentification, sauceControllers.getAllSauces);

// récupération d'une sauce par son id
router.get('/:id', authentification, sauceControllers.getOneSauce);

//modification d'une sauce
router.put('/:id', authentification, multer, sauceControllers.modifyOneSauce);

//suppression d'une sauce
router.delete('/:id', authentification, multer, sauceControllers.deleteOneSauce);

//ajout de like et de dislike
router.post("/:id/like", authentification, sauceControllers.likeSauce)

//--------------------------------------------------------------- Exportation -----------------------------------------------------------------//

//exporter le routeur
module.exports = router;
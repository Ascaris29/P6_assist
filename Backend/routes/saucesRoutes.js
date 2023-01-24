//importation express
const express = require('express');
//importation logique routes
const sauceControllers = require('../controllers/saucesControllers');

//importation authentification
const authentification = require('../middlewares/authentification');

//création routeur
const router = express.Router();

//création d'une route pour créer des sauces
router.post("/sauces", authentification, sauceControllers.createSauce);

//récupération de toutes les sauces
router.get('/sauces', authentification, sauceControllers.getAllSauces);

// récupération d'une sauce par son id
router.get('/sauces/:id', authentification, sauceControllers.getOneSauce);

//modification d'une sauce
router.put('/sauces/:id', authentification, sauceControllers.modifyOneSauce);

//suppression d'une sauce
router.delete('/sauces/:id', authentification, sauceControllers.deleteOneSauce);


//exporter le routeur
module.exports = router;
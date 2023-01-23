//importation express
const express = require('express');
//importation logique routes
const sauceControllers = require('../controllers/saucesControllers')

//création routeur
const router = express.Router();

//création d'une route pour créer des sauces
router.post("/sauces", sauceControllers.createSauce);

//récupération de toutes les sauces
router.get('/sauces', sauceControllers.getAllSauces);

// récupération d'une sauce par son id
router.get('/sauces/:id', sauceControllers.getOneSauce);

//modification d'une sauce
router.put('/sauces/:id', sauceControllers.modifyOneSauce);

//suppression d'une sauce
router.delete('/sauces/:id', sauceControllers.deleteOneSauce);


//exporter le routeur
module.exports = router;
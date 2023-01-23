//importation express
const express = require('express');
//importation logique routes
const sauceControllers = require('../controllers/saucesControllers')

//création routeur
const router = express.Router();

//création d'une route pour créer des sauces
router.post("/sauces", sauceControllers.createSauce);

//récupération des données
router.get('/sauces', sauceControllers.getAllSauces);




//exporter le routeur
module.exports = router;
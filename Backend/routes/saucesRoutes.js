//importation express
const express = require('express');
//importation logique routes
const routeLogique = require('../controllers/saucesLogiqueRoutes')

//création routeur
const router = express.Router();

//création d'une route pour créer des sauces
router.post("/sauces", routeLogique.createSauce);




//exporter le routeur
module.exports = router;
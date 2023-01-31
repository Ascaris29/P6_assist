//importation mongoose 
const mongoose = require('mongoose');
//importation variable d'environnement
const dotenv = require('dotenv').config();

//connexion à la base de données mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, /*ne pas oublier de retirer les balises fermantes*/
{
    useNewUrlParser :true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à la base de donnée réussie !'))
.catch(() => console.log('Echec de la connexion avec la base de donnée !'));


//--------------------------------------------------------------- Exportation -----------------------------------------------------------------//
//exportation du fichier database.js
module.exports = mongoose;

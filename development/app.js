var Beans = require('./src/model/Beans.js');
var PopulateDatabase = require('./src/model/PopulateDatabase.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/autonomous_house');
var Model = new Beans(mongoose);


/**
 * RODAR AO INICIAR
 *
 * var initDatabase = new PopulateDatabase(Model);
 * initDatabase.start();
 */


console.info('Model inicialized with success!!');
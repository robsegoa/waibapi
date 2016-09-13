var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//criando o Model
var ContatoSchema = new Schema({
	nome:{type: String, require: true, trim:true}	
});

module.exports = mongoose.model('Contato', ContatoSchema);
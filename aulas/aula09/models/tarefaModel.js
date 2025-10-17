const mongoose = require('mongoose');

const schema = new mongoose.schema({
   
nome: String,
concluida : Boolean,    

});

module.exports = mongoose.model('Tarefa',schema);
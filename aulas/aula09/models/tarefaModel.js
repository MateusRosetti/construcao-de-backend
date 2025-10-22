const mongoose = require('mongoose');

const schema = new mongoose.schema({ 
nome:{
type: String,
require:[true,'nome da tarefa é obrigatorio'],
trim:true,
},
concluida : Boolean,    

});

module.exports = mongoose.model('Tarefa', schema);
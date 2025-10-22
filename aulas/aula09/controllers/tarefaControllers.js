const tarefa = require('../models/tarefaModel');
const mongoose = require('mongoose')

 async function listar(req,res){
    try{
    const tarefas = await tarefa.find({});
    return res.json(tarefas);
    }catch(err){
        res.status(500).json({msg:"deu ruim" +err.messagem});
      }
    }

async function criar(req,res){
    try{
    const novaTarefa = await tarefa.create({
        nome:req.body.nome,
        concluida:false,
    });
return res.status(201).json(novaTarefa);
} catch (err){
if(err.errors){
    return res.status(422).json({msg:err.errors['nome'].
    message});
    }
    return res.status(500).json({msg:"deu ruim"});
  }
}

 async function buscar(req,res,next){
    const { id } = req.params;

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({msg:"ID invalido"});
}

    const tarefaEncontrada = await tarefa.findOne({_id:id});
   if (tarefaEncontrada){
   req.tarefa = tarefaEncontrada;
    return next();
   }
   return res.status(404).json({msg:"tarefa nao encontrada"});
}

function exibir(req,res){
    return res.json(req.tarefa);
}
 async function atualizar(req,res){
    const {id} =req.params;
    const tarefaAtualizada = await tarefa.findOneAndUpdate({_id:id},{...req.body},{new:true});
    return res.json({})
}
 async function remover(req,res){
    const {id} = req.params;
    const tarefaRemover = await tarefa.findOneAndDelete({_id:id})
    return res.status(204).end();
}

module.exports={listar,criar,buscar,exibir,atualizar,remover};
const tarefa = require('../models/tarefaModel');


 async function listar(req,res){
    try{
    const tarefas = await tarefa.find({});
    return res.json(tarefas);
    }catch(err){
        res.status(500).json({msg:"deu ruim" +err.messagem});
      }
    }

async function criar(req,res){
    const novaTarefa = await tarefa.create({
        nome:req.body.nome,
        concluida:false,
    });
    return res.status(201).json(novaTarefa);
}

 async function buscar(req,res,next){
    const { id } = req.params;
    const tarefaEncontrada = await tarefa.findOne({_id:id});
    next();
}
function exibir(req,res){
    return res.json({});
}
 async function atualizar(req,res){
    const {id} =req.params;
    const tarefaAtualizada = await tarefa.findOneAndUpdate({_id:id},{...req.body});
    return res.json({})
}
 async function remover(req,res){
    const {id} = req.params;
    const tarefaRemover = await tarefa.findOneAndDelete({_id:id})
    return res.status(204).end();
}

module.exports={listar,criar,buscar,exibir,atualizar,remover};
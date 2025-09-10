const express = require('express');



const router = express.Router();

router.get('/',(req,res) =>{
res.send("cheguei aqui!");
});

router.post('/',(req,res)=>{
    res.status(201).send("inserido com sucesso");
})

router.get("/:id",(req,res)=>{
    const{id}=req.params;
    if(id == 1 ) return res.send("achei");
    throw Error ("nao achei");
})

router.put("/:id",(req,res)=>{
    const{id}=req.params;
    if(id ==1 ) res.send("tarefa alterada");
    res.status(404).send("tarefa nao encontrada");
})

router.delete("/:id",(req,res)=>{
    res.status(204).end();
})

module.exports =router;
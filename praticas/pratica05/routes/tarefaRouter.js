const express = require('express');
const controller = require("../controllers/tarefaController");

const router = express.Router();

router.get("/",controller.listarTarefas);

const tarefas = []

const indexRouter = require('./routes/index');

router.use('/', indexRouter);

router.get("/",(req,res)=>{
    res.json(tarefas);

router.post("/",controller.criarTarefa);

router.get("/",(req,res)=>{

  });
});
router.put("/tarefas/:id",(req,res)=>{
    const{id}=req.params;
    const tarefaEncontrada=tarefas.find(item => item.
    id == id);
   if(tarefaEncontrada){
    tarefaEncontrada.nome = req.body.nome;
    tarefaEncontrada.concluida=req.body.concluida;
    res.json(tarefaEncontrada);
return res.json(tarefaEncontrada);
   }
   res.status(404).json({msg:"tarefa nao encontrada"});
});
router.delete("/tarefas/:id",(req,res)=>{
    const {id} = req.params;
    const posicao = tarefas.findIndex(item => item.id ==id);
    if(posicao >=0){
        tarefas.splice(posicao,1);
        return res.status(204).end();
    }
    res.status(404).json({ msg:"tarefa nao"})
});
module.exports = router;
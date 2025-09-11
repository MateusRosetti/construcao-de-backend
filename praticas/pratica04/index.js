const express =require("express");

const tarefas = [
    {id: 1, nome:"Estudar middleware", concluida:false    
    },
    {id:2,nome:"praticar express", concluida:true}
];

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    const now =new Date();
    console.log(`[${now.toISOString()}] ${req.method} ${req.url}`)
    next();
});

app.get('/',(req,res)=>{
    res.send('Servidor rodando com express!');

})

app.listen(3000,()=>{
    console.log('servidor rodando na porta 3000')
});



const tarefasRouter= express.Router();

tarefasRouter.get('/',(req,res)=>{
    res.json(tarefas);
});

tarefasRouter.post('/',(req,res) =>{
    const novaTarefa={
        id:nextId++,
        ...req.body
    };
    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

tarefasRouter.get('/:tarefaId',(req,res)=>{
    const{tarefaId}=req.params;
    const tarefa=tarefas.find(t=> t.id ===parseInt(tarefaId));
 
    if(!tarefa){
     return res.status(404).json({erro:'tarefa nao encontrada'});
    }
    tarefas[index] = { ...tarefas[index], ...req.body };
    res.json(tarefas[index]);
  });
  

  tarefasRouter.delete('/:tarefaId', (req, res) => {
    const { tarefaId } = req.params;
    const index = tarefas.findIndex(t => t.id === parseInt(tarefaId));
  
    if (index === -1) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
  
    tarefas.splice(index, 1);
    res.status(204).send(); 
  });
  

  app.use('/tarefas', tarefasRouter);
  

  

  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 ');
  });
  
  tarefasRouter.get('/:tarefaId', (req, res, next) => {
    const { tarefaId } = req.params;
    const tarefa = tarefas.find(t => t.id === parseInt(tarefaId));
  
    if (!tarefa) {
      return next(new Error('Tarefa não localizada'));
    }
  
    res.json(tarefa);
  });
  
  
  tarefasRouter.put('/:tarefaId', (req, res, next) => {
    const { tarefaId } = req.params;
    const index = tarefas.findIndex(t => t.id === parseInt(tarefaId));
  
    if (index === -1) {
      return next(new Error('Tarefa não localizada'));
    }
  
    tarefas[index] = { ...tarefas[index], ...req.body };
    res.json(tarefas[index]);
  });
  
 
  tarefasRouter.delete('/:tarefaId', (req, res, next) => {
    const { tarefaId } = req.params;
    const index = tarefas.findIndex(t => t.id === parseInt(tarefaId));
  
    if (index === -1) {
      return next(new Error('Tarefa não localizada'));
    }
  
    tarefas.splice(index, 1);
    res.status(204).send(); 
  });
  
  app.use('/tarefas', tarefasRouter);
  
  app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });
  })
 
 
  module.exports = app;
  
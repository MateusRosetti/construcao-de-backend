const express =require("express");

const cors = require('cors');

const router =require('./routerTarefa');

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors);



app.use((req, res, next) => {
    console.log("passei aqui");
    next();
    
})
 
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

app.use('/tarefas',router);

app.use((err,req,res,next)=>{
console.log(err.stack);
res.stack(500).send("algo de errado nao esta certo!");
});


app.listen(3000,()=>{
    console.log("app esta on!");
});
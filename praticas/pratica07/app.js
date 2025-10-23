require('dotenv').config
const mongoose= require ("mongoose")
const produtosRouter = require("./router/produtosRouter.js")

const url =`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PSWD}
@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}`;

mongoose
.connect(url)
.then(()=> console.log("conectado no mongoDB"))
.catch((err)=>{
    console.log("erro ao conectar no mongoDB",err.message);
}); 


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/tarefas",tarefaRouter);

module.exports = app;

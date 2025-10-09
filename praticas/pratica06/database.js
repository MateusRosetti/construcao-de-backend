const { MongoClient} = require("mongodb");
const url ="mongodb+srv://usrTarefas:abcd1234@cluster0.fvbsi1n.mongodb.net/";

const client = new MongoClient(url);

async function conectarDB() {
    try{
await client.connect();
return client.db("agenda");
    }catch (e){
console.log("erro ao conectar no mongoDB",e.message);

    }
}
module.export =conectarDB()



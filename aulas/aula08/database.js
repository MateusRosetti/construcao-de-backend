const { MongoClient} = require("mongodb");
const url ="mongodb+srv://usrTarefas:abcd1234@cluster0.fvbsi1n.mongodb.net/";

let db = null

const client = new MongoClient(url);

async function conecta() {
    try{
await client.connect();
return client.db("agenda");
    }catch (e){
console.log("erro ao conectar no mongoDB",e.message);

    }
}
module.exports = conecta;
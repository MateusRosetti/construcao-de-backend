const readline = require("readline-sync");
const conecta = require("./database");

async function inserir(nomeTarefa){
const db =await conecta();
const collection =await conecta();
const resultado =await collection.insertOne({
    nome:nomeTarefa,
    concluida:false,
});

console.log("tarefa criada com sucesso",resultado);
}

async function buscar(nomeTarefa) {
    const db = await conecta();
    const collection = db.collection("tarefas");
    const resultado =await collection.findOne({nome:nomeTarefa});
    console.log(resultado);
}
async function alterar(nomeTarefa,nomeAlterado,concluidaAlterado) {
    const db=await conecta();
    const collection=db.collection("tarefas");
    const resultado = await collection.updateOne({
        nome:nomeTarefa},{$set:{nome:nomeAlterado,
            concluida:concluidaAlterado}});
            console.log(resultado);
}
async function remover(nomeTarefa) {
    const db=await conecta();
    const collection=db.collection("tarefas");
    const resultado = await collection.deleteOne({
        nome:nomeTarefa});
            console.log(resultado);
    
}
async function main() {
    while(true){
        console.log("menu principal");
        console.log("1-criar tarefa");
        console.log("2-buscar tarefa");
        console.log("3-alterar tarefa");
        console.log("4-remover tarefa");
        console.log("5-sair");
  const opcao =readline.question("entre com sua opcao:");
  switch(parseInt(opcao)){
    case 1:{
        const nome = readline.question("informe o nome da tarefa:");
     await inserir(nome);
        break;
    }
    case 2: 
    const nome = readline.question("informe o nome da tarefa:");
    await buscar(nome);
    break;
    case 3:

        const nomeBuscar = readline.question("informe o nome da tarefa:");
        const nomeAlterado =readline.question("informe outro nome para a tarefa:")
        const concluida=readline.question("informe outra situacao para tarefa:");
        await alterar(nomeBuscar,nome,concluida);
    break;
    case 4: 
    const  nomob= readline.question("informe o nome da tarefa:");
    await remover(nome);
    break;
    case 5: process.exit(0);
      } 
    }
}
main();



inserir();
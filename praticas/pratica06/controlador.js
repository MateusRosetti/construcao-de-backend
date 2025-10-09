const Tarefa = require ("./modelo.js");


export async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.inserir();
}


export async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.buscar();
  return tarefa;
}

export async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);

 
  await tarefa.buscar();

  
  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    await tarefa.alterar();
  } else {
    console.log("Tarefa não encontrada para atualizaçao.");
  }
}


export async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);


  await tarefa.buscar();


  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log("Tarefa não encontrada para remocao");
  }
}
module.exports = { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa };

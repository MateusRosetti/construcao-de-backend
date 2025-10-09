
const readline = require ("readline-sync");
const controlador = require ("./controlador.js");


function menu() {
  console.log("MENU PRINCIPAL");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
  console.log("");
}

async function escolherOpcao(opcao) {
  switch (opcao) {
 
    case "1":
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      console.log(" Tarefa adicionada com sucesso!");
      break;


    case "2":
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefaEncontrada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaEncontrada.id) {
        console.log("\n=== Tarefa encontrada ===");
        console.log(`ID: ${tarefaEncontrada.id}`);
        console.log(`Nome: ${tarefaEncontrada.nome}`);
        console.log(`Concluída: ${tarefaEncontrada.concluida}`);
      } else {
        console.log(" Tarefa não encontrada.");
      }
      break;

   
    case "3":
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluidaStr = readline.question("A tarefa está concluída? (s/n): ");
      const concluida = concluidaStr.toLowerCase() === "s";
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      console.log(" Tarefa atualizada (se existia).");
      break;

 
    case "4":
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nomeRemover);
      console.log(" Tarefa removida (se existia).");
      break;

  
    case "5":
      console.log(" Encerrando o programa...");
      process.exit(0);
      break;

    
    default:
      console.log(" Opção inválida. Tente novamente.");
  }
}


async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opção: ");
    await escolherOpcao(opcao);
  }
}

main();

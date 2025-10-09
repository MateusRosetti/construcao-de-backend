const conectarDB =require('.database.js');


export class Tarefa {
  static async criarConexao() {
    const db = await conectarDB();
    const collection = db.collection("tarefas");
    return { db, collection };
  }


  constructor(nome, concluida = false) {
    this.id = null;
    this.nome = nome;
    this.concluida = concluida;
  }


  async inserir() {
    const { collection } = await Tarefa.criarConexao();
    const resultado = await collection.insertOne({
      nome: this.nome,
      concluida: this.concluida
    });
    this.id = resultado.insertedId;
  }

  
  async alterar() {
    const { collection } = await Tarefa.criarConexao();
    await collection.updateOne(
      { _id: this.id instanceof ObjectId ? this.id : new ObjectId(this.id) },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }


  async deletar() {
    const { collection } = await Tarefa.criarConexao();
    await collection.deleteOne({ nome: this.nome });
  }

 
  async buscar() {
    const { collection } = await Tarefa.criarConexao();
    const resultado = await collection.findOne({ nome: this.nome });

    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
    }
  }
}
module.exports =Tarefa()

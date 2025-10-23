
const request = require('supertest');
const app = require('../app'); 

const request = supertest(app);


describe('Suíte de testes do recurso /tarefas', () => {
  it('Deve retornar status 200 e um array de tarefas ', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('Suíte de testes do recurso /produtos', () => {
  let produtoId; 
 
  it('Deve criar um novo produto e retornar status 201 com JSON contendo _id, nome e preco', async () => {
    const novoProduto = { nome: 'Laranja', preco: '10.0' };

    const res = await request(app)
      .post('/produtos')
      .send(novoProduto)
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('nome', 'Laranja');
    expect(res.body).toHaveProperty('preco', '10.0');

   
    produtoId = res.body._id;
  });


  it('Deve retornar 422 se não enviar JSON com nome e preco', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({})
      .set('Accept', 'application/json');

    expect(res.status).toBe(422);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });


  it('Deve retornar status 200 e um array de produtos', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  
  it('Deve retornar o produto correto pelo ID', async () => {
    const res = await request(app).get(`/produtos/${produtoId}`);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'Laranja');
    expect(res.body).toHaveProperty('preco', '10.0');
  });

  it('Deve retornar 400 e msg "Parâmetro inválido" ao usar ID = 0', async () => {
    const res = await request(app).get('/produtos/0');

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

 
  it('Deve retornar 404 e msg "Produto não encontrado" para ID inexistente', async () => {
    const res = await request(app).get('/produtos/00000000000000000000000');

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });


  it('Deve atualizar o produto e retornar os valores atualizados', async () => {
    const atualizado = { nome: 'Laranja Pera', preco: 18.0 };

    const res = await request(app)
      .put(`/produtos/${produtoId}`)
      .send(atualizado)
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('_id', produtoId);
    expect(res.body).toHaveProperty('nome', 'Laranja Pera');
    expect(res.body).toHaveProperty('preco', 18.0);
  });

  
  it('Deve retornar 422 se não enviar nome e preço ao atualizar', async () => {
    const res = await request(app)
      .put(`/produtos/${produtoId}`)
      .send({})
      .set('Accept', 'application/json');

    expect(res.status).toBe(422);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

 
  it('Deve retornar 400 e msg "Parâmetro inválido" ao atualizar ID = 0', async () => {
    const res = await request(app)
      .put('/produtos/0')
      .send({ nome: 'Teste', preco: 20 });

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

 
  it('Deve retornar 404 e msg "Produto não encontrado" ao atualizar ID inexistente', async () => {
    const res = await request(app)
      .put('/produtos/00000000000000000000000')
      .send({ nome: 'Teste', preco: 20 });

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

 
  it('Deve excluir o produto e retornar status 204 sem conteúdo', async () => {
    const res = await request(app).delete(`/produtos/${produtoId}`);
    expect(res.status).toBe(204);
    expect(res.text).toBe(''); 
  });

 
  it('Deve retornar 400 e msg "Parâmetro inválido" ao tentar deletar ID = 0', async () => {
    const res = await request(app).delete('/produtos/0');

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

 
  it('Deve retornar 404 e msg "Produto não encontrado" ao tentar deletar ID inexistente', async () => {
    const res = await request(app).delete('/produtos/00000000000000000000000');

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});

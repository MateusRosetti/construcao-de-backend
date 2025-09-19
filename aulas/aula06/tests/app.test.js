const supertest = require('supertest');
const app  = require('../app');
const request =supertest(app);

const url = "/tarefas";

describe('testes da rota /tarefas', () =>{

test("GET / deve retonar 200", async () => {
const response = await request.get(url);
expect(response.status).toBe(200);
expect(response.headers['content-type']).toMatch(/json/);
expect(response.body).not.toBeNull();
  });
test("POST /deve retornar 201",async()=>{
    const response = await request.post(url).send({
        nome:"estudar express",
        concluida:false,
    });
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).not.toBeNull();
    expect(response.body['id']).toBeDefined();
    id= response.body["id"];
    expect(response.body['nome']).toMatch("estudar express");
    expect(response.body["concluida"]).toBeFalsy();
});

test("GET/id retorna 200",async()=>{
const response= await request.get(`${url}/${id}`);
expect(response.status).toBe(200);
expect(response.headers["content-type"]).toMatch(/json/);
expect(response.body["id"]).toBe(id);
expect(response.body['nome']).toMatch("estudar express");
expect(response.body["concluida"]).toBeFalsy();
})
test("GET /id retorna 404",async()=>{
    const response = await request.get(`${url}/0`);
    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body['msg']).toBe("tarefa nao encontrada");
 });
test("PUT/id retorna 200", async ()=>{
    const response =await request
        .put(`${url}/${id}`)
    .send({nome:"estudar para p1", concluida:
        true});
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/)
    expect(response.body.id).toBe(id);
    expect(response.body.nome).toBe("estudar para p1");
    expect(response.body.concluida).toBe(true);

});
test("DELETE/id retorna 204",async()=>{
    const response= await request.delete(`${url}/${id}`);
    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
});
    test("DELETE /id retorna 404",async()=> {
        const response = await request.delete(`${url}/0`);
        expect(response.status).toBe(404);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body['msg']).toBe("tarefa nao encontrada");
  });
});

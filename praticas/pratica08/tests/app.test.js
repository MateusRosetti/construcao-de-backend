
const supertest = require('supertest');
const app = require('../app');
const express = require('express');

const request = supertest(app);

const app=express();

app.use(express.json());

let token = ''; 

describe('Testes da API REST', () => {

  it('Deve retornar 401', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(401);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });


  it('Deve retornar 401 ', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', '123456789');
    expect(res.status).toBe(401);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  it('Deve retornar 200 ', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'mateus@gmail.com', senha: 'abcd1234' });
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');

    
    token = res.body.token;
  });

  it('Deve retornar 200 ', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', token);
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

 
  it('Deve retornar 200 ', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', token);
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
    expect(res.body).toHaveProperty('token');


    token = res.body.token;
  });

  it('Deve retornar 200 ', async () => {
    const res = await request
      .get('/produtos')
      .set('authorization', token);
    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

});
module.exports=app;
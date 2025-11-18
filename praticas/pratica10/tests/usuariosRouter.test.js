const supertest = require('supertest');
const app = require('../app');
const router = express.Router();
const express = require('express');
const usuariosController = require('../controllers/usuariosController.js');
const { verificarToken } = require('../middlewares/authMiddleware.js');



router.post('/', usuariosController.criar);


router.post('/renovar', verificarToken, usuariosController.renovar);

const request = supertest(app);

describe('Testes para o recurso /usuarios', () => {

    describe('GET /usuarios', () => {
      it('retornar a lista de usuários', () => {
   
      });
    });
  
    describe('POST /usuarios', () => {
      it('criar', () => {
     
      });
    });
    describe('POST /usuarios', () => {
        it('Deve retornar status 201 e um JSON contendo _id e email', async () => {
          const dados = {
            email: "usuario@email.com",
            senha: "abcd1234"
          };
          let usuarioId;

describe('POST /usuarios', () => {
  it('Deve retornar status 201 e um JSON contendo _id e email', async () => {
    const dados = {
      email: "usuario@email.com",
      senha: "abcd1234"
    };

    const res = await request(app)
      .post('/usuarios')
      .send(dados);

    expect(res.status).to.equal(201);
    expect(res.headers['content-type']).to.match(/application\/json/);
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('email', dados.email);

    usuarioId = res.body._id;
  });
});

      
          const res = await request(app)
            .post('/usuarios')
            .send(dados);
      
          expect(res.status).to.equal(201);
          expect(res.headers['content-type']).to.match(/application\/json/);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('email', dados.email);
        });
      });
      
  
    describe('GET /usuarios/:id', () => {
      it('retornar um usuário específico', () => {
     
      });
    });
  
    describe('PUT /usuarios/:id', () => {
      it('atualizar', () => {
       
      });
    });
  
    describe('DELETE /usuarios/:id', () => {
      it('excluir', () => {
       
      });
    });
    let usuarioId; 
    let token;
    
   
    describe('POST /usuarios - erros de validação', () => {
    
      it('Deve retornar 422 e JSON contendo msg "Email e Senha são obrigatórios"', async () => {
        const res = await request(app)
          .post('/usuarios')
          .send();
    
        expect(res.status).to.equal(422);
        expect(res.headers['content-type']).to.match(/application\/json/);
        expect(res.body).to.have.property('msg', 'Email e Senha são obrigatórios');
      });
    
    });
    
   
    describe('POST /usuarios/login - autenticação', () => {
    
      it('Deve retornar 200 e um JSON ao fazer login', async () => {
        const dadosLogin = {
          usuario: "usuario@email.com",
          senha: "abcd1234"
        };
    
        const res = await request(app)
          .post('/usuarios/login')
          .send(dadosLogin);
    
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.match(/application\/json/);
        expect(res.body).to.have.property('token');
    
        token = res.body.token;
      });
    
      it('Deve retornar 401 e JSON com msg "Credenciais inválidas" ao enviar sem JSON', async () => {
        const res = await request(app)
          .post('/usuarios/login')
          .send();
    
        expect(res.status).to.equal(401);
        expect(res.headers['content-type']).to.match(/application\/json/);
        expect(res.body).to.have.property('msg', 'Credenciais inválidas');
      });
    
    });
    

    describe('POST /usuarios/renovar', () => {
    
      it('Deve retornar 200 e JSON contendo um token ao usar token válido', async () => {
        const res = await request(app)
          .post('/usuarios/renovar')
          .set('authorization', `Bearer ${token}`);
    
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.match(/application\/json/);
        expect(res.body).to.have.property('token');
      });
    
      it('Deve retornar 401 e msg "Token inválido" quando enviado token Bearer 123456789', async () => {
        const res = await request(app)
          .post('/usuarios/renovar')
          .set('authorization', 'Bearer 123456789');
    
        expect(res.status).to.equal(401);
        expect(res.headers['content-type']).to.match(/application\/json/);
        expect(res.body).to.have.property('msg', 'Token inválido');
      });
    
    });
    
    describe('DELETE /usuarios/:id', () => {
    
      it('Deve retornar 204 e sem conteúdo ao excluir usuário com token válido', async () => {
        const res = await request(app)
          .delete(`/usuarios/${usuarioId}`)
          .set('authorization', `Bearer ${token}`);
    
        expect(res.status).to.equal(204);
        expect(res.body).to.be.empty;
      });
    
    });
    
  });

router.delete(
  "/",
  verificarToken,
  usuariosController.remover
);

module.exports = router;

module.exports = router;

const { crifarSenha, gerarToken } = require('../middlewares/authMiddleware.js');
const usuariosModel = require('../models/usuariosModel.js');

async function criar(req, res) {
  try {
    const senhaCifrada = crifarSenha(req.body.senha);

    const novoUsuario = await usuariosModel.create({
      email: req.body.email,
      senha: senhaCifrada
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });

  } catch (erro) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }
}

module.exports = { criar };


const { crifarSenha, gerarToken } = require('../middlewares/authMiddleware.js');
const usuariosModel = require('../models/usuariosModel.js');

async function criar(req, res) {
  try {
    const senhaCifrada = crifarSenha(req.body.senha);

    const novoUsuario = await usuariosModel.create({
      email: req.body.email,
      senha: senhaCifrada
    });

    return res.status(201).json({
      _id: novoUsuario._id,
      email: novoUsuario.email
    });

  } catch (erro) {
    return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
  }
}
async function renovar(req, res) {
  const token = gerarToken({ email: req.usuario });

  return res.status(200).json({ token });
}
const usuariosModel = require("../models/usuariosModel");

async function remover(req, res) {
  await usuariosModel.findOneAndDelete({ email: req.body.usuario });
  return res.status(204).send();
}

module.exports = {
  remover
};
module.exports = {
  criar,
  renovar
};

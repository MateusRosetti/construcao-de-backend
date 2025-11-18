
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


function verificarToken(req, res, next) {
 
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  try {
    if (token) {
     
      const usuario = jwt.verify(token, process.env.JWT_SECRET);

      
      req.usuario = usuario;

      
      return next();
    }

    
    return res.status(401).json({ msg: "Token invalido" });

  } catch (erro) {
 
    return res.status(401).json({ msg: "Token invalido" });
  }
}


function gerarToken(payload) {
  try {
    const expiresIn = process.env.JWT_EXPIRES;

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  } catch (erro) {
    throw new Error("Erro ao gerar o token");
  }
}


function crifarSenha(senha) {
  const salto = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(senha, salto);

  return hash;
}


function compararSenha(senha, hash) {
  return bcrypt.compareSync(senha, hash);
}


module.exports = {
  verificarToken,
  gerarToken,
  crifarSenha,
  compararSenha
};

const jwt= require("jsonwebtoken");

function verificarToken(req,res,next){
const {authorization} = req.headers;
 
try{

    const token = authorization.split(" ")[1];
    const payload = jwt.verify(
      token,
     process.env.JWT_SEGREDO
    );
    req.payload={
      email:payload.email,
      nome:payload.nome,
    };
     
    return next();
  }catch(err){
    res.status(401).json({msg:"token invalido"});
  }
}
function gerarToken(payload){
  const expiresIn= 30;
try{
const token = jwt.sign(
  payload,
  process.env.JWT_SEGREDO
  ,{expiresIn }
);
    return token;
}catch(err){
    throw Error("erro ao gerar token");
  }
}

function renovarToken(req,res){
try{
  const payload = req.payload
  const token = gerarToken(payload);
 res.json({token:gerarToken(payload)});
  }catch(err){
    res.status(500).json({msg:"erro ao renovar token"});
  }
}
module.exports = {verificarToken,gerarToken,renovarToken};
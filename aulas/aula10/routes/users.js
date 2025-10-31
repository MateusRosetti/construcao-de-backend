const express = require('express');
const router = express.Router();

const auth = require ("../middlewares/auth");

router.post("/login",(req,res)=>{
  const { username,password}= req.body;

  if(username ==="jose@iesb.br"&& password ==="abcd1234"){
const payload ={
  email:username,
  nome:"jose"
};
try{
  res.json({token:auth.gererToken(payload)})
}catch(err){
 return res.status(500).json({msg:err.message});
     }
  }
  return res.status(401).json({msg:"credenciais invalidas"});
});

router.post('/renovar',auth.verificarToken,auth.renovarToken);

module.exports = router;

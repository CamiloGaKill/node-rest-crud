const { response } = require('express');
const Usuario = require('../models/usuario');
const { validPassword } = require('../helpers/fn');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response) => {
  const { correo, password } = req.body;
  try{
    const usuario = await Usuario.findOne({correo});
    if(!usuario){
      return res.status(400).json({
        msg: 'Usuario / Password incorrectos'
      })
    }
    if(!usuario.estado){
      return res.status(400).json({
        msg: 'Usuario / Password incorrectos - estado: false'
      })
    }
    const validPass = validPassword(password, usuario.password);
    if(!validPass){
      return res.status(400).json({
        msg: 'Usuario / Password incorrectos - wrong pass'
      })
    }
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token
    })
    
  } catch(error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = { login };

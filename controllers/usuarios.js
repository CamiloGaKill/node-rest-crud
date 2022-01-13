const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const req = require('express/lib/request');
const { all } = require('express/lib/application');

const usuariosGet = async (req, res) => {
  const { limit = 5, nombre, skip = 0} = req.query;
  const query = { 'estado': true };
  let regexp = null;
  let dataUsuarios = [];
  if(nombre){
    regexp = new RegExp("^" + nombre , 'i');
    dataUsuarios = await Usuario.find(query).or([{'nombre': regexp}, {'username': regexp}]).skip(skip).limit(limit);dataUsuarios = new Promise((res, rej) => Usuario.search(nombre, {nombre: regexp} , (err, results) => res(results))).then(data => data);
  }

  const queryFetch = [
    ...(nombre ? [dataUsuarios] : [Usuario.find(query).skip(Number(skip)).limit(Number(limit))]),
    ...(nombre ? [dataUsuarios] : [Usuario.countDocuments(query)])
  ];

  const [usuarios, total] = await Promise.all(queryFetch);
  res.json({
    total: total.length, usuarios
  });
}
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...props } = req.body;
  if (password){
    const salt = bcrypt.genSaltSync();
    props.password = bcrypt.hashSync(password, salt);
  }
  const user = await Usuario.findByIdAndUpdate(id, props);
  res.json(user);
}
const usuariosPost = async (req, res = response) => {
  const { nombre, username, edad, gender, comuna_local, direccion_local, correo, rol, password, profileImg } = req.body;
  const usuario = new Usuario({ nombre, username, edad, gender, comuna_local, direccion_local, correo, rol, password, profileImg });
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  await usuario.save();
  res.json({
    message: 'Usuario creado',
    usuario
  });
}
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;
  // const user = await Usuario.findByIdAndDelete(id);
  const user = await Usuario.findByIdAndUpdate(id, {'estado': false});
  res.json({
    user,
    uid
  });
}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}
const { Schema, model } = require('mongoose');
const searchable = require('mongoose-regex-search');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    searchable: true
  },
  username: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    unique: true
  },
  correo: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  edad: {
    type: String,
    required: [true, 'La edad es obligatoria']
  },
  gender: {
    type: String,
    required: [true, 'El genero es obligatorio']
  },
  comuna_local: {
    type: String,
    required: [true, 'La comuna es obligatoria']
  },
  direccion_local: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  password:{
    type: String,
    required: [true, 'El password es obligatorio'],
  },
  imagen:{
    type: String
  },
  rol:{
    type: String,
    required: [true, 'El rol o tipo de usuario es obligatorio'],
    emun: ['Administrador','Tatuador', 'Cliente']
  },
  estado:{
    type: Boolean,
    default: true
  }
});

UsuarioSchema.plugin(searchable);

UsuarioSchema.methods.toJSON = function(){
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
}

module.exports = model('Usuarios', UsuarioSchema);
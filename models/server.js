const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/dbConnection');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/usuarios';
    this.rolesPath = '/api/roles';
    this.authPath = '/api/auth';
    this.projectPath = '/api/proyectos';

    //DB
    this.conectarDB();

    // Middlewares
    this.middlewares();
    //Rutas
    this.routes();
  };
  async conectarDB(){
    await dbConnection();
  };
  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
    // public directory
    this.app.use(express.static('public'));
  }
  routes(){
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
    this.app.use(this.rolesPath, require('../routes/roles'));
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.projectPath, require('../routes/proyectos'));
  }
  listen(){
    this.app.listen(this.port);
  }
}

module.exports = Server;
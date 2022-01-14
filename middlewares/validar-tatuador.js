const { response, request } = require('express');
const Usuario = require('../models/usuario');
const Proyecto = require('../models/proyectos-tatoo');

const esElTatuadorDelProyecto = (res, req = response, next) => {
    const usuario = await Usuario.findById(uid);
    const idTattoo = await Proyecto.findById(idTatuador);

    if( usuario !== idTattoo){
        return res.status(401).json({
            msg: `${idTattoo} no es un tatuador existente`
        });
    }

    next();
}

module.exports = {
    esElTatuadorDelProyecto
  };
  // muestrame que sale

  //no pasa nada con el ctrl enter
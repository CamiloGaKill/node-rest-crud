const { Schema, model } = require('mongoose');

const proyectoSchema = Schema({
    //Nombre de la imagen.
    title: {
        type: String,
        required: [true, 'El titulo del proyecto es necesario']
    },    
    //Tamaño de la imagen.
    profileImg:{
        type:String
    },
    //Día de publicación.
    publishedAt:{
        type:String
    },
    idTatuador:{
        type: Number
    },
    //Autor
    tatuador:{
        type:String
    },
    //Url de la imagen.
    imgUrl:{
        type: String,
        require:[true, 'Debes subir la imagen de uno de tus proyectos']
    }
}, {
    timestamps:true
})


proyectoSchema.methods.setImgUrl = function setImgUrl () {
   /* const {host, port } = appConfig
    this.imgUrl = `${host}:${port}/public/${filename}`*/
    
    const { title, _id,  imgUrl } = this.toObject();
    proyectos.uid = _id;
    return proyectos;
}


module.exports = model('Proyectos', proyectoSchema)
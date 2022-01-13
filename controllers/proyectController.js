const { request, response } = require('express');
const proyecto = require('../models/proyectos-tatoo');
const usuario = require('../models/usuario');

//Mostrar
const getProyect = async (req, res = response) => {
    /*const {idTatuador} = req.params;
    const Proyecto = await proyecto.findById(idTatuador);
    return res.json(Proyecto);
    */

    /*const filter = {};
    const all = await proyecto.find(filter);
    res.json({all});*/

    const {idTatuador} = req.query;
    const filter = {};
    if(idTatuador){
        filter['idTatuador'] = idTatuador;
    }
    console.log(filter);
    console.log(req.query);
    const Proyecto = await proyecto.find(filter);
    return res.json(Proyecto);
     
    
}

//Crear.
const postProject = async (req,res = response) =>{
    const{title, idTatuador, tatuador, imgUrl, profileImg} = req.body;
    console.log(req.title);
    //Trabajos de tatuadores.
    const newProyect = {
        title,
        profileImg,
        imgUrl,
        idTatuador,
        tatuador        
    };
    //Todos los trabajos

    /*const allProyects = {
        id: id,
        imgUrl,
        tatuador        
    };
    */

    const Proyecto = new proyecto(newProyect);
    console.log(Proyecto);
    await Proyecto.save();

    return res.json({
        message:'La imagen fue guardada'
    })
}


//Eliminar
const deleteProyect = async ( req, res ) => {
    const {id} = req.params;
    const Proyecto = await proyecto.findByIdAndRemove(id);
    /*
    if (Proyecto) {
        await fs.unlink(path.resolve(photo.imagePath))
    } 
    //Borra la imagen y su información.
    */
    return res.json({
        message: 'Proyecto eliminado',
        Proyecto
    });
}

//Actualizar
const updateProyect = async(req, res) => {
    const {id} = req.params;
    const {title, tatuador} = req.body;
    const updatedProyect = await proyecto.findByIdAndUpdate(id, {
        title,
        tatuador
    });
    return res.json({
        message: 'Proyecto actualizado',
        updatedProyect
    })
}

module.exports = {
    getProyect,
    postProject,    
    deleteProyect,
    updateProyect
}
//Multipart Form Principalmente recibe una imagen, si guardo una imagen con el mismo titulo que otra se marca nulo.
//Para actualizar es mejor usar el formato JSON.

/* async function addProyect (req, res){
    try{
        const{
            name,
            size,
            descripcion
        } = req.body

        if(req.file){
            const{filename} = req.file
            proyect.setImgUrl(filename)
        }

        const proyect = Proyect({
            name,
            size,
            descripcion
        })

        const proyectStored = await proyect.save();

        res.status(201).send({ proyectStored })
    }catch (e){
        res.status(500).send({ message: e.message })
    }
}

module.exports={addProyect} */
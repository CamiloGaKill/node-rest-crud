const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { getProyect, postProject } = require('../controllers/proyectController');

const router = Router();

router.get('/', getProyect);
router.post('/', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  validarCampos
], postProject, getProyect);

module.exports = router;
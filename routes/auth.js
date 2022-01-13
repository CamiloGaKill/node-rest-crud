const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/', [
  check('correo', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validarCampos
],login);

module.exports = router;

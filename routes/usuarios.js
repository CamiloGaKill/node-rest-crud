const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { isValidRole, emailExists, userExists } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
  check('id', 'Debe ser un ID de usuario válido').isMongoId(),
  check('id').custom(userExists),
  validarCampos
], usuariosPut);
router.post('/', [
  check('correo', 'El correo no es válido').isEmail(),
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y de más de 6 caracteres').isLength({min:6}),
  check('rol').custom(isValidRole), 
  check('correo').custom(emailExists), 
  validarCampos
],usuariosPost);
router.delete('/:id', [
  validarJWT,
  check('id', 'Debe ser un ID de usuario válido').isMongoId(),
  check('id').custom(userExists),
  validarCampos
],usuariosDelete);
module.exports = router;
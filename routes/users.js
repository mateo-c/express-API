var express = require('express');
var router = express.Router();
const dataUsuarios = require('../data/usuarios');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  let usuarios = await dataUsuarios.getUsuarios();
  res.json(usuarios);
});

router.get('/:id', async (req, res)=>{
  let usuario = await dataUsuarios.getUsuario(req.params.id);
  res.json(usuario);
});

router.post('/', async (req, res) => {
    
  let usuario = {
    nombre: req.body.nombre,
    password: req.body.password,
    email: req.body.email,
    edad: req.body.edad,
    pets: []
  };

  let result = await dataUsuarios.pushUsuario(usuario)
  .catch((error)=>{console.log(error)});

  res.send(result);
});

module.exports = router;
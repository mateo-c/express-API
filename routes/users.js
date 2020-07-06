var express = require('express');
var router = express.Router();
const dataUsuarios = require('../data/usuarios');


//---------LISTAR TODOS---------------
router.get('/', async function(req, res) {
  let usuarios = await dataUsuarios.getUsuarios();
  res.json(usuarios);
});

//---------BUSCAR UNO---------------
router.get('/:id', async (req, res)=>{
  let usuario = await dataUsuarios.getUsuario(req.params.id);
  res.json(usuario);
});

//---------INSERTAR UNO---------------
router.post('/', async (req, res) => {
  /* FORMATO A ENVIAR EN BODY
  {
    "nombre": "Carlos Acosta",
    "password": "iop123",
    "email": "acosta@mail.com",
    "edad": 43
  }
  */

 const d = new Date();
 const id = `${d.getDate()}${d.getMonth()}${d.getFullYear()}${d.getHours()}${d.getMinutes()}${d.getMilliseconds()}`;

  let usuario = {
    idDoc: id,
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

//---------ELIMINAR UNO---------------
router.delete('/:id', async (req, res)=>{
  let usuario = await dataUsuarios.deleteUsuario(req.params.id);
  res.send(`Usuario eliminado: ${usuario}`);
});

//---------ACTUALIZAR UNO---------------
router.put('/:id', async (req, res)=>{
/* FORMATO A ENVIAR EN BODY
  {
    "nombre": "Marta Lopez",
    "email": "martalopez@mail.com"
  }
  */
  let usuario = await dataUsuarios.updateUsuario(req.params.id, req.body);
  res.send(`Usuario actualizado: ${usuario}`);
});

module.exports = router;
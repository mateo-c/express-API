const express = require('express');
const router = express.Router();

router.get('/:nombre/:apellido',(req, res, next)=>{
    //bienvenida/:nombre
    const nom = req.params.nombre;
    const ape = req.params.apellido;
    res.render('bienvenida', { title:'Bienvenida', nombre: nom, apellido: ape });
});

module.exports = router;
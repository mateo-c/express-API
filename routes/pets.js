var express = require('express');
var router = express.Router();
const dataMascotas = require('../data/mascotas');
const chalk = require('chalk');


//---------LISTAR MASCOTAS---------------
router.get('/', async function(req, res, next) {
    let mascotas = await dataMascotas.getMascotas();

    console.log(chalk.bgCyan.black(` <-- Obteniendo listado de mascotas. `));

    if(req.query.sexo=="male" || req.query.sexo=="famale"){
        mascotas = mascotas.filter(pet=> pet.dogSex == req.query.sexo)
        console.log(chalk.bgCyan.black(` <-- Filtrado por sexo`));
    }
    if(req.query.raza){
        mascotas = mascotas.filter(pet=> pet.dogBreed == req.query.raza)
        console.log(chalk.bgCyan.black(` <-- Filtrado por raza`));
    }
    if(mascotas[0]==undefined){
        mascotas = {
            error: "error de filtrado!"
        }
    }
    

    res.json(mascotas);
});

//---------INSERTAR UNO---------------
router.post('/:idUsuario', async (req, res) => {
    //-------
    /* FORMATO A ENVIAR EN BODY
            {
                "dogNick": "Brutus",
                "dogSex": "male",
                "dogBreed": "dogo"
            }
    */
    const usuarioId = req.params.idUsuario;
   // ----generando id del perro basado en momento de su carga
    const d = new Date();
    const id = `${d.getDate()}${d.getMonth()}${d.getFullYear()}${d.getHours()}${d.getMinutes()}${d.getMilliseconds()}`;
  
    let mascota = {
        dogId: id,
        dogNick: req.body.dogNick,
        dogPic: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Dog_silhouette.svg/1200px-Dog_silhouette.svg.png",
        dogSex: req.body.dogSex,
        dogBreed: req.body.dogBreed,
        liked_by: [],
        likes_to: [],
        matches: []
    };
  
    let result = await dataMascotas.pushMascota(usuarioId, mascota)
    .catch((error)=>{console.log(error)});
  
    res.send(result);
  });

  //---------BUSCAR UNO---------------
router.get('/:id', async (req, res)=>{
    let mascota = await dataMascotas.getMascota(req.params.id);
    if(!mascota){
        mascota={error:"chequealo bien!"}
    }
    res.json(mascota);
  });

//------BORRAR UNA MASCOTA
router.delete('/:usuarioId/:mascotaId', async (req, res)=>{

    let result = await dataMascotas.deleteMascota(req.params.usuarioId,req.params.mascotaId);

    res.send(result);
  });

  //---------ACTUALIZAR MASCOTA---------------
router.put('/:usuarioId/:mascotaId', async (req, res)=>{
    /* FORMATO A ENVIAR EN BODY
      {
        "dogNick": "Chicho",
        "dogSex": "male",
        "dogBreed": "caniche"
      }
      */
      let result = await dataMascotas.updateMascota(req.params.usuarioId,req.params.mascotaId, req.body);
      res.send(result);
    });


module.exports = router;
var express = require('express');
var router = express.Router();
const dataMascotas = require('../data/mascotas');


//---------LISTAR MASCOTAS---------------
router.get('/', async function(req, res, next) {
    let mascotas = await dataMascotas.getMascotas();
    res.json(mascotas);
});

//---------INSERTAR UNO---------------
router.post('/', async (req, res) => {
    /* FORMATO A ENVIAR EN BODY
            {
                "dogId": "hhh",
                "dogNick": "Brutus",
                "dogSex": "male",
                "dogBreed": "dogo",
            }
    */
  
    let mascota = {
        dogId: req.body.dogId,
        dogNick: req.body.dogNick,
        dogSex: req.body.dogSex,
        dogBreed: req.body.dogBreed,
        liked: [
            {
                idPretend: "xxx"
            }
        ],
        likes: [
            {
                idLike: "xxx"
            },
            {
                idLike: "zzz"
            }
        ],
        matches: [
            {
                idMatch: "xxx"
            }
        ]
    };
  
    let result = await dataUsuarios.pushUsuario(usuario)
    .catch((error)=>{console.log(error)});
  
    res.send(result);
  });


module.exports = router;
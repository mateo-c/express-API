var express = require('express');
var router = express.Router();
const dataLike = require('../data/likes');




router.post('/:usuarioId/:idPerro/', async function(req, res) {
    let like = await dataLike.addLike(req.params.usuarioId, req.params.idPerro, req.body);
    res.json(like)
});

router.get('/', async function(req, res){
    const obj = await dataLike.testMatch("5f027924a1b90d41a0e0534a", "5620202334948", "5f027ed3a1b90d41a0e0534b", "5620202337560");
    res.send(obj) 
});

module.exports = router;
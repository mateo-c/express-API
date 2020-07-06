var express = require('express');
var router = express.Router();
const dataLike = require('../data/likes');




router.post('/:usuarioId/:idPerro/', async function(req, res) {
    let like = await dataLike.addLike(req.params.usuarioId, req.params.idPerro, req.body);
    res.json(like)
});


module.exports = router;
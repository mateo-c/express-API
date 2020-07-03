const conecction = require('./conecction');
const { ObjectId } = require('mongodb');

async function getMascotas(){
    const clienteMongo = await conecction.getConnection();
    const usuarios = await clienteMongo.db('sample_users1').collection('dogOwners').find().toArray();
    
    let mascotas = [];

    usuarios.map( (user) => mascotas = mascotas.concat(user.pets));

    return mascotas;
}



module.exports = {getMascotas};
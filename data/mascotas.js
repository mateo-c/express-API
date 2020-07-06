const conecction = require('./conecction');
const { ObjectId } = require('mongodb');
const chalk = require('chalk');

async function getMascotas(){
    const clienteMongo = await conecction.getConnection();
    const usuarios = await clienteMongo.db('sample_users1').collection('dogOwners').find().toArray();
    
    let mascotas = [];

    usuarios.map( (user) => mascotas = mascotas.concat(user.pets));

    return mascotas;
}

async function pushMascota(usuario, mascota){
    const clientmongo = await conecction.getConnection();

    const query = {"_id":ObjectId(usuario)};

    const result = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, { $push: { pets: mascota } });
    
    return result;
}

async function getMascota(mascotaId){
    const clientmongo = await conecction.getConnection();
    //const id = parseInt(usuarioId);

    let mascotas = getMascotas();

    let mascota = (await mascotas).find( pet => pet.dogId == mascotaId);

    console.log(chalk.bgCyan.black(` <-- Obteniendo una MASCOTA según Id. `));

    return mascota; 
}

async function deleteMascota(usuarioId, mascota){
    const clientmongo = await conecction.getConnection();

    const query = {"_id":ObjectId(usuarioId)};

    const objetoEliminado  = {$pull: 
        {pets: {dogId: mascota}}
    };

    const result  = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, objetoEliminado);
    

    return result;
}

async function updateMascota(usuarioId, mascotaId, cambios){
    const clientmongo = await conecction.getConnection();

    const query = {"_id":ObjectId(usuarioId)};

    const objetoModificado  = {$set: 
        {pets: { dogId:mascotaId,
        dogNick:cambios.dogNick,
        dogSex:cambios.dogSex,
        dogBreed:cambios.dogBreed}
        }
    };

    const result  = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, objetoModificado);
    

    return result;
}



module.exports = {getMascotas, pushMascota, getMascota,deleteMascota,updateMascota};
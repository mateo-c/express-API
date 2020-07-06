const conecction = require('./conecction');
const { ObjectId } = require('mongodb');
const chalk = require('chalk')

async function getUsuarios(){
    const clienteMongo = await conecction.getConnection();

    const coleccion = await clienteMongo.db('sample_users1')
    .collection('dogOwners')
    .find()
    .toArray();

    console.log(chalk.bgCyan.black(` <-- Obteniendo listado de usuarios. `));

    return coleccion;
}

async function getUsuario(usuarioId){
    const clientmongo = await conecction.getConnection();
    //const id = parseInt(usuarioId);

    const documento = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .findOne({"_id":ObjectId(usuarioId)});

    console.log(chalk.bgCyan.black(` <-- Obteniendo un usuario según Id. `));

    return documento; 
}

async function pushUsuario(usuario){
    const clientmongo = await conecction.getConnection();

    const result = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .insertOne(usuario);
    
    console.log(chalk.bgGreen.black(` --> Insertando un usuario en la base de datos. `));

    return result;
}

async function updateUsuario(usuarioId, usuario){
    const clientmongo = await conecction.getConnection();

    const query = {"_id":ObjectId(usuarioId)};

    const newvalues  = {$set: 
        {
            nombre: usuario.nombre,
            email: usuario.email
        }
    };

    const result  = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, newvalues);
    
    console.log(chalk.bgYellow.black(` --> Modificando un usuario en la base de datos. `));

    return result;
}

async function deleteUsuario(usuarioId){
    const clientmongo = await conecction.getConnection();

    const result = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .deleteOne({"_id":ObjectId(usuarioId)});

    console.log(chalk.bgRed(` --> Eliminando un usuario en la base de datos. `));

    return result;
}


module.exports = {getUsuarios, getUsuario,pushUsuario,updateUsuario,deleteUsuario};
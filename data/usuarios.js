const conecction = require('./conecction');
const { ObjectId } = require('mongodb');

async function getUsuarios(){
    const clienteMongo = await conecction.getConnection();

    const coleccion = await clienteMongo.db('sample_users1')
    .collection('dogOwners')
    .find()
    .toArray();
    return coleccion;
}

async function getUsuario(usuarioId){
    const clientmongo = await conecction.getConnection();
    //const id = parseInt(usuarioId);

    const documento = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .findOne({"_id":ObjectId(usuarioId)});

    return documento; 
}

async function pushUsuario(usuarioId){
    const clientmongo = await conecction.getConnection();

    const result = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .insertOne(usuarioId);
    
    return result;
}

async function updateUsuario(usuario){
    const clientmongo = await conecction.getConnection();

    const query = {_id: parseInt(usuario._id)};
    const newvalues  = {$set: 
        {
            nombre: usuario.name,
            password: usuario.password,
            email: usuario.email,
            edad: usuario.edad
        }
    };

    const result  = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, newvalues);
    
    return result;
}

async function deleteUsuario(usuarioId){
    const clientmongo = await conecction.getConnection();

    const result = await clientmongo.db('sample_users1')
        .collection('dogOwners')
        .deleteOne({"_id":ObjectId(usuarioId)});
    return result;
}


module.exports = {getUsuarios, getUsuario,pushUsuario,updateUsuario,deleteUsuario};
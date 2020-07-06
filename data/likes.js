const conecction = require('./conecction');
const { ObjectId } = require('mongodb');
const chalk = require('chalk');

async function addLike(usuarioId, idPerro, body) {
    const clientMongo = await conecction.getConnection();

    const query = { "_id": ObjectId(usuarioId), "pets.dogId": idPerro };

    const objetoModificado = {
        $push:
            { "pets.$.likes": body }
    };

    const result = await clientMongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, objetoModificado);


    await testMatch(usuarioId, idPerro, body.usuarioId, body.idLike)

    return result;
}

async function testMatch(usuarioId, idPerro, usuarioId2, idPerro2) {
    const clientMongo = await conecction.getConnection();
    //testear si perro2 le dio like a perro1
    const query2 = { "_id": ObjectId(usuarioId2), "pets.dogId": idPerro2 };

    const persona = await clientMongo.db('sample_users1').collection('dogOwners').findOne({ "_id": ObjectId(usuarioId2) });
    let perro2 = persona.pets.find(buscado => buscado.dogId == idPerro2).likes.find(buscado => buscado.idLike == idPerro)

    console.log(perro2);

    let result1 = "no hay match"

    if (perro2 != undefined) {
        //agregar a perro1.match perro2
        const query1 = { "_id": ObjectId(usuarioId), "pets.dogId": idPerro };

        const objetoModificado1 = {
            $push:
                { "pets.$.matches": idPerro2 }
        };

        const objetoModificado2 = {
            $push:
                { "pets.$.matches": idPerro }
        };

        result1 = await clientMongo.db('sample_users1')
            .collection('dogOwners')
            .updateOne(query1, objetoModificado1)

        const result2 = await clientMongo.db('sample_users1')
            .collection('dogOwners')
            .updateOne(query2, objetoModificado2)


        console.log('its a match!')
    }

    return result1;

}


async function removeLike(usuarioId, idPerro, body) {
    const clientMongo = await conecction.getConnection();
    const query = { "_id": ObjectId(usuarioId), "pets.dogId": idPerro };

    const objetoModificado = {
        $pull:
            { "pets.$.likes": body }
    };

    const result = await clientMongo.db('sample_users1')
        .collection('dogOwners')
        .updateOne(query, objetoModificado);

    await delMatch(usuarioId, idPerro, body.usuarioId, body.idLike)

    return result;
}


async function delMatch(usuarioId, idPerro, usuarioId2, idPerro2) {
    const clientMongo = await conecction.getConnection();
    //testear si perro2 le dio like a perro1
    const query2 = { "_id": ObjectId(usuarioId2), "pets.dogId": idPerro2 };

    const persona = await clientMongo.db('sample_users1').collection('dogOwners').findOne({ "_id": ObjectId(usuarioId2) });
    let perro2 = persona.pets.find(buscado => buscado.dogId == idPerro2).likes.find(buscado => buscado.idLike == idPerro)

    console.log(perro2);

    let result1 = "no hay match"

    if (perro2 != undefined) {
        //sacar a perro1.match perro2
        const query1 = { "_id": ObjectId(usuarioId), "pets.dogId": idPerro };

        const objetoModificado1 = {
            $pull:
                { "pets.$.matches": idPerro2 }
        };

        const objetoModificado2 = {
            $pull:
                { "pets.$.matches": idPerro }
        };

        result1 = await clientMongo.db('sample_users1')
            .collection('dogOwners')
            .updateOne(query1, objetoModificado1)

        const result2 = await clientMongo.db('sample_users1')
            .collection('dogOwners')
            .updateOne(query2, objetoModificado2)


        console.log('its a match!')
    }

    return result1;

}


module.exports = { addLike, removeLike };
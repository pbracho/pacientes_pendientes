const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);

    var newUser = myUser.save();

    // Quito la info de la password para no devolverla
    newUser.password = '';
    return newUser;
}

function getUser(usernameFilter) {
    let filter = {};
    if (usernameFilter !== null) {
        filter = { username: usernameFilter }
    }
    // Especifico los campos como parametro para que no devuelva el password (información sensible)
    return Model.find(filter, '_id name username regdate');
}

async function updateUser(id, dataToPatch) {
    // Primero ubico el usuario a actualizar
    const userToPatch = await Model.findOne({ _id: id });

    // Verifico si hay cambios en cada uno de los datos y si los hay, los anexo para actualizar
    if (dataToPatch.name) {
        userToPatch.name = (userToPatch.name === dataToPatch.name) ? userToPatch.name : dataToPatch.name;
    }

    if (dataToPatch.username) {
        userToPatch.username = (userToPatch.username === dataToPatch.username) ? userToPatch.username : dataToPatch.username;
    }

    if (dataToPatch.password) {
        userToPatch.password = dataToPatch.password;
    }

    // Guardo la información y la cargo en newUser
    var newUser = await userToPatch.save();

    // elimino la password de la respuesta (info sensible)

    newUser.password = '';
    return newUser;
}

function removeUser(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addUser,
    get: getUser,
    update: updateUser,
    remove: removeUser
}
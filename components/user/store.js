/**
 * Módulo store del componente user
 * @module /componets/user/store
 */

/** Carga el módulo model del componente */
const Model = require('./model');

/**
 * Agrega un nuevo documento de usuario a la colección users
 * @param {json} user - Objeto json con la información del usuario, formateada segun el modelo. 
 * @returns json conteniento los datos del usuario
 */
function addUser(user) {
    const myUser = new Model(user);

    var newUser = myUser.save();

    // Quito la info de la password para no devolverla
    newUser.password = '';
    return newUser;
}

/**
 * Devuelve un usuario o todos los usuarios de la colección.
 * @param {string} usernameFilter - Nombre de usuario a buscar en la colección (opcional). Si no se uministra se devuelven todos.
 * @returns json con el usuario o todos los usuarios de la colección
 */
function getUser(usernameFilter) {
    let filter = {};
    if (usernameFilter !== null) {
        filter = { username: usernameFilter }
    }
    // Especifico los campos como parametro para que no devuelva el password (información sensible)
    return Model.find(filter, '_id name username regdate');
}

/**
 * Actualiza la información del usuario con el id suministrado
 * @param {string} id - Id del usuario
 * @param {json} dataToPatch - Datos del usuario a ser actualizados
 * @returns json del usuario con los datos actualizados
 */
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

/**
 * Elimina de la colección el usuario con el id suministrado
 * @param {string} id - Id del usuario a eliminar
 * @returns Cantidad de registros eliminados (deletedCount)
 */
function removeUser(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addUser,
    get: getUser,
    update: updateUser,
    remove: removeUser
}
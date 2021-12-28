/**
 * Módulo controller del componente user
 * @module /components/user/controller
 */

/** Carga el modulo store del componente */
const store = require('./store');

/**
 * Añade un nuevo usuario a la base de datos
 * @param {String} name Nombre real del usuario
 * @param {String} username nombre de usuario a utilizar en el sistema
 * @param {String} password Contraseña a utilizar
 * @returns Objeto JSON conteniendo los valores del nuevo usuario
 */
function addUser(name, username, password) {
    return new Promise((resolve, reject) => {
        if (!name || !username || !password) {
            reject('[userController] Datos incorrectos o inexistentes');
            return false;
        }

        const newUser = {
            name: name,
            username: username,
            password: password,
            regdate: new Date(),
        };

        store.add(newUser);

        resolve(newUser);
    })
}

/**
 * Obtiene un usuario o listado de usuarios segun se pase o no un nombre de usuario para filtrar
 * @param {string} usernameFilter - Nombre de usuario que servirá para filtrar los usuarios. Si no se pasa el parametro se devuelven todos los usuarios
 * @returns Objeto JSON conteniendo un usuario o un listado de usuarios
 */
function getUser(usernameFilter) {
    return new Promise((resolve, reject) => {
        resolve(store.get(usernameFilter));
    })
}

/**
 * Actualiza un usuario, según el Id suministrado
 * @param {string} id - Id del usuario
 * @param {JSON} dataToPatch - Objeto JSON conteniendo la información del usuario recibida en el body del Request
 * @returns Objeto JSON conteniendo el usuario con los valores actualizados
 */
function updateUser(id, dataToPatch) {
    return new Promise(async (resolve, reject) => {
        if (!id || !dataToPatch) {
            reject('[userController] Invalid or Incomplete data');
            return false;
        }
        const result = await store.update(id, dataToPatch);
        resolve(result);
    })
}

/**
 * Elimina el usuario con el Id suministrado
 * @param {string} id - Id del usuario a eliminar
 * @returns Número de registros eliminados (deletedCount)
 */
function deleteUser(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('[userController] Invalid Id');
            return false;
        }
        const result = store.remove(id);

        resolve(result);
    })
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
}
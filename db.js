/**
 * Módulo db
 * @module db
 */

/** Importamos el módulo mongoose */
const db = require('mongoose');

/** Le decimos a mongoose que utilice las promises de NodeJS por defecto */
db.Promise = global.Promise;

/**
 * Función para realizar la conexxión a la base de datos de mongo
 * @param {string} uri - Cadena de conexión a la base de datos
 */
async function connect(uri) {
    // opciones para conectarse a la base de datos
    const mongoConnOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    // Conectamos con la base de datos
    await db.connect(uri, mongoConnOptions);

    console.log('[db] Conectada con éxito');
}

module.exports = connect;
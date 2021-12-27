const db = require('mongoose');

// Le decimos a mongoose que utilice las promises de NodeJS por defecto
db.Promise = global.Promise;

// Creamos la función de conección
async function connect(uri) {
    const mongoConnOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    // Conectamos con la base de datos
    await db.connect(uri, mongoConnOptions);

    console.log('[db] Conectada con éxito');
}

module.exports = connect;
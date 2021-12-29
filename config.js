/**
 * Módulo config
 * @module config
 */

/** Carga valores a utilizar por la app de forma centralizada */
const config = {
    // Host desde donde se inicia la app
    host: process.env.HOST || 'http://localhost',

    // Puerto, por defecto es 3000
    port: process.env.PORT || 3000,

    // Directorio público
    publicDir: process.env.PUBLIC_DIR || './public',

    // Ruta de llamada del directorio público, desde donde se sirven los estaticos
    publicRoute: process.env.PUBLIC_ROUTE || '/app',

    // Ruta del directorio donde se cargan los archivos por upload
    filesRoute: process.env.FILES_ROUTE || '/files',

    // URL de conexion a la base de datos
    dbUrl: process.env.DB_URL || 'mongodb://admin:password@localhost:27017/gestion_pacientes',

    // Palabra semilla para utilizar con bcrypt
    secretKey: process.env.SECRET_KEY || 'secretkey'
}

module.exports = config;
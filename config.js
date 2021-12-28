/**
 * Módulo config
 * @module config
 */

/** Carga valores a utilizar por la app de forma centralizada */
const config = {
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3000,
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    dbUrl: process.env.DB_URL || 'mongodb://admin:password@localhost:27017/gestion_pacientes',
    secretKey: process.env.SECRET_KEY || 'secretkey'
}

module.exports = config;
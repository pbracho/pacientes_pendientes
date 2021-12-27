const config = {
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3000,
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    dbUrl: process.env.DB_URL || 'mongodb://admin:password@localhost:27017/gestion_pacientes',
}

module.exports = config;
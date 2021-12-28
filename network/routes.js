/**
 * Módulo routes, para manejar el enrutado de la app
 * @module /network/routes
 */
/** Carga el módulo express */
const express = require('express');

/** Carga los módulos con las rutas a manejar */
const user = require('../components/user/network');
const patient = require('../components/patient/network');
const authenticate = require('../components/authenticate/network');

/** Asigna y gestiona las distintas rutas al módulo app */
const routes = (app) => {
    app.use('/user', user);
    app.use('/patient', patient);
    app.use('/authenticate', authenticate);
}

module.exports = routes;
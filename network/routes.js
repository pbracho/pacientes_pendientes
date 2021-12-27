const express = require('express');

const user = require('../components/user/network');
const patient = require('../components/patient/network');
const authenticate = require('../components/authenticate/network');

const routes = (app) => {
    app.use('/user', user);
    app.use('/patient', patient);
    app.use('/authenticate', authenticate);
}

module.exports = routes;
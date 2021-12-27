const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');
//const config = require('../../config');

router.post('/', (req, res) => {
    //Utilizamos el controller para añadir un usuario
    //puedo usar req.body.parametro, o guardo el body como una variable y uso desde alli
    const body = req.body;
    controller.addUser(body.name, body.username, body.password)
        .then((newUser) => {
            response.success(req, res, newUser, 201);
        })
        .catch(e => {
            // aqui se toma el valor del reject de la promesa que se hizo en el controlador
            response.error(req, res, 'Invalid or missing data', 500, e);
        })
});

router.get('/', (req, res) => {
    const filterByUsername = req.query.username || null;
    controller.getUser(filterByUsername)
        .then((userList) => {
            response.success(req, res, userList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected error', 500, e);
        });
});

router.patch('/:id', (req, res) => {
    const userId = req.params.id || null;
    const { name, username, password } = req.body;
    const dataToPatch = {
        name,
        username,
        password
    }

    controller.updateUser(userId, dataToPatch)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err)
        })
});

router.delete('/:id', (req, res) => {
    controller.deleteUser(req.params.id)
        .then(() => {
            response.success(req, res, `User ${req.params.id} removed.`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', e);
        });
});


module.exports = router;
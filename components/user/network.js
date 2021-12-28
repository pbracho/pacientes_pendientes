/**
 * Módulo network del componente user, controla las peticiones que recibe el componente
 * @module /components/user/network
 */

/** Carga el router de express para establecer las rutas y verbos de las peticiones */
const router = require('express').Router();

/** carga el módulo response para enviar las respuestas a las peticiones */
const response = require('../../network/response');

/** Carga el módulo controller del componente */
const controller = require('./controller');

/** carga el módulo jsonwebtoken para efectuar autorización basada en token */
const jwt = require('jsonwebtoken');

/** carga la secretKey a utilizar por jwt del módulo config */
const secretKey = require('../../config').secretKey;

/** Petición post para añadir un doc de usuario a la colección users de la base de datos */
router.post('/', response.verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err);
        } else {
            let result = { tokenData };
            //Utilizamos el controller para añadir un usuario
            //puedo usar req.body.parametro, o guardo el body como una variable y uso desde alli
            const { name, username, password } = req.body;
            controller.addUser(name, username, password)
                .then((newUser) => {
                    result.newUser = newUser;
                    response.success(req, res, result, 201);
                })
                .catch(e => {
                    result.error = e;

                    // aqui se toma el valor del reject de la promesa que se hizo en el controlador
                    response.error(req, res, 'Invalid/missing data or duplicated username', 500, result);
                })
        }
    })
})

/** Petición get para obtener o un usuario específico por su Id o un listado de usuarios */
router.get('/', response.verifyToken, (req, res) => {

    jwt.verify(req.token, secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err);
        } else {
            let result = { tokenData };
            const filterByUsername = req.query.username || null;
            controller.getUser(filterByUsername)
                .then((userList) => {
                    result.userList = userList;
                    response.success(req, res, result, 200);
                })
                .catch(e => {
                    result.error = e;
                    response.error(req, res, 'Unexpected error', 500, result);
                });
        }
    })

});

/** Petición patch para actualizar la información del usuario especificado en el Id */
router.patch('/:id', response.verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err);
        } else {
            let result = { tokenData };
            const userId = req.params.id || null;
            const { name, username, password } = req.body;
            const dataToPatch = {
                name,
                username,
                password
            };

            controller.updateUser(userId, dataToPatch)
                .then((data) => {
                    result.updatedData = data;
                    response.success(req, res, result, 200);
                })
                .catch(e => {
                    result.error = e;
                    response.error(req, res, 'Internal Error', 500, result);
                })
        }
    })
})

/** Petición delete para eliminar un usuario de la base de datos especificando su id */
router.delete('/:id', response.verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err)
        } else {
            let result = { tokenData };
            controller.deleteUser(req.params.id)
                .then((data) => {
                    result.message = `User ${req.params.id} removed.`;
                    result.deletedCount = data.deletedCount;
                    response.success(req, res, result, 200);
                })
                .catch(e => {
                    result.error = e;
                    response.error(req, res, 'Internal error', 500, result);
                });

        }
    });
});


module.exports = router;
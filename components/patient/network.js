/**
 * Módulo network del componente patient, controla las peticiones que recibe el componente
 * @module /components/patient/network
 */

/** Carga el router de express para establecer las rutas y verbos de las peticiones */
const router = require('express').Router();

/** carga el módulo response para enviar las respuestas a las peticiones */
const response = require('../../network/response');

/** Carga el módulo controller del componente */
const controller = require('./controller');

/** carga el módulo jsonwebtoken para efectuar autorización basada en token */
const jwt = require('jsonwebtoken');

/** carga los valores comunes del archivo config */
const config = require('../../config');

/** Carga el modulo Multer, para manejar la carga de archivos */
const multer = require('multer');

// Inicializamos el middleware para manejar la carga de archivos
const upload = multer({
    dest: 'public' + config.filesRoute + '/'
});

/** Petición post para añadir un doc de paciente a la colección patients de la base de datos */
router.post('/', response.verifyToken, upload.single('file'), (req, res) => {
    jwt.verify(req.token, config.secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err)
        } else {
            let result = { tokenData };

            const body = req.body;

            //let patientFile = null;
            //if (req.file) {
            //    patientfile = `${config.host}:${config.port}${config.publicRoute}${config.filesRoute}/${req.file.filename}`;
            //}

            let patientFile = req.file ? `${config.host}:${config.port}${config.publicRoute}${config.filesRoute}/${req.file.filename}` : null;

            const patientData = {
                name: body.name,
                identification: body.identification,
                age: body.age || null,
                gender: body.gender || null,
                dx: body.dx || null,
                prop_srg: body.proposed_surgery || null,
                preop_date: Date.parse(body.preop_date) || null,
                asa: body.asa || null,
                srg_date: Date.parse(body.surgery_date) || null,
                status: body.status || null,
                phone: body.phone || null,
                email: body.email || null,
                patient_file: patientFile,
                regdate: new Date(),
                user: body.user || tokenData.user._id
            }

            controller.addPatient(patientData)
                .then((newPatient) => {
                    result.newPatient = newPatient;
                    response.success(req, res, result, 201);
                })
                .catch(e => {
                    result.error = e
                    response.error(req, res, 'Invalid or missing data', 500, result);
                })
        }
    })

})

/** Petición get para obtener o un paciente específico por su identificacion o un listado de pacientes */
router.get('/', response.verifyToken, (req, res) => {
    jwt.verify(req.token, config.secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err)
        } else {
            let result = { tokenData };
            const patientFilter = req.query.identification || null;
            controller.getPatient(patientFilter)
                .then((patientList) => {
                    result.patientList = patientList;
                    response.success(req, res, result, 200);
                })
                .catch(e => {
                    result.error = e
                    response.error(req, res, 'Unexpected error', 500, result);
                });
        }
    })
})

/** Petición patch para actualizar la información del paciente especificado en el Id */
router.patch('/:id', response.verifyToken, (req, res) => {
    jwt.verify(req.token, config.secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err);
        } else {
            let result = { tokenData };
            const patientId = req.params.id || null;
            const body = req.body;
            const dataToPatch = {
                name: body.name || null,
                identification: body.identification || null,
                age: body.age || null,
                gender: body.gender || null,
                dx: body.dx || null,
                prop_srg: body.proposed_surgery || null,
                preop_date: body.preop_date || null,
                asa: body.asa || null,
                srg_date: body.surgery_date || null,
                status: body.status || null,
                phone: body.phone || null,
                email: body.email || null
            }

            controller.updatePatient(patientId, dataToPatch)
                .then((data) => {
                    result.updatedPatient = data;
                    response.success(req, res, result, 200)
                })
                .catch(e => {
                    result.error = e;
                    response.error(req, res, 'Internal Error', 500, result)
                })
        }
    })
})

/** Petición delete para eliminar un paciente de la base de datos especificando su id */
router.delete('/:id', response.verifyToken, (req, res) => {
    jwt.verify(req.token, config.secretKey, (err, tokenData) => {
        if (err) {
            response.error(req, res, 'Forbidden access', 403, err);
        } else {
            let result = { tokenData };
            controller.deletePatient(req.params.id)
                .then((data) => {
                    result.message = `Patient ${req.params.id} removed.`;
                    result.deletedCount = data.deletedCount;
                    response.success(req, res, result, 200);
                })
                .catch(e => {
                    result.error = e
                    response.error(req, res, 'Internal error', 500, result);
                });
        }
    })

})

module.exports = router;
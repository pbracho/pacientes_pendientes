const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', (req, res) => {
    const body = req.body;
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
        regdate: new Date()
    }
    controller.addPatient(patientData)
        .then((newPatient) => {
            response.success(req, res, newPatient, 201);
        })
        .catch(e => {
            response.error(req, res, 'Datos no válidos o faltantes', 500, e);
        })
})

router.get('/', (req, res) => {
    const patientFilter = req.query.identification || null;
    controller.getPatient(patientFilter)
        .then((patientList) => {
            response.success(req, res, patientList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected error', 500, e);
        });
})

router.patch('/:id', (req, res) => {
    const patientId = req.params.id || null;
    const body = req.body;
    const dataToPatch = {
        name: body.name,
        identification: body.identification,
        age: body.age,
        gender: body.gender,
        dx: body.dx,
        prop_srg: body.proposed_surgery,
        preop_date: body.preop_date,
        asa: body.asa,
        srg_date: body.surgery_date,
        status: body.status,
        phone: body.phone,
        email: body.email
    }
    controller.updatePatient(patientId, dataToPatch)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    controller.deletePatient(req.params.id)
        .then(() => {
            response.success(req, res, `Patient ${req.params.id} removed.`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Internal error', e);
        });
})

module.exports = router;
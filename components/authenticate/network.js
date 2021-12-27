const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', (req, res) => {
    const { username, password } = req.body;

    controller.auth(username, password)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Authenticate error', 500, e);
        });
})

module.exports = router;
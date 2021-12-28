const router = require('express').Router();
const response = require('../../network/response');
const controller = require('./controller');

router.post('/', (req, res) => {
    if (req.token) {
        response.success(req, res, 'User already authenticated', 200);
    } else {
        const { username, password } = req.body;

        controller.auth(username, password)
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(e => {
                response.error(req, res, 'Authenticating error', 500, e);
            });

    }
})

module.exports = router;
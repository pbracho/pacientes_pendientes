const store = require('./store');
const jwt = require('jsonwebtoken');
const secretKey = require('../../config').secretKey;


function authUser(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            reject('[userController] Incorrect user or password');
            return false;
        }

        store.authUser(username, password)
            .then(user => {
                jwt.sign({ user }, secretKey, (err, token) => {
                    const result = {
                        err,
                        user,
                        token
                    }
                    resolve(result)
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports.auth = authUser
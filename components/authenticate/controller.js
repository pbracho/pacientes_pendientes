const store = require('./store');
const jwt = require('jsonwebtoken');

function authUser(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            reject('[userController] Usuario o password incorrectos');
            return false;
        }

        store.authUser(username, password)
            .then(user => {
                jwt.sign({user}, 'secretkey', (err, token) =>{
                    const result = {
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
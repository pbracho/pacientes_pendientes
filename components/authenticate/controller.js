const store = require('./store');

function authUser(username, password) {
    return new Promise((resolve, reject) => {
        if (!username || !password) {
            reject('[userController] Usuario o password incorrectos');
            return false;
        }

        store.authUser(username, password)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    auth: authUser,
}
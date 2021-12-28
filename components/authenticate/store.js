const Model = require('../user/model');

function authUser(username, password) {
    return new Promise((resolve, reject) =>{
        Model.findOne({ username: username }, '_id name username password', (err, user) => {
            if (err) {
                reject('User authentication error')
            } else if (!user) {
                reject('User do not exist')
            } else {
                user.isCorrectPassword(password, (err, result) => {
                    if (err) {
                        reject('User authentication error')
                    } else if (result) {
                        user.password = '';
                        resolve(user);
                    } else {
                        reject('Incorrect user or password')
                    }
                })
            }
        });
    })
}


module.exports.authUser = authUser
const Model = require('../user/model');

function authUser(username, password) {
    let fitlter = { username: username };
    Model.findOne(filter, (err, user) => {
        if (err) {
            return err('Authenticate Error');
        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    return err('Authenticate Error')
                } else if (result) {
                    return user
                } else {
                    return err('Authenticate Error')
                }
            })
        }
    });
}

module.exports = authUser;
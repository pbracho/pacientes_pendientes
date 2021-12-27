const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const MySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    regdate: Date
});

MySchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {

        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

MySchema.methods.isCorrectPassword = function (password, next) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            next(err);
        } else {
            next(err, same);
        }

    });
};

const model = mongoose.model('User', MySchema);

module.exports = model;
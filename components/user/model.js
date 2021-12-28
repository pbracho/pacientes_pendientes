/**
 * Módulo model del componente user
 * @module /components/user/model
 */

/** Carga el módulo mongoose para operaciones con la base de datos */
const mongoose = require('mongoose');

/** Carga el módulo BCrypt para encriptación de las contraseñas */
const bcrypt = require('bcrypt');

/** Especifica las "rondas de sal" a ser utilizadas por BCrypt al encriptar */
const saltRounds = 10;

/** Carga el objeto Schema de mongoose en una constante */
const Schema = mongoose.Schema;

/** Especifica el Schema a ser utilizado para user en la base de datos */
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

/** Utilizamos la funcionalidad pre de mongoose.Schema para que en caso de que el usuario sea nuevo, 
 * o se haya modificado la password, la misma sea encriptada por BCrypt
 */
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

/** Agrega el método isCorrectPassword a mongoose.Schema para comparar utilizando BCrypt
 * una contraseña dada, con la almacenada encriptada en la base de datos
 */
MySchema.methods.isCorrectPassword = function (password, next) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) {
            next(err);
        } else {
            next(err, same);
        }

    });
};

/** Establece el modelo de mongoose con el Schema definido */
const model = mongoose.model('User', MySchema);

module.exports = model;
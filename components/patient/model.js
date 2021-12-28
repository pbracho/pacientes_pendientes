/**
 * Módulo model del componente patient
 * @module /components/patient/model
 */

/** Carga el módulo mongoose para operaciones con la base de datos */
const mongoose = require('mongoose');

/** Carga el objeto Schema de mongoose en una constante */
const Schema = mongoose.Schema;

/** Especifica el Schema a ser utilizado para patient en la base de datos */
const MySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true,
        unique: true
    },
    age: Number,
    gender: String,
    dx: String,
    prop_srg: String,
    preop_date: Date,
    asa: String,
    srg_date: Date,
    status: String,
    phone: String,
    email: String,
    regdate: Date,
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});


/** Establece el modelo de mongoose con el Schema definido */
const model = mongoose.model('Patient', MySchema);

module.exports = model;
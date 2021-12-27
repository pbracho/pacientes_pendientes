const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    regdate: Date
});

const model = mongoose.model('Patient', MySchema);

module.exports = model;
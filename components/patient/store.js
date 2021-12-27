const Model = require('./model');

function addPatient(patient) {
    const myPatient = new Model(patient);

    //const newUser = myUser.save();

    return myPatient.save();
}

function getPatient(patientFilter) {
    let filter = {};
    if (patientFilter !== null) {
        filter = {
            identification: patientFilter
        }
    }

    return Model.find(filter);
}

async function updatePatient(id, dataToPatch) {
    // Primero ubico al paciente a actualizar
    const patientToPatch = await Model.findOne({ _id: id });

    // Verifico si hay cambios en cada uno de los datos y si los hay, los anexo para actualizar
    patientToPatch.name = (patientToPatch.name === dataToPatch.name) ? patientToPatch.name : dataToPatch.name;
    patientToPatch.identification = (patientToPatch.identification === dataToPatch.identification) ? patientToPatch.identification : dataToPatch.identification;
    patientToPatch.age = (patientToPatch.age === dataToPatch.age) ? patientToPatch.age : dataToPatch.age;
    patientToPatch.gender = (patientToPatch.gender === dataToPatch.gender) ? patientToPatch.gender : dataToPatch.gender;
    patientToPatch.dx = (patientToPatch.dx === dataToPatch.dx) ? patientToPatch.dx : dataToPatch.dx;
    patientToPatch.prop_srg = (patientToPatch.prop_srg === dataToPatch.prop_srg) ? patientToPatch.prop_srg : dataToPatch.prop_srg;
    patientToPatch.preop_date = (patientToPatch.preop_date === dataToPatch.preop_date) ? patientToPatch.preop_date : dataToPatch.preop_date;
    patientToPatch.asa = (patientToPatch.asa === dataToPatch.asa) ? patientToPatch.asa : dataToPatch.asa;
    patientToPatch.srg_date = (patientToPatch.srg_date === dataToPatch.srg_date) ? patientToPatch.srg_date : dataToPatch.srg_date;
    patientToPatch.status = (patientToPatch.status === dataToPatch.status) ? patientToPatch.status : dataToPatch.status;
    patientToPatch.phone = (patientToPatch.phone === dataToPatch.phone) ? patientToPatch.phone : dataToPatch.phone;
    patientToPatch.email = (patientToPatch.email === dataToPatch.email) ? patientToPatch.email : dataToPatch.email;

    // Guardo la información y la cargo en newUser
    const updatedPatient = await patientToPatch.save();

    return updatedPatient;
}

function removePatient(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addPatient,
    get: getPatient,
    update: updatePatient,
    remove: removePatient
}
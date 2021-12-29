/**
 * Módulo store del componente patient
 * @module /componets/patient/store
 */

/** Carga el módulo model del componente */
const Model = require('./model');

/**
 * Agrega un nuevo documento de paciente a la colección patients
 * @param {json} patient - Objeto json con la información del paciente, formateada segun el modelo. 
 * @returns json conteniento los datos del paciente anexado
 */
function addPatient(patient) {
    const myPatient = new Model(patient);

    return myPatient.save();
}

/**
 * Devuelve un paciente o todos los pacientes de la colección
 * @param {string} patientFilter - Identificación del paciente a buscar en la base de datos (opcional)
 * @returns json con el paciente o todos los pacientyes de la colección
 */
function getPatient(patientFilter) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (patientFilter !== null) {
            filter = {
                identification: patientFilter
            }
        }

        return Model.find(filter)
            .populate('user')
            .exec((err, populated) => {
                if (err) {
                    reject(err);
                    return false;
                }
                resolve(populated);
            })
    })
}

/**
 * Actualiza la información guardada del paciente con el id suministrado
 * @param {string} id - Id del paciente
 * @param {json} dataToPatch - Objeto json con los datos del usuario a ser actualizados
 * @returns Objeto json del paciente con los dtos actualizados
 */
async function updatePatient(id, dataToPatch) {
    // Primero ubico al paciente a actualizar
    const patientToPatch = await Model.findOne({ _id: id });

    // Verifico si hay cambios en cada uno de los datos y si los hay, los anexo para actualizar
    patientToPatch.name = (patientToPatch.name === dataToPatch.name || dataToPatch.name === null) ? patientToPatch.name : dataToPatch.name;
    patientToPatch.identification = (patientToPatch.identification === dataToPatch.identification || dataToPatch.identification === null) ? patientToPatch.identification : dataToPatch.identification;
    patientToPatch.age = (patientToPatch.age === dataToPatch.age || dataToPatch.age === null) ? patientToPatch.age : dataToPatch.age;
    patientToPatch.gender = (patientToPatch.gender === dataToPatch.gender || dataToPatch.gender === null) ? patientToPatch.gender : dataToPatch.gender;
    patientToPatch.dx = (patientToPatch.dx === dataToPatch.dx || dataToPatch.dx === null) ? patientToPatch.dx : dataToPatch.dx;
    patientToPatch.prop_srg = (patientToPatch.prop_srg === dataToPatch.prop_srg || dataToPatch.prop_srg === null) ? patientToPatch.prop_srg : dataToPatch.prop_srg;
    patientToPatch.preop_date = (patientToPatch.preop_date === dataToPatch.preop_date || dataToPatch.preop_date === null) ? patientToPatch.preop_date : dataToPatch.preop_date;
    patientToPatch.asa = (patientToPatch.asa === dataToPatch.asa || dataToPatch.asa === null) ? patientToPatch.asa : dataToPatch.asa;
    patientToPatch.srg_date = (patientToPatch.srg_date === dataToPatch.srg_date || dataToPatch.srg_date === null) ? patientToPatch.srg_date : dataToPatch.srg_date;
    patientToPatch.status = (patientToPatch.status === dataToPatch.status || dataToPatch.status === null) ? patientToPatch.status : dataToPatch.status;
    patientToPatch.phone = (patientToPatch.phone === dataToPatch.phone || dataToPatch.phone === null) ? patientToPatch.phone : dataToPatch.phone;
    patientToPatch.email = (patientToPatch.email === dataToPatch.email || dataToPatch.email === null) ? patientToPatch.email : dataToPatch.email;
    patientToPatch.patient_file = (patientToPatch.patient_file === dataToPatch.patient_file || dataToPatch.patient_file === null) ? patientToPatch.patient_file : dataToPatch.patient_file;

    // Guardo la información y la cargo en newUser
    const updatedPatient = await patientToPatch.save();

    return updatedPatient;
}

/**
 * Elimina de la colección al paciente con el id suministrado
 * @param {string} id - Id del paciente a eliminar
 * @returns Cantidad de registros eliminados (deletedCount)
 */
function removePatient(id) {
    return Model.deleteOne({ _id: id });
}

module.exports = {
    add: addPatient,
    get: getPatient,
    update: updatePatient,
    remove: removePatient
}
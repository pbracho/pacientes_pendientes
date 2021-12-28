/**
 * Módulo controller del componente patient
 * @module /components/patient/controller
 */

/** Carga el modulo store del componente */
const store = require('./store');

/**
 * Añade un nuevo paciente a la base de datos
 * @param {json} patientData - Objeto json conteniendo la información del paciente a anexar a la base de datos
 * @returns json con la información del paciente anexado
 */
function addPatient(patientData) {
    return new Promise((resolve, reject) => {
        if (!patientData) {
            reject('[patientController] Datos incorrectos o inexistentes');
            return false;
        }

        let newPatient = store.add(patientData);

        resolve(newPatient);
    })
}

/**
 * Obtiene un paciente o listado de pacientes segun se pase o no una identificación para filtrar
 * @param {string} patientFilter - Identificación del paciente
 * @returns json conteniendo un paciente o el listado de pacientes
 */
function getPatient(patientFilter) {
    return new Promise((resolve, reject) => {
        resolve(store.get(patientFilter));
    })
}


/**
 * Actualiza u paciente segun el Id suministrado
 * @param {string} id - Id del paciente
 * @param {json} dataToPatch - Objeto json conteniendo la información del paciente a actualizar
 * @returns json conteniendo al paciente con los datos actualizados
 */
function updatePatient(id, dataToPatch) {
    return new Promise(async (resolve, reject) => {
        if (!id || !dataToPatch) {
            reject('[patientController] Invalid or Incomplete data');
            return false;
        }
        const result = await store.update(id, dataToPatch);
        resolve(result);
    })
}

/**
 * Elimina un paciente segun el Id suministrado
 * @param {string} id -Id del paciente
 * @returns Número de registros eliminados (deletedCount)
 */
function deletePatient(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('[patientController] Invalid Id');
            return false;
        }
        const result = store.remove(id);

        resolve(result);
    })
}
module.exports = {
    addPatient,
    getPatient,
    updatePatient,
    deletePatient
}
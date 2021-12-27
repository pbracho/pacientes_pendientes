const store = require('./store');

function addPatient(patientData) {
    return new Promise((resolve, reject) => {
        if (!patientData) {
            reject('[patientController] Datos incorrectos o inexistentes');
            return false;
        }

        store.add(patientData);

        resolve(patientData);
    })
}

function getPatient(patientFilter) {
    return new Promise((resolve, reject) => {
        resolve(store.get(patientFilter));
    })
}

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
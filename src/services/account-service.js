import {
    createOkMessage,
    createErrorWrapperMessage,
    createNotFoundOrElse
} from './response-generator';

export default class {
    constructor(patientModel, physicianModel) {
        this._patientModel = patientModel;
        this._physicianModel = physicianModel;
    }

    registerPatient(patient) {
        return this._patientModel
            .create(patient)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getPatientById(patientId) {
        return this._patientModel
            .findById(patientId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }

    registerPhysician(physician) {
        return this._physicianModel
            .create(physician)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getPhysicianProfileById(physicianId) {
        return this._physicianModel
            .findProfileById(physicianId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }
}

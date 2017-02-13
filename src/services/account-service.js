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

    getPhysicianById(physicianId) {
        return this._physicianModel
            .findById(physicianId)
            .populate({ path: 'patients', select: '_id firstName lastName' })
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }
}

import {
    createOkMessage,
    createErrorWrapperMessage,
    createNotFoundOrElse
} from './response-generator';

export default class {
    constructor(patientModel, physicianModel, accountModel) {
        this._patientModel = patientModel;
        this._physicianModel = physicianModel;
        this._accountModel = accountModel;
    }

    isPhysician(account) {
        return this._accountModel.isPhysician(account);
    }

    getAccountByEmail(email) {
        return this._accountModel.findOne({ email: email });
    }

    registerPatient(patient, physicianId) {
        patient.physician = physicianId;
        return this._patientModel
            .register(patient)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getPatientById(patientId) {
        return this._patientModel
            .findById(patientId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }

    registerPhysician(physician) {
        return this._physicianModel
            .register(physician)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getPhysicianProfileById(physicianId) {
        return this._physicianModel
            .findProfileById(physicianId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }
}

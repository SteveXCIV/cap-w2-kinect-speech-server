import {
    createOkMessage,
    createErrorWrapperMessage,
    createNotFoundOrElse
} from './response-generator';
import passGen from 'generate-password';
import utils from '../utils/utils';

export default class {
    constructor(patientModel, physicianModel, accountModel) {
        this._patientModel = patientModel;
        this._physicianModel = physicianModel;
        this._accountModel = accountModel;
    }

    _generalize(account) {
        if (!account) return account;
        return utils.stripClone(account, ['password', 'kind']);
    }

    isPhysician(account) {
        return this._accountModel.isPhysician(account);
    }

    isPatient(account) {
        return this._accountModel.isPatient(account);
    }

    getAccountByEmail(email) {
        return this._accountModel.findOne({ email: email });
    }

    registerPatient(patient, physicianId) {
        patient.physician = physicianId;
        patient.temp = true;
        let tempPass = passGen.generate();
        patient.password = tempPass;

        return this._patientModel
            .register(patient)
            .then(p => {
                return this._physicianModel.linkPatient(physicianId, p);
            })
            .then(p => {
                let np = utils.stripClone(p._doc, ['password', 'sessions', 'temp']);
                np['tempPass'] = tempPass;
                return np;
            })
            .then(createOkMessage, createErrorWrapperMessage);
    }

    linkSessionToPatient(patientId, sessionId) {
        return this._patientModel.linkSession(patientId, sessionId);
    }

    getPatientById(patientId) {
        return this._patientModel
            .findById(patientId)
            .then(this._generalize)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }

    registerPhysician(physician) {
        if (!physician.verifyPassword ||
            physician.verifyPassword !== physician.password) {
            let fail = createErrorWrapperMessage(
                'Confirmation password must match password.');
            return Promise.resolve(fail);
        }

        return this._physicianModel
            .register(physician)
            .then(this._generalize)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getPhysicianProfileById(physicianId) {
        return this._physicianModel
            .findProfileById(physicianId)
            .then(this._generalize)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }
}

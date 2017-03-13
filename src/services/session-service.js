import {
    createOkMessage,
    createErrorWrapperMessage,
    createNotFoundOrElse
} from './response-generator';
import utils from '../utils/utils';

export default class {
    constructor(sessionModel) {
        this._sessionModel = sessionModel;
    }

    createSession(session) {
        return this._sessionModel
            .create(session)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getAllSessions() {
        return this._sessionModel
            .find()
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getSessionsByPatientId(patientId) {
        return this._sessionModel.find({ Patient: patientId })
                .then(createOkMessage, createErrorWrapperMessage);
    }

    getSessionById(sessionId) {
        return this._sessionModel
            .findById(sessionId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }
}

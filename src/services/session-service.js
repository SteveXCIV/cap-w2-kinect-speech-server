import {
    createOkMessage,
    createErrorWrapperMessage,
    createNotFoundOrElse
} from './response-generator';

export default class {
    constructor(sessionModel, reservationModel) {
        this._sessionModel = sessionModel;
        this._reservationModel = reservationModel;
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

    getSessionById(sessionId) {
        return this._sessionModel
            .findById(sessionId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }

    createReservation(patientId) {
        return this._reservationModel.reserve(patientId)
            .then(createOkMessage, createErrorWrapperMessage);
    }
}

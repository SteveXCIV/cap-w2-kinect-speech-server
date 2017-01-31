import {
    createOkMessage,
    createErrorWrapperMessage,
    createNotFoundOrElse
} from './response-generator';

export default class {
    constructor(model) {
        this._model = model;
    }

    createSession(session) {
        return this._model
            .create(session)
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getAllSessions() {
        return this._model
            .find()
            .then(createOkMessage, createErrorWrapperMessage);
    }

    getSessionById(sessionId) {
        return this._model
            .findById(sessionId)
            .then(createNotFoundOrElse, createErrorWrapperMessage);
    }
}

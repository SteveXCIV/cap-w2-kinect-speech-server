export default class {
    constructor(model) {
        this._model = model;
    }

    createSession(session) {
        return this._model.create(session);
    }

    getAllSessions() {
        return this._model.find();
    }

    getSessionById(sessionId) {
        return this._model.findById(sessionId);
    }
}

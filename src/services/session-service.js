import data from '../data';

export default class {
    constructor(model) {
        this.model = data;
        this._idCounter = this._getNextId();
    }

    createSession(session) {
        let id = this._idCounter++;
        session['id'] = id;
        this.model.push(session);
        return session;
    }

    getAllSessions() {
        return this.model;
    }

    getSessionById(sessionId) {
        return this.model.find(s => s.id === sessionId);
    }

    _getNextId() {
        return this.model.reduce((acc, x) => x.id >= acc ? 1 + x.id : acc, 0);
    }
}

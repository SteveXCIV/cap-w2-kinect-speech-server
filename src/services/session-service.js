const wrap = (val) => {
    return { code: 200, data: val };
};

const wrapAndRejectIfNone = (val) => {
    return !!(val) ? wrap(val) : { code: 404, data: { message: "Not found." } };
};

const wrapErr = (err) => {
    console.log(err);
    return { code: 500, data: { message: "Internal server error." } };
};

export default class {
    constructor(model) {
        this._model = model;
    }

    createSession(session) {
        return this._model
            .create(session)
            .then(wrap, wrapErr);
    }

    getAllSessions() {
        return this._model
            .find()
            .then(wrap, wrapErr);
    }

    getSessionById(sessionId) {
        return this._model
            .findById(sessionId)
            .then(wrapAndRejectIfNone, wrapErr);
    }
}

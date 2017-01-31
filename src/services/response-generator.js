import HttpError from 'standard-http-error';

class HttpErrorMessage extends HttpError {
    constructor(code, message) {
        super(code);
        this.data = { message: message || this.message };
    }
}

function makeHumanReadableValidationError(err) {
    let messages;
    if (!!(err.name) && err.name === 'ValidationError') {
        messages = Object.keys(err.errors).map(key => {
            let theError = err.errors[key];
            if (theError.hasOwnProperty('message')) return theError.message;
            else return theError.name;
        });
    }
    return messages;
}

export function createNotFoundOrElse(val) {
    return !!(val) ? createOkMessage(val) : new HttpErrorMessage(HttpError.NOT_FOUND);
}

export function createOkMessage(val) {
    return { code: HttpError.OK, data: val };
}

export function createErrorWrapperMessage(error) {
    let code = HttpError.INTERNAL_SERVER_ERROR;
    let e;
    if (e = makeHumanReadableValidationError(error)) {
        console.log(e);
        return new HttpErrorMessage(code, e);
    }
    return new HttpErrorMessage(code);
}

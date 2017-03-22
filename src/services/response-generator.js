import HttpError from 'standard-http-error';

class HttpErrorMessage extends HttpError {
    constructor(code, message) {
        super(code);
        let msg = message || this.message;
        if (!(msg instanceof Array)) {
            msg = [ msg ];
        }
        this.data = { message: msg };
        // console.log(`Generated error message: HttpError Code ${code}; Message: ${msg}`);
    }
}

function makeHumanReadableValidationError(err) {
    if (!err) return false;
    if (!err.name) return err;
    if (err.name === 'ValidationError') {
        if (err.errors) {
            return Object.keys(err.errors).map(key => {
                let theError = err.errors[key];
                if (theError.hasOwnProperty('message')) return theError.message;
                else if (theError.hasOwnProperty('name')) return theError.name;
                else return key;
            });
        }
        return err.name;
    }
    return false;
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
        return new HttpErrorMessage(code, e);
    }
    return new HttpErrorMessage(code);
}

export function createBadRequestMissingRequiredMessage(property) {
    let p = !!(property) ? `"${property}"` : 'a required field';
    let msg = `Could not process request ${p} was missing.`;
    return new HttpErrorMessage(HttpError.BAD_REQUEST, msg);
}

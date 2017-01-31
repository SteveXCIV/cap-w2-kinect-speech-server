import HttpError from 'standard-http-error';

class HttpErrorMessage extends HttpError {
    constructor(code, message) {
        if (!!(message)) {
            super(code, message);
        } else {
            super(code);
        }
        this.data = { message: this.message };
    }
}

export function createNotFoundOrElse(val) {
    return !!(val) ? createOkMessage(val) : new HttpErrorMessage(HttpError.NOT_FOUND);
}

export function createOkMessage(val) {
    return { code: HttpError.OK, data: val };
}

export function createErrorWrapperMessage(error) {
    return new HttpErrorMessage(HttpError.INTERNAL_SERVER_ERROR);
}

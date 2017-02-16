import * as mocha from 'mocha';
import * as chai from 'chai';
import HttpError from 'standard-http-error';
import {
    createErrorWrapperMessage,
    createNotFoundOrElse,
    createOkMessage,
    createBadRequestMissingRequiredMessage
} from '../src/services/response-generator';

const expect = chai.expect;

describe('response-generator createErrorWrapperMessage tests', function () {
    it('should always return code 500', function() {
        let msg = createErrorWrapperMessage({});
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
        expect(msg.data.message).to.exist;
    });

    it('should handle null/undefined errors', function(){
        let msg = createErrorWrapperMessage();
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
        expect(msg.data.message).to.exist;
    });

    it('should produce a special message for a ValidationError', function() {
        const errName = 'ValidationError';
        let error = { name: errName };
        let msg = createErrorWrapperMessage(error);
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
        expect(msg.data.message).to.exist;
        expect(msg.data.message).to.equal(errName);
    });

    it('should list the messages of internal ValidationError instances', function() {
        let error = { name: 'ValidationError', errors: { '0': { message: 'foobar' }, '1': { name: 'error1'}, '2': {} } };
        let msg = createErrorWrapperMessage(error);
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
        expect(msg.data.message).to.exist;
        expect(msg.data.message).to.be.instanceof(Array);
        expect(msg.data.message).to.contain('foobar');
        expect(msg.data.message).to.contain('error1');
        expect(msg.data.message).to.contain('2');
    });
});

describe('response-generator createNotFoundOrElse tests', function () {
    it('should return code 200 if given a value', function() {
        let msg = createNotFoundOrElse({ foo: 'bar' });
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.OK);
        expect(msg.data).to.exist;
        expect(msg.data.foo).to.exist;
        expect(msg.data.foo).to.equal('bar');
    });

    it('should return code 404 if not given a value', function() {
        let msg = createNotFoundOrElse();
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.NOT_FOUND);
        expect(msg.data.message).to.exist;
    });
});

describe('response-generator createOkMessage tests', function() {
    it('should always return code 200', function() {
        let msg1 = createOkMessage({ foo: 'bar' });
        expect(msg1.code).to.exist;
        expect(msg1.code).to.equal(HttpError.OK);
        expect(msg1.data).to.exist;
        expect(msg1.data.foo).to.exist;
        expect(msg1.data.foo).to.equal('bar');

        let msg2 = createOkMessage({});
        expect(msg2.code).to.exist;
        expect(msg2.code).to.equal(HttpError.OK);
        expect(msg2.data).to.exist;
        expect(msg2.data).to.be.empty;
    });
});

describe('response-generator createBadRequestMissingRequiredMessage tests', function() {
    it('should always return with code 400', function() {
        let msg1 = createBadRequestMissingRequiredMessage();
        expect(msg1.code).to.exist;
        expect(msg1.code).to.equal(HttpError.BAD_REQUEST);
        expect(msg1.data).to.exist;
        expect(msg1.data.message).to.exist;

        let msg2 = createBadRequestMissingRequiredMessage("foobar");
        expect(msg2.code).to.exist;
        expect(msg2.code).to.equal(HttpError.BAD_REQUEST);
        expect(msg2.data).to.exist;
        expect(msg2.data.message).to.exist;
    });

    it('should produce a message containing the property name if supplied', function() {
        let msg = createBadRequestMissingRequiredMessage("foobar");
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.BAD_REQUEST);
        expect(msg.data).to.exist;
        expect(msg.data.message).to.exist;
        expect(msg.data.message).to.contain("foobar");
    });

    it('should create a generic error message with no supplied property', function() {
        let msg = createBadRequestMissingRequiredMessage();
        expect(msg.code).to.exist;
        expect(msg.code).to.equal(HttpError.BAD_REQUEST);
        expect(msg.data).to.exist;
        expect(msg.data.message).to.exist;
    });
});

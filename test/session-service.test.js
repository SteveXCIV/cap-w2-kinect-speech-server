import * as mocha from 'mocha';
import * as chai from 'chai';
import HttpError from 'standard-http-error';
import SessionService from '../src/services/session-service';

const expect = chai.expect;

const mockModel = {
    create: val => Promise.resolve(val),
    find: () => Promise.resolve([{}, {}]),
    findById: id => Promise.resolve({ foo: "bar" })
};

const mockModelBad = {
    create: val => Promise.reject("mocked error"),
    find: () => Promise.reject("mocked error"),
    findById: id => Promise.reject("mocked error")
}

describe('session-service tests', function() {
    it('should return the session it creates', function() {
        let service = new SessionService(mockModel);
        return service
            .createSession({ foo: "bar" })
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data.foo).to.exist;
                expect(val.data.foo).to.equal("bar");
            });
    });

    it('should always return an array for getAllSessions', function() {
        let service = new SessionService(mockModel);
        return service.getAllSessions()
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data).to.be.instanceof(Array);
                expect(val.data).to.have.lengthOf(2);
            });
    });

    it('should return a matching session by id', function() {
        let service = new SessionService(mockModel);
        return service.getSessionById(123)
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data.foo).to.exist;
                expect(val.data.foo).to.equal("bar");
            });
    });

    it('should return code 500 for failed createSession', function() {
        let service = new SessionService(mockModelBad);
        return service.createSession({ foo: "bar" })
            .then(val => {
                expect(val.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
            });
    });

    it('should return code 500 for failed getAllSessions', function() {
        let service = new SessionService(mockModelBad);
        return service.getAllSessions()
            .then(val => {
                expect(val.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
            });
    });

    it('should return code 500 for failed getSessionById', function() {
        let service = new SessionService(mockModelBad);
        return service.getSessionById(123)
            .then(val => {
                expect(val.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
            });
    });

    it('should return code 404 for not found getSessionById', function() {
        let service = new SessionService({ findById: id => Promise.resolve() });
        return service.getSessionById(123)
            .then(val => {
                expect(val.code).to.equal(HttpError.NOT_FOUND);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
            });
    });
});

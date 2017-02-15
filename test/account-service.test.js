import * as mocha from 'mocha';
import * as chai from 'chai';
import HttpError from 'standard-http-error';
import sinon from 'sinon';
import AccountService from '../src/services/account-service';

const expect = chai.expect;

describe('account-service patient tests', function() {
    it('should return code 200 for the patient it registers', function() {
        let physicianId = "9876543210";
        let patient = {
            _id: "1234567890",
            firstName: "foo",
            lastName: "bar",
            physician: physicianId
        };
        let f = sinon.mock()
            .once()
            .withExactArgs(patient)
            .returns(Promise.resolve({ _doc: patient}));
        let g = sinon.mock()
            .once()
            .withExactArgs(physicianId, { _doc: patient })
            .returns(Promise.resolve({ _doc: patient }));
        let service = new AccountService({ register: f }, { linkPatient: g });
        return service.registerPatient(patient, physicianId)
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data._id).to.exist;
                expect(val.data.firstName).to.exist;
                expect(val.data.lastName).to.exist;
                expect(val.data.physician).to.exist;
                expect(val.data.tempPass).to.exist;
                expect(val.data._id).to.equal(patient._id);
                expect(val.data.firstName).to.equal(patient.firstName);
                expect(val.data.lastName).to.equal(patient.lastName);
                expect(val.data.physician).to.equal(patient.physician);
                f.verify();
            });
    });

    it('should return code 500 for a failed patient register', function() {
        let f = sinon.mock()
            .once()
            .returns(Promise.reject());
        let service = new AccountService({ register: f }, {});
        return service.registerPatient({}, "")
            .then(val => {
                expect(val.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
                f.verify();
            });
    });

    it('should return code 200 for a found patient', function() {
        let id = "1234567890";
        let patient = { _id: id, firstName: "foo", lastName: "bar" };
        let f = sinon.mock()
            .once()
            .withExactArgs(id)
            .returns(Promise.resolve(patient));
        let service = new AccountService({ findById: f }, {});
        return service.getPatientById(id)
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data).to.deep.equal(patient);
                f.verify();
            });
    });

    it('should return error code 404 for a not found patient', function() {
        let id = "1234567890";
        let f = sinon.mock()
            .once()
            .withExactArgs(id)
            .returns(Promise.resolve());
        let service = new AccountService({ findById: f }, {});
        return service.getPatientById(id)
            .then(val => {
                expect(val.code).to.equal(HttpError.NOT_FOUND);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
                f.verify();
            });
    });
});

describe('account-service physician tests', function() {
    it('should return code 200 for the physician it registers', function() {
        let physician = { _id: "1234567890", firstName: "foo", lastName: "bar" };
        let f = sinon.mock()
            .once()
            .withExactArgs(physician)
            .returns(Promise.resolve(physician));
        let service = new AccountService({}, { register: f });
        return service.registerPhysician(physician)
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data).to.deep.equal(physician);
                f.verify();
            });
    });

    it('should return code 500 for a failed physician register', function() {
        let f = sinon.mock()
            .once()
            .returns(Promise.reject());
        let service = new AccountService({}, { register: f });
        return service.registerPhysician({})
            .then(val => {
                expect(val.code).to.equal(HttpError.INTERNAL_SERVER_ERROR);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
                f.verify();
            });
    });

    it('should return code 200 for a found physician', function() {
        let id = "1234567890";
        let physician = { _id: id, firstName: "foo", lastName: "bar" };
        let f = sinon.mock()
            .once()
            .withExactArgs(id)
            .returns(Promise.resolve(physician));
        let service = new AccountService({}, { findProfileById: f });
        return service.getPhysicianProfileById(id)
            .then(val => {
                expect(val.code).to.equal(HttpError.OK);
                expect(val.data).to.exist;
                expect(val.data).to.deep.equal(physician);
                f.verify();
            });
    });

    it('should return error code 404 for a not found physician', function() {
        let id = "1234567890";
        let f = sinon.mock()
            .once()
            .withExactArgs(id)
            .returns(Promise.resolve());
        let service = new AccountService({}, { findProfileById: f });
        return service.getPhysicianProfileById(id)
            .then(val => {
                expect(val.code).to.equal(HttpError.NOT_FOUND);
                expect(val.data).to.exist;
                expect(val.data.message).to.exist;
                f.verify();
            });
    });
});

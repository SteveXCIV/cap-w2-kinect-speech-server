import * as mocha from 'mocha';
import * as chai from 'chai';
import SessionReservation from '../src/models/session-reservation-model';

const expect = chai.expect;

// Make Mongoose use the ES6 Promise instead of mpromise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

describe('session-reservation-model tests', function() {
    it('should be invalid without a patient', function(done) {
        let s = new SessionReservation();
        s.validate(err => {
            expect(err.errors.patient).to.exist;
            done();
        });
    });

    it('should generate a date automatically', function(done) {
        let s = new SessionReservation({
                patient: '56cb91bdc3464f14678934ca'
            });
        s.validate(err => done(err));
        expect(s.createdAt).to.exist;
    });
});

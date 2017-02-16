import * as mocha from 'mocha';
import * as chai from 'chai';
import SessionWindow from '../src/models/session-window-model';

const expect = chai.expect;

// Make Mongoose use the ES6 Promise instead of mpromise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

describe('session-window-model tests', function() {
    it('should be invalid without a patient', function(done) {
        let s = new SessionWindow();
        s.validate(err => {
            expect(err.errors.patient).to.exist;
            done();
        });
    });

    it('should generate a date automatically', function(done) {
        let s = new SessionWindow({
                patient: '56cb91bdc3464f14678934ca'
            });
        s.validate(err => done(err));
        expect(s.createdAt).to.exist;
    });
});

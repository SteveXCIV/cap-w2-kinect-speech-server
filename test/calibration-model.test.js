import * as mocha from 'mocha';
import * as chai from 'chai';
import { Calibration as Schema } from '../src/models/calibration-model';

const expect = chai.expect;

// Make Mongoose use the ES6 Promise instead of mpromise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const Calibration = mongoose.model('Calibration', Schema);

describe('calibration-model tests', () => {
    it('should be invalid without EndTime', done => {
        let c = new Calibration({
            AudioThreshold: 0,
            MaxReachLeft: 0,
            MaxReachRight: 0,
            PointingZoneTimerSec: 0,
            Radius: 0,
            StartTime: Date.now()
        });

        c.validate(err => {
            expect(err.errors.EndTime).to.exist;
            done();
        });
    });

    it('should be invalid without StartTime', done => {
        let c = new Calibration({
            AudioThreshold: 0,
            MaxReachLeft: 0,
            MaxReachRight: 0,
            PointingZoneTimerSec: 0,
            Radius: 0,
            EndTime: Date.now()
        });

        c.validate(err => {
            expect(err.errors.StartTime).to.exist;
            done();
        })
    });

    it('should replace missing numeric fields with 0', () => {
        let c = new Calibration({
            EndTime: Date.now(),
            StartTime: Date.now()
        });

        expect(c.AudioThreshold).to.exist;
        expect(c.AudioThreshold).to.equal(0);
        expect(c.MaxReachLeft).to.exist;
        expect(c.MaxReachLeft).to.equal(0);
        expect(c.MaxReachRight).to.exist;
        expect(c.MaxReachRight).to.equal(0);
        expect(c.PointingZoneTimerSec).to.exist;
        expect(c.PointingZoneTimerSec).to.equal(0);
        expect(c.Radius).to.exist;
        expect(c.Radius).to.equal(0);
    });
});

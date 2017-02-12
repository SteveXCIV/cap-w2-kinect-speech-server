import * as mocha from 'mocha';
import * as chai from 'chai';
import Session from '../src/models/session-model';

const expect = chai.expect;

// Make Mongoose use the ES6 Promise instead of mpromise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

describe('session-model tests', function() {
    it('should be invalid without Snapshots', function(done) {
        let s = new Session();
        s.validate(err => {
            expect(err.errors.Snapshots).to.exist;
            done();
        });
    });

    it('should be invalid if Snapshots is empty array', function(done) {
        let s = new Session({ Snapshots: [] });
        s.validate(err => {
            expect(err.errors.Snapshots).to.exist;
            done();
        });
    });

    it('should be invalid with malformed Snapshots (no Time)', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Joints: [{ JointType: 'AnkleLeft', X: 0.0, Y: 0.0, Z: 0.0 }],
                }
            ]
        });
        s.validate(err => {
            expect(err.errors['Snapshots.0.Time']).to.exist;
            done();
        })
    });

    it('should be invalid with malformed snapshots (no Joints)', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Time: new Date()
                }
            ]
        });
        s.validate(err => {
            expect(err.errors['Snapshots.0.Joints']).to.exist;
            done();
        });
    });

    it('should be valid if Time is a valid ISO Date string', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Joints: [{ JointType: 'AnkleLeft', X: 0.0, Y: 0.0, Z: 0.0 }],
                    Time: (new Date()).toISOString()
                }
            ]
        });
        s.validate(err => {
            expect(err.errors['Snapshots.0.Time']).not.to.exist;
            done();
        });
    });

    it('should be valid if Time is a valid locale-specific Date string', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Joints: [{ JointType: 'AnkleLeft', X: 0.0, Y: 0.0, Z: 0.0 }],
                    Time: (new Date()).toDateString()
                }
            ]
        })
        s.validate(err => {
            expect(err.errors['Snapshots.0.Time']).not.to.exist;
            done();
        });
    });

    it('should be invalid with malformed Joints (missing positional data)', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Joints: [{ JointType: 'AnkleLeft', Y: 0.0, Z: 0.0 }],
                    Time: new Date()
                }
            ]
        });
        s.validate(err => {
            expect(err.errors['Snapshots.0.Joints.0.X']).to.exist;
            done();
        });
    });

    it('should be invalid with malformed Joints (invalid JointType)', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Joints: [{ JointType: 'NotARealJointNameL0L', X: 0.0, Y: 0.0, Z: 0.0 }],
                    Time: new Date()
                }
            ]
        });
        s.validate(err => {
            expect(err.errors['Snapshots.0.Joints.0.JointType']).to.exist;
            done();
        });
    });

    it('should be accept and correct for missing intensity value', function(done) {
        let s = new Session({
            Snapshots: [
                {
                    Joints: [{ JointType: 'AnkleLeft', X: 0.0, Y: 0.0, Z: 0.0 }],
                    Time: new Date()
                }
            ],
            AudioSnapshots: [
                {
                    Time: new Date()
                }
            ]
        });
        expect(s.AudioSnapshots[0]).to.exist;
        expect(s.AudioSnapshots[0].Intensity).to.exist;
        expect(s.AudioSnapshots[0].Intensity).to.equal(0.0);
        s.validate(err => done(err));
    });

    it('should be invalid with malformed AudioSnapshots (no Time)', function(done) {
        let s = new Session({
            AudioSnapshots: [
                {
                    Intensity: 0.0
                }
            ]
        });
        s.validate(err => {
            expect(err.errors['AudioSnapshots.0.Time']).to.exist;
            done();
        })
    });
});

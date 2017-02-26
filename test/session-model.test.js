import * as mocha from 'mocha';
import * as chai from 'chai';
import Session from '../src/models/session-model';

const expect = chai.expect;

// Make Mongoose use the ES6 Promise instead of mpromise
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

describe('session-model tests', function() {
    
});

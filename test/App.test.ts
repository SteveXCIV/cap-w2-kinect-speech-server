import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {

    it('should return a JSON type message', () => {
        chai.request(App).get('/')
        .then(res => {
            expect(res.type).to.eql('application/json');
        });
    });

    it('should have an explicit "message" property', () => {
        chai.request(App).get('/')
        .then(res => {
            expect(res.body.message).to.exist;
        });
    });

});

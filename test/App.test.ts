import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/sessions', () => {

    it('should return a JSON array', () => {
        return chai.request(App).get('/api/v1/sessions')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(2);
            });
    });

    it('should return session items', () => {
        return chai.request(App).get('/api/v1/sessions')
            .then(res => {
                let [head, ...tail] = res.body;
                expect(head).to.exist;
                expect(head).to.have.all.keys([
                    'id',
                    'user',
                    'doctor',
                    'date',
                    'session_data'
                ]);
            });
    });

});

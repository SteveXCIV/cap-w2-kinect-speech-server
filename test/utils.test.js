import * as mocha from 'mocha';
import * as chai from 'chai';
import HttpError from 'standard-http-error';
import sinon from 'sinon';
import utils from '../src/utils/utils';

const expect = chai.expect;

describe('utils clone tests', function() {
    it('should copy all and only the keys of the object', function() {
        let testObj = { foo: 1, bar: 'bar', baz: { a: 0, b: 1, c: 2 }};
        let clonedObj = utils.clone(testObj);
        expect(clonedObj).to.have.all.keys(Object.keys(testObj));
    });
});

describe('utils strip tests', function() {
    it('should modify the original object to remove the keys', function() {
        let testObj = { foo: 1, bar: 'bar', baz: { a: 0, b: 1, c: 2 }};
        utils.strip(testObj, ['foo', 'bar']);
        expect(testObj).to.contain.all.keys(['baz']);
        expect(testObj).not.to.contain.all.keys(['foo', 'bar']);
    });

    it('should tolerate non-existent keys', function() {
        let testObj = { foo: 1, bar: 'bar', baz: { a: 0, b: 1, c: 2 }};
        utils.strip(testObj, ['foo', 'bar', 'quux']);
        expect(testObj).to.contain.all.keys(['baz']);
        expect(testObj).not.to.contain.all.keys(['foo', 'bar', 'quux']);
    });
});

describe('utils stripClone tests', function() {
    it('should return a clone without the stripped keys', function() {
        let testObj = { foo: 1, bar: 'bar', baz: { a: 0, b: 1, c: 2 }};
        let clonedObj = utils.stripClone(testObj, ['foo', 'bar']);
        expect(clonedObj).to.contain.all.keys(['baz']);
        expect(clonedObj).not.to.contain.all.keys(['foo', 'bar']);
    });
});

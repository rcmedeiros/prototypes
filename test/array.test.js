'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('Array extensions', function () {
    const array = ['first', 'second', 'third', 'second_last', 'last'];
    const singleArray = ['only'];
    const emptyArray = [];

    describe('the first() function', function () {
        it('should return the first element', function () {
            expect(array.first()).to.be.equal('first');
        });
        it('should return null when array is empty', function () {
            expect(emptyArray.first()).to.be.null;
        });
    });

    describe('the last() function', function () {
        it('should return the last element', function () {
            expect(array.last()).to.be.equal('last');
        });
        it('should return null when array is empty', function () {
            expect(emptyArray.last()).to.be.null;
        });
    });

    describe('the beforeLast() function', function () {
        it('should return the element before the last', function () {
            expect(array.secondLast()).to.be.equal('second_last');
        });
        it('should return null when array is empty', function () {
            expect(emptyArray.secondLast()).to.be.null;
        });
        it('should return null when array has a single element', function () {
            expect(singleArray.secondLast()).to.be.null;
        });
    });
});

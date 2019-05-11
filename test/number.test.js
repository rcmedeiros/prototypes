// cSpell:ignore Myyyy
'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('Number extension', function () {
    describe('the pow10 function()', function () {
        it('should raise a number n times to the power of 10', function () {
            expect((1).pow10(5)).to.be.equal(100000);
            expect((1).pow10(-5)).to.be.equal(0.00001);
        });
    });

    describe('the toDate() function', function () {
        it('should link to date prototype correctly', function () {
            expect((9061980).toDate('ddMMyyyy').getTime()).to.be.equal(new Date(1980, 5, 9, 0, 0).getTime());
        });
    });
});

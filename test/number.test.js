// cSpell:ignore Myyyy
'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('toDate()', function () {
    it('should link to date prototype correctly', function () {
        expect((9061980).toDate('ddMMyyyy').getTime()).to.be.equal(new Date(Date.UTC(1980, 5, 9, 0, 0)).getTime());
    });
});

describe('Every Math function should be accessible directly from the number', function () {
    it('abs - absolute value', function () {
        [-1, 0, 1].forEach((n) => {
            expect(n.abs()).to.be.equal(Math.abs(n));
        });
    });
    it('acos - arccosine', function () {
        [8 / 10, 5 / 3].forEach((n) => {
            if (isNaN(n.acos())) {
                expect(Math.acos(n)).to.be.NaN;
            } else {
                expect(n.acos()).to.be.equal(Math.acos(n));
            }
        });
    });
    it('acosh - hyperbolic arc-cosine', function () {
        [0.999999999999, 1, 2, 2.5].forEach((n) => {
            if (isNaN(n.acosh())) {
                expect(Math.acosh(n)).to.be.NaN;
            } else {
                expect(n.acosh()).to.be.equal(Math.acosh(n));
            }
        });
    });
    it('asin - arcsine', function () {
        [6 / 10, 5 / 3].forEach((n) => {
            if (isNaN(n.asin())) {
                expect(Math.asin(n)).to.be.NaN;
            } else {
                expect(n.asin()).to.be.equal(Math.asin(n));
            }
        });
    });
    it('asinh - hyperbolic arcsine', function () {
        [1, 0, -1, 2].forEach((n) => {
            expect(n.asinh()).to.be.equal(Math.asinh(n));
        });
    });
    it('atan - arctangent', function () {
        [8 / 10, 5 / 3].forEach((n) => {
            expect(n.atan()).to.be.equal(Math.atan(n));
        });
    });
    it('atanh - hyperbolic arctangent', function () {
        [-1, 0, 0.5, 1].forEach((n) => {
            expect(n.atanh()).to.be.equal(Math.atanh(n));
        });
    });
    it('cbrt - cube root', function () {
        [-1, 1, Infinity, 64].forEach((n) => {
            expect(n.cbrt()).to.be.equal(Math.cbrt(n));
        });
    });
    it('ceil - next smallest integer', function () {
        [.95, 4, 7.004, -7.6].forEach((n) => {
            expect(n.ceil()).to.be.equal(Math.ceil(n));
        });
    });
    it('clz32 - leading zero in 32-bit binary', function () {
        [1, 4, 1000].forEach((n) => {
            expect(n.clz32()).to.be.equal(Math.clz32(n));
        });
    });
    it('cos - cosine of the angle', function () {
        [1 / 10, 2 / 10, Math.PI / 10].forEach((n) => {
            expect(n.cos()).to.be.equal(Math.cos(n));
        });
    });
    it('cosh - hyperbolic cosine', function () {
        [0, 1, -1, 2].forEach((n) => {
            expect(n.cosh()).to.be.equal(Math.cosh(n));
        });
    });
    it('exp -  Euler\'s number raised to the power of', function () {
        [0, 1, -1, 2].forEach((n) => {
            expect(n.exp()).to.be.equal(Math.exp(n));
        });
    });
    it('expm1 -  the base of the natural logarithms raised to the power of', function () {
        [0, 1, -1, 2].forEach((n) => {
            expect(n.expm1()).to.be.equal(Math.expm1(n));
        });
    });
    it('expm1 -  the base of the natural logarithms raised to the power of', function () {
        [0, 1, -1, 2].forEach((n) => {
            expect(n.expm1()).to.be.equal(Math.expm1(n));
        });
    });
    it('floor - previous greatest integer', function () {
        [5.95, 5.05, 5, -5.05].forEach((n) => {
            expect(n.floor()).to.be.equal(Math.floor(n));
        });
    });
    it('fround - nearest 32-bit single precision float representation', function () {
        [5.5, 5.05, 5, -5.05].forEach((n) => {
            expect(n.fround()).to.be.equal(Math.fround(n));
        });
    });
    it('log10 - base 10 logarithm', function () {
        [100000, 2, 1, 0].forEach((n) => {
            expect(n.log10()).to.be.equal(Math.log10(n));
        });
    });
    it('log1p - natural logarithm (base e) of 1 + the number', function () {
        [1, 0, -1, -2].forEach((n) => {
            if (isNaN(n.log1p())) {
                expect(Math.log1p(n)).to.be.NaN;
            } else {
                expect(n.log1p()).to.be.equal(Math.log1p(n));
            }
        });
    });
    it('log2 - base 2 logarithm', function () {
        [3, 2, 1, 0].forEach((n) => {
            expect(n.log2()).to.be.equal(Math.log2(n));
        });
    });
    it('round - nearest integer', function () {
        [0.9, 5.95, 5.5, 5.05, -5.05, -5.5, -5.95].forEach((n) => {
            expect(n.round()).to.be.equal(Math.round(n));
        });
    });
    it('sign - sign of the number', function () {
        [-3, 0, 3].forEach((n) => {
            expect(n.sign()).to.be.equal(Math.sign(n));
        });
    });
    it('sin - sin', function () {
        [1, 2, Math.PI].forEach((n) => {
            expect(n.sin()).to.be.equal(Math.sin(n));
        });
    });
    it('sinh - hyperbolic sine', function () {
        [0, 1, -1, 2].forEach((n) => {
            expect(n.sinh()).to.be.equal(Math.sinh(n));
        });
    });
    it('sqrt - square root', function () {
        [25, 169, 0].forEach((n) => {
            expect(n.sqrt()).to.be.equal(Math.sqrt(n));
        });
    });
    it('tan - tangent ', function () {
        [0, 45, 90].forEach((n) => {
            n *= Math.PI / 180;
            expect(n.tan()).to.be.equal(Math.tan(n));
        });
    });
    it('tanh - hyperbolic tangent ', function () {
        [-1, 0, Infinity, 1].forEach((n) => {
            expect(n.tanh()).to.be.equal(Math.tanh(n));
        });
    });
    it('trunc - integer part of the number ', function () {
        [13.37, 42.84, 0.123, -0.123].forEach((n) => {
            expect(n.trunc()).to.be.equal(Math.trunc(n));
        });
    });

    it('pow10 - Raises the number to N times its power of 10', function () {
        [3, 2, 1, 0].forEach((n) => {
            expect((3).pow10(n)).to.be.equal(3 * Math.pow(10, n));
        });
    });

    it('non-existent prototype', function () {
        expect(() => (3).pow2(10))
            .to.throw('3.pow2 is not a function'); ;
    });
});


// cSpell:ignore aãàáäâ eèéëê iìíïî oóòôö uúùûü divid emember respons Myyyy brisinger brisingr
'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('String extensions', () => {
    describe('toASCII()', () => {
        it('should return only alphanumeric characters', () => {
            expect('aãàáäâ'.toASCII()).to.be.equal('aaaaaa');
            expect('aãàáäâ'.toUpperCase().toASCII()).to.be.equal('AAAAAA'.toUpperCase());
            expect('eèéëê'.toASCII()).to.be.equal('eeeee');
            expect('eèéëê'.toUpperCase().toASCII()).to.be.equal('EEEEE');
            expect('iìíïî'.toASCII()).to.be.equal('iiiii');
            expect('iìíïî'.toUpperCase().toASCII()).to.be.equal('IIIII');
            expect('oóòôö'.toASCII()).to.be.equal('ooooo');
            expect('oóòôö'.toUpperCase().toASCII()).to.be.equal('OOOOO');
            expect('uúùûü'.toASCII()).to.be.equal('uuuuu');
            expect('uúùûü'.toUpperCase().toASCII()).to.be.equal('UUUUU');
            expect('YyÝýÿÇç'.toASCII()).to.be.equal('YyYyyCc');
        });

        it('special characters should render empty', () => {
            expect('!@#$%^&**()_+=-'.toASCII()).to.be.equal('');
        });
    });
    describe('firstChar()', () => {
        it('should return the first char', () => {
            expect('StormLight'.firstChar()).to.be.equal('S');
        });

        it('empty string should return empty', () => {
            expect(''.firstChar()).to.be.equal('');
        });
    });
    describe('lastChar()', () => {
        it('should return the last char', () => {
            expect('StormLight'.lastChar()).to.be.equal('t');
        });

        it('empty string should return empty', () => {
            expect(''.lastChar()).to.be.equal('');
        });
    });

    describe('leftPad()', () => {
        it('should return same string with padding at left', () => {
            expect('12345'.leftPad(10, '_')).to.be.equal('_____12345');
        });
        it('should assume empty space if pad is not defined', () => {
            expect('12345'.leftPad(10)).to.be.equal('     12345');
        });
        it('should return the string itself if size is too small or undefined ', () => {
            expect('12345'.leftPad(3)).to.be.equal('12345');
            expect('12345'.leftPad()).to.be.equal('12345');
        });
    });

    describe('rightPad()', () => {
        it('should return same string with padding at right', () => {
            expect('12345'.rightPad(10, '_')).to.be.equal('12345_____');
        });
        it('should assume empty space if pad is not defined', () => {
            expect('12345'.rightPad(10)).to.be.equal('12345     ');
        });
        it('should return the string itself if size is too small or undefined ', () => {
            expect('12345'.rightPad(3)).to.be.equal('12345');
            expect('12345'.rightPad()).to.be.equal('12345');
        });
    });

    describe('centerPad()', () => {
        it('should return same string with padding at right and left', () => {
            expect('123'.centerPad(5, '_')).to.be.equal('_123_');
        });
        it('should assume empty space if pad is not defined', () => {
            expect('123'.centerPad(6)).to.be.equal(' 123  ');
        });
        it('should return the string itself if size is too small or undefined ', () => {
            expect('123'.centerPad()).to.be.equal('123');
            expect('123'.centerPad(2)).to.be.equal('123');
        });
    });

    describe('isNumeric()', () => {
        it('should return true for positive integers', () => {
            expect('0'.isNumeric()).to.be.true;
            expect('1'.isNumeric()).to.be.true;
        });
        it('should return true for negative integers', () => {
            expect('-1'.isNumeric()).to.be.true;
        });
        it('should return true for positive decimals', () => {
            expect('0.0'.isNumeric()).to.be.true;
            expect('1.1'.isNumeric()).to.be.true;
        });
        it('should return true for negative decimals', () => {
            expect('-1.1'.isNumeric()).to.be.true;
        });
        it('should return true for scientific notation', () => {
            expect('8e5'.isNumeric()).to.be.true;
            expect('-1e7'.isNumeric()).to.be.true;
        });
        it('should return false for letters and special and control characters', () => {
            expect('A'.isNumeric()).to.be.false;
            expect('b'.isNumeric()).to.be.false;
            expect('_'.isNumeric()).to.be.false;
            expect('\t\t'.isNumeric()).to.be.false;
            expect('\n\r'.isNumeric()).to.be.false;
        });
    });

    describe('capitalize()', () => {
        it('should return the first letter upper case, rest as is', () => {
            expect('life before death'.capitalize()).to.be.equal('Life Before Death');
        });
    });

    describe('contains()', () => {
        it('should return wether or not a substring is present', () => {
            expect('strength before weakness'.contains('after')).to.be.false;
            expect('journey before destination'.contains('destination')).to.be.true;
            expect('journey before destination'.contains('DESTINATION')).to.be.false;
        });
    });

    describe('containsIgnoreCase()s', () => {
        it('should return wether or not a substring is present', () => {
            expect('journey before destination'.containsIgnoreCase('DESTINATION')).to.be.true;
            expect('I will protect those'.containsIgnoreCase('PROTECT')).to.be.true;
            expect('who cannot protect themselves'.containsIgnoreCase('Those')).to.be.false;
        });
    });

    describe('substringUpTo()', () => {
        it('should return everything up to a point', () => {
            expect('I will unite instead of divide.'.substringUpTo('e')).to.be.equal('I will unit');
            expect('I will unite instead of divide.'.substringUpTo('o')).to.be.equal('I will unite instead ');
            expect('Hello world. This is a string.'.substringUpTo()).to.be.equal('Hello world. This is a string.');
        });
    });

    describe('substringUpToLast()s', () => {
        it('should return everything up to a point', () => {
            expect('I will unite instead of divide.'.substringUpToLast('e')).to.be.equal('I will unite instead of divid');
            expect('I will unite instead of divide.'.substringUpToLast()).to.be.equal('I will unite instead of divide.');
        });
    });

    describe('substringFrom()', () => {
        it('should return everything from a point', () => {
            expect('I will remember those who have been forgotten.'.substringFrom(''))
                .to.be.equal('I will remember those who have been forgotten.');
            expect('I will remember those who have been forgotten.'.substringFrom('r'))
                .to.be.equal('emember those who have been forgotten.');
            expect('I will remember those who have been forgotten.'.substringFrom('x'))
                .to.be.equal('');
        });
    });

    describe('substringFromLast()', () => {
        it('should return everything from a point', () => {
            expect('I will remember those who have been forgotten.'.substringFromLast('r')).to.be.equal('gotten.');
            expect('I will remember those who have been forgotten.'.substringFromLast()).to.be.equal('');
        });
    });

    describe('replaceIgnoreCase()', () => {
        it('should replace accordingly', () => {
            expect('I will listen to those who have been ignored.'.replaceIgnoreCase('WHO HAVE', 'WHO\'VE'))
                .to.be.equal('I will listen to those WHO\'VE been ignored.');
        });

        it('should return the same string if pattern is not found', () => {
            expect('I will listen to those who have been ignored.'.replaceIgnoreCase('XYZ', 'X'))
                .to.be.equal('I will listen to those who have been ignored.');
            expect('I will listen to those who have been ignored.'.replaceIgnoreCase('XYZ', 'X'))
                .to.be.equal('I will listen to those who have been ignored.');
        });
    });

    describe('replaceAll()', () => {
        it('should replace accordingly', () => {
            expect('I will protect even those I hate'.replaceAll(' ', '_')).to.be.equal('I_will_protect_even_those_I_hate');
        });
        it('should return the same string if pattern is not found', () => {
            expect('I will protect even those I hate'.replaceAll('XYZ', 'X')).to.be.equal('I will protect even those I hate');
            expect('I will protect even those I hate'.replaceAll('XYZ', 'X')).to.be.equal('I will protect even those I hate');
        });
    });

    describe('replaceAllIgnoreCase()', () => {
        it('should replace accordingly', () => {
            expect('I will take responsibility'.replaceAllIgnoreCase('i', '!')).to.be.equal('! w!ll take respons!b!l!ty');
        });
        it('should return the same string if pattern is not found', () => {
            expect('I will take responsibility'.replaceAllIgnoreCase('XYZ', 'X')).to.be.equal('I will take responsibility');
            expect('I will take responsibility'.replaceAllIgnoreCase('XYZ', 'X')).to.be.equal('I will take responsibility');
        });
    });

    describe('toDate()', () => {
        it('should link to date prototype correctly', () => {
            expect('09061980'.toDate('ddMMyyyy').getTime()).to.be.equal(new Date(Date.UTC(1980, 5, 9, 0, 0)).getTime());
        });
    });

    describe('strip() and stripIgnoreCase() ', () => {
        it('should strip the string of all characters', () => {
            expect('Brisinger'.strip('E'), 'single char').to.be.equal('Brisinger');
            expect('Brisinger'.stripIgnoreCase('E'), 'single char ignore case').to.be.equal('Brisingr');
            expect('1980-06-09T19:00:00.000Z'.strip('-', ':', '.', 't', 'z'), 'multiple chars').to.be.equal('19800609T190000000Z');
            expect('1980-06-09T19:00:00.000Z'.stripIgnoreCase('-', ':', '.', 't', 'z'), 'multiple chars ignore case').to.be.equal('19800609190000000');
        });
    });

    describe('the format() function', function () {
        it('should substitute correctly as expected', function () {
            expect('string {0} number {1} boolean {2} string {3}'.format('string', 2, true, 3.4)).to.be.equal('string string number 2 boolean true string 3.4');
        });
        it('should ignore absent placeholders', function () {
            expect('string {0} boolean {2} string {3}'.format('string', 2, true, 3.4)).to.be.equal('string string boolean true string 3.4');
        });
        it('should ignore extra placeholders', function () {
            expect('string {4} boolean {2} string {3}'.format('string', 2, true, 3.4)).to.be.equal('string {4} boolean true string 3.4');
        });
        it('should not break', function () {
            expect('string {4} boolean {2} string {3}'.format()).to.be.equal('string {4} boolean {2} string {3}');
            expect('string {4} boolean {2} string {3}'.format(undefined)).to.be.equal('string {4} boolean {2} string {3}');
            expect('string {4} boolean {2} string {3}'.format(null)).to.be.equal('string {4} boolean {2} string {3}');
            expect('string boolean string'.format('string', 2, true, 3.4)).to.be.equal('string boolean string');
        });
    });

    describe('the interpolate() function', function () {
        const params = {
            param0: 'string',
            param1: 2,
            param2: true,
            param3: 3.4,
        };
        it('should substitute correctly as expected', function () {
            expect('This {param0} {param1} has a {param2} value of {param3}'
                .interpolate(params)).to.be.equal('This string 2 has a true value of 3.4');
        });
        it('should ignore absent placeholders', function () {
            expect('This {param2} has a {param3} value of {param4}'
                .interpolate(params)).to.be.equal('This true has a 3.4 value of {param4}');
        });
        it('should not break', function () {
            expect('This {param2} has a {param3} value of {param4}'
                .interpolate()).to.be.equal('This {param2} has a {param3} value of {param4}');
            expect('This {param2} has a {param3} value of {param4}'
                .interpolate(null)).to.be.equal('This {param2} has a {param3} value of {param4}');
            expect('This {param2} has a {param3} value of {param4}'
                .interpolate(undefined)).to.be.equal('This {param2} has a {param3} value of {param4}');
            expect('This {param2} has a {param3} value of {param4}'
                .interpolate('rá')).to.be.equal('This {param2} has a {param3} value of {param4}');
        });
    });

    describe('the equalsIgnoreCase() function', function () {
        it('should return true regardless the case', function () {
            expect('Rafael'.equalsIgnoreCase('rafael')).to.be.true;
            expect('RaFaEl'.equalsIgnoreCase('rAfAeL')).to.be.true;
        });
        it('should return false when not equal', function () {
            expect('rafael'.equalsIgnoreCase('medeiros')).to.be.false;
            expect('rafael'.equalsIgnoreCase('cota')).to.be.false;
        });
    });
});

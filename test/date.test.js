// cSpell:ignore Myyyy Hmmss Myyy
'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

const timeZones = ['+0000', '+0100', '+0200', '+0300', '+0400', '+0430', '+0500', '+0530', '+0545', '+0600', '+0630', '+0700',
    '+0800', '+0845', '+0900', '+0930', '+1000', '+1030', '+1100', '+1200', '+1300', '+1345', '+1400', '-0100', '-0200', '-0230',
    '-0300', '-0400', '-0500', '-0600', '-0700', '-0800', '-0900', '-0930', '-1000', '-1100', '-1200']


describe('Date extensions', function () {
    describe('the toFormattedString() function', function () {
        const date = new Date(Date.UTC(1980, 5, 9, 23, 0, 30, 95));
        const morning1 = new Date(date);
        const morning2 = new Date(date);
        morning1.setUTCHours(0);
        morning2.setUTCHours(1);
        // const os = date.getTimezoneOffset();
        // const tz = `GMT ${os <= 0 ? '+' : '-'}${('0' + parseInt(os / 60)).slice(-2)}:${('0' + parseInt(os % 60)).slice(-2)}`;
        // const tz882 = tz.substring(4, 7) + tz.substring(8, 10);
        it('should return the represented date correctly', function () {
            expect(date.toFormattedString('d/M/yy')).to.be.equal('9/6/80');
            expect(date.toFormattedString('ddMMyy')).to.be.equal('090680');
            expect(date.toFormattedString('ddMMyyyy')).to.be.equal('09061980');
            expect(date.toFormattedString()).to.be.equal('1980-06-09T23:00:30+0000');
            expect(morning1.toFormattedString('yyyy-MM-ddTHH:mm:ss z')).to.be.equal('1980-06-09T00:00:30 GMT +00:00');
            expect(morning2.toFormattedString('yyyy-MM-ddTHH:mm:ss z')).to.be.equal('1980-06-09T01:00:30 GMT +00:00');
            expect(date.toFormattedString('yy/M/d H:m:s')).to.be.equal('80/6/9 23:0:30');
            expect(date.toFormattedString('yy/M/d h:m:s a')).to.be.equal('80/6/9 11:0:30 pm');
            expect(morning2.toFormattedString('yy/M/d h:m:s a')).to.be.equal('80/6/9 1:0:30 am');
            expect(date.toFormattedString('yyyyMMdd')).to.be.equal('19800609');
            expect(date.toFormattedString('HHmmss.SSS')).to.be.equal('230030.095');
            expect(date.toFormattedString('hh:mm:ss.S A')).to.be.equal('11:00:30.95 PM');
            expect(morning2.toFormattedString('hh:mm:ss.S A Z')).to.be.equal('01:00:30.95 AM +0000');
        });

        it('should work in all time zones', function () {
            const date = new Date(Date.UTC(1980, 5, 9));
            timeZones.forEach(tz => {
                const hoursOS = parseInt(tz.slice(1, 3));
                const minutesOs = parseInt(tz.slice(3, 5));
                const gmt = `GMT ${tz.slice(0, 3)}:${tz.slice(3, 5)}`

                const d1 = date.toFormattedString(undefined, tz);
                const d2 = date.toFormattedString(undefined, gmt);
                expect(d1).to.be.equal(d2);

                if (tz[0] === '+') {
                    expect(d1.slice(11, 13) + d1.slice(14, 16)).to.be.equal(tz.slice(1));
                } else {
                    //console.log(`${d1.slice(11)} -> ${tz.slice(1)}`);
                    console.log(`${(24 - parseInt(d1.slice(11, 13)) - (d1.slice(14, 15) != '0' ? 1 : 0)).toString().leftPad(2, '0')}${d1.slice(14, 16)} -> ${tz.slice(1)}`);
                    expect(`${(24 - parseInt(d1.slice(11, 13)) - (d1.slice(14, 15) != '0' ? 1 : 0)).toString().leftPad(2, '0')}${d1.slice(14, 16)}`)
                        .to.be.equal(tz.slice(1));
                }

            });
        });
    });

    describe('the toFormattedNumber() function', function () {
        const date = new Date(Date.UTC(1980, 5, 9, 16, 0, 30, 95));
        expect(date.toFormattedNumber('ddMMyyyy')).to.be.equal(9061980);
    });

    describe('the fromFormattedString() function', function () {
        const emptyDate = new Date(0);
        const targetDate = new Date('2018-06-09T18:20:00-0000');

        it('should import from formatted string correctly', function () {
            emptyDate.fromFormattedString('6/9/18 11:50 pm GMT +05:30', 'M/d/yy h:m a z');
            expect(emptyDate.getTime()).to.be.equal(targetDate.getTime());
            expect(emptyDate.fromFormattedString('09-06-2018 3:20 pm -0300', 'dd-MM-yyyy h:m a Z').getTime()).to.be.equal(targetDate.getTime());
            targetDate.setUTCHours(3);
            expect(emptyDate.fromFormattedString('09-06-2018 3:20 AM', 'dd-MM-yyyy h:m A').getTime()).to.be.equal(targetDate.getTime());
            expect(emptyDate.fromFormattedString('20180609032000000', 'yyyyMMddHHmmssSSS').getTime()).to.be.equal(targetDate.getTime());
        });
        it('invalid arguments should return raise errors', function () {
            expect(() => emptyDate.fromFormattedString()).to.throw('A dataString and its matching pattern must be defined.');
            expect(() => emptyDate.fromFormattedString('02/01/2006', 'xxx')).to.throw('Two consecutive separators are forbidden');
            expect(() => emptyDate.fromFormattedString('02/01/2006', 'dd-MM-yyyy')).to.throw('Separator \'-\' not found in \'02/01/2006\'');
            expect(() => emptyDate.fromFormattedString('02012006', 'ddMMyy')).to.throw('Pattern with no separators must match dateString\'s length');
            expect(() => emptyDate.fromFormattedString('0201/06', 'ddMMyyy')).to.throw('dateString should be full numeric');
            expect(() => emptyDate.fromFormattedString('20106', 'dMMyy')).to.throw('Only elements which assumes leading zeroes are allowed. \'d\' does not.');
            expect(() => emptyDate.fromFormattedString('6/9/18 11:50 pm GMT +05', 'M/d/yy h:m a z')).to.throw('+05 is not a valid timezone format');
            expect(() => emptyDate.fromFormattedString('6/9/18 11:50 p', 'M/d/yy h:m a')).to.throw('Expected AM/am or PM/pm. But got p.');
            expect(() => emptyDate.fromFormattedString('2/1/2006', 'dd/M/y')).to.throw('y is not a valid pattern element.');
        });
    });

    describe('the fromFormattedNumber() function', function () {
        const emptyDate = new Date(0);
        let targetDate = new Date(Date.UTC(2019, 5, 9));
        it('should import from formatted number correctly', function () {
            expect(emptyDate.fromFormattedNumber(20190609, 'yyyyMMdd').getTime()).to.be.equal(targetDate.getTime());
            expect(emptyDate.fromFormattedNumber(90619, 'ddMMyy').getTime()).to.be.equal(targetDate.getTime());
            targetDate = new Date(Date.UTC(2019, 5, 9, 18, 20));
            expect(emptyDate.fromFormattedNumber(201906091820, 'yyyyMMddHHmm').getTime()).to.be.equal(targetDate.getTime());
            targetDate = new Date(Date.UTC(2018, 2, 16));
            expect(emptyDate.fromFormattedNumber(160318, 'ddMMyy').getTime()).to.be.equal(targetDate.getTime());
        });
    });

    describe('the toLocalISOString() function', function () {
        const date = new Date();
        const date1 = new Date(date.toISOString());
        const date2 = new Date(date.toLocalISOString());

        it('should return a date in local time with correct offset from UTC', function () {
            expect(date1.getTime() - date2.getTime()).to.be.equal(date.getTimezoneOffset() * 60 * 1000);
        });
    });
});

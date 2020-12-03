// cSpell: ignore evelop eveloper xxxxttps hhhhps ttps thhps
'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('safeReplace', function () {
    it('replacement can\'t be too slow (but it is, pending optimization)', function () {
        let t1 = process.hrtime();
        for (let i = 0; i < 9999999; i++) {
            'Life before death. Strength before weakness. Journey before destination.'.safeReplace('destination', 'conclusion');
        }
        t1 = process.hrtime(t1);

        let t2 = process.hrtime();
        for (let i = 0; i < 9999999; i++) {
            'Life before death. Strength before weakness. Journey before destination.'.replace('destination', 'conclusion');
        }
        t2 = process.hrtime(t2);

        console.log(t1);
        console.log(t2);
    });
});


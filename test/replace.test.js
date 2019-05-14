// cSpell: ignore evelop eveloper xxxxttps hhhhps ttps thhps
'use strict';

require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('safeReplace', function () {
    it('should allow null, undefined and wrong types', function () {
        expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
            .replaceAll(), 'undefined target')
            .to.be.equal('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
        expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
            .replaceAll(null), 'null target')
            .to.be.equal('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
        expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
            .replaceAll('eveloper'), 'undefined replacement')
            .to.be.equal('https://evelopEveloper.mozilla.org/dundefined/docs/Web/eveevelopevelopeRer/Reference/');
        expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
            .replaceAll('eveloper', null), 'undefined replacement')
            .to.be.equal('https://evelopEveloper.mozilla.org/dnull/docs/Web/eveevelopevelopeRer/Reference/');
        expect('https://evelopEveloper.mozilla.true/developer/docs/Web/eveevelopevelopeRer/Reference/'
            .replaceAll(true, ''), 'boolean target')
            .to.be.equal('https://evelopEveloper.mozilla./developer/docs/Web/eveevelopevelopeRer/Reference/');
        expect('https://evelopEveloper.mozilla.true/developer/docs/Web/eveevelopevelopeRer/Reference/'
            .replaceAll(true, 3.125e17), 'number replacement')
            .to.be.equal('https://evelopEveloper.mozilla.312500000000000000/developer/docs/Web/eveevelopevelopeRer/Reference/');
    });
    describe('replaceAll()', function () {
        it('should replace all', function () {
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('eveloper', 'production'), 'ordinary replacement')
                .to.be.equal('https://evelopEveloper.mozilla.org/dproduction/docs/Web/eveevelopevelopeRer/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('eveloper', 'ops'), 'small replacement')
                .to.be.equal('https://evelopEveloper.mozilla.org/dops/docs/Web/eveevelopevelopeRer/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('eveloper', 'p'), 'single char replacement')
                .to.be.equal('https://evelopEveloper.mozilla.org/dp/docs/Web/eveevelopevelopeRer/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('o', 'U'), 'single char target')
                .to.be.equal('https://evelUpEvelUper.mUzilla.Urg/develUper/dUcs/Web/eveevelUpevelUpeRer/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('/', ''), 'empty replacement')
                .to.be.equal('https:evelopEveloper.mozilla.orgdeveloperdocsWebeveevelopevelopeRerReference');
            expect('hhttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('h', 'xx'), 'single char at start')
                .to.be.equal('xxxxttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('hhhhps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAll('hh', 't'), 'word at start')
                .to.be.equal('ttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
        });
    });
    describe('replaceAllIgnoreCase()', function () {
        it('should replace all regardless the case', function () {
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAllIgnoreCase('eveloper', 'production'), 'ordinary replacement')
                .to.be.equal('https://evelopproduction.mozilla.org/dproduction/docs/Web/eveevelopproductioner/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAllIgnoreCase('eveloper', 'ops'), 'small replacement')
                .to.be.equal('https://evelopops.mozilla.org/dops/docs/Web/eveevelopopser/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAllIgnoreCase('eveloper', 'p'), 'single char replacement')
                .to.be.equal('https://evelopp.mozilla.org/dp/docs/Web/eveevelopper/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAllIgnoreCase('o', 'u'), 'single char target')
                .to.be.equal('https://evelupEveluper.muzilla.urg/develuper/ducs/Web/eveevelupevelupeRer/Reference/');
            expect('https://EvelopEvelopEr.mozilla.org/devEloper/docs/WEb/evEevElopevElopeREr/ReferEnce/'
                .replaceAllIgnoreCase('e', ''), 'empty replacement')
                .to.be.equal('https://vlopvlopr.mozilla.org/dvlopr/docs/Wb/vvlopvlopRr/Rfrnc/');
            expect('hHttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAllIgnoreCase('h', 'xx'), 'single char at start')
                .to.be.equal('xxxxttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('hHhHps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceAllIgnoreCase('hh', 't'), 'word at start')
                .to.be.equal('ttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
        });
    });
    describe('safeReplace()', function () {
        it('should replace the first', function () {
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/'
                .safeReplace('eveloper', 'production'), 'ordinary replacement')
                .to.be.equal('https://evelopEveloper.mozilla.org/dproduction/docs/Web/eveevelopevelopeRer/eveloper/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/'
                .safeReplace('eveloper', 'ops'), 'small replacement')
                .to.be.equal('https://evelopEveloper.mozilla.org/dops/docs/Web/eveevelopevelopeRer/eveloper/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/'
                .safeReplace('eveloper', 'p'), 'single char replacement')
                .to.be.equal('https://evelopEveloper.mozilla.org/dp/docs/Web/eveevelopevelopeRer/eveloper/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .safeReplace('o', 'U'), 'single char target')
                .to.be.equal('https://evelUpEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .safeReplace('/', ''), 'empty replacement')
                .to.be.equal('https:/evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('hhttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .safeReplace('h', 'xx'), 'single char at start')
                .to.be.equal('xxhttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('hhhhps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .safeReplace('hh', 't'), 'word at start')
                .to.be.equal('thhps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
        });
    });
    describe('replaceIgnoreCase()', function () {
        it('should replace first regardless the case', function () {
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/'
                .replaceIgnoreCase('eveloper', 'production'), 'ordinary replacement')
                .to.be.equal('https://evelopproduction.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/'
                .replaceIgnoreCase('eveloper', 'ops'), 'small replacement')
                .to.be.equal('https://evelopops.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/'
                .replaceIgnoreCase('eveloper', 'p'), 'single char replacement')
                .to.be.equal('https://evelopp.mozilla.org/developer/docs/Web/eveevelopevelopeRer/eveloper/');
            expect('https://evelOpEvelOper.mozilla.org/develOper/docs/Web/eveevelOpevelopeRer/Reference/'
                .replaceIgnoreCase('o', 'U'), 'single char target')
                .to.be.equal('https://evelUpEvelOper.mozilla.org/develOper/docs/Web/eveevelOpevelopeRer/Reference/');
            expect('https://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceIgnoreCase('O', ''), 'empty replacement')
                .to.be.equal('https://evelpEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('Hhttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceIgnoreCase('h', 'xx'), 'single char at start')
                .to.be.equal('xxhttps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
            expect('Hhhhps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/'
                .replaceIgnoreCase('hh', 't'), 'word at start')
                .to.be.equal('thhps://evelopEveloper.mozilla.org/developer/docs/Web/eveevelopevelopeRer/Reference/');
        });
    });
});


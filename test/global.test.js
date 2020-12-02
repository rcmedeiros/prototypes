/* eslint-disable no-undef */
'use strict';
require('../index');
require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('Globals', function () {
    describe('__moduleInfo', function () {
        it('should match', function () {
            expect(__moduleInfo.scope).to.be.equal('@rcmedeiros');
            expect(__moduleInfo.name).to.be.equal('prototypes');
            expect(__moduleInfo.version).not.to.be.null;
        });
    });
});

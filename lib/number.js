'use strict';

/**
 * Introduces helper functions for the Number type
 * @module @rcmedeiros/prototypes/number
 */

Number.prototype.toDate = Number.prototype.toDate || function (pattern) {
    return new Date(0, 0, 0, 0, 0).fromFormattedNumber(this, pattern);
};

Number.prototype.toDate = Number.prototype.toDate || function (pattern) {
    return new Date(0, 0, 0, 0, 0).fromFormattedNumber(this, pattern);
};

/**
 * @function pow10
* Raises a number to N times its power of 10
* @param {number} exponent the order of magnitude by which the number will be multiplied.
* @returns {number} A number representing the current number times 10 taken to the power of the given exponent.
*/

Number.prototype.pow10 = Number.prototype.pow || function (exponent) {
    return this * Math.pow(10, exponent);
};

['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh',
    'cbrt', 'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1',
    'floor', 'fround', 'log10', 'log1p', 'log2', 'round',
    'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'].forEach((f) => {
    if (!Number.prototype[f]) {
        Number.prototype[f] = function () {
            return Math[f](this);
        };
    }
});

'use strict';

const asciiMap = {
    'Ç': 'C', 'ç': 'c',
    'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a',
    'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
    'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
    'Ò': 'O', 'Ó': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O', 'ò': 'o', 'ó': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
    'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
    'Ý': 'Y', 'ÿ': 'y', 'ý': 'y',
};

const safeReplaceChar = (baseStr, target, replacement, cs, all) => {
    for (let i = 0; i < baseStr.length; i++) {
        if ((cs && baseStr[i] === target[0]) || (!cs && baseStr[i].toLowerCase() === target[0].toLowerCase())) {
            if (!all) {
                return baseStr.substring(0, i) + replacement + baseStr.substring(i + 1);
            } else {
                baseStr = baseStr.substring(0, i) + replacement + baseStr.substring(i + 1);
                i = i + replacement.length - 1;
            }
        }
    }
    return baseStr;
};

const toString = (s) => {
    if (s === undefined) {
        return 'undefined';
    } else if (s === null) {
        return 'null';
    } else if (typeof s !== 'string') {
        return s.toString();
    } else {
        return s;
    }
};

/**
 * Alternative function to String.prototype.replace in order to avoid regex vulnerabilities.
 * @param {string} baseStr string submitted
 * @param {*} target  target to search for
 * @param {*} replacement replacement for the target
 * @param {boolean} cs whether it's a case sensitive search
 * @param {boolean} all whether or not replace all occurrences of target
 */
const safeReplace = (baseStr, target, replacement, cs, all) => {
    target = toString(target);
    replacement = toString(replacement);

    if (target.length === 1) {
        return safeReplaceChar(baseStr, target, replacement, cs, all);
    } else {
        let baseStrLc = cs ? undefined : baseStr.toLowerCase();
        const targetLc = cs ? undefined : target.toLowerCase();

        let limit = baseStr.length - target.length + 1;
        for (let i = 0; i < limit; i++) {
            if ((cs && baseStr[i] === target[0]) || (!cs && baseStrLc[i] === targetLc[0])) {
                let stride = undefined; // avoid double scanning
                let mismatch = false;
                let j = i + 1;
                for (; j - i < target.length; j++) {
                    if (!stride && ((cs && (baseStr[j] === target[0])) || (!cs && (baseStrLc[j] === targetLc[0])))) {
                        stride = j;
                    }
                    if ((cs && (baseStr[j] !== target[j - i])) || (!cs && (baseStrLc[j] !== targetLc[j - i]))) {
                        mismatch = true;
                        break;
                    }
                }
                if (mismatch) {
                    i = stride || j - 1;
                } else {
                    if (!all) {
                        return baseStr.substring(0, i) + replacement + baseStr.substring(i + target.length);
                    } else {
                        baseStr = baseStr.substring(0, i) + replacement + baseStr.substring(i + target.length);
                        baseStrLc = cs ? undefined : baseStrLc.substring(0, i) + replacement + baseStrLc.substring(i + target.length);
                        limit = limit + replacement.length - target.length;
                        i = i + replacement.length - 1;
                    }
                }
            }
        }
        return baseStr;
    }
};

String.prototype.toASCII = String.prototype.toASCII || function () {
    const length = this.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        const char = this.charAt(i);
        const code = char.charCodeAt();
        if (((code >= 48) && (code <= 57)) || ((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || (code === 32)) {
            result += char;
        } else {
            result += asciiMap[char] || '';
        }
    }
    return result;
};

String.prototype.firstChar = String.prototype.firstChar || function () {
    return this.charAt(0);
};

String.prototype.lastChar = String.prototype.lastChar || function () {
    return this.length > 0 ? this.charAt(this.length - 1) : '';
};

String.prototype.leftPad = String.prototype.leftPad || function (size, pad) {
    if (!size || size < this.length) {
        return this;
    } else {
        if (pad === undefined) {
            pad = ' ';
        }
        let prefix = '';
        for (let i = 0; i < size - this.length; i++) {
            prefix += pad;
        }
        return prefix + this;
    }
};

String.prototype.rightPad = String.prototype.rightPad || function (size, pad) {
    if (!size || size < this.length) {
        return this;
    } else {
        if (pad === undefined) {
            pad = ' ';
        }
        let suffix = '';
        for (let i = 0; i < size - this.length; i++) {
            suffix += pad;
        }
        return this + suffix;
    }
};

String.prototype.centerPad = String.prototype.centerPad || function (size, pad) {
    if (!size || size < this.length) {
        return this;
    } else {
        if (pad === undefined) {
            pad = ' ';
        }
        let border = '';
        const borderSize = (size - this.length);
        const half = Math.floor((borderSize / 2));

        for (let i = 0; i < half; i++) {
            border += pad;
        }
        if (borderSize % 2 === 0) {
            return border + this + border;
        } else {
            return border + this + border + pad;
        }
    }
};

String.prototype.isNumeric = String.prototype.isNumeric || function () {
    return (this - 0) == this && ('' + this).trim().length > 0;// eslint-disable-line eqeqeq
};

String.prototype.containsIgnoreCase = String.prototype.containsIgnoreCase || function (str) {
    return this.toLowerCase().indexOf(str.toLowerCase()) !== -1;
};

String.prototype.contains = String.prototype.contains || function (str) {
    return this.indexOf(str) !== -1;
};

/**
 * Return the piece of string until the argument is found.
 * 'hi.there'.substringUpTo('.') => 'hi'
 */
String.prototype.substringUpTo = String.prototype.substringUpTo || function (str) {
    if (!this.contains(str)) {
        return this;
    }
    return this.slice(0, this.indexOf(str));
};

/**
 * Return the piece of string up until the last occurrence of the argument.
 * 'hi.there.you'.substringUpToLast('.') => 'hi.there'
 */

String.prototype.substringUpToLast = String.prototype.substringUpToLast || function (str) {
    if (!this.contains(str)) {
        return this;
    }
    return this.slice(0, this.lastIndexOf(str));
};

/**
 * Return the piece of string starting with the argument; empty string if not found.
 * 'hi.there'.substringFrom('.') => 'there'
 */
String.prototype.substringFrom = String.prototype.substringFrom || function (str) {
    if (!this.contains(str)) {
        return '';
    }
    return this.slice(this.indexOf(str) + str.length);
};

/**
 * Return the piece from the last occurrence of the argument; empty string if not found.
 * 'hi.there.you'.substringFromLast('.') => 'you'
 */
String.prototype.substringFromLast = String.prototype.substringFromLast || function (str) {
    if (!this.contains(str)) {
        return '';
    }
    return this.slice(this.lastIndexOf(str) + str.length);
};

String.prototype.safeReplace = String.prototype.safeReplace || function (find, replace) {
    return safeReplace(this, find, replace, true, false);
};

String.prototype.replaceIgnoreCase = String.prototype.replaceIgnoreCase || function (find, replace) {
    return safeReplace(this, find, replace, false, false);
};

String.prototype.replaceAll = String.prototype.replaceAll || function (find, replace) {
    return safeReplace(this, find, replace, true, true);
};

String.prototype.replaceAllIgnoreCase = String.prototype.replaceAllIgnoreCase || function (find, replace) {
    return safeReplace(this, find, replace, false, true);
};

/**
 * Capitalize a string: first letter upper case, rest as is.
 */
String.prototype.capitalize = String.prototype.capitalize || function () {
    const a = this.toLowerCase().split(' ');
    const b = [];

    while (a.length) {
        b.push(a[0].charAt(0).toUpperCase() + a.shift().slice(1).toLowerCase());
    }

    return b.join(' ');
};

String.prototype.toDate = String.prototype.toDate || function (pattern) {
    return new Date(0, 0, 0, 0, 0).fromFormattedString(this, pattern);
};

String.prototype.strip = String.prototype.strip || function (...targets) {
    let result = this;
    targets.forEach((e) => {
        result = result.replaceAll(e, '');
    });
    return result;
};

String.prototype.stripIgnoreCase = String.prototype.stripIgnoreCase || function (...targets) {
    let result = this;
    targets.forEach((e) => {
        result = result.replaceAllIgnoreCase(e, '');
    });
    return result;
};

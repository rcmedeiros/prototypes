'use strict';

String.prototype.toASCII = String.prototype.toASCII || function () {
    const length = this.length;
    let result = '';
    for (let i = 0; i < length; i++) {
        const char = this.charAt(i);
        const code = char.charCodeAt();
        if (((code >= 48) && (code <= 57)) || ((code >= 65) && (code <= 90)) || ((code >= 97) && (code <= 122)) || (code === 32)) {
            result += char;
        } else {
            switch (char) {
                case 'Ç':
                    result += 'C';
                    break;
                case 'ç':
                    result += 'c';
                    break;
                case 'À':
                case 'Á':
                case 'Â':
                case 'Ã':
                case 'Ä':
                    result += 'A';
                    break;
                case 'à':
                case 'á':
                case 'â':
                case 'ã':
                case 'ä':
                    result += 'a';
                    break;
                case 'È':
                case 'É':
                case 'Ê':
                case 'Ë':
                    result += 'E';
                    break;
                case 'è':
                case 'é':
                case 'ê':
                case 'ë':
                    result += 'e';
                    break;
                case 'Ì':
                case 'Í':
                case 'Î':
                case 'Ï':
                    result += 'I';
                    break;
                case 'ì':
                case 'í':
                case 'î':
                case 'ï':
                    result += 'i';
                    break;
                case 'Ò':
                case 'Ó':
                case 'Õ':
                case 'Ô':
                case 'Ö':
                    result += 'O';
                    break;
                case 'ò':
                case 'ó':
                case 'õ':
                case 'ô':
                case 'ö':
                    result += 'o';
                    break;
                case 'Ù':
                case 'Ú':
                case 'Û':
                case 'Ü':
                    result += 'U';
                    break;
                case 'ù':
                case 'ú':
                case 'û':
                case 'ü':
                    result += 'u';
                    break;
                case 'Ý':
                    result += 'Y';
                    break;
                case 'ÿ':
                case 'ý':
                    result += 'y';
                    break;
                default:
                    result += '';
                    break;
            }
        }
    }
    return result;
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
    };
    return this.slice(this.lastIndexOf(str) + str.length);
};

/**
 * Replace all occurrences of a string with the replacement.
 */

String.prototype.replaceAll = String.prototype.replaceAll || function (find, replace) {
    if (typeof find !== 'string') {
        return null;
    } else {
        if (!this.contains(find)) {
            return this;
        } else {
            return this.split(find).join(replace);
        }
    }
};

String.prototype.replaceIgnoreCase = String.prototype.replaceIgnoreCase || function (find, replace) {
    if (typeof find !== 'string') {
        return null;
    } else {
        if (!this.containsIgnoreCase(find)) {
            return this;
        } else {
            return this.replace(new RegExp(find, 'i'), replace);
        }
    }
};

String.prototype.replaceAllIgnoreCase = String.prototype.replaceAllIgnoreCase || function (find, replace) {
    if (typeof find !== 'string') {
        return null;
    } else {
        if (!this.containsIgnoreCase(find)) {
            return this;
        } else {
            return this.replace(new RegExp(find, 'gi'), replace);
        }
    }
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

'use strict';

const offsetFromTz = (tz) => {
    if (!tz) {
        return 0;
    } else if (typeof tz === 'string' && tz.toLowerCase() === 'local') {
        return new Date().getTimezoneOffset();

    } else if (typeof tz === 'string' && tz.length === 5 && tz.slice(1, 3).isNumeric() && tz.slice(3, 5).isNumeric() &&
        (tz.charAt(0) === '+' || tz.charAt(0) === '-')) {
        return ((parseInt(tz.slice(1, 3)) * 60) + parseInt(tz.slice(3, 5) || '0')) * (tz.charAt(0) === '+' ? - 1 : 1);

    } else if (typeof tz === 'string' && tz.length === 10 && tz.toUpperCase().startsWith('GMT') && tz.slice(5, 7).isNumeric() &&
        tz.slice(8, 10).isNumeric() && tz.charAt(7) === ':' && (tz.charAt(4) === '+' || tz.charAt(4) === '-')) {
        return ((parseInt(tz.slice(5, 7)) * 60) + parseInt(tz.slice(8, 10) || '0')) * (tz.charAt(4) === '+' ? - 1 : 1);

    } else {
        throw new Error('Time zone should be represented in General Time Zone (GMT ±HH:mm) or RFC 822 (±HHmm)')
    }
}

Date.prototype.toLocalISOString = Date.prototype.toLocalISOString || function () {
    return new Date(this.getTime() - (this.getTimezoneOffset() * 60000)).toISOString();
};

Date.prototype.toFormattedString = Date.prototype.toFormattedString || function (pattern, tz) {
    if (!pattern) {
        pattern = 'yyyy-MM-ddTHH:mm:ssZ';
    }
    const offset = offsetFromTz(tz);

    const date = new Date(this);
    date.setUTCMinutes(this.getUTCMinutes() - offset);

    const hour24 = date.getUTCHours();
    const hour12 = hour24 > 12 && hour24 !== 0 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
    const am = hour24 < 12;

    ['yyyy', 'yy', 'MM', 'M', 'dd', 'd', 'HH', 'H', 'hh', 'h', 'mm', 'm', 'ss', 's', 'SSS', 'S', 'Z', 'z', 'A', 'a'].forEach((tag) => {
        if (pattern.indexOf(tag) !== -1) {
            switch (tag) {
                case 'yyyy':
                    pattern = pattern.replace(tag, date.getUTCFullYear().toString());
                    break;
                case 'yy':
                    pattern = pattern.replace(tag, date.getUTCFullYear().toString().slice(2));
                    break;
                case 'MM':
                    pattern = pattern.replace(tag, ('0' + (date.getUTCMonth() + 1).toString()).slice(-2));
                    break;
                case 'M':
                    pattern = pattern.replace(tag, (date.getUTCMonth() + 1).toString());
                    break;
                case 'dd':
                    pattern = pattern.replace(tag, ('0' + date.getUTCDate().toString()).slice(-2));
                    break;
                case 'd':
                    pattern = pattern.replace(tag, date.getUTCDate().toString());
                    break;
                case 'HH':
                    pattern = pattern.replace(tag, ('0' + date.getUTCHours().toString()).slice(-2));
                    break;
                case 'H':
                    pattern = pattern.replace(tag, date.getUTCHours().toString());
                    break;
                case 'hh':
                    pattern = pattern.replace(tag, ('0' + hour12.toString()).slice(-2));
                    break;
                case 'h':
                    pattern = pattern.replace(tag, hour12.toString());
                    break;
                case 'mm':
                    pattern = pattern.replace(tag, ('0' + date.getUTCMinutes().toString()).slice(-2));
                    break;
                case 'm':
                    pattern = pattern.replace(tag, date.getUTCMinutes().toString());
                    break;
                case 'ss':
                    pattern = pattern.replace(tag, ('0' + date.getUTCSeconds().toString()).slice(-2));
                    break;
                case 's':
                    pattern = pattern.replace(tag, date.getUTCSeconds().toString());
                    break;
                case 'SSS':
                    pattern = pattern.replace(tag, ('00' + date.getUTCMilliseconds().toString()).slice(-3));
                    break;
                case 'S':
                    pattern = pattern.replace(tag, date.getUTCMilliseconds().toString());
                    break;
                case 'Z': // RFC 822 time zone e.g. -0300
                    pattern = pattern.replace(tag,
                        `${offset > 0 ? '-' : '+'}${`0${Math.floor(Math.abs(offset / 60))}`.slice(-2)}${`0${Math.abs(offset % 60)}`.slice(-2)}`);
                    break;
                case 'z': // General time zone e.g. GMT -03:00
                    pattern = pattern.replace(tag,
                        `GMT ${offset > 0 ? '-' : '+'}${`0${Math.floor(Math.abs(offset / 60))}`.slice(-2)}:${`0${Math.abs(offset % 60)}`.slice(-2)}`);
                    break;
                case 'A':
                    pattern = pattern.replace(tag, am ? 'AM' : 'PM');
                    break;
                case 'a':
                    pattern = pattern.replace(tag, am ? 'am' : 'pm');
                    break;
            }
        }
    });

    return pattern;
};

Date.prototype.fromFormattedString = Date.prototype.fromFormattedString || function (dateString, pattern) {
    if (!pattern || !dateString) {
        throw new Error('A dataString and its matching pattern must be defined.');
    }

    // pattern structure
    const structure = [];
    const separators = [];
    let last = '';
    for (let i = 0; i < pattern.length; i++) {
        const letter = pattern[i];
        if (last !== letter) {
            structure.push('');
        }
        if (['A', 'a', 'd', 'H', 'h', 'M', 'm', 'S', 's', 'y', 'Z', 'z'].includes(letter)) {
            let element = structure.pop();
            element += letter;
            structure.push(element);
            last = letter;
        } else {
            if (last === '/') {
                throw new Error('Two consecutive separators are forbidden');
            } else {
                structure.pop();
                separators.push(letter);
            }
            last = '/';
        }
    };

    const dateStructure = [];
    if (separators.length) {
        // dateString elements
        separators.push('end');
        let lastIdx = 0;
        while (separators.length) {
            const separator = separators.shift();
            const idx = separator === 'end' ? Number.MAX_SAFE_INTEGER : dateString.indexOf(separator, lastIdx);
            if (idx === -1) {
                throw new Error(`Separator '${separator}' not found in '${dateString}'`);
            } else {
                const element = dateString.substring(lastIdx, idx);
                dateStructure.push(element);
                lastIdx = idx + 1;
            }
        }
    } else {
        if (pattern.length !== dateString.length) {
            throw new Error('Pattern with no separators must match dateString\'s length');
        } else if (!dateString.isNumeric()) {
            throw new Error('dateString should be full numeric');
        } else {
            let last = 0;
            structure.forEach((element) => {
                if (!['yyyy', 'yy', 'MM', 'dd', 'HH', 'hh', 'mm', 'ss', 'SSS'].includes(element)) {
                    throw new Error(`Only elements which assumes leading zeroes are allowed. '${element}' does not.`);
                }
                const piece = dateString.substring(last, last + element.length);
                last += element.length;
                dateStructure.push(piece);
            });
        }
    }

    // modifiers first
    let afternoon = false;
    let offset = 0;
    structure.forEach((tag, i) => {
        let piece = dateStructure[i];
        switch (tag) {
            case 'z': // General time zone e.g. GMT -03:00
                piece = piece.substring(4).replace(':', '');
            // break omitted
            case 'Z': // RFC 822 time zone e.g. -0300
                if (!piece.isNumeric() || piece.length !== 5 || (piece.charAt(0) !== '-' && piece.charAt(0) !== '+')) {
                    throw new Error(`${piece} is not a valid timezone format`);
                } else {
                    offset = parseInt(piece.substring(1, 3) * 60) + parseInt(piece.substring(3, 5));
                    if (piece.charAt(0) === '+' && offset > 0) {
                        offset *= -1;
                    }
                }
                break;
            case 'A':
            case 'a':
                switch (piece.toLowerCase()) {
                    case 'am':
                        break;
                    case 'pm':
                        afternoon = true;
                        break;
                    default:
                        throw new Error(`Expected AM/am or PM/pm. But got ${piece}.`);
                }
                break;
            case 'yyyy':
            case 'yy':
            case 'MM':
            case 'M':
            case 'dd':
            case 'd':
            case 'HH':
            case 'H':
            case 'hh':
            case 'h':
            case 'mm':
            case 'm':
            case 'ss':
            case 's':
            case 'SSS':
            case 'S':
                break;
            default:
                throw new Error(`${tag} is not a valid pattern element.`);
        }
    });

    //clean slate
    this.setTime(0);

    structure.every((tag, i) => {
        const piece = dateStructure[i];
        if (tag[0] === 'y') {
            const year = parseInt(piece);
            this.setUTCFullYear(piece.length === 2 ? year + 2000 : year);
            return false;
        }
        return true;
    });

    // day first
    structure.every((tag, i) => {
        const piece = dateStructure[i];
        if (tag[0] === 'd') {
            this.setUTCDate(parseInt(piece));
            return false;
        }
        return true;
    });

    // month second
    structure.every((tag, i) => {
        const piece = dateStructure[i];
        if (tag[0] === 'M') {
            this.setUTCMonth((parseInt(piece) - 1));
            return false;
        }
        return true;
    });

    // and the rest
    structure.forEach((tag, i) => {
        const piece = dateStructure[i];
        switch (tag) {
            case 'HH':
            case 'H':
            case 'hh':
            case 'h':
                this.setUTCHours(parseInt(piece) + (afternoon ? 12 : 0));
                break;
            case 'mm':
            case 'm':
                this.setUTCMinutes(parseInt(piece));
                break;
            case 'ss':
            case 's':
                this.setUTCSeconds(parseInt(piece));
                break;
            case 'SSS':
            case 'S':
                this.setUTCMilliseconds(parseInt(piece));
                break;
        }
    });

    if (offset) {
        this.setUTCMinutes(this.getUTCMinutes() + offset);
    }

    return this;
};

Date.prototype.toFormattedNumber = Date.prototype.toFormattedNumber || function (pattern) {
    return parseInt(this.toFormattedString(pattern));
};

Date.prototype.fromFormattedNumber = Date.prototype.fromFormattedNumber || function (dateNumber, pattern) {
    const s = dateNumber.toString();
    return this.fromFormattedString(s.length === pattern.length - 1 ? '0' + s : s, pattern);
};

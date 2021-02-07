// cSpell: ignore hhmm
'use strict';

const ISO_8601 = 'yyyy-MM-ddTHH:mm:ssZ';
const TZ_MALFORMED = 'Time zone should be represented in General Time Zone (GMT ±HH:mm) or ISO 8601 (±hh:mm, ±hhmm, ±hh)';

const offsetFromTz = (tz) => {
    if (!tz) {
        return 0;
    } else if (typeof tz === 'boolean') {
        return new Date().getTimezoneOffset();
    } else if (typeof tz === 'string') {
        tz = tz.replaceIgnoreCase('GMT', '').safeReplace(':', '').trim();
        if (tz.length === 3) {
            tz += '00';
        }
        if ((tz.charAt(0) === '+' || tz.charAt(0) === '-') && tz.slice(1, 3).isNumeric() && tz.slice(3, 5).isNumeric()) {
            return ((parseInt(tz.slice(1, 3)) * 60) + parseInt(tz.slice(3, 5))) * (tz.charAt(0) === '+' ? -1 : 1);
        } else {
            throw new Error(TZ_MALFORMED);
        }
    } else {
        throw new Error(TZ_MALFORMED);
    }
};

Date.MIN = -8640000000000000;
Date.MAX = 8640000000000000;

Date.prototype.getEpochTime = Date.prototype.getEpochTime || function () {
    return Math.floor(this.getTime() / 1000);
};

Date.prototype.toLocalISOString = Date.prototype.toLocalISOString || function () {
    return this.toFormattedString(undefined, true);
};

Date.prototype.toFormattedString = Date.prototype.toFormattedString || function (pattern, tz) {
    if (!pattern) {
        pattern = ISO_8601;
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
                    pattern = pattern.safeReplace(tag, date.getUTCFullYear().toString());
                    break;
                case 'yy':
                    pattern = pattern.safeReplace(tag, date.getUTCFullYear().toString().slice(2));
                    break;
                case 'MM':
                    pattern = pattern.safeReplace(tag, ('0' + (date.getUTCMonth() + 1).toString()).slice(-2));
                    break;
                case 'M':
                    pattern = pattern.safeReplace(tag, (date.getUTCMonth() + 1).toString());
                    break;
                case 'dd':
                    pattern = pattern.safeReplace(tag, ('0' + date.getUTCDate().toString()).slice(-2));
                    break;
                case 'd':
                    pattern = pattern.safeReplace(tag, date.getUTCDate().toString());
                    break;
                case 'HH':
                    pattern = pattern.safeReplace(tag, ('0' + date.getUTCHours().toString()).slice(-2));
                    break;
                case 'H':
                    pattern = pattern.safeReplace(tag, date.getUTCHours().toString());
                    break;
                case 'hh':
                    pattern = pattern.safeReplace(tag, ('0' + hour12.toString()).slice(-2));
                    break;
                case 'h':
                    pattern = pattern.safeReplace(tag, hour12.toString());
                    break;
                case 'mm':
                    pattern = pattern.safeReplace(tag, ('0' + date.getUTCMinutes().toString()).slice(-2));
                    break;
                case 'm':
                    pattern = pattern.safeReplace(tag, date.getUTCMinutes().toString());
                    break;
                case 'ss':
                    pattern = pattern.safeReplace(tag, ('0' + date.getUTCSeconds().toString()).slice(-2));
                    break;
                case 's':
                    pattern = pattern.safeReplace(tag, date.getUTCSeconds().toString());
                    break;
                case 'SSS':
                    pattern = pattern.safeReplace(tag, ('00' + date.getUTCMilliseconds().toString()).slice(-3));
                    break;
                case 'S':
                    pattern = pattern.safeReplace(tag, date.getUTCMilliseconds().toString());
                    break;
                case 'Z': // RFC 822 time zone e.g. -0300
                    pattern = pattern.safeReplace(tag,
                        `${offset > 0 ? '-' : '+'}${`0${Math.floor(Math.abs(offset / 60))}`.slice(-2)}${`0${Math.abs(offset % 60)}`.slice(-2)}`);
                    break;
                case 'z': // General time zone e.g. GMT -03:00
                    pattern = pattern.safeReplace(tag,
                        `GMT ${offset > 0 ? '-' : '+'}${`0${Math.floor(Math.abs(offset / 60))}`.slice(-2)}:${`0${Math.abs(offset % 60)}`.slice(-2)}`);
                    break;
                case 'A':
                    pattern = pattern.safeReplace(tag, am ? 'AM' : 'PM');
                    break;
                case 'a':
                    pattern = pattern.safeReplace(tag, am ? 'am' : 'pm');
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
    }

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
            let lastIdx = 0;
            structure.forEach((element) => {
                if (!['yyyy', 'yy', 'MM', 'dd', 'HH', 'hh', 'mm', 'ss', 'SSS'].includes(element)) {
                    throw new Error(`Only elements which assumes leading zeroes are allowed. '${element}' does not.`);
                }
                const piece = dateString.substring(lastIdx, lastIdx + element.length);
                lastIdx += element.length;
                dateStructure.push(piece);
            });
        }
    }

    // modifiers first
    let afternoon = false;
    let offset = 0;
    structure.forEach((tag, i) => {
        const piece = dateStructure[i];
        switch (tag) {
            case 'z':
            case 'Z':
                offset = offsetFromTz(piece);
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

    // clean slate
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

Date.prototype.toFormattedNumber = Date.prototype.toFormattedNumber || function (pattern, tz) {
    return parseInt(this.toFormattedString(pattern), tz);
};

Date.prototype.fromFormattedNumber = Date.prototype.fromFormattedNumber || function (dateNumber, pattern) {
    const s = dateNumber.toString();
    return this.fromFormattedString(s.length === pattern.length - 1 ? '0' + s : s, pattern);
};

Date.prototype.period = Date.prototype.period || function (date) {
    date = date || new Date();

    let seconds = Math.abs(this - date) / 1000;

    const days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    const hours = Math.floor(seconds / 3600) % 24;
    seconds -= hours * 3600;

    const minutes = Math.floor(seconds / 60) % 60;
    seconds -= minutes * 60;

    let result = '';
    if (days > 0) {
        result += `${days} days `;
    }
    if (hours > 0) {
        result += `${hours} hours `;
    }
    if (minutes > 0) {
        result += `${minutes} mins `;
    }

    return result.concat(`${Math.floor(seconds)} secs`);
};

'use strict';

Array.prototype.first = Array.prototype.first || function () {
    if (this.length) {
        return this[0];
    } else {
        return null;
    }
};

Array.prototype.secondLast = Array.prototype.secondLast || function () {
    if (this.length > 1) {
        return this[this.length - 2];
    } else {
        return null;
    }
};

Array.prototype.last = Array.prototype.last || function () {
    if (this.length) {
        return this[this.length - 1];
    } else {
        return null;
    }
};

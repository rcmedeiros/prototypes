'use strict';

require('./lib/string.js');
require('./lib/array.js');
require('./lib/date.js');
require('./lib/number.js');

/* istanbul ignore else */
if (!global.__moduleInfo) {
    const fs = require('fs');
    const filePath = require('path').join(process.cwd(), 'package.json');

    /* istanbul ignore else */
    if (fs.existsSync(filePath)) {
        global.__moduleInfo = JSON.parse(fs.readFileSync(filePath).toString('utf-8'));
        global.__moduleInfo.scope = global.__moduleInfo.name.substringUpTo('/');
        /* istanbul ignore next */
        global.__moduleInfo.name = global.__moduleInfo.name.substringFrom('/') || global.__moduleInfo.name;
    }
}

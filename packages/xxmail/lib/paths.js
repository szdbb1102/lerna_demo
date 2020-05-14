"use strict";

const path = require('path');

const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

console.log(resolveApp('mail.config.js'))

module.exports = resolveApp('mail.config.js')
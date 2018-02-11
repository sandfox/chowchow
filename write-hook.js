'use strict'

const fs = require('fs')
const hookScript = require('./hook-script')

module.exports = fpath => fs.writeFileSync(fpath, hookScript, {encoding:'utf8', mode: 0o755})
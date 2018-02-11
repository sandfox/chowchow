'use strict'

const fs = require('fs')

module.exports = hooksDir => fs.readdirSync(hooksDir, {encoding: 'utf8'}).filter(f => !f.match(/\.sample$/))
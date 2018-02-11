'use strict'

const fs = require('fs')

module.exports = fpath => fs.unlinkSync(fpath)
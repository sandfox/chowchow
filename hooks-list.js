'use strict'

module.exports = require('fs').readFileSync(`${__dirname}/hooks.txt`, {encoding: 'utf8'}).split('\n')
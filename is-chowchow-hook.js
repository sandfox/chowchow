'use strict'

const fs = require('fs')

const chowchowSig = '# chowchow hook 414715c1f35236b9d2789a653d3d0d3c'

module.exports = fpath => fs.readFileSync(fpath, {encoding: 'utf8'})
		.split('\n')
		.some(l => l.match(`^${chowchowSig}$`))
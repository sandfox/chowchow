'use strict'

const fs = require('fs')
const child_process = require('child_process')

module.exports = () => {

	try {
		const hooksDir = child_process
			.execSync('git rev-parse --git-dir', {timeout: 5000, encoding: 'utf8'})
			.trim('\n')
			.concat('/hooks')

		if( !fs.statSync(hooksDir).isDirectory()) {
			return undefined
		}

		return hooksDir

	} catch (e) {
		// error handling one day...
		return undefined
	}
}
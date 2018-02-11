'use strict'

const findHooksDir = require('./hooks-dir')
const hooksList = require('./hooks-list')
const installedHooks = require('./installed-hooks')
const isChowchowHook = require('./is-chowchow-hook')
const deleteHook = require('./delete-hook')
const hooksDir = findHooksDir()

module.exports = () => {

	if(hooksDir === undefined) {
		console.log('exiting: no hooks folder found')
		process.exit(1)
	}

	installedHooks(hooksDir).map( hookname => `${hooksDir}/${hookname}`)
		.filter(isChowchowHook)
		.forEach(deleteHook)

	console.log('chowchow hooks deleted!')
}
'use strict'

const findHooksDir = require('./hooks-dir')
const hooksList = require('./hooks-list')
const writeHook = require('./write-hook')
const installedHooks = require('./installed-hooks')
const isChowchowHook = require('./is-chowchow-hook')

const flag = name => `--${name}`
const hasFlag = flag => process.argv.some(f => f.match(`^${flag}$`))

module.exports = () => {

	const hooksDir = findHooksDir()

	if(hooksDir === undefined) {
		console.log('exiting: no hooks folder found')
		process.exit(1)
	}

	// ignore chowchow installed hooks
	const collisions = installedHooks(hooksDir).filter( ihook => hooksList.some(a => a === ihook ) )
		.filter( chook => !isChowchowHook(`${hooksDir}/${chook}`))

	if(collisions.length > 0 && !hasFlag(flag('force'))) {
		console.log(`non chowchow hooks that would be overwritten discovered: ${collisions.join(' ')}`)
		console.log('aborting, use --force flag to overwrite')
		process.exit(1)
	}

	hooksList.map(hookname => `${hooksDir}/${hookname}`).forEach(writeHook)

	console.log('chowchow hooks written!')
}
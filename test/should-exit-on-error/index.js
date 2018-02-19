const { spawn } = require('child_process');
const assert = require('assert');

const path = require('path');

const chowchow = spawn(`sh`, ['../../hook.sh'], {
    cwd: __dirname,
    env: {
        HOOKNAME: 'pre-commit',
        CHOWCHOWFILE: '.chowchow.yml',
        stdio: 'inherit'
    }
});

let logCount = 0;

chowchow.stdout.on('data', (data) => {
    console.log(`${data}`);
    if (logCount === 0) {
        assert.equal(`${data}`, 'success\n');
    } else if (logCount === 1) {
        assert.equal(`${data}`, 'success\n');
    } else if (logCount >= 2) {
        throw new Error('Something went wrong');
    }
    logCount += 1;
});

chowchow.on('close', (code) => {
    assert.equal(code, 1);
    console.log('closing on bad hook');
    assert.equal(logCount, 2);
});

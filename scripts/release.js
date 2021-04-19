const { execSync, spawnSync } = require('child_process');

const color = {
    yellow: '',
    blue: '\u001b[33m',
    grey: text => '\u001B[90m' + text + '\u001B[39m',
};

const cwd = process.cwd();
const lernaCli = require.resolve('lerna/cli');

function printErrorAndExit(message) {
    console.error(message);
    process.exit(1);
}

function logStep(name) {
    console.log(`${color.grey('>> Release: ')}${name}`);
}

function checkNpmRegistry() {
    const userRegistry = execSync('npm config get registry', {
        encoding: 'utf-8',
    });

    if (userRegistry.includes('https://registry.yarnpkg.com/')) {
        printErrorAndExit(
            `Release failed, please use ${color.blue}npm run release`
        );
    }
}

function release() {
    // Check npm registry
    logStep('check npm registry');
    checkNpmRegistry();

    // Get updated packages
    logStep('check updated packages');
    const updatedStdout = spawnSync(lernaCli, ['changed'], {
        encoding: 'utf-8',
    });
    // console.log(updatedStdout)
    // updated = updatedStdout
    //     .split('\n')
    //     .map(pkg => {
    //         if (pkg === 'umi') return pkg;
    //         else return pkg.split('/')[1];
    //     })
    //     .filter(Boolean);
    // if (!updated.length) {
    //     printErrorAndExit('Release failed, no updated package is updated.');
    // }

    // Clean
    logStep('clean');

    // Build
    logStep('build');
    // spawnSync('yarn', ['build']);

    // Bump version
    logStep('bump version with lerna version');
    spawnSync(lernaCli, [
        'version',
        '--exact',
        '--no-commit-hooks',
        '--no-git-tag-version',
        '--no-push',
    ]);

    logStep('over');
}

release();

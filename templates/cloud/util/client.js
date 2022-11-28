#!/usr/bin/env node
/* example:  client.js [--url=<string>] password caName [appName]
 * 'client.js  --url=http://root-example.localtest.me bar foo-ca1'
 *  or 'client.js  bar foo-ca1 example'
 */

'use strict';

const caf_core = require('caf_core');
const caf_comp = caf_core.caf_components;
const myUtils = caf_comp.myUtils;
const caf_cli = caf_core.caf_cli;
const util = require('util');
const setTimeoutPromise = util.promisify(setTimeout);
const srpClient = require('caf_srp').client;
const parseArgs = require('minimist');

const usage = function() {
    console.log(
        'Usage: client.js [--url=<string>] password caName [appName] \n' +
            "For example:\n 'client.js bar foo-ca1 hellocloud' or\n" +
            " 'client.js --url=http://root-hellocloud.localtest.me bar foo-ca1'"
    );
    process.exit(1);
};

const usageArgs = function(x) {
    if (x.indexOf('--') !== 0) {
        return true;
    } else {
        console.log(`Invalid ${x}`);
        usage();
        return false;
    }
};

const argv = parseArgs(process.argv.slice(2), {
    string: ['url'],
    unknown: usageArgs
});

const options = argv._ || [];

if (options.length === 2) {
    [argv.password, argv.from] = options;
    !argv.url && usage();
} else if (options.length === 3) {
    [argv.password, argv.from, argv.url] = options;
    argv.url = `http://root-${argv.url}.localtest.me`;
} else {
    usage();
}


/* `from` CA needs to be the same as target `ca` to enable creation, i.e.,
 *  only owners can create CAs.
 *
 *  With security on we need a token to authenticate `from`. The user `foo`
 * is always enabled with password `pleasechange`.
 */
const spec = {
    log: function(x) { console.error(x);},
    securityClient: srpClient,
    password: argv.password,
    unrestrictedToken: false,
    from: argv.from,
    ca: argv.from
};

const s = new caf_cli.Session(argv.url, null, spec);

s.onopen = async function() {
    try {
        const state = await s.increment(5).getPromise();
        console.log('Current count:' + state.counter);
        await setTimeoutPromise(15000);
        s.close();
    } catch (ex) {
        s.close(ex);
    }
};

s.onmessage = function(msg) {
    const counter = caf_cli.getMethodArgs(msg)[0];
    console.log('Got notification in client:' + counter);
};

s.onclose = function(err) {
    if (err) {
        console.log(myUtils.errToPrettyStr(err));
        process.exit(1);
    }
    console.log('Done OK');
    process.exit(0);
};

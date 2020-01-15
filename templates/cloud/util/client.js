#!/usr/bin/env node
/* example: client.js --password=<..> --url=<..> --from=<...>
 * client.js --password=pleasechange --url=http://root-example.vcap.me --from foo-ca1
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

const argv = parseArgs(process.argv.slice(2), {
    string: ['password', 'url', 'from']
});


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
    initUser: true, // initialize CA for root-people app
    from: argv.from,
    ca: argv.from
};



const s = new caf_cli.Session(argv.url, null, spec);

s.onopen = async function() {
    try {
        const state = await s.increment(5).getPromise();
        console.log('Final count:' + state.counter);
        await setTimeoutPromise(10000);
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

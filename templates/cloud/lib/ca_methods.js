'use strict';

const caf = require('caf_core');
const APP_SESSION = 'default';

exports.methods = {
    // Internal methods called by the framework start with prefix `__ca_`
    async __ca_init__() {
        this.state.counter = -1;
        this.$.session.limitQueue(1, APP_SESSION); // only the last notification
        return [];
    },
    async __ca_pulse__() {
        this.$.log && this.$.log.debug(`Calling PULSE: ${this.state.counter}`);
        this.state.counter = this.state.counter + 1;
        if (this.state.counter % this.$.props.divisor === 0) {
            this.$.session.notify([this.state.counter], APP_SESSION);
        }
        return [];
    },

    //External methods
    async increment(inc) {
        this.state.counter = this.state.counter + inc;
        return this.getState();
    },
    async getState() {
        return [null, this.state];
    }
};

caf.init(module);

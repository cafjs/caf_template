'use strict';
var caf = require('caf_core');

exports.methods = {
    // Methods called by framework
    async __ca_init__() {
        this.state.counter = -1;
        this.$.session.limitQueue(1, 'default'); // only the last notification
        return [];
    },
    async __ca_pulse__() {
        this.$.log && this.$.log.debug('calling PULSE!!! ' +
                                       this.state.counter);
        this.state.counter = this.state.counter + 1;
        if (this.state.counter % this.$.props.divisor === 0) {
            this.$.session.notify([this.state.counter], 'default');
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

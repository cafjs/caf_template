'use strict';

const caf = require('caf_core');
const app = require('../public/js/app.js');
const APP_SESSION = 'default';

exports.methods = {
    // Methods called by framework
    async __ca_init__() {
        this.state.counter = -1;
        this.$.session.limitQueue(1, APP_SESSION); // only the last notification
        this.state.fullName = this.__ca_getAppName__() + '#' +
            this.__ca_getName__();
        return [];
    },
    async __ca_pulse__() {
        this.$.log && this.$.log.debug(`Calling PULSE: ${this.state.counter}`);
        this.state.counter = this.state.counter + 1;
        if (this.state.counter % this.$.props.divisor === 0) {
            this.$.session.notify([{counter: this.state.counter}], APP_SESSION);
        }

        this.$.react.render(app.main, [this.state]);

        return [];
    },

    //External methods

    async hello(key) {
        key && this.$.react.setCacheKey(key);
        return this.getState();
    },

    // Example external method
    async increment(inc) {
        this.state.counter = this.state.counter + inc;
        return this.getState();
    },

    async getState() {
        this.$.react.coin();
        return [null, this.state];
    }
};

caf.init(module);

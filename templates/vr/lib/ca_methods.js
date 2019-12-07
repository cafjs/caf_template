'use strict';
const caf = require('caf_core');
const caf_comp = caf.caf_components;
const myUtils = caf_comp.myUtils;
const app = require('../public/js/app.js');
const APP_SESSION = 'default';
const IOT_SESSION = 'iot';
const VR_SESSION = 'vr';

exports.methods = {
    // Methods called by framework
    async __ca_init__() {
        this.$.session.limitQueue(1, APP_SESSION); // only the last notification
        this.$.session.limitQueue(1, IOT_SESSION); // only the last notification
        this.$.session.limitQueue(1, VR_SESSION); // only the last notification
        this.state.fullName = this.__ca_getAppName__() + '#' +
            this.__ca_getName__();

        // methods called by the iot device
        this.state.trace__iot_sync__ = '__ca_traceSync__';
        this.state.trace__iot_resume__ = '__ca_traceResume__';

        // example initial state
        this.state.counter = -1;

        return [];
    },

    async __ca_pulse__() {
        // Example autonomous logic
        this.$.log && this.$.log.debug('calling PULSE!!! ' +
                                       this.state.counter);
        this.state.counter = this.state.counter + 1;
        if (this.state.counter % this.$.props.divisor === 0) {
            this.$.session.notify([{counter: this.state.counter}], APP_SESSION);
            this.$.session.notify([{counter: this.state.counter}], VR_SESSION);
        }

        this.$.react.render(app.main, [this.state]);

        return [];
    },

    //External methods

    async hello(key, tokenStr) {
        tokenStr && this.$.iot.registerToken(tokenStr);
        key && this.$.react.setCacheKey(key);

        // example of delayed configuration
        if (!this.state.meta) {
            return this.configPin(this.$.props.pinNumber);
        } else {
            return this.getState();
        }
    },

    // Example external method
    async increment(inc) {
        this.state.counter = this.state.counter + inc;
        return this.getState();
    },

    // Example config LED number
    async configPin(pinNumber) {
        const $$ = this.$.sharing.$;
       // Initial device config example
        var meta = {};
        meta[pinNumber] = {
            input: false,
            initialState: { high: false}
        };
        $$.fromCloud.set('meta', meta);
        this.state.meta = meta;
        return this.getState();
    },

    // Example blink method
    async blink() {
        const bundle = this.$.iot.newBundle();
        bundle.setPin(0, [this.$.props.pinNumber, true])
            .setPin(1000, [this.$.props.pinNumber, false]);
        this.$.iot.sendBundle(bundle);
        // force device to reload, reducing latency.
        this.$.session.notify(['Bundle ready'], IOT_SESSION);
        return this.getState();
    },

    async getState() {
        this.$.react.coin();
        return [null, this.state];
    },

    // Methods called by the IoT device (Optional)

    // called when the device syncs state with the cloud
    async __ca_traceSync__() {
        const $$ = this.$.sharing.$;
        const now = (new Date()).getTime();
        this.$.log && this.$.log.trace(this.state.fullName +
                                       ':Syncing!!:' + now);

        // Example of device state handling
        const deviceInfo = $$.toCloud.get('deviceInfo');
        if (deviceInfo && !myUtils.deepEqual(deviceInfo,
                                             this.state.deviceInfo)) {
            this.state.deviceInfo = myUtils.deepClone(deviceInfo);
            this.$.session.notify([{deviceInfo: this.state.deviceInfo}],
                                  APP_SESSION);
            this.$.session.notify([{deviceInfo: this.state.deviceInfo}],
                                  VR_SESSION);
        }

        return [];
    },

    // called every time the device resumes a session
    async __ca_traceResume__() {
        this.$.log && this.$.log.trace(this.state.fullName + ':Resuming!!:' +
                                       (new Date()).getTime());
        return [];
    }

};

caf.init(module);

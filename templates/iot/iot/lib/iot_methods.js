'use strict';

const caf_iot = require('caf_iot');

exports.methods = {
    async __iot_setup__() {
        /* Example of how to store device state in the cloud, i.e.,
         * the value of `index` from the last run. */
        const lastIndex = this.toCloud.get('index');
        this.state.index = (lastIndex ? lastIndex : 0);

        const meta = this.fromCloud.get('meta');
        this.$.log && this.$.log.debug(JSON.stringify(meta));
        this.$.gpio.setPinConfig(meta || {});

        return [];
    },

    async __iot_loop__() {
        this.$.log && this.$.log.debug(
            `Time offset ${this.$.cloud.cli.getEstimatedTimeOffset()}`
        );

        this.toCloud.set('index', this.state.index);
        this.state.index = this.state.index + 1;

        const now = (new Date()).getTime();
        this.$.log && this.$.log.debug(`${now} loop: ${this.state.index}`);

        // Simulate sensor data to be uploaded
        if (this.state.index % this.$.props.divisorIOT === 0) {
            this.toCloud.set('deviceInfo', this.state.index);
        }

        return [];
    },

    //Method invoked by the cloud
    async setPin(pin, value) {
        const now = (new Date()).getTime();
        this.$.log && this.$.log.debug(`${now} setPin: ${pin} value: ${value}`);
        const pins = {};
        pins[pin] = value;
        this.$.gpio.writeMany(pins);
        return [];
    }
};

caf_iot.init(module);

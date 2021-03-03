'use strict';
const React = require('react');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');
const aframeR = require('aframe-react');
const Entity = aframeR.Entity;

const BLINK =  'Manage_1_Blink';

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.doBlink = this.doBlink.bind(this);

        if (typeof window !== 'undefined') {
            // Cannot pass the handler directly...
            window[BLINK] = this.doBlink;
        }
    }

    doBlink() {
        AppActions.blink(this.props.ctx);
    }

    render() {
        return cE(Entity, {
            primitive: 'a-gui-flex-container',
            'flex-direction': 'column',
            'justify-content': 'center',
            width : 2.2,
            height: 1,
            position: {x:0.1, y: 3.15, z: -4},
            rotation: {x:0, y: 0, z: 0}
        },
                  cE(Entity, {
                      primitive: 'a-gui-button',
                      width: 2.0,
                      height: 0.50,
                      value: 'Do it!',
                      onclick: BLINK
                  }),
                  cE(Entity, {
                      primitive: 'a-gui-label',
                      width: 2.0,
                      height: 0.50,
                      value: this.props.deviceInfo
                   })
                 );
    }
}

module.exports = Example;

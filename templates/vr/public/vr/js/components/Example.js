'use strict';
const React = require('react');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');
const aframeR = require('aframe-react');
const Entity = aframeR.Entity;

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.doBlink = this.doBlink.bind(this);
    }

    doBlink() {
        AppActions.blink(this.props.ctx);
    }

    render() {
        return cE(Entity, {},
                  cE(Entity, {
                      geometry : {
                          primitive: 'plane',
                          width: 3.5,
                          height: 4.5,
                      },
                      material: {
                          side: 'double',
                          shader: 'flat',
                          color: '#cfcfcf',
                          transparent: true,
                          opacity: 0.5
                      },
                      position: {x: 0.0, y: 2.5, z: -6.1},
                      rotation: {x: 0, y: 0, z: 0}
                  }),
                  cE(Entity, {
                      primitive: 'a-ui-scroll-pane',
                      width: 3.5,
                      height: 4.5,
                      position: {x: 0.0, y: 2.5, z: -6},
                      rotation: {x: 0, y: 0, z: 0}
                  }, cE(Entity, {class: 'container'},
                        [
                            cE(Entity, {
                                key: 9000732,
                                primitive: 'a-text',
                                width: 3.5,
                                height: 1.5,
                                text: {
                                    baseline: 'center',
                                    anchor: 'center',
                                    align: 'center',
                                    wrapCount: 8.0,
                                    color: 'black',
                                    value: 'Counter: ' + this.props.counter
                                }
                            }),
                            cE(Entity, {
                                key: 9000733,
                                primitive: 'a-text',
                                width: 3.5,
                                height: 1.5,
                                text: {
                                    baseline: 'center',
                                    anchor: 'center',
                                    align: 'center',
                                    wrapCount: 8.0,
                                    color: 'black',
                                    value:  'Info: ' +
                                        this.props.deviceInfo
                                }
                            }),
                            cE(Entity, {
                                primitive: 'a-ui-button',
                                class: 'clickable',
                                key: 9000734,
                                width: 3.5,
                                height: 1.5,
                                'text-value': 'Blink',
                                'font-color': 'white',
                                'ripple-color': 'white',
                                color: 'black',
                                events: {
                                    click: this.doBlink
                                }
                            })
                        ]
                       )
                    ));
    }
}

module.exports = Example;

'use strict';

const React = require('react');
const rB = require('react-bootstrap');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');
var urlParser = require('url');

class Example extends React.Component {

    constructor(props) {
        super(props);
        this.doIncrement = this.doIncrement.bind(this);
        this.doBlink = this.doBlink.bind(this);
        this.handleIncrement = this.handleIncrement.bind(this);
        this.doVR = this.doVR.bind(this);

    }

    handleIncrement(e) {
        AppActions.setLocalState(this.props.ctx,
                                 {increment: e.target.value});
    }

    doVR() {
        if (window && window.location && window.location.href) {
            let myURL = urlParser.parse(window.location.href);
            myURL.pathname = '/vr/index.html';
            myURL.hash = myURL.hash.replace('session=default', 'session=vr');
            delete myURL.search; // delete cacheKey
            window.open(urlParser.format(myURL), '_blank');
        }
    }

    doIncrement() {
        let inc = parseInt(this.props.increment);
        if (isNaN(inc)) {
            let err = new Error('Increment is not a number');
            AppActions.setError(this.props.ctx, err);
        } else {
            AppActions.increment(this.props.ctx, inc);
        }
    }

    doBlink() {
        AppActions.blink(this.props.ctx);
    }

    render() {
        return cE(rB.Form, {horizontal: true},
                  cE(rB.FormGroup, {controlId: 'counterId'},
                     cE(rB.Col, {sm:2, xs: 4},
                        cE(rB.ControlLabel, null, 'Counter')
                       ),
                      cE(rB.Col, {sm:6, xs: 8},
                         cE(rB.FormControl, {
                             type: 'text',
                             readOnly: true,
                             value: this.props.counter
                         })
                        )
                    ),

                  cE(rB.FormGroup, {controlId: 'incId'},
                     cE(rB.Col, {sm:2, xs: 4},
                        cE(rB.ControlLabel, null, 'Increment')
                       ),
                     cE(rB.Col, {sm:6, xs: 8},
                        cE(rB.FormControl, {
                            type: 'text',
                            value: this.props.increment,
                            placeholder: '1',
                            onChange: this.handleIncrement
                        })
                       ),
                     cE(rB.Col, {sm:4, xs: 8},
                        cE(rB.Button, {
                            bsStyle: 'primary',
                            onClick: this.doIncrement
                        }, "Change")
                       )
                    ),

                  cE(rB.FormGroup, {controlId: 'blinkID'},
                     cE(rB.Col, {sm:2, xs: 4},
                        cE(rB.ControlLabel, null, 'Device Info')
                       ),
                     cE(rB.Col, {sm:6, xs: 8},
                        cE(rB.FormControl, {
                            type: 'text',
                            value: this.props.deviceInfo,
                            readOnly: true
                        })
                       ),
                     cE(rB.Col, {sm:4, xs: 8},
                        cE(rB.ButtonGroup, null,
                           cE(rB.Button, {
                               bsStyle: 'primary',
                               onClick: this.doBlink
                           }, "Blink"),
                           cE(rB.Button, {
                               bsStyle: 'info',
                               onClick: this.doVR
                           }, "VR")
                          )
                       )
                    )
                 );
    }
}

module.exports = Example;

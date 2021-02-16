'use strict';

const React = require('react');
const rB = require('react-bootstrap');
const cE = React.createElement;
const AppActions = require('../actions/AppActions');

class Example extends React.Component {

    constructor(props) {
        super(props);
        this.doBlink = this.doBlink.bind(this);
    }

    doBlink() {
        AppActions.blink(this.props.ctx);
    }

    render() {
        return cE(rB.Form, {horizontal: true},
                  cE(rB.FormGroup, {controlId: 'blinkID', bsSize: 'large'},
                     cE(rB.Col, {sm:2, xs: 12},
                        cE(rB.ControlLabel, null, 'Info')
                       ),
                     cE(rB.Col, {sm:4, xs: 12},
                        cE(rB.FormControl, {
                            type: 'text',
                            value: this.props.deviceInfo,
                            readOnly: true
                        })
                       )
                    ),
                  cE(rB.FormGroup, {controlId: 'buttonId', bsSize: 'large'},
                     cE(rB.Col, {smOffset:2 ,sm:4, xs: 12},
                        cE(rB.Button, {
                            bsStyle: 'primary',
                            onClick: this.doBlink
                        }, 'Blink')
                       )
                    )
                 );
    }
}

module.exports = Example;

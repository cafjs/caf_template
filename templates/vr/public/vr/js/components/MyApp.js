'use strict';
const React = require('react');
const aframe = require('aframe');
const aframeR = require('aframe-react');

const Entity = aframeR.Entity;
const Scene = aframeR.Scene;

const cE = React.createElement;
const AppStatus = require('./AppStatus');
const Example = require('./Example');

// relies on globals, i.e., `window.UI` and `window.Yoga`
require('aframe-material-collection/dist/aframe-yoga-layout.js');
require('aframe-material-collection/dist/aframe-material-collection.js');


class MyApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.props.ctx.store.getState();
    }

    componentDidMount() {
        if (!this.unsubscribe) {
            this.unsubscribe = this.props.ctx.store
                .subscribe(this._onChange.bind(this));
            this._onChange();
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    _onChange() {
        if (this.unsubscribe) {
            this.setState(this.props.ctx.store.getState());
        }
    }

    render() {
        this.state = this.state || {};
        return cE(Scene, {cursor: 'rayOrigin: mouse'},
                  // Example background
                  cE('a-assets', null,
                     cE('img', {
                         id: 'backgroundImg',
                         src: 'assets/chess-world.jpg'
                     })
                    ),
                  cE(Entity, {
                      primitive: 'a-sky',
                      'phi-start': 90,
                      src: '#backgroundImg'
                  }),
                  // Example lights
                  cE(Entity, {
                      light: 'type: ambient; intensity: 0.4'
                  }),
                  cE(Entity, {
                      light: 'type: directional; intensity:0.6',
                      position: '0 1 1'
                  }),
                  // Example controllers
                  cE(Entity, {
                      'laser-controls' : 'hand: right',
                      raycaster: 'objects: .clickable; far: 10; showLine: true',
                      line:'color: blue; opacity: 0.75'
                  }),
                  // Lost session warning
                  cE(AppStatus, {
                      isClosed: this.state.isClosed
                  }),
                  // Device UI example
                  cE(Example, {
                      ctx: this.props.ctx,
                      counter: this.state.counter,
                      increment: this.state.increment,
                      deviceInfo: this.state.deviceInfo
                  }),
                 );
    }
};

module.exports = MyApp;

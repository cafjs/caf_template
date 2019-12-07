"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var AppReducer = require('./reducers/AppReducer');
var AppSession = require('./session/AppSession');
var cE = React.createElement;
var MyApp = require('./components/MyApp');

var main = exports.main = async function(data) {
    if (typeof window !== 'undefined') {
        var ctx =  {
            store: redux.createStore(AppReducer)
        };
        try {
            await AppSession.connect(ctx);
            ReactDOM.render(cE(MyApp, {ctx: ctx}),
                            document.getElementById('content'));
        } catch (err) {
            document.getElementById('content').innerHTML =
                    '<H1>Cannot connect: ' + err + '<H1/>';
            console.log('Got error initializing: ' + err);
        }
    }
};

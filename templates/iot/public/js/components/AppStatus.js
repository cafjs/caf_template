const React = require('react');
const rB = require('react-bootstrap');
const cE = React.createElement;

class AppStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let color = (this.props.isClosed ? 'text-danger' : 'text-success');
        return cE(rB.Glyphicon, {glyph: 'heart', className: color});
    }
};

module.exports = AppStatus;

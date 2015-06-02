var React = require('react');
var classNames = require('classnames');

var VBox = React.createClass({
    render: function () {
        var styles = {
            main : 'vbox'
        };
        var classes = classNames(styles.main, this.props.className)
        return <div style={this.props.style} id={this.props.id} className={classes}>{this.props.children}</div>;
    }
});

module.exports = VBox;

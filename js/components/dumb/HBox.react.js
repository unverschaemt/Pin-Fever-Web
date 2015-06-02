var React = require('react');
var classNames = require('classnames');

var HBox = React.createClass({
    render: function () {
        var styles = {
            main : 'hbox'
        };
        var classes = classNames(styles.main, this.props.className)
        return <div style={this.props.style} id={this.props.id} className={classes}>{this.props.children}</div>;
    }
});

module.exports = HBox;

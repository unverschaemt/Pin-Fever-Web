var React = require('react');
var AuthActions = require('../../actions/AuthActions.js');
var AuthStore = require('../../stores/AuthStore.js');
var ColorScheme = require('../../constants/PinFeverColorScheme.js');
var VBox = require('../dumb/VBox.react');
var Page = require('../dumb/Page.react');
//style="font-size: 30px; font-family: UnverschaemtSans"
var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    statics: {
        willTransitionTo: function (transition, params) {
            if (AuthStore.loggedIn()) {
                transition.redirect('app');
            }
        }
    },

    getInitialState: function () {
        return {
            error: '',
            wait: false
        };
    },

    componentDidMount: function () {
        AuthStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AuthStore.removeChangeListener(this._onChange);
    },

    login: function (e) {
        e.preventDefault();
        var email = React.findDOMNode(this.refs.email).value;
        var password = React.findDOMNode(this.refs.password).value;
        AuthActions.login(email, password);
    },

    _onChange: function () {
        if (AuthStore.loggedIn()) {
            var q = this.context.router.getCurrentQuery();
            if (q.nextPath) {
                this.context.router.transitionTo(q.nextPath);
            } else {
                this.context.router.transitionTo('app');
            }

        }
        this.setState(AuthStore.getLoginState());
    },

    render: function () {
        var classes = {
            page : 'vbox',
            form: 'animated center-main-axis align-items-stretch'
        };
        var styles = {
            page: {
                backgroundColor: ColorScheme.PRIMARY_DARK,
                padding: 20
            },
            form : {
                MozBoxFlex: 1,
                WebkitBoxFlex: 1,
                msFlex: 1,
                WebkitFlex : 1,
                flex: 1,
                padding: "0 30%"
            },
            submit: {
                backgroundColor: ColorScheme.PRIMARY
            }
        }
        return (
            <Page id="login" className={classes.page} style={styles.page}>
                <div>
                    <h1>Pin Fever</h1>
                    <p>Please login with your Pin Fever account.</p>
                </div>
                <VBox className={classes.form} style={styles.form}>
                    <input ref="email" type="text" placeholder="E-Mail"/>
                    <input ref="password" type="password" placeholder="Password"/>
                    <br/>
                    <input style={styles.submit} type="submit" onClick={this.login} value="Login" />
                </VBox>
            </Page>
        );
    }

});

module.exports = Login;

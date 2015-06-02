var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var Route = Router.Route;
var Redirect = Router.Redirect;

var PinFever = require('./components/smart/PinFever.react');
var Login = require('./components/smart/Login.react');
var Logout = require('./components/smart/Logout.react');

var routes = (
        <Route name="main">
            <Route handler={Login} name="login" path="/login"/>
            <Route handler={Logout} name="logout" path="/logout"/>
            <Route handler={PinFever} name="app" path="/app">
                <Redirect from="/" to="login"/>
            </Route>
        </Route>
);

module.exports = routes;

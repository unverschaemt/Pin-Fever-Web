var AppDispatcher = require('../dispatcher/AppDispatcher');
var superagent = require('superagent');
var EventEmitter = require('events').EventEmitter;
var PinFeverConstants = require('../constants/PinFeverConstants');
var PinFeverServer = require('../constants/PinFeverServer');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var loginState = {
    error: '',
    wait: false
};

var AuthStore = assign({}, EventEmitter.prototype, {

    login: function(email, password) {
        loginState.wait = true;
        superagent.post(PinFeverServer.url + PinFeverServer.routes.login)
            .set("Content-type", "application/json")
            .send({
                email: email,
                password: password
            })
            .end(function(err, data) {
                loginState.wait = false;
                if (err) {
                    loginState.error = 'Login connection failed!';
                    AuthStore.emitChange();
                    console.log(data);
                    return console.error('Connection Failed');
                }
                var res = JSON.parse(data.text);
                if (res.data.token == null || res.data.token.length < 1) {
                    loginState.error = 'Login failed!';
                    AuthStore.emitChange();
                    return console.error('Failed');
                }
                localStorage.token = res.data.token;
                loginState.error = '';
                AuthStore.emitChange();
                return console.info('Login good!');
            });
    },

    logout: function(cb) {
        delete localStorage.token;
    },

    loggedIn: function() {
        return !!localStorage.token;
    },

    getLoginState: function() {
        return loginState;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch (action.actionType) {
        case PinFeverConstants.LOGIN_POST:
            AuthStore.login(action.email, action.password);
            break;

        case PinFeverConstants.LOGIN_FAIL:

            AuthStore.emitChange();
            break;

        case PinFeverConstants.LOGIN_SUCCESS:

            AuthStore.emitChange();
            break;

        default:
            // no op
    }
});

module.exports = AuthStore;

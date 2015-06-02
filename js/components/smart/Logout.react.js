
var React = require('react');
var LoginActions = require('../../actions/AuthActions.js');
var LoginStore = require('../../stores/AuthStore.js');
//style="font-size: 30px; font-family: UnverschaemtSans"
var Logout = React.createClass({
    contextTypes: {
       router: React.PropTypes.func
    },

    statics: {
      willTransitionTo: function (transition, params) {
         LoginStore.logout();
           //transition.abort();
         transition.redirect('login');

       }
    },

    render: function () {
        return (
           <div className={'center'}>
               Logging out!
          </div>
        );
    }

});

module.exports = Logout;

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

 var React = require('react');
 var Router = require('react-router');
 var routes = require('./Routes.react.js');

 Router.run(routes, function (Handler) {
   React.render(<Handler/>, document.getElementById('pinfever-app'));
 });

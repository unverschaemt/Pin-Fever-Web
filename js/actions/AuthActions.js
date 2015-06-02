/*
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var PinFeverConstants = require('../constants/PinFeverConstants');

var AuthActions = {

  login: function(email, password) {
    AppDispatcher.dispatch({
      actionType: PinFeverConstants.LOGIN_POST,
      email: email,
      password: password
    });
  },

};

module.exports = AuthActions;

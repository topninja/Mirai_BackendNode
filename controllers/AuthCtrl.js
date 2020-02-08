'use strict';

const authModel = require('../models/AuthModel');

/**
 * Simple Authenticate
 */
exports.auth = (req, res, next) => {
  if (!req.headers.mirai_token) {
    return next(401);
  } else {
    authModel.auth(req.headers.mirai_token, (err, user_info) => {
      if (err) {
        return next(10403);
      } else {
        // Success
        req.user = user_info;
        return next();
      }
    });
  }
};
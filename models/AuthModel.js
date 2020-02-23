'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const pool = config.pool;

/**
 *  Authenticate
 *  @param: token
 */
exports.auth = (token, done) => {
  jwt.verify(token, config.jwt.cert, (err, decoded) => {
    if (err) {
      switch (err.message) {
        case 'jwt expired': return done(10401);
        case 'invalid token': return done(10403);
        default: return done(err.message);
      }
    } else {
      const sql =
        `
        SELECT *
        FROM tbl_user
        WHERE ip = ? AND device_id = ? AND device_type = ?
        `;

      pool.query(sql, [decoded.ip, decoded.device_id, decoded.device_type], (err, rows) => {
        if (err) {
          return done(err);
        } else {
          if (rows.length === 0) {
            return done(401);
          } else {
            // Authenticate
            return done(null, rows[0]);
          }
        }
      })
    }
  });
};

exports.logineduser = (token, done) => {
  jwt.verify(token, config.jwt.cert, (err, decoded) => {
    if (err) {
      switch (err.message) {
        case 'jwt expired': return done(10401);
        case 'invalid token': return done(10403);
        default: return done(err.message);
      }
    } else {
      console.log(decoded);
      const sql =
        `
        SELECT *
        FROM tbl_user
        WHERE chat_id = ?
        `;

      pool.query(sql, [decoded.chat_id], (err, rows) => {
        if (err) {
          return done(err);
        } else {
          if (rows.length === 0) {
            return done(401);
          } else {
            // Authenticate
            return done(null, rows[0]);
          }
        }
      })
    }
  });
};
'use strict';

const pool = require('../config/config').pool;

/**
 * Create User for first user
 * @param: user_data = { ip, device_id, device_type }
 */
exports.getStep = (step_id) => {
    return new Promise((resolve, reject) => {
        const sql =
          `
          SELECT * FROM tbl_steps WHERE id = ?
          `;
        pool.query(sql, step_id, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]);
          }
        });
      }
    );
  };
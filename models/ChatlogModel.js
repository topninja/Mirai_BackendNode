'use strict';

const pool = require('../config/config').pool;

exports.AddLog  = (chat_id, answer, answer_id, chat_in_out, chat_step_id) => {
    let now = date2str(new Date(), 'yyyy-MM-dd h:m:s');
    return new Promise((resolve, reject) => {
        const sql =
          `
          INSERT INTO tbl_chatlog (chat_id, answer, answer_id, chat_in_out, chat_step_id, created_at) VALUES (?, ? , ? , ? , ?, ?)
          `;
        pool.query(sql, [chat_id, answer, answer_id, chat_in_out, chat_step_id, now], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows.affectedRows === 1){
                resolve(rows.insertId);
            }
            reject("tbl_chatlog add error");
          }
        });
      }
    );
}

exports.GetLog  = (chat_id) => {
  return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT * FROM tbl_chatlog WHERE chat_id = ?
        `;
      pool.query(sql, chat_id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  );
}

exports.GetLogDateById  = (id) => {
  return new Promise((resolve, reject) => {
      const sql =
        `
        SELECT created_at FROM tbl_chatlog WHERE id = ?
        `;
      pool.query(sql, id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    }
  );
}

function date2str(x, y) {
  var z = {
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
  };
  y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
      return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
  });

  return y.replace(/(y+)/g, function(v) {
      return x.getFullYear().toString().slice(-v.length)
  });
}
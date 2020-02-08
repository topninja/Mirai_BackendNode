'use strict';

const pool = require('../config/config').pool;

exports.AddLog  = (chat_id, answer, answer_id, chat_in_out, chat_step_id) => {
    return new Promise((resolve, reject) => {
        const sql =
          `
          INSERT INTO tbl_chatlog (chat_id, answer, answer_id, chat_in_out, chat_step_id) VALUES (?, ? , ? , ? , ?)
          `;
        pool.query(sql, [chat_id, answer, answer_id, chat_in_out, chat_step_id], (err, rows) => {
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
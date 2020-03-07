'use strict';

exports.insertHoroscope = async (data) => {
  return new Promise((resolve, reject) => {
    const pool = require('../config/config').pool;
    const sql =
        `
        UPDATE tbl_horoscopes SET love_luck = ? , work_study = ?, healthy_beauty = ? WHERE name_en = ?
        `;
    pool.query(sql, [data.love_luck, data.work_study, data.healthy_beauty, data.name_en], (err, rows) => {
      if (err) {
        reject(Error(err));
      } else {
        resolve(rows);
      }
    });
  });
};

exports.getHoroscope = (birth) => {
  return new Promise((resolve, reject) => {
    const pool = require('../config/config').pool;
    const sql =
        `
        SELECT * FROM tbl_horoscopes
        WHERE tbl_horoscopes.start_date <= ? AND tbl_horoscopes.end_date >= ?
        `;
    birth = new Date(birth);
    birth = 2020 + "-" + (birth.getMonth() + 1) + "-" + birth.getDate();

    pool.query(sql, [birth, birth], (err, rows) => {
      if (err) {
        reject(Error(err));
      } else {
        resolve(rows[0]);
      }
    });
  });
};




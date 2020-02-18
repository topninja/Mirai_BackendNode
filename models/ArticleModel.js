'use strict';

const pool = require('../config/config').pool;

/**
 * Fetch All Aricles for Admin
 */

exports.AllArticles = () => {
    return new Promise((resolve, reject) => {
      const sql =
            `
              SELECT * FROM tbl_articles
            `;
      
      pool.query(sql, async (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve (rows);
        }
      });
    });
  }

  exports.getArticle = (id) => {
    return new Promise((resolve, reject) => {
      const sql =
            `
              SELECT * FROM tbl_articles WHERE id = ?
            `;
      
      pool.query(sql,[id], async (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve ({
            id:rows[0].id,
            name:rows[0].name,
            summary:rows[0].summary,
            content:rows[0].content,
            article_type:rows[0].article_type,
            thumbnail_url: rows[0].thumbnail_url,
          });
        }
      });
    });
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
  
exports.saveArticle = async (article_data) => {
    return new Promise((resolve, reject) => {
      let now = date2str(new Date(), 'yyyy-MM-dd');
      console.log(article_data)
      const sql =
          `
          INSERT INTO tbl_articles (name, summary, content, article_type, thumbnail_url,created_at) VALUES (?,?,?,?,?,?)
          `;
        pool.query(sql, [article_data.name,article_data.summary,article_data.content,article_data.article_type,article_data.thumbnail_url,now ], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
    });
}

exports.updateArticle = async(article_data,id)=> {
  return new Promise((resolve, reject) => {
    let now = date2str(new Date(), 'yyyy-MM-dd');
    console.log(article_data)
    if (!article_data.thumbnail_url)
    {
      const sql =
        `
        UPDATE tbl_articles SET 
        name='${article_data.name}' , 
        summary='${article_data.summary}' , 
        content='${article_data.content}' ,
        article_type='${article_data.article_type}',
        updated_at='${now}'
        WHERE id=${id}
        `;
        console.log(sql);
      pool.query(sql , (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } else {
      const sql =
        `
        UPDATE tbl_articles SET 
        name='${article_data.name}' , 
        summary='${article_data.summary}' , 
        content='${article_data.content}' ,
        article_type='${article_data.article_type}',
        thumbnail_url='${article_data.thumbnail_url}',
        updated_at='${now}'
        WHERE id=${id}
        `;
      pool.query(sql , (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    }
  });
}
  
 
exports.deleteArticle = async (id) => {
  return new Promise((resolve, reject) => {
    let now = date2str(new Date(), 'yyyy-MM-dd');
   
    const sql =
        `
        DELETE FROM tbl_articles WHERE id=${id}
        `;
      pool.query(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
  });
}
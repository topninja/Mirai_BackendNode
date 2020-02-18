

const config = require('../config/config');
const userModel = require('../models/UserModel');
const articleModel = require('../models/ArticleModel');
const shortid = require('shortid');
const path = require('path');
var multer  =   require('multer');  
var fs = require('fs');
var upload_file = require('../lib/fileUpload.js');
var upload_image = require('../lib/imageUpload.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/thumbnails')
  },
  filename: function (req, file, cb) {
     cb(null, shortid.generate() + path.parse(file.originalname).ext  )
  }
})
 
var upload = multer({ storage: storage }).single('thumbnail');  

exports.auth = (req,res,next) => {
  if (req.session.loggedIn == "true") {
    return next();
  } else {
    return res.redirect('/admin/login');
  }
};

exports.home = (req, res,next) => {
  console.log("session",req.session);
    if (req.session.loggedIn == "true") {
      return res.redirect('/admin/users');
    } else {
      return res.redirect('/admin/login');
    }
}

exports.users = (req, res,next) => {
    
    userModel.AllUsers()
        .then( (users)=> {
            console.log(users)
            return res.render('index',{users:users,loggedin:'true'});
        })
        .catch( (error) => {
            // oops, mom don't buy it
            console.log(error.message);
            next(404);
        // output: 'mom is not happy'
        });
}

exports.login = (req, res,next) => {
  return res.render('login',{loggedin:'false'});
}

exports.logout = (req,res,next) => {
  req.session.loggedIn = 'false';
  return res.redirect('/admin')
}

exports.loginAttempt = (req, res,next) => {
  let password = req.body.password;
  console.log(password);
  if (password !='123456') {
    return res.redirect('/admin/login?message=' + encodeURIComponent('Wrong Password!'));    
  } else {
    req.session.loggedIn = 'true';
    return res.redirect('/admin');
  }
  
}

exports.article = (req,res,next) => {

    articleModel.AllArticles()
        .then( (articles)=> {
            return res.render('article',{articles:articles,loggedin:'true'});
        })
        .catch( (error) => {
            // oops, mom don't buy it
            console.log(error.message);
            next(404);
        // output: 'mom is not happy'
        });
}

exports.addArticle = (req,res,next) => {
    return res.render('article_add',{loggedin:'true'});
}

exports.fileUpload = (req,res) => {
  var hostname = req.headers.origin;
  upload_file(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    let url=hostname+"/uploads/froala/" +path.parse(data.link).name+path.parse(data.link).ext;
    res.send({link:url});
  });
  
}

exports.imageUpload= (req,res,next)=> {
  
  var hostname = req.headers.origin;
  
  upload_image(req, function(err, data) {

    if (err) {
      return res.status(404).end(JSON.stringify(err));
    }
    let url=hostname+"/uploads/froala/" +path.parse(data.link).name+path.parse(data.link).ext;
    console.log(url)
    res.send({link:url});
  });
}


exports.saveArticle = (req,res,next) => {
      upload(req,res,function(err) {  
          
          if(err) {
            return next(err); 
          } else {
              if (!req.file)
                return res.send("Image uploading failed")
              let thumbnail_url ="uploads/thumbnails/" +path.parse(req.file.path).name+path.parse(req.file.path).ext;
              const article_data = {
                name : req.body.name, 
                summary : req.body.summary,
                content : req.body.content,
                article_type : req.body.type,
                thumbnail_url : thumbnail_url ,
              };
              articleModel.saveArticle(article_data)
                .then((success)=>{
                  res.redirect('/admin/article');
                })
                .catch((err)=>{
                  next(err)
              })            
          }
        });         
}


exports.updateArticle = (req,res,next) => {
    upload(req,res,function(err) {  
            
      if(err) {
        return next(err); 
      } else {
       
        let article_data;
          if (!req.file)
          {
            article_data = {
              name : req.body.name, 
              summary : req.body.summary,
              content : req.body.content,
              article_type : req.body.type,
            };  
          } else {
            let thumbnail_url ="uploads/thumbnails/" +path.parse(req.file.path).name+path.parse(req.file.path).ext;
            article_data = {
              name : req.body.name, 
              summary : req.body.summary,
              content : req.body.content,
              article_type : req.body.type,
              thumbnail_url: thumbnail_url              
            };  
          }
          
          articleModel.updateArticle(article_data,req.body.id)
            .then((success)=>{
              res.redirect('/admin/article');
            })
            .catch((err)=>{
              next(err)
          })            
      }
  });   
}


exports.editArticle = (req,res,next) => {
  console.log(req.params.id);
  articleModel.getArticle(req.params.id)
    .then((article_data)=>{
      console.log(article_data)
      return res.render('article_edit',{article_data:article_data,loggedin:'true'});
    })
    .catch((err)=>{
      next(err)
    })
}
exports.deleteArticle = (req,res,next) => {

  articleModel.deleteArticle(req.params.id)
    .then((suc)=>{
       return res.redirect('/admin/article'); 
    })
    .catch((err)=> {
      next(err)
    })

}
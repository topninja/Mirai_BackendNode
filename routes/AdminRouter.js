'use strict';

const controller = require('../controllers');
const AdminCtrl = controller.AdminCtrl;

module.exports = (router) => {
 
  // user list
  router.route('/').get( AdminCtrl.home );
  
   // login interface
   router.route('/login').get( AdminCtrl.login );
   router.route('/login').post( AdminCtrl.loginAttempt );

   //logout
  router.route('/logout').get( AdminCtrl.logout );
   //users list
   router.route('/users').get( AdminCtrl.auth, AdminCtrl.users );
  
  // article index
  router.route('/article').get(AdminCtrl.auth, AdminCtrl.article );

  // add new article 
  router.route('/article/new').get(AdminCtrl.auth, AdminCtrl.addArticle );

  // save new article 
  router.route('/article/save').post( AdminCtrl.auth,AdminCtrl.saveArticle );

  //edit article
  router.route('/article/edit/:id').get(AdminCtrl.auth, AdminCtrl.editArticle );

  //update article
  router.route('/article/update').post( AdminCtrl.auth,AdminCtrl.updateArticle );

  //delete article
  router.route('/article/delete/:id').get(AdminCtrl.auth, AdminCtrl.deleteArticle );

  //wsyiwyg editor file upoad save and return url
  router.route('/fileUpload').post(AdminCtrl.fileUpload);

  //wsyiwyg editor image upoad save and return url
  router.route('/imageUpload').post(AdminCtrl.imageUpload);
  
  return router;
};
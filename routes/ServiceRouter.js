'use strict';

const validate = require('express-validation');
const ParamValidation = require('../config/ParamValidation');

const controller = require('../controllers');
const UserCtrl = controller.UserCtrl;
const AuthCtrl = controller.AuthCtrl;
const ChatCtrl = controller.ChatCtrl;

module.exports = (router) => {
  // User check if user logined before or not
  router.route('/existingcustomer')
    .post(validate(ParamValidation.user_existingcustomer), UserCtrl.existingCustomer);
  // first user
  router.route('/hello')
    .post(validate(ParamValidation.user_hello), UserCtrl.crateUser);
  
  // start chat 1 for first user
  router.route('/startchat1')
   .get(AuthCtrl.auth, validate(ParamValidation.startchat), ChatCtrl.startchat1);
  
  // start chat 2 for first user
  router.route('/startchat2')
   .get(AuthCtrl.auth, validate(ParamValidation.startchat), ChatCtrl.startchat2);

  // start chat 3 for first user
  router.route('/startchat3')
   .get(AuthCtrl.auth, validate(ParamValidation.startchat), ChatCtrl.startchat3);

  // normal chat flow
  router.route('/chat')
   .post(AuthCtrl.auth, validate(ParamValidation.startchat), ChatCtrl.chat);
  
  router.route('/chatlog')
    .get(AuthCtrl.auth, validate(ParamValidation.startchat), ChatCtrl.chatlog);
  
    //for logined user
  router.route('/startchat')
    .get(AuthCtrl.auth, validate(ParamValidation.startchat), ChatCtrl.startchat);

  // router.route('/user/sign-up')
  //   .post(validate(ParamValidation.user_sign_up), UserCtrl.signUp);
  // router.route('/user/sign-in')
  //   .post(validate(ParamValidation.user_sign_in), UserCtrl.signIn);

  // // Board
  // router.route('/board')
  //   .get(BoardCtrl.list)
  //   .post(AuthCtrl.auth, validate(ParamValidation.board_write), BoardCtrl.write);
  // router.route('/board/:board_id')
  //   .get(AuthCtrl.auth, validate(ParamValidation.board_read), BoardCtrl.read);
  // router.route('/board/:board_id/comment')
  //   .post(AuthCtrl.auth, validate(ParamValidation.board_comment), BoardCtrl.commentWrite);

  return router;
};
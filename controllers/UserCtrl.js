'use strict';

const config = require('../config/config');
const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');


/**
 * Existingcustomer api  for check user registered or not
 */
exports.existingCustomer = async (req, res, next) => {
  let result = '';
  
  try {
    const user_data = {
      ip: req.body.ip,
      device_id : req.body.device_id,
      device_type: req.body.device_type
    };

    result = await userModel.existingCustomer(user_data);

  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};

//make token for first user
exports.crateUser = async (req, res, next) => {
  let result = {};
  
  try {
    const user_data = {
      ip: req.body.ip,
      device_id : req.body.device_id,
      device_type: req.body.device_type
    };

    userModel.createUser(user_data).then((user_info)=>{
      result.mirai_token = jwt.sign(user_info, config.jwt.cert, {expiresIn: '10h'});
      return res.json(result);
    });

  } catch (error) {
    return next(error);
  }  
};



// /**
//  * Sign Up
//  */
// exports.signUp = async (req, res, next) => {
//   let result = '';
//   console.log("debug here");

//   try {
//     const user_data = {
//       user_id: req.body.user_id,
//       password: config.doCipher(req.body.password)
//     };

//     result = await userModel.signUp(user_data);

//   } catch (error) {
//     return next(error);
//   }

//   // success
//   return res.json(result);
// };

// /**
//  * Sign In
//  */
// exports.signIn = async (req, res, next) => {
//   let result = {};

//   try {
//     const user_data = {
//       user_id: req.body.user_id,
//       password: config.doCipher(req.body.password)
//     };

//     result.user_info = await userModel.signIn(user_data);
//     result.token = jwt.sign(result.user_info, config.jwt.cert, {expiresIn: '10h'});

//   } catch (error) {
//     return next(error);
//   }

//   // success
//   return res.json(result);
// };
const Joi = require('joi');

module.exports = {
  /**
   * User Validation
   */
  //POST - /existingcustomer
  user_existingcustomer: {
    body: {
      ip: Joi.string().required(),
      device_id: Joi.string().required(),
      device_type : Joi.string().required()
    }
  },

  //POST - /user_hello
  user_hello: {
    body: {
      ip: Joi.string().required(),
      device_type : Joi.string().required()
    }
  },

  //POST - /login
  user_login: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required()
    }
  },

  //GET - /startchat1
  startchat: {
    header:{
      mirai_token : Joi.string().required()
    },
    body: {
      
    }
  }
};
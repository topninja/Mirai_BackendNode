'use strict';

const chatModel = require('../models/ChatModel.js');
const userModel = require('../models/UserModel');
const chatlogModel = require('../models/ChatlogModel');

const chatStepCount = 15;
//美容が好きなだけ : normal user that like beauty
//"ネイリスト", "アイリスト",  "エステティシャン",  "ヘアスタイリスト"  //  expert that woks in salon
const jobArray = ['美容が好きなだけ', 'ネイリスト', 'アイリスト', 'エステティシャン', 'ヘアスタイリスト'];
const topicArray = ['コスメ・最新美容情報', 'ネイル・アイラッシュ', '恋愛', 'スピリチュアル'];
//chat_log table :  chat_in_out  1: in backend(is_backend : 0),     0; out  to frontend (is_backend:1)
//step_id = 1
exports.startchat1 = async (req, res, next) => {
  let result = {}
  try{
    let step = await chatModel.getStep(1);
    // initial step_id is 1 so we send 1
    await userModel.step_id_increase(req.user.id, 1);
    let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, 1);
    result = {
      chat_id : insertId,
      text : step.step_text,
      input_type : step.step_input_type,
      is_backend : 1
    }
  }
  catch(err){
    return next(err)
  }
  return res.json(result);
}

//step_id = 2
exports.startchat2 = async (req, res, next) => {
  let result = {}
  try{
    let step = await chatModel.getStep(2);
    // initial step_id is 2 so we send 2
    await userModel.step_id_increase(req.user.id, 2);
    let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, 2);
    result = {
      chat_id : insertId,
      text : step.step_text,
      input_type : step.step_input_type,
      is_backend : 1
    }
  }
  catch(err){
    return next(err)
  }
  return res.json(result);
}

//step_id = 3
exports.startchat3 = async (req, res, next) => {
  let result = {}
  try{
    let step = await chatModel.getStep(3);
    // initial step_id is 3 so we send 3
    await userModel.step_id_increase(req.user.id, 3);
    let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, 3);
    result = {
      chat_id : insertId,
      text : step.step_text,
      input_type : step.step_input_type,
      place_holder : step.step_placeholder,
      is_backend : 1
    }
  }
  catch(err){
    return next(err)
  }
  return res.json(result);
}

exports.chatlog = async (req, res, next) => {
  let result = [];
  let log = await chatlogModel.GetLog(req.user.chat_id);
  for (var i in log){
    //chat_in_out == 0 then send chat to frontend from backend  if send message by step_id
    if (log[i].chat_in_out == 0){
      let step = await chatModel.getStep(log[i].chat_step_id);
      var onelog = {
        chat_id : log[i].id,
        is_backend : 1,
        chat_step_id : log[i].chat_step_id,
        step_content : {
          step_text : step.step_text,
          step_input_type : step.step_input_type,
          step_message_type: step.step_message_type,
          step_placeholder: step.step_placeholder,
          step_option_list: step.step_option_list,
          step_gallery_list: step.step_gallery_list,
          step_article_list: step.step_article_list
        }
      }
      result.push(onelog);
    }
    else {
      var onelog = {
        chat_id : log[i].id,
        answer : log[i].answer,
        answer_id : log[i].answer_id,
        is_backend : 0,
        chat_step_id : log[i].chat_step_id
      }
      result.push(onelog);
    }
  }
  return res.json(result);
}

exports.chat = async (req, res, next) => {
  let result = {};
  
  try {
      let step_id = req.user.step_id;
      
      switch(step_id){
        case 4:
          // name input
          if (req.body.answer && req.body.input_type === "input"){
            await userModel.addName(req.user.id, req.body.answer);
          }
          else return next(9401);
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, null, 1, step_id);
          break;
        case 5:
          // answer_id : 0 Yes,  answer_id : 1 No
          await chatlogModel.AddLog(req.user.chat_id, null, req.body.answer_id, 1, step_id);

          if (req.body.answer_id && req.body.input_type === "input"){
            if (parseInt(req.body.answer_id) === 1){
              step_id = parseInt(step_id) + 1;
            }
          }
          else return next(9401);
          break;
        case 6:
          // nick name insert
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

          if (req.body.answer && req.body.input_type === "input"){
            await userModel.addNickName(req.user.id, req.body.answer);
          }
          else return next(9401);
          break;
        case 7:
          // birthday insert
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

          if (req.body.answer && req.body.input_type === "input"){
            await userModel.addBirthday(req.user.id, req.body.answer);
          }
          else return next(9401);
          break;
        case 8:
          // horoscope send message answer_id = 0 : Yes, 1 : No
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

          if (req.body.answer_id && req.body.input_type === "input"){
            if (parseInt(req.body.answer_id) === 0){
              // Yes
              await userModel.addHoroscope(req.user.id);
            }
          }
          else return next(9401);
          break;
        case 9:
          // tel number insert
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

          if (req.body.answer && req.body.input_type === "input"){
            await userModel.addTel(req.user.id, req.body.answer);
          }
          else return next(9401);
          break;
        case 10:
          // email
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

          if (req.body.answer && req.body.input_type === "input"){
            await userModel.addEmail(req.user.id, req.body.answer);
          }
          else return next(9401);
          break;
        case 11:
          // postal code
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);
          
          if (req.body.answer && req.body.input_type === "input"){
            await userModel.addPostalCode(req.user.id, req.body.answer);
          }
          else return next(9401);
          break;
        case 12:
          // salon work?  like beauty?
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);
          
          if (req.body.answer_id && req.body.input_type === "input"){
            if (parseInt(req.body.answer_id) === 0){
              // like beauty
              await userModel.addJob(req.user.id, jobArray[0]);
              step_id = parseInt(step_id) + 1;
            }
          }
          else return next(9401);
          break;
        case 13:
          // what's your genre of salon work, as an expert?
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);
          
          if (req.body.answer_id && req.body.input_type === "input"){
            let job_id = parseInt(req.body.answer_id) + 1;
            await userModel.addJob(req.user.id, jobArray[job_id]);
          }
          else return next(9401);
          break;
        case 14:
          // what's your favorite topic ?
          await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);
          
          if (req.body.answer_id && req.body.input_type === "input"){
            let topic_id = parseInt(req.body.answer_id);
            await userModel.addFavoriteTopic(req.user.id, topicArray[topic_id]);
          }
          else return next(9401);
          break;
        case 15:
            result.article_list = [];
            break;
      }
      
      // if user's step_id < 15 then go to next step
      if (step_id < 15) {
        step_id = await userModel.step_id_increase(req.user.id, step_id);
      }
      let step = await chatModel.getStep(step_id);
      
      // add user's chat log
      // horoscope process handler as birthday  step : 6
      let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, step_id - 1);
      result.chat_id = insertId;
      result.is_backend = 1;
      if (step.step_text) result.text = step.step_text;
      if (step.step_input_type) result.input_type = step.step_input_type;
      if (step.step_message_type) result.message_type = step.step_message_type;
      if (step.step_placeholder) result.place_holder = step.step_placeholder;
      if (step.step_option_list) result.option_list = step.step_option_list;
      if (step.step_gallery_list) result.gallery_list = step.step_gallery_list;

  } catch (error) {
    return next(error);
  }
  return res.json(result);
};
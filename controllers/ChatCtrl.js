'use strict';

const chatModel = require('../models/ChatModel.js');
const userModel = require('../models/UserModel');
const chatlogModel = require('../models/ChatlogModel');
const HoroscopeModel = require('../models/HoroscopeModel');
const moment = require('moment')
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const chatStepCount = 15;
//美容が好きなだけ : normal user that like beauty
//"ネイリスト", "アイリスト",  "エステティシャン",  "ヘアスタイリスト"  //  expert that woks in salon
const jobArray = ['美容が好きなだけ', 'ネイリスト', 'アイリスト', 'エステティシャン', 'ヘアスタイリスト'];
const topicArray = ['コスメ・最新美容情報', 'ネイル・アイラッシュ', '恋愛', 'スピリチュアル'];
//chat_log table :  chat_in_out  1: in backend(is_backend : 0),     0; out  to frontend (is_backend:1)
//step_id = 1

exports.startchat1 = async(req, res, next) => {
    let result = {}
    try {
        let step = await chatModel.getStep(1);
        // initial step_id is 1 so we send 1
        await userModel.step_id_increase(req.user.id, 0);
        let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, 1);
        result = {
            chat_id: insertId,
            text: step.step_text,
            input_type: step.step_input_type,
            is_backend: 1
        }
        result.created_date = await chatlogModel.GetLogDateById(insertId);
        result.created_date = result.created_date.created_at;
        result.created_date = moment(result.created_date, 'YYYY-MM-DD h:m:s', 'en', true).toISOString();
        result.created_date = moment(result.created_date).format("YYYY年MM月DD日 hh:mm");
    } catch (err) {
        return next(err)
    }
    return res.json(result);
}

//step_id = 2
exports.startchat2 = async(req, res, next) => {
    let result = {}
    try {
        let step = await chatModel.getStep(2);
        // initial step_id is 2 so we send 2
        await userModel.step_id_increase(req.user.id, 1);
        let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, 2);
        result = {
            chat_id: insertId,
            text: step.step_text,
            input_type: step.step_input_type,
            is_backend: 1
        }
        result.created_date = await chatlogModel.GetLogDateById(insertId);
        result.created_date = result.created_date.created_at;
        result.created_date = moment(result.created_date, 'YYYY-MM-DD h:m:s', 'en', true).toISOString();
        result.created_date = moment(result.created_date).format("YYYY年MM月DD日 hh:mm");
    } catch (err) {
        return next(err)
    }
    return res.json(result);
}

//step_id = 3
exports.startchat3 = async(req, res, next) => {
    let result = {}
    try {
        let step = await chatModel.getStep(3);
        // initial step_id is 3 so we send 3
        await userModel.step_id_increase(req.user.id, 2);
        let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, 3);
        result = {
            chat_id: insertId,
            text: step.step_text,
            input_type: step.step_input_type,
            place_holder: step.step_placeholder,
            is_backend: 1
        }
        result.created_date = await chatlogModel.GetLogDateById(insertId);
        result.created_date = result.created_date.created_at;
        result.created_date = moment(result.created_date, 'YYYY-MM-DD h:m:s', 'en', true).toISOString();
        result.created_date = moment(result.created_date).format("YYYY年MM月DD日 hh:mm");
    } catch (err) {
        return next(err)
    }
    return res.json(result);
}

exports.chatlog = async(req, res, next) => {
    let result = [];
    let log = await chatlogModel.GetLog(req.user.chat_id);
    for (var i in log) {
        //chat_in_out == 0 then send chat to frontend from backend  if send message by step_id
        var onelog = {};
        if (log[i].chat_in_out == 0) {
            let step = await chatModel.getStep(log[i].chat_step_id);
            //if birthday, change the content of horoscope of text
            if (log[i].chat_step_id == 8){
                var birth;
                for (var k in result){
                    if (result[k].chat_step_id == 7 && result[k].is_backend == 0){
                        birth = result[k].answer;
                    }
                }
                birth = moment(moment.utc(birth, 'YYYY年MM月DD日', 'en', 'true').format("YYYY-MM-DD"));
                var horoscope_content = await HoroscopeModel.getHoroscope(birth);
                step.step_text = step.step_text.replace("(Horoscope)", horoscope_content.name_jp);
                step.step_text = step.step_text.replace("(Horoscope)", horoscope_content.name_jp);
                var horo_content = "恋愛運 : " + horoscope_content.love_luck + "\r\n, ";
                horo_content += "仕事・勉強運 : " + horoscope_content.work_study + "\r\n, "
                horo_content += "ヘルス&ビューティー運 : " + horoscope_content.healthy_beauty + "\r\n"
                step.step_text = step.step_text.replace("(horoscope_content)", horo_content);
                onelog = {
                    chat_id: log[i].id,
                    is_backend: 1,
                    chat_step_id: log[i].chat_step_id,
                    text: step.step_text
                }
            }
            else onelog = {
                chat_id: log[i].id,
                is_backend: 1,
                chat_step_id: log[i].chat_step_id,
                text: step.step_text
            }
            if (step.step_en) onelog.text_en = step.step_en;
            if (step.step_input_type) onelog.input_type = step.step_input_type;
            if (step.step_message_type) onelog.message_type = step.step_message_type;
            if (step.step_placeholder) onelog.place_holder = step.step_placeholder;
            if (step.step_option_list) onelog.option_list = step.step_option_list;
            if (step.step_gallery_list) onelog.gallery_list = step.step_gallery_list;
        } else {
            onelog = {
                chat_id: log[i].id,
                answer: log[i].answer,
                answer_id: log[i].answer_id,
                is_backend: 0,
                chat_step_id: log[i].chat_step_id
            }
        }
        onelog.created_date = await chatlogModel.GetLogDateById(log[i].id);
        onelog.created_date = onelog.created_date.created_at;
        onelog.created_date = moment(onelog.created_date, 'YYYY-MM-DD h:m:s', 'en', true).toISOString();
        onelog.created_date = moment(onelog.created_date).format("YYYY年MM月DD日 hh:mm");
        result.push(onelog);
    }
    return res.json(result);
}

exports.startchat = async(req, res, next) => {
    let result = {}
    let step_id = req.user.step_id;
    
    try {
        let step = await chatModel.getStep(step_id);
        
        let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, step_id);
        result.chat_id = insertId;
        result.is_backend = 1;

        var article_list = await userModel.getFavoriteTopic(req.user.id);
        if (step.step_text) result.text = step.step_text;
        if (step.step_input_type) result.input_type = step.step_input_type;
        result.article_list = article_list;
        result.created_date = await chatlogModel.GetLogDateById(insertId);
        result.created_date = result.created_date.created_at;
        result.created_date = moment(result.created_date, 'YYYY-MM-DD h:m:s', 'en', true).toISOString();
        result.created_date = moment(result.created_date).format("YYYY年MM月DD日 hh:mm");
        
        
    } catch (err) {
        return next(err)
    }
    return res.json(result);
}

exports.chat = async(req, res, next) => {
    let result = {};

    try {
        let step_id = req.user.step_id;

        switch (step_id) {
            case 3:
                // first name input
                if (req.body.answer && req.body.input_type === "input") {
                    await userModel.addFirstName(req.user.id, req.body.answer);
                } else return next(9401);
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, null, 1, step_id);
                break;
            case 4:
                // last name input
                if (req.body.answer && req.body.input_type === "input") {
                    await userModel.addLastName(req.user.id, req.body.answer);
                } else return next(9401);
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, null, 1, step_id);
                break;
            case 5:
                // answer_id : 0 Yes,  answer_id : 1 No
                await chatlogModel.AddLog(req.user.chat_id, null, req.body.answer_id, 1, step_id);

                if (req.body.answer_id && req.body.input_type === "option") {
                    if (parseInt(req.body.answer_id) === 1) {
                        step_id = parseInt(step_id) + 1;
                    }
                } else return next(9401);
                break;
            case 6:
                // nick name insert
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer && req.body.input_type === "input") {
                    await userModel.addNickName(req.user.id, req.body.answer);
                } else return next(9401);
                break;
            case 7:
                // birthday insert
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer && req.body.input_type === "input") {
                    try {
                        var birth = req.body.answer;
                        // console.log(birth);
                        birth = moment(moment.utc(birth, 'YYYY年MM月DD日', 'en', 'true').format("YYYY-MM-DD"));
                        await userModel.addBirthday(req.user.id, birth);
                    } catch (error) {
                        return next(9401);
                    }
                } else return next(9401);
                break;
            case 8:
                // horoscope send message answer_id = 0 : Yes, 1 : No
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer_id && req.body.input_type === "option") {
                    if (parseInt(req.body.answer_id) === 0) {
                        // Yes
                        await userModel.addHoroscope(req.user.id);
                    }
                } else return next(9401);
                break;
            case 9:
                // tel number insert
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer && req.body.input_type === "input") {
                    await userModel.addTel(req.user.id, req.body.answer);
                } else return next(9401);
                break;
            case 10:
                // email
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer && req.body.input_type === "input") {
                    await userModel.addEmail(req.user.id, req.body.answer);
                } else return next(9401);
                break;
            case 11:
                // postal code
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer && req.body.input_type === "input") {
                    await userModel.addPostalCode(req.user.id, req.body.answer);
                } else return next(9401);
                break;
            case 12:
                // salon work?  like beauty?
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer_id && req.body.input_type === "option") {
                    if (parseInt(req.body.answer_id) === 0) {
                        // like beauty
                        await userModel.addJob(req.user.id, jobArray[0]);
                        step_id = parseInt(step_id) + 1;
                    }
                } else return next(9401);
                break;
            case 13:
                // what's your genre of salon work, as an expert?
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, req.body.answer_id, 1, step_id);

                if (req.body.answer_id && req.body.input_type === "option") {
                    let job_id = parseInt(req.body.answer_id) + 1;
                    await userModel.addJob(req.user.id, jobArray[job_id]);
                } else return next(9401);
                break;
            case 14:
                // what's your favorite topic ?
                var answer_ids_array = JSON.stringify(req.body.answer_id);
                
                await chatlogModel.AddLog(req.user.chat_id, req.body.answer, answer_ids_array, 1, step_id);
                
                if (answer_ids_array && req.body.input_type === "multiple") {
                    // console.log(topicArray.length);
                    for (var i = 0; i < topicArray.length; i++){
                        answer_ids_array = answer_ids_array.replace(i.toString(), topicArray[i]);
                    }
                    answer_ids_array = "(" + answer_ids_array.substr(1, answer_ids_array.length - 2) + ")";
                    await userModel.addFavoriteTopic(req.user.id, answer_ids_array);
                } else return next(9401);
                var userTopicArray = await userModel.getFavoriteArray(req.user.id);
                var article_list = await userModel.getFavoriteTopic(userTopicArray);
                for (var i in article_list){
                    const dom = new JSDOM(article_list[i].content);
                    const text = dom.window.document.querySelector("p").textContent;
                    // console.log(text);
                    article_list[i].summary = text.substr(0, 100) + "...";
                }
                result.article_list = article_list;
                // console.log(result);
                break;
            case 15:
                var userTopicArray = await userModel.getFavoriteArray(req.user.id);
                var article_list = await userModel.getFavoriteTopic(userTopicArray);
                for (var i in article_list){
                    const dom = new JSDOM(article_list[i].content);
                    const text = dom.window.document.querySelector("p").textContent;
                    // console.log(text);
                    article_list[i].summary = text.substr(0, 100) + "...";
                }
                result.article_list = article_list;
                break;
            case 16:
                var userTopicArray = await userModel.getFavoriteArray(req.user.id);
                var article_list = await userModel.getFavoriteTopic(userTopicArray);
                for (var i in article_list){
                    const dom = new JSDOM(article_list[i].content);
                    const text = dom.window.document.querySelector("p").textContent;
                    // console.log(text);
                    article_list[i].summary = text.substr(0, 100) + "...";
                }
                result.article_list = article_list;
                // console.log(result);
                break;
        }   

        // if user's step_id < 15 then go to next step
        if (step_id < 16) {
            step_id = await userModel.step_id_increase(req.user.id, step_id);
        }
        let step = await chatModel.getStep(step_id);

        // add user's chat log
        // horoscope process handler as birthday  step : 6
        let insertId = await chatlogModel.AddLog(req.user.chat_id, null, null, 0, step_id);
        result.chat_id = insertId;
        result.is_backend = 1;
        if (step.step_text) result.text = step.step_text;
        if (step_id == 8){
            var birth = moment(moment.utc(req.body.answer, 'YYYY年MM月DD日', 'en', 'true').format("YYYY-MM-DD"));
            var horoscope_content = await HoroscopeModel.getHoroscope(birth);
            result.text = result.text.replace("(Horoscope)", horoscope_content.name_jp);
            result.text = result.text.replace("(Horoscope)", horoscope_content.name_jp);
            var horo_content = "恋愛運 : " + horoscope_content.love_luck + "\r\n, ";
            horo_content += "仕事・勉強運 : " + horoscope_content.work_study + "\r\n, "
            horo_content += "ヘルス&ビューティー運 : " + horoscope_content.healthy_beauty + "\r\n"
            result.text = result.text.replace("(horoscope_content)", horo_content);
        }
        if (step.step_en) result.text_en = step.step_en;
        if (step.step_input_type) result.input_type = step.step_input_type;
        if (step.step_message_type) result.message_type = step.step_message_type;
        if (step.step_placeholder) result.place_holder = step.step_placeholder;
        if (step.step_option_list) result.option_list = step.step_option_list;
        if (step.step_gallery_list) result.gallery_list = step.step_gallery_list;

        result.created_date = await chatlogModel.GetLogDateById(insertId);
        result.created_date = result.created_date.created_at;
        result.created_date = moment(result.created_date, 'YYYY-MM-DD h:m:s', 'en', true).toISOString();
        result.created_date = moment(result.created_date).format("YYYY年MM月DD日 hh:mm");

    } catch (error) {
        return next(error);
    }
    return res.json(result);
};
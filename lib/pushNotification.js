'use strict';
var admin = require('firebase-admin');
var userModel = require('../models/UserModel');
var horoscopeModel = require('../models/HoroscopeModel');

var serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mirai-104e9.firebaseio.com"
})

exports.sendPushMessage = async () =>{
    var lists = await userModel.getFirebaseIDs();
    try {
        var topic = "Mirai Daily Horoscope";
        var content = "おはようございます。\n\r 今日のあなたの運勢についてお話します。\n\r あなたは(Horoscope)です。\n\r 今日の(Horoscope)の運命....(Horoscope_Content). \n\r ありがとう"
        for (var i in lists){
            var horoscopeContent = await horoscopeModel.getHoroscope(lists[i].birth);
            horoscopeContent = horoscopeContent.replace("(Horoscope)", horoscope_content.name_jp);
            horoscopeContent = horoscopeContent.replace("(Horoscope)", horoscope_content.name_jp);
            var horo_content = "恋愛運 : " + horoscope_content.love_luck + "\r\n, ";
            horo_content += "仕事・勉強運 : " + horoscope_content.work_study + "\r\n, "
            horo_content += "ヘルス&ビューティー運 : " + horoscope_content.healthy_beauty + "\r\n"
            horoscopeContent = horoscopeContent.replace("(Horoscope_Content)", horo_content);
            admin.messaging().send({
                data : {
                    horoscope : horoscopeContent
                },
                token : lists[i].device_id
            })
            .then((response) =>{
                console.log('successfully sent');
            })
            .catch(error =>{
                console.log(error);
            })
        }
    } catch (error) {
        console.log(error);
    }
}
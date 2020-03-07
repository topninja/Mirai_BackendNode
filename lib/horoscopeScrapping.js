'use strict';

const siteurl = "https://www.vogue.co.jp/horoscope/daily/";
const axios = require("axios");
const cheerio = require('cheerio');
const horoscopeModel = require('../models/HoroscopeModel');

const fetchData = async(url)=>{
    const result = await axios.get(url);
    return cheerio.load(result.data);
}

const horoscopes_name = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
const horoscopes_name_jp = ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座']

var date = new Date();
const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
const tomorrow = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1);
exports.doScrape = async () =>{
    for (var i in horoscopes_name){
        
        var $ = await fetchData(siteurl + today + "/" + horoscopes_name[i] + "/1");
        var love_luck = $('.horoscope__single__message__text > p').text().trim();
        
        $ = await fetchData(siteurl + today + "/" + horoscopes_name[i] + "/3");
        var work_study = $('.horoscope__single__message__text > p').text().trim();
        $ = await fetchData(siteurl + today + "/" + horoscopes_name[i] + "/5");
        var healthy_beauty = $('.horoscope__single__message__text > p').text().trim();
        var data = {
            name_en : horoscopes_name[i],
            name_jp : horoscopes_name_jp[i],
            start_date : today,
            end_date : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1),
            love_luck : love_luck,
            work_study : work_study,
            healthy_beauty : healthy_beauty
        }
        await horoscopeModel.insertHoroscope(data);
    }
    console.log('success done!');
}
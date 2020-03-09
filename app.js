'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const horoscope = require('./lib/horoscopeScrapping');
const pushNotification = require('./lib/pushNotification');
const cron = require('node-cron');
var session = require('express-session');

const app = express();

process.env.NODE_ENV = ( process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() === 'production' ? 'production' : 'development' );

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// CORS ALL ACCESS Settings
app.use(cors());
app.use(session({secret:'secret',loggedIn:'false'}));

app.locals.baseURL = "http://127.0.0.1:3000"


// create DB pool
require('./config/config').createDBPool(100);

// initialize routes
require('./routes')(app);

// error handler
require('./ErrorHandler')(app);

// scrape horoscope data 5:00 AM every day
cron.schedule("* 5 * * *", () => {
  horoscope.doScrape();
})
// send horoscope notification data 8:00 AM every day
cron.schedule("*/20 * * * * *", () => {
  pushNotification.sendPushMessage();
})
// Server Port Set
const PORT = 3000;
app.listen(PORT, () => {
  console.info(`[Server] Application Listening on Port ${PORT}`);
});

module.exports = app;

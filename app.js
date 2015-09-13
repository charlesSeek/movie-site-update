/*
* load all the needed node js modules
*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



var port = process.env.PORT || 3000;
var app = express();
app.locals.moment = require('moment');
app.locals.route = '/';
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://127.0.0.1/imooc';
/*
 * connect to the localhost mongodb database
 * and print the connection status and information
 * */
mongoose.connect(dbUrl);

mongoose.connection.on("error", function (error) {
    console.log("connect to mongodb failure：" + error);
});
mongoose.connection.on("open", function () {
    console.log("------connect to mongodb sucessfully！------");
});

//the path of view files
app.set('views', './app/views/pages');

//the tempelate engine
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'movie-site',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));

//the path of bootstrap and jquery 

var morgan = require('morgan');
app.use(express.static(path.join(__dirname, 'public')));
if ('development'==app.get('env')){
    app.set('showStackError',true);
    app.use(morgan(':method:url:status'));
    app.locals.pretty=true;
    mongoose.set('debug',true);
}
require('./config/routes')(app);

//configure the port and start the listening process
app.listen(port);
console.log('imooc started on port ' + port);



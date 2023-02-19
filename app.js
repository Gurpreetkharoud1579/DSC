// get the express library and others that are required
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passportLocalStrategy');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');

const port = 2700;
const db = require('./config/mongoose');



const app = express();

app.use(cookieParser());
// using express-ejs-layouts
app.use(expressLayouts);
// extract style and scripts from sub pages into layouts 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// middleware bodyparser to decode the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongo coonect will store the session in db
app.use(session({
    name: 'dsc',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/DSC',
        autoRemove: 'disable'
    }, (errr) => console.log(err || 'connect-mongo db setup done '))
}));

app.use(passport.initialize());
app.use(passport.session());

// send user value to res before it goes to any route controller
app.use(passport.setAuthenticatedUser);

// user routes defined in /routes/index.js
app.use('/', require('./routes/index.js'))



//middleware for using public directory as default 
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs (ejs is like react and other view engines)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));

app.listen(port, (err) => {
    if (err) {
        console.log("Error in running the server", err);
    } else
        console.log("App is running on port", port);
});
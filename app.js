// get the express library and others that are required
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// port for the app
const port = 2700;

const app = express();

// user routes defined in /routes/index.js
app.use('/', require('./routes/index.js'))

// middleware bodyparser to decode the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const app = express();
const expressEjsLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");

//passport config:
require('./config/passport')(passport);
//mongoose
const url = "mongodb+srv://aviralx10:aviralx10@cluster0.cyqz4.mongodb.net/User?retryWrites=true&w=majority";
mongoose.connect(url || 'mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected :)'))
.catch((err)=> console.log(err));

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);

//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(express.static(__dirname + '/public')); 
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    });
//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

var port_number = app.listen(process.env.PORT || 3000);
app.listen(port_number);

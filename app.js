const express = require('express');
const bodyparser = require('body-parser');
const app = express();
var path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/login_app" , {useNewUrlParser: true, useUnifiedTopology: true})
const passport = require('passport')
const localStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose');
const Login = require('./models/Login');
const expressRoutes = require('./routes/Express');
const notesRoutes = require('./routes/notes');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use('/',express.static(path.join(__dirname,'./build')));


app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(Login.authenticate()));
passport.serializeUser(Login.serializeUser());
passport.deserializeUser(Login.deserializeUser());
app.use("/api/user",expressRoutes);
app.use("/api/notes",notesRoutes);
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/build' , 'index.html'))
})

const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log("server is running")
})




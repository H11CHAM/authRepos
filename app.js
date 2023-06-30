require('dotenv').config()
const express = require('express');
const app = express();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/user')
const mongoose =require('mongoose')

//basic express functionalities and extensions .
app.set('view engine','ejs')
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//creating a session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
passport.use(new LocalStrategy({
  usernameField: 'email',  //i did set usernameField to email in the mongoose plugin too
}, User.authenticate()));
//serializing and deserializing the user info (creating a cookie .)
 passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());


app.get('/',function(req,res,next){
  res.render('home')
})
app.get('/success',function(req,res,next){
  res.render('success');
})
app.post('/',function(req,res,next){
  const { username, password } = req.body;

  User.register({ email: username }, password, (err, user) => {
    if (err) {
      console.log(err);
      return next(err);
    }
  // Authenticate the newly registered user
  passport.authenticate('local')(req, res, () => {
    // Redirect to the success route or perform any other action
    res.redirect('/success');
  });
});
})
app.listen(3000,function () {
  console.log("listening on port 3000");
})

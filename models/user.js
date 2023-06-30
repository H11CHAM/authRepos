const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const {model,Schema} = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/finTestDB").then(()=> {
  console.log("connected with the dataBase!!");
})

const userSchema = new Schema ({
  email : String,
  password : String
})
mongoose.plugin(passportLocalMongoose, {usernameField : 'email'})
const User =  model('Users', userSchema);
module.exports = User;

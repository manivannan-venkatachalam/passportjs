const express = require('express');
const mongoose =require('mongoose');
const app = express();
const auth_route =require('./routes/auth_routes');
const profile_route =require('./routes/profile_routes');
const passport_auth =require("./config/passport-setup");
const key =require('./config/key');
const cookieSession =require('cookie-session');
const passport =require('passport');


mongoose.connect(key.mongodb.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err)=>{
    if(err){
        console.log("err");
    }
    else{
        console.log("db conencted");
    }

});
app.set('view engine', 'ejs');


//session

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[key.session.cookie_key]
}))

//passport initialize

app.use(passport.initialize());
app.use(passport.session());
//routes

app.use('/auth',auth_route);
app.use('/profile',profile_route);

app.get('/',(req,res)=>{
    res.render("home",{user :req.user});
});


app.listen (3000,()=>{
    console.log("server is connected")
})
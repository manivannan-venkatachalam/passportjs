const passport =require('passport');
const googlestatergey = require('passport-google-oauth20').Strategy;
const keys = require('./key');
const user =require('../model/usermodel');




passport.serializeUser((user,done)=>{
  done(null,user.id);

});

passport.deserializeUser((id,done)=>{
  user.findById(id).then((user_info)=>{
    done(null,user_info);

  })

})

passport.use(new googlestatergey({
    clientID: keys.google.clientid,
    clientSecret: keys.google.clientsecret,
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },(accesstoken,refreshtoken,email,done)=>{
    user.findOne({email:email.emails[0].value}).then((currentuser)=>{
        if(currentuser){
          done(null,currentuser)
        }
        else{
          new user({
            username : email.displayName,
            email:email.emails[0].value
          }).save((newuser)=>{
              done(null,newuser);
          });
        }
    })

    
    
 


  }
));

const router = require('express').Router();
const passport =require('passport')

//login route
router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
});


router.get('/logout',(req,res)=>{
    req.logout();
res.render('home',{user : req.user})
});

router.get('/google', passport.authenticate('google', {
    scope : ["profile","email"]
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/profile')
})


module.exports = router;
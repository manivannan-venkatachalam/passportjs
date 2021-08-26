const express =require('express')
const router =express.Router();

function authenticate(req,res,next){
    if(req.user){
        //console.log(req.user);
        next();
       
    }else{
       
        res.redirect('/auth/login')
    }
}

router.get('/',authenticate,(req,res)=>{
    res.render('profile',{user:req.user});
})

module.exports = router;
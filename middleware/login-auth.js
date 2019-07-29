module.exports = (req, res, next) => {

        if(req.isAuthenticated()){
            return next();
        }else{
            //req.flash('warning', 'Please Sign In')
            res.redirect('/users/login')
        }
    
}
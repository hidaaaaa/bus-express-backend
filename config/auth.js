module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
            return next()
    }
    return res.json({
      status: 403,
      message: 'Not Authorized.'
    })
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
  //  console.log(req.user)
    res.redirect('/home');      
  },
  ensureAuthenticatedForAdmin:function(req, res, next){
    next()
    // if (req.isAuthenticated()) {
    //   if(req.user.role === 'admin')
    //       return next();
    // }
    // return res.status(400).json({
    //   type: "error",
    //   message: "access denied..."
    // })
    
    //  req.flash('error_msg', 'Vui lòng đăng nhập');
    // res.redirect('/user/account#dangnhap');

    
  },
  ensureAuthenticatedForUser:function(req, res, next){
    if (req.isAuthenticated()) {
     //// console.log(req.user)
      if(req.user.role === 'user')
          return next();
       return res.redirect('/home')

    }
     req.flash('error_msg', 'Vui lòng đăng nhập');
    res.redirect('/user/account#dangnhap');

    
  }


};

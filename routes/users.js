const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const passport = require('passport');
const emailExistence = require('email-existence')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer') 
const app = express(); 


// Load User model
const User = require('../models/Client');
const UserMysql = require('../services/user.db.services');
const Ticket = require('../models/Ticket');
const Cancle = require('../config/cancle')

// Middleware
const { ensureAuthenticated,forwardAuthenticated,ensureAuthenticatedForUser } = require('../config/auth');
require('../config/passport.conf')(passport);
// Login Page

// Register Page
router.get('/account', forwardAuthenticated, (req, res) => res.render('register',{title:"ticketMe| Tài khoản"}));

router.get('/me',ensureAuthenticatedForUser, (req,res) =>{
console.log('/me');
  res.render('account',{
    user: req.user
  })
})

router.get('/reset',forwardAuthenticated,(req,res) =>{
  res.render('reserpass');
})



router.post('/cancle',ensureAuthenticated,(req,res)=>{
  let TinhTrang = false;
  let {MaVeXe,STK,DonGia,NgayHuy,MaCX} =req.body;
  let Email = req.user.email
  console.log(MaCX)
 const ticketCancle = new Ticket({MaVeXe,Email,STK,DonGia,NgayHuy,TinhTrang});
 ticketCancle.save().then(user =>{
    if(user){
      UserMysql.destroyTicket(MaVeXe,async (result)=>{
        if(result){
              Cancle.sendMailForCancle(res,req,MaVeXe);
              return res.status(200).send({is:true})
          // UserMysql.updateTickets(-1,MaCX,(result)=>{
          //   if(result){
          //     Cancle.sendMailForCancle(res,req,MaVeXe);
          //     return res.status(200).send({is:true})
          //   }
          //   else return res.status(200).send({is:false})

          // })
            
           
        }
        else{
          console.log("sai 2")
           return res.send({is:false})

        }
      
      })
    }else{
      console.log("sai 1")
      res.send({is:false})
    }
    
 })
})

router.post('/me/pass',ensureAuthenticated,async (req,res) =>{
console.log(req.body)
  if(req.body.new =="" || req.body.new.length < 6){
     req.flash(
                'error_msg',
                'Mật khẩu không đủ dài'
              );
            return   res.redirect('/user/me');
  }
  if(req.body.old == req.user.password ){
    console.log(req.user.email)
    User.updateOne({'email' : req.user.email},{$set: { 'password' : req.body.new}},(err,result)=>{
      if(err) return console.log(err)
         req.flash(
                'success_msg',
                'Đổi mật khẩu thành công'
              )
        return res.redirect('/user/me');
    });
    
  }
  else {
    console.log("Sai mat khau")
     req.flash(
                'error_msg',
                'Mật khẩu không đúng'
              );
            return   res.redirect('/user/me');
  }

})
// HANDLE EMAIL RESET 
router.post('/email',async (req,res) =>{
  console.log(req.body.email)
  User.findOne({email:req.body.email}).then( user =>{
    if(!user){
      console.log("khong cos")
      return res.send({status:false})
    }
      const output = `
        <p>Thông báo thay đổi mật khẩu</p>
        <h3>BusExpress</h3>
        <ul>  
          <li>From: BusExpress</li>
          <li>Email: shinminah357159@gmail.com</li>
          <li>Phone: 190012536</li>
          <li><strong>Secret code:</strong>${req.body.check}</li>

        </ul>
        `;

  // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'shinminah357159@gmail.com', // generated ethereal user
            pass: '01649254108'  // generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
      });

  // setup email data with unicode symbols
      let mailOptions = {
          from: '"Freelancer.com" <shinminah357159@email.com>', // sender address
          to: req.body.email, // list of receivers
          subject: 'BookYourBus', // Subject line
          text: 'Hello world?', // plain text body
          html: output // html body
      };

  // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return res.send({status:false})
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          console.log('Sent!')
          res.send({status:true})
      });
  // console.log(req.body.email)
  });

  
})

router.post('/confirm',async (req,res) =>{
  console.log(req.body.email)
    User.updateOne({'email' : req.body.email},{$set: { 'password' : req.body.password}},(err,result)=>{
        if(err) return res.send({isChanged:false})
            console.log("done")
            
        return res.send({isChanged:true})
    });
    
  
})
router.get('/allTickets',async (req, res) =>{
  // console.log(req.user.email)
  UserMysql.findUserByEmail(req.user.email,(result)=>{
     if(result){
      //  console.log("in");
         UserMysql.getAllTicketsByEmail(req.user.email,(result)=>{
            if(result) return res.status(200).json(result)
         })
     }
     else return res.status(403).json({
       msg: 'not authorized...'
     })
        
  });
 
})

//HANDLE REQUEST PASSWORD NEW


// HANDLE CHANGE EMAIL 
router.post('/me/email', (req,res) =>{
  emailExistence.check(req.body.email, function(error, response){
    if(response){
      console.log(response)
      User.findOne({email:req.body.email}).then(user =>{
         if(user){
          req.flash(
                    'error_msg',
                    'Email đã được đăng kí'
                  );
                return   res.redirect('/user/me');
         }
         else{
              if(req.body.password == req.user.password ){

                  User.updateOne({'email' : req.user.email},{$set: { 'email' : req.body.email}},(err,result)=>{
                    if(err) return console.log(err)
                     
                   //  UserMysql.updateEmailForChangEmail
                      
                    return res.redirect('/user/logout');
                  });
        
               }
              else {
                console.log("Sai mat khau")
                 req.flash(
                            'error_msg',
                            'Xác nhận mật khẩu không đúng'
                          );
                        return   res.redirect('/user/me');
              }

         }
      })

      
    }else{
      req.flash(
                    'error_msg',
                    'Email không hợp lệ'
                  );
                return   res.redirect('/user/me');
    }
  })
  
})
// Register handler
router.post('/account/register', (req, res) => {
  console.log("hahaha");
  const { name, email, password, password2 } = req.body;
  const role = "user";
  let errors = [];
  let cash = 0;

  if (!name || !email ){
     req.flash(
                'error_msg',
                ' Không được bỏ trống'
              );
            return   res.redirect('/user/account#dangki');
  }

  // if (password != password2) {
  //    req.flash(
  //               'error_msg',
  //               'Có lỗi! Mật khẩu không trùng nhau'
  //             );
  //          return   res.redirect('/user/account#dangki');
  // }

  // if (password.length < 6) {
  //    req.flash(
  //               'error_msg',
  //               'Mật khẩu phải ít nhất 6 kí tự'
  //             );
  //          return    res.redirect('/user/account#dangki');

  // }
    console.log(email)
     emailExistence.check(email, function(error, response){
        if(error) return console.log(error)
          console.log(response)
        if(response){
          User.findOne({ email: email }).then(user => {
            if (user) {
              req.flash(
                'error_msg',
                'Email đã được đăng kí '
              );
              res.redirect('/user/account#dangki');
            } else {
              const newUser = new User({
                name,
                email,
                password,
                role,
                cash

              });

              bcrypt.genSalt(10, (err, salt) => {
              
                newUser
                    .save()
                    .then(user => {
                      req.flash(
                        'success_msg',
                        'Bây giờ, bạn có thể đăng nhập'
                      );
                      res.redirect('/user/account#dangnhap');
                    })
                    .catch(err => console.log(err));
              });
            }
          });
        }else{
           req.flash(
              'error_msg',
              'Email này không hợp lệ'
              );
            res.redirect('/user/account#dangki');
        }
    });
   
  
});


// Login handler
router.post('/account/login', (req, res, next) => {
  // console.log("loggin");
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/user/account#dangnhap',
    failureFlash: true
  })(req, res, next);
});

// Logout handler
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Bạn đã đăng xuất');
  res.redirect('/user/account#dangnhap');
});

router.post('/signup',(req, res) => {
  //some code for sign up function
})

module.exports = router;



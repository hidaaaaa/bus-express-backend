const express = require('express');
// const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const router = express.Router();
const paypal = require('paypal-rest-sdk')
const emailExistence = require('email-existence')
const Client = require('../../models/Client')
const nodemailer = require('nodemailer')
const {doPayment, sendMailToCus,finalCheckSeatStatus, doPaymentM} = require('../v1/services/payment.service');



// const { ensureAuthenticated, forwardAuthenticated ,ensureAuthenticatedForAdmin} = require('../config/auth');
// const User = require('../models/User');
// const DbService = require('../models/DbService');

// const Ticket = require('../models/Ticket')
// const nodemailer = require('nodemailer')
// const emailExistence = require('email-existence')
const DbService = require('./services/database.service');
const PmService = require('./services/payment.service')
// const { compare} = require('bcryptjs');




paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWgYYDvYvC35qGNvoTs8QDLUZdl8kmaOISELHK1lAA6GcEhjMc5eCR-c54eOVOLOuNyWQE7fpkoD5w_w',
  'client_secret': 'EDvXzdrHt_E6fWCdiE5ifE27TceUXVCcea9_iO3jl0u4XlFRiFYcrz1Lo6uXaLKKVZ0zOKGh9HfjQdc1'
});

// app.use(express.json)
// app.use(bodyParser.json())

router.use('/user',require('./routes/user.controller'))
router.use('/admin',require('./routes/admin.controller'))
router.use('/payment',require('./routes/payment.controller'))
// router.use('/v1/admin',require('./routes/admin'))

router.get('/seatsbooked',async(req, res) => {
  // endpoint /checkseats
  let seats = req.query.seats.split(',')
  console.log(` [🚌] - getting seatsbooked of ${req.query.postid}.`);
  // DbService.findSeatsBooked(req.query.postid,r =>{
  //   return res.json(r)
  // })
 const f = await PmService.finalCheckSeatStatus(req.query.postid, seats)
 return res.send(f)
  
})

router.get('/post',(req, res) => {
  console.log(` [ℹ] - getting post infos...`);
  const { id,scope } = req.query
  scope.includes('seats') // get booked seats of a post via post_id
  ? DbService.getSeatsBooked(id, (result) => {
    result
    ? res.status(200).json(result)
    : res.status(400).json({error: 'cannot get requestse...'})
  }) 
  : scope.includes('detailed') // get more specificed post info via post_id
  ? DbService.getPostDetailed(id,(result)=>{
    if(result) return res.status(200).json(result)
  }) : res.status(200).json({message:'cannot request with this url...'})
})
//get all trips
router.get('/trips',(req, res) => {
  console.log(` [🚌] - getting all trips...`);
  DbService.getAllTrips((entry) => {
    entry 
    ? res.status(200).json(entry)
    : res.status(400).json({error: 'failed to get trips.'})
  })
})


// same above
router.get('/posts', (req, res) => {
  console.log(" [ℹ] - finding post by date, time....");
  const {tripid, date, time} = req.query
  DbService.getPostByDateTime(tripid, date, time,(result) => {
    result
    ? res.status(200).json(result)
    : res.status(400).json({message:'failed to get..'})
  })
})

router.get('/m/posts', (req, res) => {
  console.log(" [ℹ] - finding post by date, time....<mobile-version>");
      const {tripid, date, time} = req.query
      let seats = []

      Array(30).fill(null).map((e,i) => {
        seats.push({
          code: `A${i +1}`,
          choose :'0'
        })
      })
      //  res.json(seats)

      DbService.getPostByDateTime(tripid, date, time,(result) => {
        if(result){
          result.map(e => {
            seats[parseFloat(e.SoGhe.slice(1,3)) - 1].choose = '1';
          })
           res.status(200).json(seats)
          // res.json({size:seats.length})
        }else
         res.status(400).json({message:'failed to get..'})
      })
    })

    router.get('/trip', (req, res) => {
      console.log(` [🚌] - getting posts of a trip...`);
      const { tripid, date } = req.query
      DbService.getPostsOfTripByDate(tripid, date, (result) => {
        result
        ? res.status(200).json(result)
        : res.status(400).json({message: 'failed to get posts of trip..'})
      })
    })

    router.get('/ticket/check',(req, res) => {
      console.log(` [✔] - checking ticket...`);
      let { id} = req.query
      DbService.checkTicket(id, (result) => {
        result
        ? res.status(200).json({result})
        : res.status(400).json({message: 'failed to check ticket...'})
      })
    })

    router.post('/m/pay',async (req, res) =>{
      // return PmService.doPayment(req,res)
      if(req.body){
        const {SDT,DiaChi,SLGhe,DonGia,NgayDat,MaCX} = req.body; 
        // customer = req.body;
        console.log(MaCX)
        let bind = [];
        bind.push(Email) 
        bind.push(TenKH) 
        bind.push(SDT) 
        bind.push(GioiTinh) 
        bind.push(DiaChi) 
        console.log(`[💺]-Số lượng ghế ${SLGhe.length}`)
        let next = true;
                    
        if(req.user && req.user.role == "user"){
          console.log("[👋]-User has logged in.")
          // CHECK USER HAS BOOK ANY TICKET EVER?
           DbService.findUserByEmail(req.user.email,(result)=>{
              if(result.length > 0) return PmService.doPayment(req,res)
              else{
                console.log("[🆕]-first time booking.")
                   DbService.save(bind,(result)=>{
                      if(result) {
                        return PmService.doPayment(req,res)
                      }
                      else return res.status(201).send({status:1})
                    })
              }
           })
         
        }
        else 
            emailExistence.check(Email,(err, response)=>{
              if(response)
                 DbService.findCusByEmail(Email, async (result)=>{
                  if(result.length > 0){
                     console.log("[👋]-customer exist")
                     req.body.Email = result[0].Email;
                     req.body.TenKH = result[0].TenKH;
                     req.body.SDT = result[0].SDT;
                     req.body.DiaChi = result[0].DiaChi;
                     req.body.GioiTinh = result[0].GioiTinh;
                     console.log(req.body)
                     PmService.doPayment(req,res)

                    
                   
                  }else{
                      console.log("[👋]-req.body doesnt exist")
                        DbService.save(bind,(result)=>{
                            if(result) {
                              PmService.doPayment(req,res)                       
                            }
                            else return res.status(201).send({status:1})
                        })    
                  }    
          
              })
               else return res.status(201).send({status:2})
            })

      
             

      }else{
       return res.send({status:1})
      }
    });


router.post('/m/register', (req, res) => {
  console.log("processing...");
  const { name, email, password, password2 } = req.body;
  const role = "user";
  let cash = 0;

  if (!name || !email ){
            return   res.status(401).json({
              msg: 'wrong crendentials.'
            })
  }

  if (password !== password2 ){
    return   res.status(401).json({
      msg: 'wrong crendentials.'
    })
 }


    // console.log(email)
     emailExistence.check(email, function(error, response){
        if(error) return res.status(400).json({msg: 'email invalid....'})
        if(response){
          Client.findOne({ email: email }).then(user => {
            if (user) {
              return   res.status(401).json({
                msg: 'wrong crendentials.'
              })
              
            } else {
              const newClient = new Client({
                name,
                email,
                password,
                role,
                cash

              });

              // bcrypt.genSalt(10, (err, salt) => {
              
                newClient
                    .save()
                    .then(user => {
                      return   res.status(200).json(user)
                    })
                    .catch(err => res.status(400).json({msg: 'not OK...'}));
              // });
            }
          });
        }else{
          return   res.status(401).json({
            msg: 'wrong crendentials.'
          })
        }
    });
   
  
});





// router.post('/confirm',async (req,res) =>{
//   console.log(req.body.email)
//     User.updateOne({'email' : req.body.email},{$set: { 'password' : req.body.password}},(err,result)=>{
//         if(err) return res.send({isChanged:false})
//             console.log("done")
            
//         return res.send({isChanged:true})
//     });
    
  
// })

router.post('/m/forgot',async (req,res) =>{
  console.log(req.body.email)
  Client.findOne({email:req.body.email}).then( user =>{
    if(!user){
      return res.status(401).json({msg: 'email doesnt exist.'})
    }
    Client.updateOne({'email' : req.body.email},{$set: { 'password' : '12345678'}},(err,result)=>{
      if(err)  return res.status(401).json({msg: 'something wrong'})
      
      const output = `
        <p>Thông báo thay đổi mật khẩu</p>
        <h3>BusExpress</h3>
        <ul>  
          <li>From: BusExpress</li>
          <li>Email: shinminah357159@gmail.com</li>
          <li>Phone: 190012536</li>
          <li><strong>Default code:</strong>12345678</li>

        </ul>
        `;

  // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'shinminah357159@gmail.com', // generated ethereal user
            pass: 'Zaytsev5'  // generated ethereal password
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
              return res.status(400).json({msg:error.message})
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          console.log('Sent!')
          res.status(200).json({msg: 'OK'})
      });
    });
      
  // console.log(req.body.email)
  });

  
})

router.post('/m/success',async  (req, res) => {
  // console.log(JSON.parse(req.body.SLGhe));
   doPaymentM(req, res)
//     }
// });
});



module.exports = router;

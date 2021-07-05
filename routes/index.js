const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const router = express.Router();
const paypal = require('paypal-rest-sdk')
const { ensureAuthenticated, forwardAuthenticated ,ensureAuthenticatedForAdmin} = require('../config/auth');
const User = require('../models/Client');
const UserMysql = require('../services/user.db.services');
const {doPayment, sendMailToCus,checkSeatAgain} = require('../config/payment.gateway');
const Ticket = require('../models/Ticket')
const nodemailer = require('nodemailer')
const emailExistence = require('email-existence')

const app = express();

// Global variables
let customer;
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWgYYDvYvC35qGNvoTs8QDLUZdl8kmaOISELHK1lAA6GcEhjMc5eCR-c54eOVOLOuNyWQE7fpkoD5w_w',
  'client_secret': 'EDvXzdrHt_E6fWCdiE5ifE27TceUXVCcea9_iO3jl0u4XlFRiFYcrz1Lo6uXaLKKVZ0zOKGh9HfjQdc1'
});

app.use(express.json)
router.get('/', forwardAuthenticated, (req, res) => res.redirect('home'));

router.get('/busexpress/trips',(req,res) =>{
  res.render('trips',{
    user: req.user
  });
})
      
router.get('/booking/tickets',(req,res) =>{
  res.render('ticketinfo',{
     user: req.user
  });
})

router.post('/customer/insert',async (req, res) =>{
  // return doPayment(req,res)
  if(req.body){
    const {TenKH,Email,SDT,GioiTinh,DiaChi,SLGhe,DonGia,NgayDat,MaCX} = req.body; 
    customer = req.body;
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
       UserMysql.findUserByEmail(req.user.email,(result)=>{
          if(result.length > 0) return doPayment(req,res)
          else{
            console.log("[🆕]-first time booking.")
               UserMysql.save(bind,(result)=>{
                  if(result) {
                    return doPayment(req,res)
                  }
                  else return res.status(201).send({status:1})
                })
          }
       })
     
    }
    else 
        emailExistence.check(Email,(err, response)=>{
          if(response)
             UserMysql.findCusByEmail(Email, async (result)=>{
              if(result.length > 0){
                 console.log("[👋]-customer exist")
                 customer.Email = result[0].Email;
                 customer.TenKH = result[0].TenKH;
                 customer.SDT = result[0].SDT;
                 customer.DiaChi = result[0].DiaChi;
                 customer.GioiTinh = result[0].GioiTinh;
                 console.log(customer)
                 doPayment(req,res)

                
               
              }else{
                  console.log("[👋]-customer doesnt exist")
                    UserMysql.save(bind,(result)=>{
                        if(result) {
                          doPayment(req,res)                       
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


router.get('/getID/:src/:des',(req, res)=>{
  if(req.params.src && req.params.des){
    UserMysql.findPostIdByName(req.params.src,req.params.des,(result)=>{
      if(result) return res.status(200).json(result)
    })
  }
})

router.get('/booking/ticket/:ticketId', (req,res) =>{
  //console.log("checking info ticket")
  console.log(`[✔]-checking ticket ${req.params.ticketId}`)
  UserMysql.checkTicket(req.params.ticketId,(result)=>{
    if(result) return res.status(200).json(result)
    console.log(`[🛑]-${err.message}`)
  })
})

router.get('/info/:tripId', (req,res) =>{
 //console.log("getting info trip")
  UserMysql.getInfoTrip(req.params.tripId,(result)=>{
    if(result) return res.status(200).json(result)
    // console.log("err when getting info trip")
    console.log(`[🛑]-${err.message}`)

  })
})

router.get('/admin/trips',(req,res) =>{
  UserMysql.getAllTrips((trips)=>{
    res.json(trips)
  })
})

router.get('/post/:trip/:date', (req, res) =>{
  UserMysql.findPost(req.params.trip,req.params.date,(post)=>{
   res.json(post)

  })
});

router.get('/time/:trip/:date', (req, res) =>{
  UserMysql.getPostsOfTrip(req.params.trip,req.params.date,(post)=>{
   res.json(post)
  })
});

router.get('/post/:trip/:date/:time', (req, res) =>{
  UserMysql.getPostByDateTime(
    req.params.trip,
    req.params.date,
    req.params.time,(post)=>{
   res.json(post)

  })
});

router.get('/trip',(req,res) =>{
  console.log("getting all trips")
  UserMysql.getAllTrips((post)=>{
   res.status(200).json(post)

  })
})


router.get('/getPostDetails/:postID',(req,res)=>{
  UserMysql.getPostDetailed(req.params.postID,(result)=>{
    if(result) return res.status(200).json(result)
  })
})

router.get('/checkseat/:postId',(req, res) =>{
  UserMysql.findSeatsBooked(req.params.postId,(result) =>{
      res.status(200).send(result)
  })
})



router.get('/users',ensureAuthenticated, async (req, res) =>{
  
    User.find().then((users)=>{
       res.json(users)
    }).catch((err)=>{
      res.json(err)
    })
  }
);

router.get('/home',(req,res) => {
  // console.log("hello");
  // res.json(req.user ? req.user : {message: "nothing"})
  //  if(req.query.d){
  //   console.log(req.query.d);
  // }
  res.render('home',{user: req.user})
})

router.get('/hiring',(req,res)=>{
  res.render('hiring',{
    user:req.user
  })
})

router.get('/mua-ve-tphcm-kiengiang',(req,res) => {
  var userInfo;
if(req.user)
  UserMysql.getInfoUser(req.user.email,(user)=>{
    if(user.length > 0){
      userInfo = user[0]
      res.render('tphcm-kiengiang',{
        user:req.user,
        userInfo:userInfo 
      })
    }else
      res.render('tphcm-kiengiang',{
        user:req.user
      })

  })
else  res.render('tphcm-kiengiang',{
        user:req.user
      })
  
})

router.get('/mua-ve-tphcm-angiang',(req,res) => {
  var userInfo;
  if(req.user)
  UserMysql.getInfoUser(req.user.email,(user)=>{
    if(user.length > 0){
     
      userInfo = user[0]
      res.render('tphcm-angiang',{
        user:req.user,
        userInfo:userInfo 
      })
    }else
      res.render('tphcm-angiang',{
        user:req.user
      })

  })
else  res.render('tphcm-angiang',{
        user:req.user
      })
  
})

router.get('/mua-ve-dalat-tphcm',(req,res) => {
  res.render('dalat-tphcm')
})

router.get('/success',async  (req, res) => {
  console.log(customer)
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  if(customer == null) return res.redirect('home');

    let bind=[];
    const isMatched = await checkSeatAgain(customer,UserMysql);
    if(isMatched) return res.render("failed")

      for(let i = 0 ;i < customer.SLGhe.length ; i++){
          console.log(i)
           bind = []
          bind.push(customer.MaCX + customer.SLGhe[i]);
          bind.push(customer.MaCX);
          bind.push(customer.SLGhe[i]);
           UserMysql.saveTicket(bind,(result)=>{
            if(result){
              bind= [];
              bind.push(customer.MaCX + customer.SLGhe[i] )
              bind.push(customer.Email)
              bind.push(customer.NgayDat);

               UserMysql.saveBillTicket(bind,(result)=>{
                if(result){
                  // UserMysql.updateTickets(1,customer.MaCX,(result)=>{
                  //     if(result) {
                  //       // tickets.push(customer.MaCX + SLGhe[i]);
                  //       console.log("updated")
                  //       if(i == customer.SLGhe.length - 1){
                  //         sendMailToCus(res,req,customer)
                  //       }
                  //     }
                  //       else res.status(204).send({status:false})
                  //  })
                  if(i == customer.SLGhe.length - 1){
                    sendMailToCus(res,req,customer)
                  }
                }
                else res.status(204).send({status:false})

              })
            }else{
              return  res.send({status:false})

            }

          })
        }
        // const sendmail = await sendMailToCus();
        res.render('verified');
//     }
// });
});


module.exports = router;

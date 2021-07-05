const paypal = require('paypal-rest-sdk')
const nodemailer = require('nodemailer')
const DbService = require('../services/database.service');

const client = require('twilio')('AC6535235a8a08095181d8689c33135bb4', 'ade52de0cdd1fe620af4b329bd892f8e')
console.log(process.env.TWILIO_ACCOUNT_SID)



paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWgYYDvYvC35qGNvoTs8QDLUZdl8kmaOISELHK1lAA6GcEhjMc5eCR-c54eOVOLOuNyWQE7fpkoD5w_w',
  'client_secret': 'EDvXzdrHt_E6fWCdiE5ifE27TceUXVCcea9_iO3jl0u4XlFRiFYcrz1Lo6uXaLKKVZ0zOKGh9HfjQdc1'
});

 const doPayment = async function (req, res) {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:5000/api/v1/payment?method=paypal&status=true",
        "cancel_url": "http://localhost:5000/cancel"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": "Red Sox Hat",
            "sku": "001",
            "price": "5.00",
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "USD",
          "total": "5.00"
        },
        "description": 'Red tiger hat for devs'
      }]
    };

    paypal.payment.create(create_payment_json, async function (error, payment) {

      if (error) {
        throw error;
      } else {
        console.log("paying....")
        for (let k = 0; k < payment.links.length; k++) {
          if (payment.links[k].rel === 'approval_url') {
            // console.log(payment.links[k].href)
            return res.send({ link: payment.links[k].href })
            // res.redirect(payment.links[i].href);
          }
        }
        console.log("hrere")
      }
    });
  }
 const sendMailToCus = function (res, req, data) {
   console.log(data);
      client.messages
      .create({
        body: `Đi ngày:${new Date(result[0].NgayDi).toLocaleDateString()}
        ,Chuyến xe: TPHCM - KienGiang, Số Ghế:${JSON.parse(data.SLGhe)}`,
        from: '+19724357719',
        to: '+84333157628'
      })
      .then(message => console.log({
      state: 'Sent.',
      messageId: message.id
      
    })).catch(e => console.log({
          type: 'error',
          message: e.message
      }))

    DbService.getInfoPost(data.MaCX, (result) => {
      if (result.length > 0) {
        console.log(result);
        const output = `
        <p>Thông báo đặt vé thành công</p>
        <h3>Bus Express</h3>
        <ul>  
          <li>From: Bus Express</li>
          <li>Email: buexpressbusiness@gmail.com</li>
          <li>Hot line: 19000153157</li>
          <li>Đi ngày:${new Date(result[0].NgayDi).toLocaleDateString()}</li>
          <li>Chuyến xe: TPHCM - KienGiang</li>
          <li>Số Ghế:${JSON.parse(data.SLGhe)}</li>
          <li>Xe:${result[0].BienSoXe}</li>
         
        </ul>
        `;

        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'shinminah357159@gmail.com', // generated ethereal user
            pass: '01649254108'  // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        let mailOptions = {
          from: '[BusExpress.com] <shinminah357159@email.com>', // sender addresponses
          to: data.Email, // list of receivers
          subject: 'BusExpress', // Subject line
          text: 'Hello world?', // plain text body
          html: output // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(400).json({msg :'failed'});
            // return res.send({status:false})
          }
          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          console.log('Sent!')
          return res.status(200).json({msg :'OK'})
        });
      }
    })

  }
  const finalCheckSeatStatus = function (postid, seats) {
    return new Promise(resolve => {
      DbService.findSeatsBooked(postid, (result) => {
        if (result) {
          console.log(result);
          let found = result.some(r => seats.indexOf(r) >= 0)
          if (found) resolve(true)
          else resolve(false)
        }
      })
    })
  }
  const doPaymentM = async function (req, res) {
    let SLGhe = JSON.parse(req.body.SLGhe)
    console.log(SLGhe);
    const isMatched = await finalCheckSeatStatus(req.body.MaCX, SLGhe);
    if (isMatched) return res.status(400).json({msg: 'failed'})
    for (let i = 0; i < SLGhe.length; i++) {
      console.log(i)
      bind = []
      bind.push(req.body.MaCX + SLGhe[i]);
      bind.push(req.body.MaCX);
      bind.push(SLGhe[i]);
      DbService.saveTicket(bind, (result) => {
        if (result) {
          bind = [];
          bind.push(req.body.MaCX + SLGhe[i])
          bind.push(req.body.Email)
          bind.push(req.body.NgayDat);

          DbService.saveBillTicket(bind, (result) => {
            if (result) {
              // console.log("me",result);
              if (i == SLGhe.length - 1) {
               return sendMailToCus(res, req, req.body)
              }
            }
            else res.status(204).send({ msg: result.msg })
          })
        } else {
          return res.status(400).json({msg: result.msg})
        }

      })
    }
  }


module.exports = {
  doPayment :doPayment,
  doPaymentM: doPaymentM,
  sendMailToCus: sendMailToCus, 
  finalCheckSeatStatus: finalCheckSeatStatus
}
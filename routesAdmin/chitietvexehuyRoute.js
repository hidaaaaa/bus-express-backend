'use strict';
module.exports = function(app) {
   //var todoList = require('../controllers/hoadonControllers');
   var Ticket = require('../models/Ticket');
   var HuyVe = require('../modelsAdmin/huyvexeModels.js')
	
  app.get('/allTickets',(req,res)=>{
  	Ticket.find({NgayHuy:formatDate()}).then(tickets => res.json(tickets))
  })
  app.get('/ticket/cancled/:date',(req,res)=>{
  	Ticket.find({NgayHuy:req.params.date}).then(tickets => res.json(tickets))
  })

  app.get('/approveall/:date',(req, res)=>{
  Ticket.updateMany({NgayHuy:req.params.date},{$set:{TinhTrang:true}},(err,result)=>{
    if(err) return res.send({is:false})
    res.json(result)
  })
})
  app.post('/destroy/:id',(req,res)=>{
  	let TinhTrang = false;
  	let MaVeXe = req.params.id;
  let {STK,DonGia,NgayHuy} =req.body;
  console.log(req.body)
  	
  	HuyVe.findTicketById(req.params.id,(result)=>{
  		if(result.length > 0){
  			let Email = result[0].Email;
			let MaCX = result[0].MaCX;
			let today = new Date();
			// check date to allow cancle ticket ?
			if((new Date(today).getTime() - new Date(`${result[0].NgayDi}`).getTime() + 86400000) > 0)
				return res.status(201).send({err:4})
              
			  console.log(result[0])
  			const ticketCancle = new Ticket({MaVeXe,Email,STK,DonGia,NgayHuy,TinhTrang});
  			ticketCancle.save().then(user =>{
			    if(user){
			      HuyVe.destroyTicket(MaVeXe,async (result)=>{
			        if(result){
			             // Cancle.sendMailForCancle(res,req,MaVeXe);
			              return res.status(200).send({err:0})
 
			        }
			        else{
			          console.log("sai 2")
			           return res.send({err:2})
			        }
			      })
			    }else{
			      
			      return res.send({err:2})
			    }
			    
			 })
  		}
  		else return res.send({err:1})
  	})
  })
  function formatDate(){
		let date = new Date();
		  let dateString = "";
		  dateString += `${date.getFullYear()}-`;

		  if(date.getMonth() +1 < 10) dateString += `0${date.getMonth() +1}-`
		  else dateString += `${date.getMonth() +1}-`

		  if(date.getDate() < 10) dateString += `0${date.getDate()}`
		  else dateString += `${date.getDate()}`

		  return dateString
	}

	
};
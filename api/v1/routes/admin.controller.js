const express = require('express');
const bodyParser = require('body-parser')
const passport = require('passport')
const router = express.Router();
const authenticate = require('../helpers/authorize');
const TicketCancled = require('../../../models/Ticket')
const mysqlService = require('../../../models/mysql.service')
const Role = require('../helpers/role')




require('../../../config/passport.conf')(passport);


router.get('/get_users', authenticate.ensureAuthenticated(Role.ADMIN), (req, res) => {

  TicketCancled.find().then(tickets => {
    res.status(200).json(tickets)
  })
})

router.get('/tickets',authenticate.ensureAuthenticated(Role.ADMIN), (req, res) => {
  console.log("got this");
  if(req.query.scope == 'all'){
    mysqlService.getAllTickets(null,(result) => {
      if(result){
          return res.json(result)
      }
      res.json({message: result.message})
    })
  }
  if(req.query.pid){
    mysqlService.getAllTickets(req.query.pid,(result) => {
      if(result){
          return res.json(result)
      }
      res.json({message: 'cannot get tickets.'})
    })
  }



})


module.exports = router;

'use strict';
module.exports = function(app) {
   //var todoList = require('../controllers/hoadonControllers');
   var User = require('../models/Client');
  app.get('/getallUsers',(req,res)=>{
  	User.find().then(users => res.json(users))
  })
};
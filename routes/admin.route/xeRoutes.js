'use strict';
const express = require('express')
const router = express.Router()

   var todoList = require('../../controllers/admin.controller/xeControllers');

	
	/*
	app.get('/biensoxe/:MaBX',(req,res)=>{
		let query=`Select * from xe where xe.MaBX = "${req.params.MaBX}" `;
	  	db.query(query,(err,result)=>{
		  	if(err) throw err;
		  	res.json(result);
	  	});
	});
	
	*/
	
	
   // todoList Routes
	
   router.route('/biensoxe/:MaBX')
       .get(todoList.getXeByMaBX);
   router.route('/xe')
       .get(todoList.getAllXe)
       .post(todoList.createXe);

   router.route('/xe/:BienSoXe')
       .get(todoList.getXeById)
       .put(todoList.updateXeById)
       .delete(todoList.deleteXeById);
module.exports = router;
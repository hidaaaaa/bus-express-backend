'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/xeControllers');
   var db=require('../modelsAdmin/db.js');
	
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
	
   app.route('/biensoxe/:MaBX')
       .get(todoList.getXeByMaBX);
   app.route('/xe')
       .get(todoList.getAllXe)
       .post(todoList.createXe);

   app.route('/xe/:BienSoXe')
       .get(todoList.getXeById)
       .put(todoList.updateXeById)
       .delete(todoList.deleteXeById);
};
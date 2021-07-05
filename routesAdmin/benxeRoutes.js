'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/benxeControllers');
  app.route('/diemdi/:MaTX')
      .get(todoList.getDiemDi);
  
  app.route('/diemden/:MaTX')
      .get(todoList.getDiemDen);
	
   app.route('/benxe')
       .get(todoList.getAllBenXe)
       .post(todoList.createBenXe);
	
   app.route('/benxe/:MaBX')
       .get(todoList.getBenXeById)
       .put(todoList.updateBenXeById)
       .delete(todoList.deleteBenXeById);
};
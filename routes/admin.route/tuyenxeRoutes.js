'use strict';
module.exports = function(app) {
   var todoList = require('../../controllers/admin.controller/tuyenxeControllers');

   // todoList Routes
   app.route('/tuyenxe')
       .get(todoList.getAllTuyenXe)
       .post(todoList.createTuyenXe);

   app.route('/tuyenxe/:MaTX')
       .get(todoList.getTuyenXeById)
       .put(todoList.updateTuyenXeById)
       .delete(todoList.deleteTuyenXeById);
};
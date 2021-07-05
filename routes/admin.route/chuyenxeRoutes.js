'use strict';
module.exports = function(app) {
   var todoList = require('../../controllers/admin.controller/chuyenxeControllers');

   // todoList Routes
   app.route('/chuyenxe')
       .get(todoList.getAllChuyenXe)
       .post(todoList.createChuyenXe);

   app.route('/chuyenxe/:MaCX')
       .get(todoList.getChuyenXeById)
       .put(todoList.updateChuyenXeById)
       .delete(todoList.deleteChuyenXeById);
};
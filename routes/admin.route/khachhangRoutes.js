'use strict';
module.exports = function(app) {
   var todoList = require('../../controllers/admin.controller/khachhangControllers');

   // todoList Routes
   app.route('/khachhang')
       .get(todoList.getAllKhachHang);

   app.route('/khachhang/:Email')
       .get(todoList.getKhachHangById)
       .put(todoList.updateKhachHangById);
};
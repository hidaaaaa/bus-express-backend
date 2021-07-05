'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/khachhangControllers');

   // todoList Routes
   app.route('/khachhang')
       .get(todoList.getAllKhachHang);

   app.route('/khachhang/:Email')
       .get(todoList.getKhachHangById)
       .put(todoList.updateKhachHangById);
};
'use strict';
module.exports = function(app) {
   var todoList = require('../../controllers/admin.controller/taikhoanControllers');
	
   app.route('/taikhoan')
       .get(todoList.getAllTaiKhoan);

	
};
'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/taikhoanControllers');
	
   app.route('/taikhoan')
       .get(todoList.getAllTaiKhoan);

	
};
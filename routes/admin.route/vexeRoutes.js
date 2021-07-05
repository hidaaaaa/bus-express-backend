'use strict';
module.exports = function(app) {
   var todoList = require('../../controllers/admin.controller/vexeControllers');
	
   app.route('/vexe')
       .get(todoList.getAllVeXe);

	
};
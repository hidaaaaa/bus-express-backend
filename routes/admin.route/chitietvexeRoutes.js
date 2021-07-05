'use strict';
module.exports = function(app) {
   var todoList = require('../../controllers/admin.controller/chitietvexeControllers');
	
   app.route('/vexe')
       .get(todoList.getAllVeXe);

	
};
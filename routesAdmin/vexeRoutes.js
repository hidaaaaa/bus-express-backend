'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/vexeControllers');
	
   app.route('/vexe')
       .get(todoList.getAllVeXe);

	
};
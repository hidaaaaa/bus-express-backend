'use strict';
module.exports = function(app) {
   var todoList = require('../controllers/chitietvexeControllers');
	
   app.route('/vexe')
       .get(todoList.getAllVeXe);

	
};
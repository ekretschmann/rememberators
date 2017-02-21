'use strict';

module.exports = function(app) {
	var messages = require('../../app/controllers/messages');

	// Messages Routes
	app.route('/messages')
		.get(messages.list)

};

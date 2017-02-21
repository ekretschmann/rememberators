'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Message = mongoose.model('Message'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Message already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Message
 */
exports.create = function(req, res) {

	var message = new Message(req.body);
	message.user = req.user;

	message.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * Show the current Message
 */
exports.read = function(req, res) {
	res.jsonp(req.message);
};

/**
 * Update a Message
 */
exports.update = function(req, res) {
	var message = req.message ;

	message = _.extend(message , req.body);

	message.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};

/**
 * Delete an Message
 */
exports.delete = function(req, res) {
	var message = req.message ;

	message.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(message);
		}
	});
};


/**
 * List of Messages
 */
exports.list = function(req, res) {

  return res.send(200, {
    message: "hey"
  });

	//Message.find().sort('-created').populate('user', 'displayName').exec(
    //
    //function(err, messages) {
    //
     //   if (req.query.to) {
    //
     //       Message.find({'to': req.query.to}).exec(function (err, messages) {
     //           if (err) {
     //               return res.send(400, {
     //                   message: getErrorMessage(err)
     //               });
     //           } else {
     //               res.jsonp(messages);
     //           }
     //       });
    //
    //
     //   } else
    //
     //   if (err) {
	//		return res.send(400, {
	//			message: getErrorMessage(err)
	//		});
	//	} else {
	//		res.jsonp(messages);
	//	}
	//});
};

/**
 * Message middleware
 */
exports.messageByID = function(req, res, next, id) { Message.findById(id).populate('user', 'displayName').exec(function(err, message) {
		if (err) return next(err);
		if (! message) return next(new Error('Failed to load Message ' + id));
		req.message = message ;
		next();
	});
};

/**
 * Message authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {


    if (req.message.to.indexOf(req.user.id) === -1 && req.user.roles.indexOf('admin') === -1 ) {

        return res.send(403, 'User is not authorized');
	}
	next();
};

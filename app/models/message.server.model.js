'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Message Schema
 */
var MessageSchema = new Schema({

    type: {
        type: String,
        default: 'validation-request'
    },
    direction: {
        type: String,
        default: 'forward'
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        required: 'Please fill Message content',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    sender: {
        type: String,
        trim: true
    },
    //user: {
    //    type: Schema.ObjectId,
    //    ref: 'User'
    //},
    to: {
        type: [Schema.ObjectId]
    },
    card: {
        type: Schema.ObjectId
    }
});

mongoose.model('Message', MessageSchema);

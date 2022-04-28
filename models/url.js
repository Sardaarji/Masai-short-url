// Importing the required libraries
const mongoose = require('mongoose');
const shortId = require('shortid');

// Defining the schema for short urls
const shortUrlSchema = new mongoose.Schema({
	full: {
		type: String,
		required: true
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date()
	}
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)

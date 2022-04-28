// Importing the required libraries
const express = require('express');
const mongoose = require('mongoose');

// Importing the short url model
const ShortURL = require('./models/url');

// Importing the constants module
const CONSTANTS = require('./constants');

// Creating a express server.
const app = express();

// Setting up the view engine for express server.
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

const urlRouter = require('./routes/url').router;

app.use('/', urlRouter);

app.use(function (req, res, next) {
	res.status(404).send('<h1>Page not found on the server</h1>');
});

// Setup your mongodb connection here
mongoose.connect(CONSTANTS.mongodbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('open', async () => {
	// Wait for mongodb connection before server starts

	app.listen(CONSTANTS.port, () => {
		console.log('Server started on port : ', CONSTANTS.port);
	})
})

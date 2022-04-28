// Importing the required libraries
const shortId = require('shortid');

// Importing the short url model
const ShortURL = require('../models/url');


// Function to get all the urls present
const getUrls = async (req, res) => {
    try {
        // Fetching all the short urls
        const allData = await ShortURL.find();
        res.render('index', { shortUrls: allData });
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Internal Server Error',
            statusCode: 500
        });
    }
}

//Function which will generate a short url and save it in database.
const saveUrl = async (req, res) => {
    try {
        // Grab the fullUrl parameter from the req.body
        const fullUrl = req.body.fullUrl;
        console.log('URL requested: ', fullUrl);

        // insert and wait for the record to be inserted using the model
        const record = new ShortURL({
            full: fullUrl,
            short: `bit.su-${shortId.generate()}`
        });
        await record.save();
        res.redirect('/');
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Internal Server Error',
            statusCode: 500
        });
    }
}

// Function which will be called when user clicks on the short url
const redirectToActualUrl = async (req, res) => {
    try {
        // grab the :shortid param
        const shortid = req.params.shortid;

        // perform the mongoose call to find the long URL
        const urlObj = await ShortURL.findOne({ short: shortid });

        // if null, set status to 404
        if (!urlObj) return res.status(404).send('<h1>The short url has been expired </h1>');

        // redirect the user to original link
        res.redirect(urlObj.full);
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Internal Server Error',
            statusCode: 500
        });
    }
}

module.exports = {
    getUrls: getUrls,
    saveUrl: saveUrl,
    redirectToActualUrl: redirectToActualUrl
}
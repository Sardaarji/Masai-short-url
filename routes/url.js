// Importing the required libraries.
const express = require('express');

// Initializing the express router.
const router = express.Router();

// Importing the controller module
const urlController = require('../controller/url');

// Route for fetching all the short urls
router.get('/', (req, res) => {
    urlController.getUrls(req, res);
})

// Route for creating a short url
router.post('/short', async (req, res) => {
    urlController.saveUrl(req, res);
})

// Route for redirection to actual url
router.get('/:shortid', async (req, res) => {
    urlController.redirectToActualUrl(req, res);
})


module.exports = {
    router: router
}
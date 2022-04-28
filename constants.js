const port = process.env.PORT || 3000;
const mongodbUrl = process.env.mongodbUrl || 'mongodb://localhost/shorturls'

module.exports = {
    port: port,
    mongodbUrl: mongodbUrl
}

const mongoose = require('mongoose');

const Client = mongoose.model('client',{
    name: String
});

module.exports = Client;
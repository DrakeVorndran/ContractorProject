const mongoose = require('mongoose');

const Donation = mongoose.model('donation',{
    client: String,
    charity: String,
    charityName: String,
    amount: Number
});

module.exports = Donation;
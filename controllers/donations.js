module.exports = function(app) {
    const Client = require('../models/Client');
    const Donation = require('../models/Donation');
    
    
    app.get('/donations', (req,res) => {
        Donation.find().then((donations) => {
            res.render('donations',{donations: donations})
        })
    })
    
    app.post('/donations',(req,res) => {
        Donation.create(req.body).then((donation) => {
            console.log(donation);
            res.redirect(`/charities/${donation.charity}`)
        })
    })
    
    
    app.delete('/donations/:id',(req,res) => {
        Donation.findByIdAndRemove(req.params.id).then((donation) => {
            console.log("delete donation");
            res.redirect(`/..`)
        }).catch((err) => {
            console.log(err);
        })
    })

}
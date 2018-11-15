module.exports = function(app) {
    const Client = require('../models/Client');
    const Donation = require('../models/Donation');

    app.get('/clients',(req,res) => {
        Client.find().then(clients => {
            res.render('clients',{clients: clients})
        })
            .catch((err) => {
            console.log(err);
        })
    })

    app.get('/clients/new',(req,res) => {
        res.render('new-client')
    })

    app.get('/clients/:id',(req,res) => {
        Client.findById(req.params.id).then((client) => {
            Donation.find({client: req.params.id}).then((donations) => {
                console.log(donations)
                res.render('clients-view',{client: client, donations: donations})

            })
        })
    })

    app.post('/clients', (req, res) => {
        console.log(req.body);
        Client.create(req.body).then(client => {
            client.donations = {};
            console.log(client);
            res.redirect('/clients');
        }).catch((err) => {
            console.log(err)
        })
    })


    app.delete('/clients/:id',(req,res) => {
        Client.findByIdAndRemove(req.params.id).then((client) => {
            console.log("delete client");
            res.redirect('/clients');
        }).catch((err) => {
            console.log(err);
        })
    })


}
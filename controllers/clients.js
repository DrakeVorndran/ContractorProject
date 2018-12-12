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
                if(req.header('Content-Type') == 'application/json') { return res.send({donations: donations}); console.log('json')}
                console.log(donations)
                res.render('clients-view',{client: client, donations: donations})

            })
        })
    })

    app.get('/clients/:id/edit',(req,res) => {
        Client.findById(req.params.id).then((client) => {
            Donation.find({client: req.params.id}).then((donations) => {
                res.render('clients-edit',{client: client})

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


    app.put('/clients/:id', (req,res) => {
        Client.findByIdAndUpdate(req.params.id, req.body)
            .then(client => {
            console.log(req.body);
            Donation.find({client: client._id}).then((donations) => {
                console.log(client)
                for(let i = 0; i<donations.length; i++){
                    donations[i].clientName = req.body.name;
                    donations[i].save();
                }
            })
            res.redirect(`/clients/${client._id}`)
        })
            .catch(err => {
            console.log(err.message);
        })
    });

    app.delete('/clients/:id',(req,res) => {
        Client.findByIdAndRemove(req.params.id).then((client) => {
            console.log("delete client");
            res.redirect('/clients');
        }).catch((err) => {
            console.log(err);
        })
    })


}
module.exports = function(app) {
    const Client = require('../models/Client');
    
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
    
    app.post('/clients', (req, res) => {
        Client.create(req.body).then(client => {
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
module.exports = function(app) {
    const Client = require('../models/Client');
    const Donation = require('../models/Donation');

    const https = require('https')
    app.get('/', function (req, res) {
        let queryString = req.query.term;
        let sortString = req.query.sort;
        let scopeString = req.query.scopeOfWork;
        // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
        let term = encodeURIComponent(queryString);
        let sort = encodeURIComponent(sortString);
        let scope = encodeURIComponent(scopeString);
        console.log(term,sort,scope);
        // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
        let url=`https://api.data.charitynavigator.org/v2/Organizations?app_id=e0c53d98&app_key=b07c4b7aa260ec37497bf26a0481e9d4&pageSize=50&search=${term}&rated=true&ScopeOfWork=${scope}`
        if(scope == undefined){
            console.log(scope)
            url+=`&ScopeOfWork=${scope}`;
        }

        if(sort != 'None'){
            console.log(sort)
            
            url+=`&sort=${sort}`;
        }


        https.get(url, function(response) {
            // SET ENCODING OF RESPONSE TO UTF8
            response.setEncoding('utf8');
            let body = '';

            response.on('data', function(d) {
                // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
                body += d;
            });

            response.on('end', function() {
                // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
                var parsed = JSON.parse(body);
                // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
                res.render('home', {charities: parsed})
            });
        });
    })

    app.get('/charities/:ein', (req, res) => {
        const url=`https://api.data.charitynavigator.org/v2/Organizations/${req.params.ein}?app_id=e0c53d98&app_key=b07c4b7aa260ec37497bf26a0481e9d4
`
        https.get(url, function(response) {
            // SET ENCODING OF RESPONSE TO UTF8
            response.setEncoding('utf8');
            let body = ''

            response.on('data', function(d) {
                // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
                body += d;
            });

            response.on('end', function() {
                // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
                var parsed = JSON.parse(body);
                Client.find().then(clients => {
                    Donation.find({charity: req.params.ein}).then(donations => {
                        res.render('charities-view', {charity: parsed, clients:clients, donations: donations})

                    })

                })
                // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
            });
        });

    })


}
module.exports = function(app) {
    const http = require('http')
    app.get('/', function (req, res) {
        console.log(req.query.term)
        let queryString = req.query.term;
        // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
        let term = encodeURIComponent(queryString);
        // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
        const url=`https://api.data.charitynavigator.org/v2/Organizations?app_id=e0c53d98&app_key=b07c4b7aa260ec37497bf26a0481e9d4&search=${term}&rated=true`


        http.get(url, function(response) {
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
                res.render('home', {charities: parsed.data})
            });
        });
    })


}
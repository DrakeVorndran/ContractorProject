const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contractor-project');



app.engine('.hbs', exphbs({extname:'.hbs',defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));






const clients = require('./controllers/clients')(app);
const charities = require('./controllers/charities')(app);
const donations = require('./controllers/donations')(app);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
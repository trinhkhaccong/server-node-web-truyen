const express = require('express');
const fs = require('fs');
const app = express();
var http = require('http');
var https = require('https');
const elasticsearch = require('elasticsearch');

//const PORT = 80;
const PORT = 5000;
//const PORT_S = 443;
//var privateKey  = fs.readFileSync('hcdt.vn.pkey', 'utf8');
//var certificate = fs.readFileSync('hcdt.vn.cachain.pem', 'utf8');

//var credentials = {key: privateKey, cert: certificate};

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
 });

 app.use(express.json());       // to support JSON-encoded bodies
 app.use(express.urlencoded());
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  require('./get_type')(app,client);
  require('./get_data_truyen')(app,client);
  require('./get_conten')(app,client);
  require('./get_truyen')(app,client);
  require('./get_list_home')(app,client);
  require('./get_history')(app,client);
  require('./get_search')(app,client);
  require('./get_list_nomal')(app,client);
  
var httpServer = http.createServer(app);
httpServer.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

//var httpsServer = https.createServer(credentials, app);
//httpsServer.listen(PORT_S, function() {
//  console.log('Server is running on PORT:',PORT_S);
//});
const express = require('express');
const logger = require('morgan');
const user_routers = require('./app/apis/routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./app/apis/config/database');

const app = express()
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())
app.use(user_routers)


app.get('/', function(req, res){
 res.json({"tutorial" : "Build REST API with node.js"});
});

app.listen(3000, function(){ console.log('Node server listening on port 3000');});

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Data = require('./data_model');

var app = express();

var PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mockdata');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/data', function(req, res) {
  Data.find({}, function(err, datas) {
    res.send(datas);
  });
});

app.listen(PORT);
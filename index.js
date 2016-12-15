var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Data = require('./data_model');
var Seeder = require('./db_seeder');

var app = express();

var PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mockdata');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/data', function(req, res) {
  Data.find({}, function(err, datas) {
    res.send(datas);
  });
});

Data.find({}, function(err, result) {
  if(!result.length) {
    Seeder.populateDB();
  }
})

app.listen(PORT);
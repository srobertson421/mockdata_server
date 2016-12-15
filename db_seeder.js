var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var Data = require('./data_model');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mockdata');

var nameGeneratorUrl = 'http://www.behindthename.com/random/random.php?number=1&gender=both&surname=&randomsurname=yes&all=no&usage_eng=1';

var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var progress = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createName() {
  var firstName = '';
  var lastName = '';

  for(var i = 0; i < getRandomInt(4, 8); i++) {
    var randNum = getRandomInt(0, 25);
    if(i === 0) {
      firstName += alphabet[randNum].toUpperCase();
    } else {
      firstName += alphabet[randNum]
    }
  }

  for(var j = 0; j < getRandomInt(5, 10); j++) {
    var randNum = getRandomInt(0, 25);
    if(j === 0) {
      lastName += alphabet[randNum].toUpperCase();
    } else {
      lastName += alphabet[randNum]
    }
  }

  return firstName + ' ' + lastName;
}

function nameGenerator() {
  request(nameGeneratorUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      parseName(body, function(name) {
        Data.create({
          name: name,
          upside: getRandomInt(0,100),
          downside: getRandomInt(0,100),
          left: getRandomInt(0,100),
          right: getRandomInt(0,100)
        }, function(err, data) {
          if(!err) {
            progress++
            console.log(progress + '% done');
          }
        });
      });
    }
  });
}

function parseName(html, callback) {
  var $ = cheerio.load(html);
  var name = [];
  $('.heavyhuge a').each(function(i, elem) {
    name[i] = $(this).text();
  });
  name = name.join(' ');
  callback(name);
}

function populateDB() {
  var dbInterval = setInterval(function() {
    if(progress === 100) {
      clearInterval(dbInterval);
    }
    nameGenerator();
  }, 1000);
}

module.exports = {
  populateDB: populateDB
}
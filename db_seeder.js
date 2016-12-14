var mongoose = require('mongoose');
var Data = require('./data_model');

mongoose.connect('mongodb://localhost/mockdata');

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

for(var i = 0; i < 100; i++) {
  Data.create({
    name: createName(),
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
}
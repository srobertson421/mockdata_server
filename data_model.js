var mongoose = require('mongoose');

var DataSchema = new mongoose.Schema({
  name: String,
  upside: Number,
  downside: Number,
  left: Number,
  right: Number
});

var Data = mongoose.model('Data', DataSchema);

module.exports = Data;
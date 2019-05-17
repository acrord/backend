const mongoose = require('mongoose');

const Answer_Schema = new mongoose.Schema({
  classCode: { type: String, required: true }, 
  userID: { type: String, required: true },
  SID: { type: Number, required: true },
  answer: [{ type: String }],
  surveyType:[{type: Number}]
});

const Answer_S = mongoose.model('Answer_S', Answer_Schema);

module.exports = Answer_S;

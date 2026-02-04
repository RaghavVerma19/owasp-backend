const mongoose = require('mongoose');

const recruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  scholarNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[2]\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid Scholar Number!`
    }
  },
  vertical: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid Phone Number!`
    }
  },
  task1Github: String,
  task1Deployment: String,
  task2Github: String,
  task2Deployment: String,
  pdfLink: String,
  driveLink: String,
  portfolioLink: String,
  posterLink: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Recruit', recruitSchema);

const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  to: {
    type: [String],  
    default: []
  },
  cc: {
    type: [String],
    default: []
  },
  bcc: {
    type: [String],
    default: []
  },
  from: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: ""
  },
  body: {
    type: String,
    default: ""
  }
});


module.exports = mongoose.model("mail", MailSchema);

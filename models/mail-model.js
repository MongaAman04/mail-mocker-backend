import mongoose from 'mongoose';

const MailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
    default: ''
  },
  body: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Mail = mongoose.model('mail', MailSchema);
export default Mail;

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mailmocker');

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    mails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'mail'
        }
    ]
})

module.exports = mongoose.model('user', UserSchema)
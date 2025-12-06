const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    to: String,
    cc: String,
    bcc: String,
    from: String,
    subject: String,
    body: String,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("draft", draftSchema);

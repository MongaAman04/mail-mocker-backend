const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    simulationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mail"
    },
    deliverabilityStatus: String,
    smtpStatus: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("log", logSchema);

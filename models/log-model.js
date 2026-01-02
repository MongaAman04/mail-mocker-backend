import mongoose from 'mongoose';
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

const Log = mongoose.model("log", logSchema);
export default Log
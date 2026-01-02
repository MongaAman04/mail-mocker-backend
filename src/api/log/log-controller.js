import logModel from '../../../models/log-model.js';

export const LogSimulationController = async (req, res) => {
    try {
        const logs = await logModel.find({
            simulationId: req.params.simulationId
        });

        res.send(logs);
    } catch (error) {
        res.status(500).send("Error fetching logs");
    }
}

export const LogController = async (req, res) => {
    try {
        const { simulationId, deliverabilityStatus, smtpStatus } = req.body;

        const log = await logModel.create({
            simulationId,
            deliverabilityStatus,
            smtpStatus
        });

        res.send(log);

    } catch (error) {
        res.status(500).send("Error saving log");
    }
}
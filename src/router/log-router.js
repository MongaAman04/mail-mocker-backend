import { LogController, LogSimulationController } from '../api/log/log-controller.js';
import express from 'express';

const logRouter = express.Router();

logRouter.get("/logs/:simulationId",LogSimulationController);

logRouter.post("/log",LogController );

export default logRouter;
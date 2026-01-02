import express from "express";
import isLoggedIn from "../middleware/authmiddleware.js";
import { getAllController, getMailbyIdController, MailController } from "../api/mail/mail-controller.js";
import { deleteDraftController, getDraftController, saveDraftController } from "../api/mail/draft-controller.js";

const mailRouter = express.Router();

mailRouter.get("/simulations", isLoggedIn, getAllController);
mailRouter.get("/simulate/:id", isLoggedIn, getMailbyIdController);

mailRouter.post("/simulate", isLoggedIn, MailController )

mailRouter.get("/drafts", isLoggedIn, getDraftController );

mailRouter.post("/draft/save", isLoggedIn, saveDraftController);
mailRouter.delete("/draft/:id", isLoggedIn, deleteDraftController);

export default mailRouter
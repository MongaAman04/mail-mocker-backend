import mailModel from "../../../models/mail-model.js";
import userModel from '../../../models/user-model.js';

export const getAllController = async (req, res) => {
    try {
        const mails = await mailModel.find({ user: req.user._id });
        res.send(mails);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
}

export const getMailbyIdController = async (req, res) => {
    try {
        const mail = await mailModel.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!mail) return res.status(404).send("Email not found");

        res.send(mail);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
}

export const MailController = async (req, res) => {
    const { to, cc, bcc, from, subject, body } = req.body;
    let user = await userModel.findOne({ email: req.user.email });
    let mails = await mailModel.create({
        user: user._id,
        to, cc, bcc, from, subject, body
    })
    user.mails.push(user._id);
    await user.save();
    res.send(mails);
}
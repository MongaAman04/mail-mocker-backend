import draftModel from "../../../models/draf-model.js"
export const saveDraftController =  async (req, res) => {

    try {
        const { draftId, to, cc, bcc, from, subject, body } = req.body;
        let draft;
        console.log(req.user);
        if (draftId) {
            draft = await draftModel.findOneAndUpdate(
                { _id: draftId, user: req.user._id },
                { to, cc, bcc, from, subject, body, updatedAt: Date.now() },
                { new: true }
            );
            // res.send(draft)
        } else {

            draft = await draftModel.create({
                user: req.user._id,
                to,
                cc,
                bcc,
                from,
                subject,
                body
            });
        }
    } catch (error) {
        res.status(500).send("Error saving draft");
    }
}

export const deleteDraftController = async (req, res) => {
    try {
        const deleted = await draftModel.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!deleted) return res.status(404).send("Draft not found");

        res.send({ message: "Draft discarded successfully" });
    } catch (error) {
        res.status(500).send("Error deleting draft");
    }
}

export const getDraftController = async (req, res) => {
    try {
        const drafts = await draftModel
            .find({ user: req.user._id })
            .sort({ updatedAt: -1 });

        res.send(drafts);
    } catch (error) {
        res.status(500).send("Error fetching drafts");
    }
}
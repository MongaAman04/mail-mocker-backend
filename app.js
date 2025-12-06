const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userModel = require('./models/user-model');
const mailModel = require('./models/mail-model');
const logModel = require("./models/log-model");
const draftModel = require('./models/draf-model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Not authenticated");

    jwt.verify(token, "martian", async (err, decoded) => {
        if (err) return res.status(401).send("Invalid token");

        req.user = await userModel.findOne({ email: decoded.email }).select("-password");
        next();
    });
}

app.get("/", (req, res) => {
    res.send("Api is running ...");
})
// --------------------------auth---------------------------------------------
app.get("/auth/user", isLoggedIn, (req, res) => {
    res.send(req.user);
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createUser = await userModel.create({
                username,
                email,
                password: hash
            })
            let token = jwt.sign({ email: email }, "martian");
            res.cookie("token", token);
            res.send(createUser);
        })
    })
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("Something went wrong");
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email }, "martian");
            res.cookie("token", token);
            res.send("yes working");
        } else {
            res.status(500).send("Something went wrong");
        }
    });
})

// --------------------------email simulation ------------------------------
app.get("/email/simulations", isLoggedIn, async (req, res) => {
    try {
        const mails = await mailModel.find({ user: req.user._id });
        res.send(mails);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/email/simulate/:id", isLoggedIn, async (req, res) => {
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
});

app.post("/email/simulate",isLoggedIn,async (req,res)=>{
    const {to ,cc,bcc,from,subject,body } = req.body;
    let user = await userModel.findOne({email : req.user.email});
    let mails = await mailModel.create({
        user : user._id,
        to,cc,bcc,from,subject,body
    })
    user.mails.push(user._id);
    await user.save();
    res.send(mails);
})

// ------------------------status log-------------------------------
app.get("/email/logs/:simulationId", async (req, res) => {
    try {
        const logs = await logModel.find({
            simulationId: req.params.simulationId
        });

        res.send(logs);
    } catch (error) {
        res.status(500).send("Error fetching logs");
    }
});

app.post("/email/log", async (req, res) => {
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
});

// ---------------------email drafts ---------------------
app.get("/email/drafts", isLoggedIn, async (req, res) => {
    try {
        const drafts = await draftModel
            .find({ user: req.user._id })
            .sort({ updatedAt: -1 });

        res.send(drafts);
    } catch (error) {
        res.status(500).send("Error fetching drafts");
    }
});

app.post("/email/draft/save", isLoggedIn, async (req, res) => {
    
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
});
app.delete("/email/draft/:id", isLoggedIn, async (req, res) => {
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
});
``
app.listen(3000, () => {
    console.log("server is running good....");

});
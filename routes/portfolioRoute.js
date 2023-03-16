const express = require("express");
const router = express.Router();
const {
    Intro,
    About,
    Experience,
    Project,
    Education,
    Contact,
    Message,
} = require("../models/portfolioModel");

const User = require("../models/userModel");

router.get("/get-portfolio-data", async (req, res) => {
    // Pull the data from every collection in the database.
    // console.log( "PortfolioRoute.js received get-portfolio-data request on:",
    //     req.headers.host,
    //     req.socket.localPort,
    //     req.socket.remotePort,
    //     req.socket.address,
    //     req.socket.remoteAddress,
    //     req.headers["access-control-allow-origin"]
    // );
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const experiences = await Experience.find();
        const projects = await Project.find();
        const educations = await Education.find();
        const contacts = await Contact.find();
        const messages = await Message.find();
        // console.log(
        //     intros,
        //     abouts,
        //     experiences,
        //     projects,
        //     educations,
        //     contacts,
        //     messages,
        // );

        // res.writeHead(200, {
        //     "Content-Type": "text/plain",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        // });
        res.status( 200 ).send(
            {
            intro: intros[0],
            about: abouts[0],
            experiences: experiences,
            projects: projects,
            educations: educations,
            contact: contacts[0],
            messages: messages,
            }
        );
        // console.log( "test" );
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update intro
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true },
        );
        console.log(
            "router.post(/update-intro): ",
            req.body,
            req.headers,
            res.success,
        );
        // If it works, throw a success message.
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update about
router.post("/update-about", async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true },
        );
        // If it works, throw a success message.
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add experience
router.post("/add-experience", async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();

        // If it works, throw a success message.
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete experience
router.post("/delete-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndDelete({
            _id: req.body._id,
        });

        // If it works, throw a success message.
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update experience
router.post("/update-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true },
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add project
router.post("/add-project", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();

        // If it works, throw a success message.
        res.status(200).send({
            data: project,
            success: true,
            message: "Project added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete project
router.post("/delete-project", async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.body._id,
        });

        // If it works, throw a success message.
        res.status(200).send({
            data: project,
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update project
router.post("/update-project", async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true },
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add education
router.post("/add-education", async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();

        // If it works, throw a success message.
        res.status(200).send({
            data: education,
            success: true,
            message: "Education added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete education
router.post("/delete-education", async (req, res) => {
    try {
        const education = await Education.findOneAndDelete({
            _id: req.body._id,
        });

        // If it works, throw a success message.
        res.status(200).send({
            data: education,
            success: true,
            message: "Education deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update education
router.post("/update-education", async (req, res) => {
    try {
        const education = await Education.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true },
        );
        res.status(200).send({
            data: education,
            success: true,
            message: "Education updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update contact info
router.post("/update-contact", async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true },
        );
        // If it works, throw a success message.
        res.status(200).send({
            data: contact,
            success: true,
            message: "Contact updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Send message
router.post("/send-message", async (req, res) => {
    try {
        // console.log("router.post(/send-message): ", req, res);
        // console.log("router.post(/send-message): ", req.body, req.headers, res.success);
        const message = new Message(req.body);
        await message.save();
        // If it works, throw a success message.
        res.status(200).send({
            data: message,
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete message
router.post("/delete-message", async (req, res) => {
    try {
        const message = await Message.findOneAndDelete({
            _id: req.body._id,
        });

        // If it works, throw a success message.
        res.status(200).send({
            data: message,
            success: true,
            message: "Message deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Admin login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        // Blank out the password so it doesn't get saved in the localstorage token.
        user.password = "";
        if (user) {
            res.status(200).send({
                data: user,
                success: true,
                message: "Logged in successfully",
            });
        } else {
            res.status(200).send({
                data: user,
                success: false,
                message: "Invalid username or password.",
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

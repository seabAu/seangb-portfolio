const express = require( "express" );
const router = express.Router();
const auth = require( "../middleware/auth" );

const {
    Intro,
    About,
    Experience,
    Project,
    Education,
    Contact,
    Message,
} = require( "../models/portfolioModel" );

const User = require( "../models/userModel" );

// Helper functions.
const response = ( data, success, message, statusCode ) => {};
const sendResponse = ( res ) => {
    // Res will be an object. IF it contains valid values, proceed with sending it along.
    //     response({
    //         data: intro,
    //         success: true,
    //         message: "Intro updated successfully",
    //         status: 200,
    //     });
};

router.get( "/get-portfolio-data", async ( req, res ) => {
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
        res.status( 200 ).send( {
            intro: intros[ 0 ],
            about: abouts[ 0 ],
            experiences: experiences,
            projects: projects,
            educations: educations,
            contact: contacts[ 0 ],
            messages: messages,
        } );
        // console.log( "test" );
    } catch ( error ) {
        res.status( 500 ).send( error );
    }
} );

// Update intro
router.post( "/update-intro", auth, async ( req, res ) => {
    try {
        const intro = await Intro.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        console.log(
            "router.post(/update-intro): ",
            req.body,
            req.headers,
            res.success,
        );
        // If it works, throw a success message.
        // res.status(200).send({
        //     data: intro,
        //     success: true,
        //     message: "Intro updated successfully",
        // });
        res.send( {
            data: intro,
            success: true,
            message: "Intro updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        console.log( "/update-intro :: res = ", res, " :: error = ", error );
        // res.status(500).send(error);
        // res.status( 500 ).send( error );
        // res.sendStatus(500);
        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Update about
router.post( "/update-about", auth, async ( req, res ) => {
    try {
        const about = await About.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        // If it works, throw a success message.
        res.send( {
            data: about,
            success: true,
            message: "About updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Add experience
router.post( "/add-experience", auth, async ( req, res ) => {
    try {
        const experience = new Experience( req.body );
        await experience.save();

        // If it works, throw a success message.
        res.send( {
            data: experience,
            success: true,
            message: "Experience added successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Delete experience
router.post( "/delete-experience", auth, async ( req, res ) => {
    try {
        const experience = await Experience.findOneAndDelete( {
            _id: req.body._id,
        } );

        // If it works, throw a success message.
        res.send( {
            data: experience,
            success: true,
            message: "Experience deleted successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Update experience
router.post( "/update-experience", auth, async ( req, res ) => {
    try {
        const experience = await Experience.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        res.send( {
            data: experience,
            success: true,
            message: "Experience updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Add project
router.post( "/add-project", auth, async ( req, res ) => {
    console.log( "portfolioRoute.js :: /add-project :: ", req, res );
    try {
        const project = new Project( req.body );
        await project.save();

        // If it works, throw a success message.
        res.send( {
            data: project,
            success: true,
            message: "Project added successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Delete project
router.post( "/delete-project", auth, async ( req, res ) => {
    try {
        const project = await Project.findOneAndDelete( {
            _id: req.body._id,
        } );

        // If it works, throw a success message.
        res.send( {
            data: project,
            success: true,
            message: "Project deleted successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Update project
router.post( "/update-project", auth, async ( req, res ) => {
    try {
        const project = await Project.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        res.send( {
            data: project,
            success: true,
            message: "Project updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Add education
router.post( "/add-education", auth, async ( req, res ) => {
    try {
        const education = new Education( req.body );
        await education.save();

        // If it works, throw a success message.
        res.send( {
            data: education,
            success: true,
            message: "Education added successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Delete education
router.post( "/delete-education", auth, async ( req, res ) => {
    try {
        const education = await Education.findOneAndDelete( {
            _id: req.body._id,
        } );

        // If it works, throw a success message.
        res.send( {
            data: education,
            success: true,
            message: "Education deleted successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Update education
router.post( "/update-education", auth, async ( req, res ) => {
    try {
        const education = await Education.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        res.send( {
            data: education,
            success: true,
            message: "Education updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Update contact info
router.post( "/update-contact", auth, async ( req, res ) => {
    try {
        const contact = await Contact.findOneAndUpdate( {
                _id: req.body._id
            },
            req.body, {
                new: true
            },
        );
        // If it works, throw a success message.
        res.send( {
            data: contact,
            success: true,
            message: "Contact updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Send message
router.post( "/send-message", async ( req, res ) => {
    try {
        // console.log("router.post(/send-message): ", req, res);
        // console.log("router.post(/send-message): ", req.body, req.headers, res.success);
        const message = new Message( req.body );
        await message.save();
        // If it works, throw a success message.
        res.status(200).send( {
            data: message,
            success: true,
            message: "Message sent successfully",
            // status: 200,
        } );
    } catch ( error ) {
        res.status(500).send(error);
    }
} );

// Edit / Update message
router.post( "/edit-message", auth, async ( req, res ) => {
    try {
        // console.log("router.post(/send-message): ", req, res);
        // console.log("router.post(/send-message): ", req.body, req.headers, res.success);
        const message = new Message( req.body );
        await message.save();
        // If it works, throw a success message.
        res.send( {
            data: message,
            success: true,
            message: "Message sent successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

// Delete message
router.post( "/delete-message", auth, async ( req, res ) => {
    try {
        const message = await Message.findOneAndDelete( {
            _id: req.body._id,
        } );

        // If it works, throw a success message.
        res.send( {
            data: message,
            success: true,
            message: "Message deleted successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);

        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
} );

/*
// Admin login
router.post("/login", auth, async (req, res) => {
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
            status: 200,
            });
        } else {
            res.status(200).send({
                data: user,
                success: false,
                message: "Invalid username or password.",
            status: 200,
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
*/
module.exports = router;
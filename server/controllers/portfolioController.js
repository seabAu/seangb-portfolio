// All routes used by apps hosted on this site.
import mongoose from "mongoose";
import express from 'express';
const router = express.Router();
const debug = process.env.DEBUG || false;

import {
    Intro,
    About,
    Experience,
    Project,
    Education,
    Contact,
    Message,
} from "../models/portfolioModel.js";

import { User } from "../models/userModel.js";

// Helper functions.
const response = ( data, success, message, statusCode ) => { };
const sendResponse = ( res ) => {
    // Res will be an object. IF it contains valid values, proceed with sending it along.
    //     response({
    //         data: intro,
    //         success: true,
    //         message: "Intro updated successfully",
    //         status: 200,
    //     });
};

const GetPortfolioData = async ( req, res ) => {
    // Pull the data from every collection in the database.
    // if ( debug )
    //     console.log( "PortfolioRoute.js received get-portfolio-data request on:",
    //         "\n", "req.headers.host: ", req.headers.host,
    //         "\n", "req.socket.localPort: ", req.socket.localPort,
    //         "\n", "req.socket.remotePort: ", req.socket.remotePort,
    //         "\n", "req.socket.address: ", req.socket.address,
    //         "\n", "req.socket.remoteAddress: ", req.socket.remoteAddress,
    //         "\n", "req.body: ", req.body,
    //         "\n", "req.headers[ \"access-control-allow-origin\"]: ", req.headers[ "access-control-allow-origin" ]
    //     );
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const experiences = await Experience.find();
        const projects = await Project.find();
        const educations = await Education.find();
        const contacts = await Contact.find();
        const messages = await Message.find();
        // if ( debug ) console.log(
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
        // if ( debug ) console.log( "test" );
    } catch ( error ) {
        res.send( {
            data: error,
            error: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
};

// Update intro
const PortfolioIntroUpdate = async ( req, res ) => {
    try {
        const intro = await Intro.findOneAndUpdate( {
            _id: req.body._id
        },
            req.body, {
            new: true
        },
        );
        /// if ( debug ) console.log(
        ///     "router.post(/update-intro): ",
        ///     req.body,
        ///     req.headers,
        ///     res.success,
        /// );
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
        /// if ( debug ) console.log( "/update-intro :: res = ", res, " :: error = ", error );
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
};

// Update about
const PortfolioAboutUpdate = async ( req, res ) => {
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
};

// Add experience
const PortfolioExperienceAdd = async ( req, res ) => {
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
};

// Delete experience
const PortfolioExperienceDelete = async ( req, res ) => {
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
};

// Update experience
const PortfolioExperienceUpdate = async ( req, res ) => {
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
};

// Add project
const PortfolioProjectAdd = async ( req, res ) => {
    if ( debug ) console.log( "portfolioRoute.js :: /add-project :: ", JSON.stringify( req.body ) );
    try {
        // TODO :: Set up nested schemas for Technologies, tags, and categories, to avoid _id validation issues. 
        let data = req.body;
        if ( "technologies" in data ) {
            // Clear out any _id fields. 
            let techs = [ ...data.technologies ];
            techs.map( ( tech, index ) => {
                if ( "_id" in tech ) {
                    if ( debug ) console.log( "Tech has faulty _id: ", tech._id );
                    delete tech[ '_id' ];
                    return tech;
                }
                else {
                    return tech;
                }
            } );

            data = {
                ...data,
                technologies: techs
            };
        }

        const project = new Project( data );
        await project.save();
        if ( debug ) console.log( "ProjectAdd :: Success :: project = ", project );

        // If it works, throw a success message.
        res.send( {
            data: project,
            success: true,
            message: "Project added successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);
        if ( debug ) console.log( "ProjectAdd :: Error :: error = ", error );
        res.send( {
            data: error,
            success: false,
            message: "Error adding project: Error 500.",
            status: 500,
        } );
    }
};

// Delete project
const PortfolioProjectDelete = async ( req, res ) => {
    try {
        const project = await Project.findOneAndDelete( {
            _id: req.body._id,
        } );

        if ( debug ) console.log( "PortfolioProjectDelete :: Success :: project = ", project );

        // If it works, throw a success message.
        res.send( {
            data: project,
            success: true,
            message: "Project deleted successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);
        if ( debug ) console.log( "PortfolioProjectDelete :: Error :: error = ", error );
        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
};

// Update project
const PortfolioProjectUpdate = async ( req, res ) => {
    try {
        let data = req.body;
        if ( "technologies" in data ) {
            // Clear out any _id fields. 
            let techs = [ ...data.technologies ];
            techs.map( ( tech, index ) => {
                if ( "_id" in tech ) {
                    if ( debug ) console.log( "Checking tech = ", JSON.stringify( tech ) );
                    if ( !mongoose.Types.ObjectId.isValid( tech._id ) ) {
                        // Is not a valid object ID.
                        if ( debug ) console.log( "Tech (", JSON.stringify( tech ), ") has faulty _id: ", tech._id );
                        delete tech[ '_id' ];
                    }
                }
                return tech;
            } );

            data = {
                ...data,
                technologies: techs
            };
        }

        const project = await Project.findOneAndUpdate(
            { _id: req.body._id },
            data,
            { new: true },
        );

        if ( debug ) console.log( "PortfolioProjectUpdate :: req.body._id = ", req.body._id, ", :: ", "Success :: project = ", project );

        res.send( {
            data: project,
            success: true,
            message: "Project updated successfully",
            status: 200,
        } );
    } catch ( error ) {
        // res.status(500).send(error);
        if ( debug ) console.log( "PortfolioProjectUpdate :: Error :: error = ", error );
        res.send( {
            data: error,
            success: false,
            message: "500 Error.",
            status: 500,
        } );
    }
};

// Add education
const PortfolioEducationAdd = async ( req, res ) => {
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
};

// Delete education
const PortfolioEducationDelete = async ( req, res ) => {
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
};

// Update education
const PortfolioEducationUpdate = async ( req, res ) => {
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
};

// Update contact info
const PortfolioContactUpdate = async ( req, res ) => {
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
};

// Send message
const SendMessage = async ( req, res ) => {
    try {
        // if ( debug ) console.log("router.post(/send-message): ", req, res);
        // if ( debug ) console.log("router.post(/send-message): ", req.body, req.headers, res.success);
        const message = new Message( req.body );
        await message.save();
        // If it works, throw a success message.
        res.status( 200 ).send( {
            data: message,
            success: true,
            message: "Message sent successfully",
            // status: 200,
        } );
    } catch ( error ) {
        res.status( 500 ).send( {
            data: error,
            success: false,
            error: error
        } );
    }
};

// Edit / Update message
const EditMessage = async ( req, res ) => {
    try {
        // if ( debug ) console.log("router.post(/send-message): ", req, res);
        // if ( debug ) console.log("router.post(/send-message): ", req.body, req.headers, res.success);
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
};

// Delete message
const DeleteMessage = async ( req, res ) => {
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
};

export {
    GetPortfolioData,
    PortfolioIntroUpdate,
    PortfolioAboutUpdate,
    PortfolioExperienceAdd,
    PortfolioExperienceDelete,
    PortfolioExperienceUpdate,
    PortfolioProjectAdd,
    PortfolioProjectDelete,
    PortfolioProjectUpdate,
    PortfolioEducationAdd,
    PortfolioEducationDelete,
    PortfolioEducationUpdate,
    PortfolioContactUpdate,
    SendMessage,
    EditMessage,
    DeleteMessage,
};

/*
    // Admin login
   
    const FunctionName = async (req, res) => {
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

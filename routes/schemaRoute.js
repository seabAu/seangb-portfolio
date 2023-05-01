// All routes used by apps hosted on this site.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");

const { Intro, About, Experience, Project, Education, Contact, Message } = require("../models/portfolioModel");

const User = require("../models/userModel");

const { Blog, Post, Comment } = require("../models/blogModel");

const { Planner, Tasks } = require("../models/appsModel");

// @route GET api/apps/planner/tasks/test
// @description tests tasks route
// @access Public
router.get("/test", (req, res) => res.send("task route testing!"));

router.get("/", auth, async (req, res) => {
	// Pull the schema from every collection in the database.
    try
    {
        res.send({
			data: {
				portfolioData: {
					intro: Intro.schema,
					about: About.schema,
					experiences: Experience.schema,
					projects: Project.schema,
					educations: Education.schema,
					contact: Contact.schema,
					messages: Comment.schema,
				},
				blog: {
					blog: Blog.schema,
					posts: Post.schema,
					comments: Comment.schema,
				},
				user: {
					users: User.schema,
				},
				planner: {
					planners: Planner.schema,
					tasks: Tasks.schema,
				},
			},
			success: true,
			message: "Fetched schemas correctly.",
			status: 200,
		});
        // res.status( 200 ).send(
        // );
		// console.log( "test" );
	} catch (error) {
		// res.status(500).send(error);
        res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
});

router.get("/user", auth, async (req, res) => {
	// Pull the schema from every collection in the database.
	try {
		res.send({
			data: {
				users: User.schema,
			},
			success: true,
			message: "Fetched user schemas correctly.",
			status: 200,
		});
		// res.status( 200 ).send(
		// );
		// console.log( "test" );
	} catch (error) {
		// res.status(500).send(error);
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
});

router.get("/blog", auth, async (req, res) => {
	// Pull the schema from every collection in the database.
	try {
		res.send({
			data: {
				blog: Blog.schema,
				posts: Post.schema,
				comments: Comment.schema,
			},
			success: true,
			message: "Fetched blog schemas correctly.",
			status: 200,
		});
		// res.status( 200 ).send(
		// );
		// console.log( "test" );
	} catch (error) {
		// res.status(500).send(error);
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
});

router.get("/planner", auth, async (req, res) => {
	// Pull the schema from every collection in the database.
	try {
		res.send({
			data: {
				planners: Planner.schema,
				tasks: Tasks.schema,
			},
			success: true,
			message: "Fetched schemas correctly.",
			status: 200,
		});
		// res.status( 200 ).send(
		// );
		// console.log( "test" );
	} catch (error) {
		// res.status(500).send(error);
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
});

router.get("/portfolio", async (req, res) => {
	// Pull the schema from every collection in the database.
	try {
		res.send({
			data: {
				intro: Intro.schema,
				about: About.schema,
				experiences: Experience.schema,
				projects: Project.schema,
				educations: Education.schema,
				contact: Contact.schema,
				messages: Comment.schema,
			},
			success: true,
			message: "Fetched portfolio schemas correctly.",
			status: 200,
		});
		// res.status( 200 ).send(
		// );
		// console.log( "test" );
	} catch (error) {
		// res.status(500).send(error);
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
});

const onRoute = (callPath, callType, callData) => {};

module.exports = router;

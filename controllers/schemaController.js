// All routes used by apps hosted on this site.
import express from 'express';
const router = express.Router();

import { Intro, About, Experience, Project, Education, Contact, Message } from "../models/portfolioModel.js";

import User from "../models/userModel.js";

import { Blog, Post, Comment } from "../models/blogModel.js";

import { Planner, Tasks } from "../models/appsModel.js";


const GetSchemas = async (req, res) => {
	// Pull the schema from every collection in the database.
	// console.log( "Schema GET '/' :: Req = ", req );
    try
    {
        const dat = await User.schema;
		// console.log( "Schema GET '/' :: Schema fetched = ", JSON.stringify( dat ) );
		res.send({
			data: {
                portfolioData: {
                    intro: Intro.schema,
                    about: About.schema,
                    experiences: Experience.schema,
                    projects: Project.schema,
                    educations: Education.schema,
                    contact: Contact.schema,
                    messages: Message.schema,
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
	} catch (error) {
		console.log( "Error: ", error );
        res.send({
			data: error,
			error: error,
			success: false,
			message: "Attempted fetch all schemas - 500 Error.",
			status: 500,
		});
	}
};


const GetUserSchema = async (req, res) => {
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
	} catch (error) {
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
};


const GetBlogSchema = async (req, res) => {
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
	} catch (error) {
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
};


const GetPlannerSchema = async (req, res) => {
	// Pull the schema from every collection in the database.
    try
    {
		res.send({
			data: {
				planners: Planner.schema,
				tasks: Tasks.schema,
			},
			success: true,
			message: "Fetched schemas correctly.",
			status: 200,
		});
	} catch (error) {
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
};


const GetPortfolioSchemas = async (req, res) => {
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
	} catch (error) {
		res.send({
			data: error,
			success: false,
			message: "500 Error.",
			status: 500,
		});
	}
};


export
{
    GetSchemas,
    GetUserSchema,
    GetBlogSchema,
    GetPlannerSchema,
    GetPortfolioSchemas,
};
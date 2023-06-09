import React, { useState, useEffect, useRef } from "react";
// Redux state management
import { useDispatch, useSelector } from "react-redux";
import { SetDebug, SetLoading, SetPortfolioData, SetAppsData, SetBlogData, ReloadData, SetDataSchema } from "../../redux/rootSlice";

import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import AdminEducations from "./AdminEducations";
import AdminProjects from "./AdminProjects";
import AdminExperiences from "./AdminExperiences";
import AdminMessages from "./AdminMessages";
import AdminPlanner from "./AdminPlanner";
import AdminBlog from "./AdminBlog";
import AdminDashboard from "./AdminDashboard";
import AdminDev from "./AdminDev";

// Ant components
// import { Tabs } from "antd";
import Tabs from "../../components/Tabs";
// import { TabsProps } from "antd";
// const { TabPane } = Tabs;
import API from "../../api/api.js";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Section from "../../components/Section";
import * as utils from "../../utilities/index.js";

function Admin ()
{
	const dispatch = useDispatch();
    
	const { debug, portfolioData, loggedIn, token, role, user, dataSchema } = useSelector((state) => state.root);
	const items = [
		{
			key: "0",
			label: `Dashboard`,
			children: <AdminDashboard />,
			enabled: true,
		},

		{
			key: "1",
			label: `Intro`,
			children: <AdminIntro />,
			enabled: true,
		},

		{
			key: "2",
			label: `About`,
			children: <AdminAbout />,
			enabled: true,
		},

		{
			key: "3",
			label: `Experiences`,
			children: <AdminExperiences />,
			enabled: true,
		},

		{
			key: "4",
			label: `Projects`,
			children: <AdminProjects />,
			enabled: true,
		},

		{
			key: "5",
			label: `Education`,
			children: <AdminEducations />,
			enabled: true,
		},

		{
			key: "6",
			label: `Messages`,
			children: <AdminMessages />,
			enabled: true,
		},
		
		{
			key: "7",
			label: `Blog`,
			children: <AdminBlog />,
			enabled: true,
		},
		
		{
			key: "8",
			label: `Planner`,
			children: <AdminPlanner />,
			enabled: true,
		},

		{
			key: "9",
			label: `Dev`,
			children: <AdminDev />,
			enabled: true,
		},
	];

	// axios.defaults.baseURL = `http://147.182.184.250:4000`;
	const apiGet = async (apiCall) => {
		console.log("Admin.JS :: onFinish triggered :: apiCall = ", apiCall);
		try {
			dispatch(SetLoading(true));
			let response = await API.get(`api${apiCall}`);
			if (debug) console.log("apiGet() :: apiCall = ", apiCall, " :: After API response :: response = ", response);
			dispatch(SetLoading(false));
			if (response.data.success) {
				if (debug) console.log("apiGet() :: apiCall = ", apiCall, " :: After API response :: response.data.success = ", response.data.success);
				message.success(response.data.message);
				dispatch(SetLoading(false));
			} else {
				// if ( debug )
				console.log("apiGet() :: apiCall = ", apiCall, " :: After API response :: ERROR :: response.data.error = ", response.data);
				message.error(response.data.message);
			}
			return response;
		} catch (error) {
			dispatch(SetLoading(false));
			console.log("apiGet() :: apiCall = ", apiCall, " :: Try-catch in error :: After API response :: ERROR :: response.data.error = ", error);
			message.error(error.message);
		}
	};

	const getSchema = async () => {
		// const dataTemp = await getData(`/apps/planner/tasks`);
		const schemaTemp = await apiGet(`/schema`);
		console.log("ADMIN.JS :: schemaTemp = ", schemaTemp);

		let schema = Promise.resolve(schemaTemp).then(async (response) => {
			// let result = await response.json();
			console.log(response, utils.ao.deepGetKey(response, "tasks"));
			// if (utils.ao.has(response, "tasks")) {
			// setFormDataSchema(utils.ao.deepGetKey(response, "tasks"));
			// }
			// setFormDataSchema(response.data.data.tasks);
			// let schema = utils.ao.deepGetKey(response, "tasks");
			// let paths = utils.ao.deepGetKey(taskschema, "paths");
			// if (paths) setFormDataSchema(paths);
            if (response.data) dispatch(SetDataSchema(response.data.data))
		});
		// if (debug)
		console.log("AdminPlanner.js :: schemaTemp = ", schemaTemp, " :: schema = ", schema);
	};

	useEffect(() => {
		// On initial mount, fetch data.
		if (!dataSchema) getSchema();
	}, []);

	// if ( role !== "admin" )
	// {
	//     console.log("ADMIN.JS :: role = ", role, " :: user = ", user);
	//     // return <Navigate to="/" replace />;
	//     // window.location.href = "/";
	// }
	return (
		<div className="page-container">
			<Header></Header>
			<div className="admin-page-content-header">
				<Section.Text
					content="Portfolio Admin Panel"
					type="title"
					scale={`3xl`}
					separator={true}
				/>
			</div>
			{portfolioData && (
				<div className="page-content">
					<Tabs
						// Setup & Runtime
						items={items}
						type="card"
						navPosition="left"
						size={"small"}
						defaultActiveIndex="2"
						activeIndex="2"
						// Styling
						centered={true}
						padContent={true}
						padding={`0.5rem 0.5rem`}
						fillArea={true}
						roundedNav={false}
						contentBoxShadow={true}
						navBoxShadow={true}
						// onChange={onChange}
						style={{ margin: 0 }}>
						{}
					</Tabs>
					{/*  FUTURE PAGES
                            - Blog
                            - Tutorials
                            - Tools & Other Resources
                            - Ask Me Anything
                                -> Very similar to Contact page, except it will post the messages directly to the front end page, and I will be able to post responses to them.
                                -> For obvious reasons, i'll include a feature to remove inappropriate questions. 
                            - Updates

                            Beyond its initial release as a portfolio site, my end goal is to have a personal site that doubles as a portfolio-serving front page. To do that, it should include various features that are worth me checking in on the site every day, such as a weight and exercise tracker, message board, a blog, etc. 
                        */}
				</div>
			)}
		</div>
	);
}

export default Admin;
/*
	<div
		key="0"
		className="tab-item"
		label="Dashboard"
		enabled={true}
		access={"admin"}>
		<AdminDashboard />
	</div>
	<div
		key="1"
		className="tab-item"
		label="Intro"
		enabled={true}
		access={"admin"}>
		<AdminIntro />
	</div>
	<div
		className="tab-item"
		label="About"
		key="2"
		enabled={true}
		access={"admin"}>
		<AdminAbout />
	</div>
	<div
		className="tab-item"
		label="Experiences"
		key="3"
		enabled={true}
		access={"admin"}>
		<AdminExperiences />
	</div>
	<div
		className="tab-item"
		label="Projects"
		key="4"
		enabled={true}
		access={"admin"}>
		<AdminProjects />
	</div>
	<div
		className="tab-item"
		label="Education"
		key="5"
		enabled={true}
		access={"admin"}>
		<AdminEducations />
	</div>
	<div
		className="tab-item"
		label="Messages"
		key="6"
		enabled={true}
		access={"admin"}>
		<AdminMessages />
	</div>
	<div
		className="tab-item"
		label="Blog"
		key="7"
		enabled={true}
		access={"admin"}>
		<AdminBlog />
	</div>
	<div
		className="tab-item"
		label="To Do"
		key="8"
		enabled={true}
		access={"admin"}>
		<AdminPlanner />
	</div>
	<div
		className="tab-item"
		label="Dev"
		key="9"
		enabled={true}
		access={"admin"}>
		<AdminDev />
	</div>
*/
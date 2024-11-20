import React, { useState, useEffect, useRef } from "react";
// Redux state management
import { useDispatch, useSelector } from "react-redux";
import { SetDebug, SetLoading, SetPortfolioData, SetAppsData, SetBlogData, ReloadData, SetDataSchema } from "../../redux/rootSlice";

import {
    FaRegEdit,
    FaExpand,
    FaExpandArrowsAlt,
    FaFilter,
    FaEllipsisH,
    FaEllipsisV,
    // Icons for adding content
    FaPlusSquare,
    FaPlusCircle,
    FaPlus,
    // Icons for removing content
    FaWindowClose,
    FaTimesCircle,
    FaTimes,
    FaRedoAlt,
    // Icons for adjusting index
    FaSortDown,
    FaSortUp,
    FaSort,
    FaEdit,
    FaTrashAlt,
    FaCheck,
    FaMinus,
    FaRobot,
    FaCopy,
	FaThList,
	FaWpforms,
	FaTable,
	FaTh,
	FaThLarge,
	FaBuromobelexperte,
	FaTasks,
	FaDatabase,
	FaArrowDown,
} from "react-icons/fa";
// Components
import {
    // Form,
    // Button,
    // Input,
    // Modal,
    message,
} from "antd";
import Table from "../../components/Table/Table";
// import { Form, Button, Row, Col } from "react-bootstrap";

import API from "../../lib/services/api.js";
import axios from "axios";
import * as utils from 'akashatools';
import * as data from './../../utilities/Data.js';
import Section from "../../components/Section";
import Tags from "../../components/Tags";
import Droplist from "../../components/Droplist";
import Card from "../../components/Card";
import Dialog from "../../components/Dialog";
// var crypto = require("crypto");
import sha256 from "crypto-js/sha256";
import { Form } from "../../components/Form";
import Button from "../../components/Button";
import Input from "../../components/Form/Input";
import Planner from "../Apps/Planner";
// const { ObjectId } = require("mongodb");
// In-site todo list app.
const AdminPlanner = (props) => {
	const { children } = props;

	const dispatch = useDispatch();
	const { debug, loading, portfolioData, appsData, reloadData, loggedIn, user, dataSchema } = useSelector((state) => state.root);
	const [formModalOpen, setFormModalOpen] = React.useState(false);
	const [formModalInitialData, setFormModalInitialData] = React.useState(null); // null | { an existing item's data }
	const [formModalType, setFormModalType] = React.useState("add"); // "" | "ADD" | "EDIT"
	const [formDataModel, setFormDataModel] = React.useState([]);
	const [formDataSchema, setFormDataSchema] = React.useState({});
	const [formInitializeRandom, setFormInitializeRandom] = React.useState(false);
	const currentInputRef = useRef(null);
	const [displayMode, setDisplayMode] = React.useState("form"); // FORM | (CARD)GRID | TABLE | TASK(LIST)
	const [displaySchemaViewport, setDisplaySchemaViewport] = React.useState(false);
	const [confirmed, setConfirmed] = React.useState(false); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.
	const currentDisplayData = useRef(null);

	const updateCurrentData = (input) => {
		currentInputRef.current = input;
		/// * setCurrentData( input );
		if (debug) console.log("AdminPlanner.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current);
	};

	const getData = async (apiCall, callback) => {
		// TODO :: !Important! :: Make this generic and put it in a utility file.
		try {
			dispatch(SetLoading(true));
			dispatch(ReloadData(false));
			const response = await API.get(`/api/apps/planner/tasks`)
				.then((res) => {
					if (debug) console.log("AdminPlanner.js :: getData :: res = ", res);
					dispatch(SetAppsData(res.data));

					// Set reloadData flag false.
					dispatch(ReloadData(false));
				})
				.catch((err) => {
					if (debug) console.error(err);

					// Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
					dispatch(ReloadData(false));
				});

			// if (debug) console.log( response.data );
			dispatch(SetBlogData(response.data));
			// Set reloadData flag false.
			/// dispatch(ReloadData(false));
			dispatch(SetLoading(false));
			return response;
		} catch (error) {
			dispatch(SetLoading(false));
		}
	};

	// axios.defaults.baseURL = `http://147.182.184.250:4000`;
	const apiGet = async (apiCall) => {
		if (debug) console.log("AdminPlanner :: onFinish triggered :: apiCall = ", apiCall);
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
				if (debug) console.log("apiGet() :: apiCall = ", apiCall, " :: After API response :: ERROR :: response.data.error = ", response.data);
				message.error(response.data.message);
			}
			return response;
		} catch (error) {
			dispatch(SetLoading(false));
			if (debug) console.log("apiGet() :: apiCall = ", apiCall, " :: Try-catch in error :: After API response :: ERROR :: response.data.error = ", error);
			message.error(error.message);
		}
	};

	const getSchema = async () => {
		const dataTemp = await getData(`/apps/planner/tasks`);
		const schemaTemp = await apiGet(`/schema/planner`);

		let schema = Promise.resolve(schemaTemp).then(async (response) => {
			// let result = await response.json();
			console.log(response, utils.ao.deepGetKey(response, "tasks"));
			// if (utils.ao.has(response, "tasks")) {
			// setFormDataSchema(utils.ao.deepGetKey(response, "tasks"));
			// }
			// setFormDataSchema(response.data.data.tasks);
			let taskschema = utils.ao.deepGetKey(response, "tasks");
			let paths = utils.ao.deepGetKey(taskschema, "paths");
			if (paths) setFormDataSchema(paths);
		});
		// if (debug)
		console.log("AdminPlanner.js :: dataTemp = ", dataTemp, " :: schemaTemp = ", schemaTemp, " :: schema = ", schema);
	};

	useEffect(() => {
		// On initial mount, fetch data.
		getSchema();
	}, []);

	useEffect(() => {
		// On initial mount, build data model.
		let model = data.schemaToModel(formDataSchema);
		if (debug) console.log("AdminPlanner.js :: formDataSchema = ", formDataSchema, " :: generated model = ", model);
		setFormDataModel(model);
	}, [formDataSchema]);

	useEffect(() => {
		if (debug) console.log("AdminPlanner.js :: formDataModel is now = ", formDataModel);
	}, [formDataModel]);

	const onDelete = async (item) => {
		if (debug)
			console.log(
				"AdminPlanner",
				" :: onDelete()",
				" :: item = ",
				item,
				" :: confirmed = ",
				confirmed,
				" :: formModalOpen = ",
				formModalOpen,
				" :: formModalType = ",
				formModalType,
				" :: formModalInitialData = ",
				formModalInitialData,
			);

		// Confirmed, proceed with deleting.
		try {
			dispatch(SetLoading(true));
			const response = await API.post("/api/portfolio/delete-experience", {
				_id: item._id,
			});
			dispatch(SetLoading(false));
			if (response.data.success) {
				message.success(response.data.message);
				dispatch(SetLoading(false));
				dispatch(ReloadData(true));
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
		}
		// Reset the dashboard.
		onSetCancel();
	};

	// const { planner, tasks } = appsData;
	// const onDelete = async (id) => {
	// 	console.log("AdminPlanner :: onDelete triggered :: id = ", id);
	// 	try {
	// 		dispatch(SetLoading(true));
	// 		const response = await API.post("/api/apps/planner/delete-task", {
	// 			_id: id,
	// 		});
	// 		dispatch(SetLoading(false));
	// 		if (response.data.success) {
	// 			console.log("AdminPlanner :: onDelete :: After API response :: response.data.success = ", response.data.success);
	// 			message.success(response.data.message);
	// 			dispatch(SetLoading(false));
	// 			dispatch(ReloadData(true));
	// 			// Reload data.
	// 			getData();
	// 		} else {
	// 			console.log("AdminPlanner :: onDelete :: After API response :: ERROR :: response.data.error = ", response.data);
	// 			message.error(response.data.message);
	// 		}
	// 	} catch (error) {
	// 		dispatch(SetLoading(false));
	// 		message.error(error.message);
	// 	}
	// };

	// axios.defaults.baseURL = `http://147.182.184.250:4000`;
	const onFinish = async (values) => {
		if (debug) console.log("AdminPlanner :: onFinish :: onFinish triggered :: Values = ", values);
		try {
			// const tempSubjects = values.subjects?.split(/[\s,]+/) || [];
			// values.subjects = tempSubjects;

			dispatch(SetLoading(true));
			let response;
			if (debug) console.log("AdminPlanner :: onFinish :: Before API response :: API.defaults = ", API.defaults, " :: Values being sent = ", values);
			if (formModalType === `edit` && formModalInitialData) {
				// Update operation
				response = await API.post("/api/apps/planner/edit-task", values);
			} else if (formModalType === "delete") {
				// Delete operation
				response = await API.post("/api/apps/planner/delete-task", {
					_id: values._id,
				});
			} else {
				// Add operation
				response = await API.post("/api/apps/planner/add-task", values);
			}
			if (debug) console.log("AdminPlanner :: onFinish :: After API response :: response = ", response);
			dispatch(SetLoading(false));
			if (response.data.success) {
				if (debug) console.log("AdminPlanner :: onFinish :: After API response :: response.data.success = ", response.data.success);
				message.success(response.data.message);

				// Reset modal form on success.
				// setFormModalOpen(false);
				// setFormModalInitialData(null);

				dispatch(SetLoading(false));
				dispatch(ReloadData(true));
				// form.resetFields();
				// updateCurrentData(null); // Reset fields.

				// Reload data.
				getData();

				// Reset the dashboard.
				onSetCancel();
			} else {
				if (debug) console.log("AdminPlanner :: onFinish :: After API response :: ERROR :: response.data.error = ", response.data);
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
		}
	};

	const onSubmit = async (values) => {
		if (debug) console.log(`AdminPlanner :: onSubmit() :: Testing form return data :: values = `, values);
		if (formModalType === "add") {
			// Remove _id field.
			let valtemp = { ...values };
			// valtemp = valtemp.filter((val)=>val)
			valtemp = utils.ao.filterKeys(values, ["_id"]);
			// valtemp.authorId = ObjectId(valtemp.authorId);
			/// * valtemp.taskId = localStorage.getItem("token");
			// valtemp[`taskId`] = { authorId: valtemp.authorId };
			/// valtemp[`taskId`] = valtemp.authorId;
			values = valtemp;
		} else if (formModalType === "delete") {
			// values = { ...values, _id: formModalInitialData._id };
			// Prompt with a confirmation modal.
			// TODO :: Do this later.
		} else if (formModalInitialData) {
			values = { ...values, _id: formModalInitialData._id };
		}
		updateCurrentData(values);
		if (debug) console.log(`AdminPlanner :: onSubmit() :: Submitting to onFinish :: values = `, values);
		onFinish(values);
	};

	const onClone = (values) => {
		if (utils.val.isObject(values)) {
			let valtemp = { ...values };
			valtemp = utils.ao.filterKeys(values, ["_id"]);
			values = valtemp;
			onFinish(values);
		}
	};

	const onSetDelete = (element) => {
		// Prompt with a simple modal to confirm.
		if (utils.val.isObject(element)) {
			setFormModalType("delete");
			setFormModalInitialData(element);
			updateCurrentData(element);
			setFormModalOpen(true);
		}
	};

	const onSetAdd = () => {
		setFormModalType("add");
		setFormModalInitialData(null);
		setFormModalOpen(true);
		updateCurrentData(null);
	};

	const onSetEdit = (data = {}) => {
		// if (utils.val.isValidArray(Object.keys(data), true)) {
		// 	setFormModalType("edit");
		// 	setFormModalInitialData(data);
		// 	setFormModalOpen(true);
		// 	updateCurrentData(data);
		// }
		if (utils.val.isObject(data)) {
			setFormModalType("edit");
			setFormModalInitialData(data);
			setFormModalOpen(true);
			updateCurrentData(data);
		}
	};

	const onSetCancel = () => {
		setFormModalOpen(false);
		setFormModalInitialData(null);
		setFormModalType("");
		updateCurrentData(null);
		setConfirmed(false);
	};

	const onSetPolyfill = () => {
		let generated = data.schemaToModel(formDataSchema, true);
		setFormModalType("add");
		setFormModalInitialData(generated);
		setFormModalOpen(true);
		updateCurrentData(generated);
	};

	const buildModal = (input) => {
		if (formModalType === "edit" || formModalType === "add") {
			// Render a basic modal to add or edit content.
			// Build a modal with field inputs for each key in this data set's schema.
			if (debug) console.log("AdminPlanner.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input);
			if (!formModalInitialData) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={formModalOpen}
					footer={
						<div className="flex justify-end w-full">
							<Button
								classes="admin-button bg-white px-10 py-2 text-primary"
								icon={<FaTimes />}
								label={`Cancel`}
								onClick={() => {
									onSetCancel();
								}}></Button>
							{
								// 	<Button
								// 		classes="admin-button bg-primary px-5 py-2 text-white"
								// 		icon={<FaRobot />}
								// 		label={`Autofill Random`}
								// 		onClick={() => {
								// 			// onSetPolyfill();
								// 			setFormInitializeRandom(formInitializeRandom === true ? false : true);
								// 		}}></Button>
							}
							<Button
								classes="admin-button px-10 py-2 bg-primary text-white"
								icon={<FaPlus />}
								label={`${
									// formModalInitialData ? "Update" : "Add"
									formModalType === `edit` ? "Update" : formModalType === `add` ? "Add" : `Submit`
								}`}
								onClick={() => {
									// setFormModalType("add");
									// setFormModalOpen(false);
									// setFormModalInitialData(null);
									onSubmit(formModalInitialData);
								}}></Button>
						</div>
					}
					title={formModalInitialData ? "Edit" : "Add"}
					onCancel={() => {
						onSetCancel();
					}}
					onFinish={onFinish}>
					<Form.Schema
						// schema={dataSchema}
						schema={formDataSchema}
						initialData={input}
						onSubmit={(values) => {
							onSubmit(values);
						}}
						initialDataAutofillRandom={formInitializeRandom}
						// onChange={(values) => {
						//     // setFormModalInitialData(values);
						//     updateCurrentData(values);
						// }}
						onChange={(values) => {
							updateCurrentData(values);
						}}
						layout={`inline`}
						showViewport={true}
						// viewportOverride={
						// 	<Droplist
						// 		label={`Current Item Data`}
						// 		data={formModalInitialData}
						// 		type={`list`}
						// 		showControls={true}
						// 		expandable={true}
						// 		debug={false}
						// 		height={`auto`}
						// 		width={`auto`}
						// 	/>
						// }
					></Form.Schema>
				</Dialog>
			);
		} else if (formModalType === "delete") {
			let element = input;
			return (
				<Dialog
					open={formModalOpen}
					motion={`fade`}
					footer={null}
					title={"Are you sure?"}
					onCancel={() => {
						onSetCancel();
					}}
					onFinish={(e) => {
						onDelete(element);
					}}>
					<div className="flex justify-end w-full">
						<Button
							classes="admin-button bg-white px-10 py-2 text-primary"
							label={`Cancel`}
							icon={<FaTimes />}
							onClick={() => {
								onSetCancel();
							}}
						/>
						<Button
							classes="admin-button px-10 py-2 bg-primary text-white"
							label={`Confirm`}
							icon={<FaCheck />}
							onClick={() => {
								setConfirmed(true);
								setTimeout(() => {
									onDelete(element);
								}, 1000);
							}}
						/>
					</div>
				</Dialog>
			);
		}
	};

	const adminControls = [
		{
			name: `delete`,
			type: `text`,
			icon: <FaTimes className={`button-text button-icon`} />,
			onClick: (element, elementIndex) => {
				onSetDelete(element);
			},
		},
		{
			name: `edit`,
			type: `text`,
			icon: <FaEdit className={`button-text button-icon`} />,
			onClick: (element, elementIndex) => {
				onSetEdit(element);
			},
		},
		{
			name: `clone`,
			type: `text`,
			icon: <FaCopy className={`button-text button-icon`} />,
			onClick: (element, elementIndex) => {
				onClone(element);
			},
		},
		// {
		// 	name: `test`,
		// 	type: `text`,
		// 	icon: <FaCopy className={`button-text button-icon`} />,
		// 	onClick: (element, elementIndex) => {
		// 		console.log("testOnClick triggered :: ", elementIndex, element);
		// 	},
		// },
	];

	const [taskActiveIndex, setTaskActiveIndex] = React.useState(false);

	const buildDisplay = (input) => {
		let tasksDisplay = [];
		if ( utils.val.isDefined( input ) )
		{
			currentDisplayData.current = input;
			if (displayMode === "list") {
				tasksDisplay.push(
					<div
						className={`section-viewport`}
						style={{
							display: `${`flex`}`,
							flexDirection: `${`row`}`,
							justifyContent: `${`center`}`,
							alignContent: `${`stretch`}`,
						}}>
						<Droplist
							label={`Planner Data | Display: ${utils.str.toCapitalCase(displayMode)}`}
							data={input}
							type={`list`}
							showControls={true}
							expandable={true}
							debug={false}
							height={`auto`}
							width={`50%`}
						/>
						<Droplist
							label={`Current Item Data`}
							data={currentInputRef.current}
							type={`list`}
							showControls={true}
							expandable={true}
							debug={false}
							height={`auto`}
							width={`50%`}
						/>
					</div>,
				);
			} else if (displayMode === "grid") {
				tasksDisplay.push(
					<Card.Grid
						data={input}
						enableControls={true}
						elementControls={adminControls}
						itemWidth={`25rem`}
					/>,
				);
			} else if (displayMode === "table") {
				tasksDisplay.push(
					<Table
						// isVisible={showTable}
						isFetching={loading}
						isFilterable={true}
						isSortable={true}
						dataName={`Planner :: Tasks`}
						tableData={appsData.tasks}
						// setShowSidePanel={setShowSidePanel}
						// setSidePanelID={setSidePanelID}
						rowActions={adminControls}
						cellOnClick={(cellIndex, cellData) => {
							if (debug) console.log("Cellonclick triggered :: ", cellIndex, cellData);
						}}
						rowOnClick={(rowIndex, rowData) => {
							if (debug) console.log("Rowonclick triggered :: ", rowIndex, rowData);
						}}></Table>,
				);
			} else if (displayMode === "task") {
				tasksDisplay.push(
					<Planner
						// tasks={input}
						// onEdit={(element) => {
						// 	onSetEdit(element);
						// }}
						// onDelete={(element) => {
						// 	onSetDelete(element);
						// }}
						// onCopy={(element) => {
						// 	onClone(element);
						// }}
						// onAdd={(e) => {
						// 	onSetAdd();
					// }}
					/>,
				);
			}
		}
		return tasksDisplay;
	};

	const buildViewport = (input) => {
		return utils.val.isDefined(input) ? (
			<div
				className={`section-viewport`}
				style={{
					display: `${`flex`}`,
					flexDirection: `${`row`}`,
					justifyContent: `${`center`}`,
					alignContent: `${`stretch`}`,
				}}>
				<Droplist
					label={`Planner Schema`}
					data={formDataSchema}
					type={`list`}
					showControls={true}
					expandable={true}
					debug={false}
					height={`auto`}
					width={`50%`}
				/>
				<Droplist
					label={`Current Item Data`}
					data={currentInputRef.current}
					type={`list`}
					showControls={true}
					expandable={true}
					debug={false}
					height={`auto`}
					width={`50%`}
				/>
			</div>
		) : (
			<></>
		);
	};

	if (debug) console.log("AdminPlanner.js :: appsData = ", appsData, " :: dataSchema = ", dataSchema);

	const devControls = [
		// {
		// 	// FORM | (CARD)GRID | TABLE | TASK(LIST)
		// 	name: "displayMode",
		// 	label: `${
		// 		displayMode === "list" ? "List" :
		// 			displayMode === "grid" ? "Grid" :
		// 				displayMode === "table" ? "Table" :
		// 					displayMode === "task" ? "Task" :
		// 						"List"
		// 		}`,
		// 	icon: // displayMode ? <FaThList /> : <FaTh />,
		// 		(
		// 			displayMode === "list" ? <FaThList /> :
		// 				displayMode === "grid" ? <FaBuromobelexperte /> :
		// 					displayMode === "table" ? <FaTable /> :
		// 						displayMode === "task" ? <FaTasks /> :
		// 							<FaThList />
		// 		),
		// 	classes: ``,
		// 	func: (e) => {
		// 		setDisplayMode(
		// 			displayMode === "list" ? "list" :
		// 				displayMode === "grid" ? "grid" :
		// 					displayMode === "table" ? "table" :
		// 						displayMode === "task" ? "Task" :
		// 							"list"
		// 		);
		// 	},
		// },
		{
			name: "displayForm",
			label: "Form",
			icon: <FaWpforms />,
			classes: `${displayMode === "form" ? "active" : ""}`,
			onClick: (e) => {
				setDisplayMode("form");
			},
		},
		{
			name: "displayForm",
			label: "List",
			icon: <FaThList />,
			classes: `${displayMode === "list" ? "active" : ""}`,
			onClick: (e) => {
				setDisplayMode("list");
			},
		},
		{
			name: "displayForm",
			label: "Grid",
			icon: <FaBuromobelexperte />,
			classes: `${displayMode === "grid" ? "active" : ""}`,
			onClick: (e) => {
				setDisplayMode("grid");
			},
		},
		{
			name: "displayForm",
			label: "Table",
			icon: <FaTable />,
			classes: `${displayMode === "table" ? "active" : ""}`,
			onClick: (e) => {
				setDisplayMode("table");
			},
		},
		{
			name: "displayForm",
			label: "Task",
			icon: <FaTasks />,
			classes: `${displayMode === "task" ? "active" : ""}`,
			onClick: (e) => {
				setDisplayMode("task");
			},
		},
		{
			name: "showSchema",
			label: "Show Schema",
			icon: <FaDatabase />,
			classes: `${displaySchemaViewport === true ? "active" : ""}`,
			onClick: (e) => {
				setDisplaySchemaViewport(displaySchemaViewport === true ? false : true);
			},
		},
	];

	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="Planner"
					type="title"
					scale={`3xl`}
					separator={true}>
					<div className="section-nav">
						<Button
							classes="admin-button bg-primary px-5 py-2 text-white"
							icon={<FaPlus />}
							label={`New`}
							onClick={() => {
								onSetAdd();
							}}
						/>
						{/*
						
						<Button
							classes="admin-button bg-primary px-5 py-2 text-white"
							icon={<FaRobot />}
							label={`Generate Random`}
							onClick={() => {
								onSetPolyfill();
							}}
						/>
							*/}
					</div>
				</Section.Text>
			</Section.Header>
			<div className={`button-controls`}>
				<Button.Controls
					show={true}
					controls={devControls}
				/>
			</div>
			{displaySchemaViewport && formDataSchema && buildViewport(formDataSchema)}

			{(formModalType === "add" || formModalInitialData) && buildModal(formModalInitialData)}
			{formModalOpen && formModalType === "delete" && formModalInitialData && buildModal(formModalInitialData)}

			{appsData && utils.ao.has(appsData, "tasks") ? utils.val.isValidArray(appsData.tasks, true) && buildDisplay(appsData.tasks) : <></>}
		</Section>
	);
};
export default AdminPlanner;


/*
	const getTasks = async () => {
		try {
			dispatch(SetLoading(true));
			dispatch(ReloadData(false));
			const response = await API.get(`/api/apps/planner/tasks`)
				.then((res) => {
					if (debug) console.log("AdminPlanner.js :: getTasks :: res = ", res);
					dispatch(SetAppsData(res.data));

					// Set reloadData flag false.
					dispatch(ReloadData(false));
				})
				.catch((err) => {
					if (debug) console.error(err);

					// Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
					dispatch(ReloadData(false));
				});

			// console.log( response.data );
			dispatch(SetAppsData(response.data));
			// Set reloadData flag false.
			/// dispatch(ReloadData(false));
			dispatch(SetLoading(false));
		} catch (error) {
			dispatch(SetLoading(false));
		}
	};
*/
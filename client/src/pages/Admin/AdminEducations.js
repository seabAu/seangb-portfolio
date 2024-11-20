import React, { useState, useEffect, useRef } from "react";
import {
	// Form,
	// Input,
	// Button,
	// Checkbox,
	// Modal,
	message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../lib/services/api.js";
import Card from "../../components/Card";
import Section from "../../components/Section";
import * as utils from 'akashatools';
import { Form } from "../../components/Form/index.js";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import { FaCheck, FaCopy, FaPlus, FaTimes } from "react-icons/fa";

function AdminEducations() {
	const dispatch = useDispatch();
	const { debug, loading, portfolioData, appsData, reloadData, loggedIn, user, dataSchema } = useSelector((state) => state.root);
	const { educations } = portfolioData;
	const [formModalOpen, setFormModalOpen] = React.useState(false);
	const [formModalInitialData, setFormModalInitialData] = React.useState(null); // null | { an existing item's data }
	const [formModalType, setFormModalType] = React.useState("add"); // "" | "ADD" | "EDIT"
	const [formDataModel, setFormDataModel] = React.useState([]);
	const [currentData, setCurrentData] = React.useState(null);
	const [confirmed, setConfirmed] = React.useState(false); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.
	const currentInputRef = useRef(null);

	useEffect(() => {
		// On initial mount, build data model.
		let model;
		if (utils.val.isValidArray(educations, true)) {
			model = utils.ao.cleanJSON(educations[0]);
		} else if (utils.val.isObject(educations)) {
			model = utils.ao.cleanJSON(educations);
		}
		if (debug) console.log("AdminEducations.js :: model: ", model);
		setFormDataModel(model);
	}, []);

	// const [ form ] = Form.useForm();
	// axios.defaults.baseURL = `http://147.182.184.250:4000`;

	const updateCurrentData = (input) => {
		currentInputRef.current = input;
		/// * setCurrentData( input );
		if (debug) console.log("AdminPlanner.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current);
	};

	const onFinish = async (values) => {
		if (debug) console.log("AdminEducations :: onFinish triggered :: Values = ", values);
		try {
			// const tempSubjects = values.subjects?.split(/[\s,]+/) || [];
			// values.subjects = tempSubjects;

			dispatch(SetLoading(true));
			let response;
			if (debug) console.log("AdminEducations :: Before API response :: API.defaults = ", API.defaults, " :: Values being sent = ", values);
			if (formModalType === `edit` && formModalInitialData) {
				// Update operation
				response = await API.post("/api/portfolio/update-education", values);
			} else if (formModalType === "delete") {
				// Delete operation
				response = await API.post("/api/portfolio/delete-education", {
					_id: values._id,
				});
			} else {
				// Add operation
				response = await API.post("/api/portfolio/add-education", values);
			}
			if (debug) console.log("AdminEducations :: After API response :: response = ", response);
			dispatch(SetLoading(false));
			if (response.data.success) {
				if (debug) console.log("AdminEducations :: After API response :: response.data.success = ", response.data.success);
				message.success(response.data.message);
				// setFormModalOpen(false);
				// setFormModalInitialData(null);
				dispatch(SetLoading(false));
				dispatch(ReloadData(true));
				// form.resetFields();
				setCurrentData( null ); // Reset fields.
				
				// Reset the dashboard on success.
				onSetCancel();
			} else {
				if (debug) console.log("AdminEducations :: After API response :: ERROR :: response.data.error = ", response.data);
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
		}
	};

	const onDelete = async (item) => {
		try {
			dispatch(SetLoading(true));
			const response = await API.post("/api/portfolio/delete-education", {
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

	const onSubmit = async (values) => {
		if (debug) console.log(`AdminEducations :: onSubmit() :: Testing form return data :: values = `, values);
		if (formModalType === "add") {
			// Remove _id field.
			let valtemp = { ...values };
			// valtemp = valtemp.filter((val)=>val)
			valtemp = utils.ao.filterKeys(values, ["_id"]);
			values = valtemp;
		} else if (formModalInitialData) {
			values = { ...values, _id: formModalInitialData._id };
		}
		setCurrentData(values);
		if (debug) console.log(`AdminEducations :: onSubmit() :: Submitting to onFinish :: values = `, values);
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

	const buildModal = (input) => {
		if (formModalType === "edit" || formModalType === "add") {
			// Build a modal with field inputs for each key in this data set's schema.
			if (debug) console.log("AdminEducations.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input);
			if (!formModalInitialData) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={formModalOpen}
					motion={`slide`}
					footer={
						<div className="flex justify-end w-full">
							<Button
								classes="admin-button bg-white px-10 py-2 text-primary"
								icon={<FaTimes />}
								label={`Cancel`}
								onClick={() => {
									onSetCancel();
								}}
							/>
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
								}}
							/>
						</div>
					}
					title={formModalInitialData ? "Edit" : "Add"}
					onCancel={() => {
						onSetCancel();
					}}
					onFinish={onFinish}>
					<Form
						initialData={input}
						onSubmit={(values) => {
							onSubmit(values);
						}}
						layout={`block`}
						showViewport={true}></Form>
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

	const buildGrid = (input) => {
		// Build the display of all the current data in this dataset.
		return (
			<Card.Grid layout="flex">
				{input.map((element) => (
					<Card classes="text-white shadow ">
						<Card.Header>
							<Section.Text
								classes="text-white text-xl font-bold"
								type="title"
								scale={`xl`}
								content={element.degree}></Section.Text>
						</Card.Header>
						<Card.Body>
							<Section>
								<Section.Content>
									<Section.Pane
										layout={`col`}
										flexDirection={"column !important"}
										alignContent={"flex-start"}
										justifyContent={"flex-start"}>
										<Section.Pane
											layout={`col`}
											flexDirection={"column !important"}
											alignContent={"flex-start"}
											justifyContent={"flex-start"}>
											<Section.List
												data={element}
												datakeys={["major", "date", "link"]}
												datatype={"object"}
											/>
										</Section.Pane>
										<Section.Pane
											layout={`col`}
											classes="py-2 m-0"
											flexDirection={"column !important"}
											alignContent={"flex-start"}
											justifyContent={"flex-start"}>
											<hr />
											<Section.Image
												classes="h-60 w-80"
												content={{ image: element.image, link: "" }}
											/>
											<Section.Pane>
												<Section.Text
													scale={`sm`}
													content={`Subjects Studied: `}></Section.Text>
												<Section.List
													data={element.subjects}
													datakeys={[]}
													datatype={"array"}
												/>
											</Section.Pane>
										</Section.Pane>
									</Section.Pane>
								</Section.Content>
							</Section>
						</Card.Body>
						<Card.Footer>
							<div className={`flex justify-end w-full`}>
								<Button
									label={`Delete`}
									icon={<FaTimes />}
									classes="button admin-button admin-button-red"
									onClick={() => {
										onSetDelete(element);
									}}
								/>
								<Button
									label={`Edit`}
									classes="button admin-button admin-button-primary"
									onClick={() => {
										onSetEdit(element);
									}}
								/>
								<Button
									icon={<FaCopy className={`button-text button-icon`} />}
									label={`Clone`}
									classes="admin-button admin-button-primary bg-primary text-white rounded-sm"
									onClick={() => {
										onClone(element);
									}}
								/>
							</div>
						</Card.Footer>
					</Card>
				))}
			</Card.Grid>
		);
	};

	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="Education"
					type="title"
					scale={`3xl`}
					separator={true}>
					<div className="section-nav">
						<Button
							icon={<FaPlus />}
							label={`Add education`}
							classes="admin-button bg-primary px-5 py-2 text-white"
							onClick={() => {
								onSetAdd();
							}}
						/>
					</div>
				</Section.Text>
			</Section.Header>

			{buildGrid(educations)}
			{(formModalType === "add" || formModalInitialData) && buildModal(formModalInitialData)}
			{formModalOpen && formModalType === "delete" && formModalInitialData && buildModal(formModalInitialData)}
		</Section>
	);
}

export default AdminEducations;

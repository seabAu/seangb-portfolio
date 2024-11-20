import React, { useState, useEffect, useRef } from "react";
import
    {
        // Form,
        // Button,
        // Input,
        // Modal,
        message
    } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../lib/services/api.js";
import Table from "../../components/Table/Table";
// import { Form, Button, Row, Col } from "react-bootstrap";

import * as utils from 'akashatools';
import Section from "../../components/Section";
import Dialog from "../../components/Dialog";
import { FaCheck, FaTimes } from "react-icons/fa";
import Button from "../../components/Button";
import SidePanel from "../../components/SidePanel/index.js";
function AdminMessages() {
	const dispatch = useDispatch();
	const { portfolioData, isLoading, debug } = useSelector((state) => state.root);
	const { messages } = portfolioData;
	const [formModalOpen, setFormModalOpen] = React.useState(false);
	const [formModalInitialData, setFormModalInitialData] = React.useState(null); // null | { an existing item's data }
	const [formModalType, setFormModalType] = React.useState("add"); // "" | "ADD" | "EDIT"
	const currentInputRef = useRef(null);
	const [confirmed, setConfirmed] = React.useState(false); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.
	const [showAside, setShowAside] = React.useState(false);
	const [asideDetails, setAsideDetails] = React.useState(false);

	const updateCurrentData = (input) => {
		currentInputRef.current = input;
		if (debug) console.log("AdminMessages.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current);
	};

	const onDelete = async (element) => {
			if (debug)
				console.log(
					"AdminMessages",
					" :: onDelete()",
					" :: element = ",
					element,
					" :: confirmed = ",
					confirmed,
					" :: formModalOpen = ",
					formModalOpen,
					" :: formModalType = ",
					formModalType,
					" :: formModalInitialData = ",
					formModalInitialData,
				);

		try {
			dispatch(SetLoading(true));
			const response = await API.post("/api/portfolio/delete-message", {
				_id: element._id,
			});
			dispatch(SetLoading(false));
			if (response.data.success) {
                message.success( response.data.message );
                if (debug) console.log("AdminMessages.js :: Response = ", response);
				dispatch(SetLoading(false));
				dispatch(ReloadData(true));
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
        }
        
        // Cleanup afterward.
        onSetCancel();
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

	const onSetReply = () =>
	{
		// TODO :: Do this later. 
	}

	const buildModal = (input) => {
		if (formModalType === "delete" ) {
			// Render a basic modal to add or edit content.
			if (debug) console.log("AdminMessages.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input);
			
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

	if (debug) console.log("AdminMessages.js :: messages = ", messages);
	return (
		<div className="section-container">
			<Section.Text
				type="title"
				content="Messages"
				scale={`3xl`}
				separator={true}
			/>
			{messages && utils.val.isValidArray(messages, true) && (
				<Table
					// isVisible={showTable}
					isFetching={isLoading}
					isFilterable={true}
					isSortable={true}
					dataName={`Messages`}
					tableData={messages}
					// setShowSidePanel={setShowSidePanel}
					// setSidePanelID={setSidePanelID}
					rowActions={[
						{
							name: `delete`,
							type: `text`,
							onClick: (rowIndex, rowData) => {
								onSetDelete(rowData);
							},
						},
						{
							name: `edit`,
							type: `text`,
							onClick: (rowIndex, rowData) => {
								onSetEdit(rowData);
							},
						},
					]}
					cellOnClick={(event) => {}}
					rowOnClick={(rowIndex, rowData) => {
						if ( debug ) console.log( "Rowonclick triggered :: ", rowIndex, rowData );
						// Load the off-canvas / aside view.
						setShowAside(true);
						setAsideDetails(rowData);
					}}></Table>
			)}
			{ formModalOpen && formModalType === "delete" && formModalInitialData && buildModal( formModalInitialData ) }
			
			{
				showAside && (
					<SidePanel
						label={`Message details`}
						data={ asideDetails }
						showAside={ showAside }
						setShowAside={setShowAside}
					/>
				)
			}
		</div>
	);
}

export default AdminMessages;

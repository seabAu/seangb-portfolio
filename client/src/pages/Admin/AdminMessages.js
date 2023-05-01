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
import API from "../../api/api.js";
import Table from "../../components/Table/Table";
// import { Form, Button, Row, Col } from "react-bootstrap";

import * as utils from "../../utilities/index.js";
import Section from "../../components/Section";
import Dialog from "../../components/Dialog";
import { FaCheck, FaTimes } from "react-icons/fa";
import Button from "../../components/Button";
function AdminMessages() {
	const dispatch = useDispatch();
	const { portfolioData, isLoading, debug } = useSelector((state) => state.root);
	const { messages } = portfolioData;
	const [formModalOpen, setFormModalOpen] = React.useState(false);
	const [formModalInitialData, setFormModalInitialData] = React.useState(null); // null | { an existing item's data }
	const [formModalType, setFormModalType] = React.useState("add"); // "" | "ADD" | "EDIT"
	const currentInputRef = useRef(null);
	const [confirmed, setConfirmed] = React.useState(false); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.

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
						if (debug) console.log("Rowonclick triggered :: ", rowIndex, rowData);
					}}></Table>
			)}
			{formModalOpen && formModalType === "delete" && formModalInitialData && buildModal(formModalInitialData)}
		</div>
	);
}

export default AdminMessages;

/*
    const dataToTable = ( input ) =>
    {
        if ( utils.val.isValidArray( input, true ) )
        {
            return (
                <table className="admin-table">
                    <thead className="admin-table-header">
                        <tr className="admin-table-row-labels">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Age</th>
                            <th>Location</th>
                            <th>Preference</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="admin-table-body">
                        {messages.map((message) => (
                            <tr className="admin-table-row" id={message._id}>
                                <td className="admin-table-cell ">
                                    {message.name != null ? message.name : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.email != null ? message.email : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.phone != null ? message.phone : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.company != null
                                        ? message.company
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.age != null ? message.age : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.location != null
                                        ? message.location
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.preference != null
                                        ? message.preference
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.message != null
                                        ? message.message
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    <div className="flex justify-end items-end">
                                        <button
                                            className="button admin-button-red bg-red-500 text-white rounded-sm"
                                            onClick={() => {}}>
                                            Del
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    }
*/

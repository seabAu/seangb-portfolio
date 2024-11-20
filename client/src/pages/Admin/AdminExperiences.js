import React, { useState, useEffect, useRef } from "react";
import {
	// Form,
	Input,
	// Button,
	// Checkbox,
	Modal,
	message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import Section from "../../components/Section";
import Card from "../../components/Card";
import { Form } from "../../components/Form/index.js";
import Button from "../../components/Button";
import { FaCheck, FaCopy, FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import Dialog from "../../components/Dialog";
import api from "../../lib/services/api.js";
import * as utils from 'akashatools';
import * as data from './../../utilities/Data.js';

function AdminExperiences () {
	const dispatch = useDispatch();
	const { debug, loading, portfolioData, appsData, reloadData, loggedIn, user, dataSchema } = useSelector( ( state ) => state.root );
	const { educations } = portfolioData;
	const [ formModalOpen, setFormModalOpen ] = React.useState( false );
	const [ formModalInitialData, setFormModalInitialData ] = React.useState( null ); // null | { an existing item's data }
	const [ formModalType, setFormModalType ] = React.useState( "add" ); // "" | "ADD" | "EDIT"
	const [ formDataModel, setFormDataModel ] = React.useState( [] );
	const currentInputRef = useRef( null );
	const [ currentData, setCurrentData ] = React.useState( null );

	const { experiences } = portfolioData;
	const [ showAddEditModal, setShowAddEditModal ] = React.useState( false );
	const [ selectedItemForEdit, setSelectedItemForEdit ] = React.useState( null );
	const [ type, setType ] = React.useState( "add" );

	const [ confirmed, setConfirmed ] = React.useState( false ); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.

	useEffect( () => {
		// On initial mount, build data model.
		setFormDataModel( data.initializeModel( experiences ) );
	}, [] );

	const updateCurrentData = ( input ) => {
		currentInputRef.current = input;
		/// * setCurrentData( input );
		if ( debug ) console.log( "AdminPlanner.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current );
	};

	const onFinish = async ( values ) => {
		try {
			dispatch( SetLoading( true ) );
			let response;
			// Here's some hacky bullshit to remove the ","'s the form adds to arrays, without removing ", "'s you'll see in normal input.
			// let duties = selectedItemForEdit.duties;
			// duties = removeEmpty(
			//     selectedItemForEdit.duties
			//         .toString()
			//         .replaceAll(",", "%^(*&)")
			//         .replaceAll("%^(*&) ", ", ")
			//         .replaceAll("%^(*&)", "|")
			//         .split("|"),
			// );
			if ( debug )
				console.log(
					"AdminExperience :: values = ",
					values,
					selectedItemForEdit,
					utils.ao.removeEmpty( values.duties.toString().replaceAll( ",", "%^(*&)" ).replaceAll( "%^(*&) ", ", " ).replaceAll( "%^(*&)", "|" ).split( "|" ) ),
					utils.ao.cleanArray( values.duties.toString().replaceAll( ",", "%^(*&)" ).replaceAll( "%^(*&) ", ", " ).replaceAll( "%^(*&)", "|" ).split( "|" ) ),
				);
			if ( formModalType === `edit` && formModalInitialData ) {
				// Update operation
				response = await api.post( "/api/portfolio/update-experience", values );
			} else if ( formModalType === "delete" ) {
				// Delete operation
				response = await API.post( "/api/portfolio/delete-experience", {
					_id: values._id,
				} );
			} else {
				// Add operation
				response = await API.post( "/api/portfolio/add-experience", values );
			}
			// if (selectedItemForEdit) {
			// 	// Update operation
			// 	response = await API.post("/api/portfolio/update-experience", {
			// 		...values,
			// 		_id: selectedItemForEdit._id,
			// 		// duties: utils.ao.cleanArray(values.duties.toString().replaceAll(",", "%^(*&)").replaceAll("%^(*&) ", ", ").replaceAll("%^(*&)", "|").split("|")),
			// 	});
			// } else {
			// 	// Add operation
			// 	response = await API.post(
			// 		"/api/portfolio/add-experience",
			// 		// values
			// 		{
			// 			...values,
			// 			// duties: utils.ao.cleanArray(values.duties.toString().replaceAll(",", "%^(*&)").replaceAll("%^(*&) ", ", ").replaceAll("%^(*&)", "|").split("|")),
			// 			// duties: parseTextToArray(selectedItemForEdit.duties, [
			// 			//     "|",
			// 			// ]),
			// 		},
			// 	);
			// }

			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				message.success( response.data.message );
				// setShowAddEditModal(false);
				// setSelectedItemForEdit(null);
				dispatch( SetLoading( false ) );
				dispatch( ReloadData( true ) );

				// Reset the dashboard on success.
				onSetCancel();
			} else {
				message.error( response.data.message );
			}
		} catch ( error ) {
			dispatch( SetLoading( false ) );
			message.error( error.message );
		}
	};

	const onDelete = async ( values ) => {
		if ( debug ) console.log( "AdminExperiences",
			" :: onDelete()",
			" :: values = ", values,
			" :: confirmed = ", confirmed,
			" :: formModalOpen = ", formModalOpen,
			" :: formModalType = ", formModalType,
			" :: formModalInitialData = ", formModalInitialData,
		);

		// Confirmed, proceed with deleting.
		try {
			dispatch( SetLoading( true ) );
			const response = await API.post( "/api/portfolio/delete-experience", {
				_id: values._id,
			} );
			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				message.success( response.data.message );
				dispatch( SetLoading( false ) );
				dispatch( ReloadData( true ) );
			} else {
				message.error( response.data.message );
			}
		} catch ( error ) {
			dispatch( SetLoading( false ) );
			message.error( error.message );
		}
		// Reset the dashboard.
		onSetCancel();
	};

	const onSubmit = async ( values ) => {
		if ( debug ) console.log( "AdminExperiences", " :: onSubmit()", " :: Testing form return data", " :: values = ", values );
		if ( formModalType === "add" ) {
			// Remove _id field.
			let valtemp = { ...values };
			// valtemp = valtemp.filter((val)=>val)
			valtemp = utils.ao.filterKeys( values, [ "_id" ] );
			values = valtemp;
		} else if ( formModalInitialData ) {
			values = { ...values, _id: formModalInitialData._id };
		}
		setCurrentData( values );
		if ( debug ) console.log( `AdminExperiences :: onSubmit() :: Submitting to onFinish :: values = `, values );
		onFinish( values );
	};

	const onClone = ( values ) => {
		if ( utils.val.isObject( values ) ) {
			let valtemp = { ...values };
			valtemp = utils.ao.filterKeys( values, [ "_id" ] );
			values = valtemp;
			onFinish( values );
		}
	};

	const onSetDelete = ( element ) => {
		// Prompt with a simple modal to confirm.
		if ( utils.val.isObject( element ) ) {
			setFormModalType( "delete" );
			setFormModalInitialData( element );
			updateCurrentData( element );
			setFormModalOpen( true );
		}
	};

	const onSetAdd = () => {
		setFormModalType( "add" );
		setFormModalInitialData( null );
		setFormModalOpen( true );
		updateCurrentData( null );
	};

	const onSetEdit = ( data = {} ) => {
		console.log( "onSetEdit(data) :: data = ", data );
		if ( utils.val.isObject( data ) ) {
			setFormModalType( "edit" );
			setFormModalInitialData( data );
			setFormModalOpen( true );
			updateCurrentData( data );
		}
	};

	const onSetCancel = () => {
		setFormModalOpen( false );
		setFormModalInitialData( null );
		setFormModalType( "" );
		updateCurrentData( null );
		setConfirmed( false );
	};

	const buildModal = ( input ) => {
		if ( formModalType === "edit" || formModalType === "add" ) {
			// Render a basic modal to add or edit content.

			// Build a modal with field inputs for each key in this data set's schema.
			if ( debug ) console.log( "AdminExperiences.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input );
			if ( !formModalInitialData ) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={ formModalOpen }
					motion={ `fade` }
					footer={
						<div className="flex justify-end w-full">
							<Button
								classes="admin-button bg-white px-10 py-2 text-primary"
								icon={ <FaTimes /> }
								label={ `Cancel` }
								onClick={ () => {
									onSetCancel();
								} }
							/>
							<Button
								classes="admin-button px-10 py-2 bg-primary text-white"
								icon={ <FaPlus /> }
								label={ `${ formModalType === `edit` ? "Update" : formModalType === `add` ? "Add" : `Submit` }` }
								onClick={ () => {
									onSubmit( formModalInitialData );
								} }
							/>
						</div>
					}
					title={ formModalInitialData ? "Edit" : "Add" }
					onCancel={ () => {
						onSetCancel();
					} }
					onFinish={ onFinish }>
					<Form
						initialData={ input }
						onSubmit={ ( values ) => {
							onSubmit( values );
						} }
						layout={ `block` }
						showViewport={ true }></Form>
				</Dialog>
			);
		} else if ( formModalType === "delete" ) {
			let element = input;
			return (
				<Dialog
					open={ formModalOpen }
					motion={ `fade` }
					footer={ null }
					title={ "Are you sure?" }
					onCancel={ () => {
						onSetCancel();
					} }
					onFinish={ ( e ) => {
						onDelete( element );
					} }>
					<div className="flex justify-end w-full">
						<Button
							classes="admin-button bg-white px-10 py-2 text-primary"
							label={ `Cancel` }
							icon={ <FaTimes className={ `button-text button-icon` } /> }
							onClick={ () => {
								onSetCancel();
							} }
						/>
						<Button
							classes="admin-button px-10 py-2 bg-primary text-white"
							label={ `Confirm` }
							icon={ <FaCheck className={ `button-text button-icon` } /> }
							onClick={ () => {
								setConfirmed( true );
								setTimeout( () => {
									onDelete( element );
								}, 1000 );
							} }
						/>
					</div>
				</Dialog>
			);
		}
	};

	const buildGrid = ( input ) => {
		return (
			<Card.Grid classes="grid grid-cols-3 sm:grid-cols-1 gap-5">
				{ input.map( ( element ) => (
					<Card classes="text-white shadow ">
						<Card.Header>
							<Section.Text
								classes="text-white text-xl font-bold"
								type="title"
								scale={ `xl` }
								content={ element.company }></Section.Text>
						</Card.Header>
						<Card.Body>
							<Section.Content>
								<Section.Pane
									layout={ `col` }
									flexDirection={ "column !important" }
									alignContent={ "flex-start" }
									justifyContent={ "flex-start" }>
									<Section.Pane
										layout={ `col` }
										flexDirection={ "column !important" }
										alignContent={ "flex-start" }
										justifyContent={ "flex-start" }>
										{
											// data2Text( element, [ "company", "location", "role", "description", "_id", "image", "link" ] )
										}
										<Section.List
											data={ element }
											datakeys={ [
												// "_id",
												"startdate",
												"enddate",
												"period",
												"company",
												"location",
												"role",
												"description",
												"image",
												"link",
											] }
											datatype={ "object" }
											layout={ `col` }
											styles={ {
												flexDirection: `{"column !important"}`,
												alignContent: `{"stretch"}`,
												justifyContent: `{"flex-start"}`,
											} }
										/>
									</Section.Pane>
									<Section.Pane
										layout={ `col` }
										classes="py-2 m-0"
										flexDirection={ "column !important" }
										alignContent={ "flex-start" }
										justifyContent={ "flex-start" }>
										<Section.Text
											scale={ `sm` }
											content={ `Duties: ` }></Section.Text>
										<Section.List
											data={ element.duties }
											datakeys={ [] }
											datatype={ "array" }
										/>
									</Section.Pane>
								</Section.Pane>
							</Section.Content>
						</Card.Body>
						<Card.Footer>
							<div className="flex justify-end gap-5 mt-5 items-end">
								<Button
									icon={ <FaTimes className={ `button-text button-icon` } /> }
									label={ `Delete` }
									classes="admin-button admin-button-red bg-red-500 text-white rounded-sm"
									onClick={ () => {
										onSetDelete( element );
									} }></Button>
								<Button
									icon={ <FaEdit className={ `button-text button-icon` } /> }
									label={ `Edit` }
									classes="admin-button admin-button-primary bg-primary text-white rounded-sm"
									onClick={ () => {
										onSetEdit( element );
									} }></Button>
								<Button
									icon={ <FaCopy className={ `button-text button-icon` } /> }
									label={ `Clone` }
									classes="admin-button admin-button-primary bg-primary text-white rounded-sm"
									onClick={ () => {
										onClone( element );
									} }></Button>
							</div>
						</Card.Footer>
					</Card>
				) ) }
			</Card.Grid>
		);
	};

	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="Experiences"
					type="title"
					scale={ `3xl` }
					separator={ true }>
					<div className="section-nav">
						<Button
							icon={ <FaPlus /> }
							label={ `Add Experience` }
							classes="admin-button bg-primary px-5 py-2 text-white"
							onClick={ () => {
								onSetAdd();
							} }
						/>
					</div>
				</Section.Text>
			</Section.Header>

			{ buildGrid( experiences ) }
			{ ( formModalType === "add" || formModalInitialData ) && buildModal( formModalInitialData ) }
			{ formModalOpen && formModalType === "delete" && formModalInitialData && buildModal( formModalInitialData ) }
		</Section>
	);
}

export default AdminExperiences;

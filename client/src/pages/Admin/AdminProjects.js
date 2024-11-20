import React, { useState, useEffect, useRef } from "react";
import {
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
import Section from "../../components/Section";
import Card from "../../components/Card";
import * as utils from 'akashatools';
import * as data from './../../utilities/Data.js';
import Tags from "../../components/Tags";
import Droplist from "../../components/Droplist";
import Table from "../../components/Table/Table";
import { FaCheck, FaCopy, FaEdit, FaPlus, FaRobot, FaTimes } from "react-icons/fa";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import Form from "../../components/Form";
// import { Form, Button, Row, Col } from "react-bootstrap";
function AdminProjects ( props ) {
	const { children } = props;
	const dispatch = useDispatch();
	const { debug, loading, portfolioData, appsData, reloadData, loggedIn, user, dataSchema } = useSelector( ( state ) => state.root );
	const { projects } = portfolioData;

	const [ formModalOpen, setFormModalOpen ] = React.useState( false );
	const [ formModalInitialData, setFormModalInitialData ] = React.useState( null ); // null | { an existing item's data }
	const [ formModalType, setFormModalType ] = React.useState( "add" ); // "" | "ADD" | "EDIT"
	const [ formDataModel, setFormDataModel ] = React.useState( [] );
	const [ formDataSchema, setFormDataSchema ] = React.useState( {} );
	const [ formInitializeRandom, setFormInitializeRandom ] = React.useState( false );
	const currentInputRef = useRef( null );
	const [ confirmed, setConfirmed ] = React.useState( false ); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.

	const updateCurrentData = ( input ) => {
		currentInputRef.current = input;
		/// * setCurrentData( input );
		if ( debug ) console.log( "AdminProjects.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current );
	};

	useEffect( () => {
		// On initial mount, build data model.
		let model;
		if ( utils.val.isValidArray( projects, true ) ) {
			model = utils.ao.cleanJSON( projects[ 0 ] );
		} else if ( utils.val.isObject( projects ) ) {
			model = utils.ao.cleanJSON( projects );
		}
		if ( debug ) console.log( "AdminProjects.js :: model: ", model );
		setFormDataModel( model );
	}, [] );

	/*
	useEffect(() => {
		// On initial mount, load schema as model to initialize the modal form.
		console.log("AdminProjects.js", " :: dataSchema: ", dataSchema);
		if (dataSchema) {
			if (dataSchema.hasOwnProperty("portfolioData")) {
				console.log("AdminProjects.JS :: dataSchema.portfolioData = ", dataSchema.portfolioData);
				if (dataSchema.portfolioData.hasOwnProperty("projects")) {
					let projectSchema = dataSchema.portfolioData.projects;
					if (projectSchema.hasOwnProperty("paths")) {
						console.log("AdminProjects.JS :: projectSchema.paths = ", projectSchema.paths);
						setFormDataSchema(projectSchema.paths);
					}
				}
			}
		}

		let tryingAnotherWay = utils.ao.deepGetKey(dataSchema, "projects");
		let tryingAnotherWay2 = utils.ao.deepGetKey(tryingAnotherWay, "paths");
		console.log("AdminProjects.js", " :: dataSchema: ", dataSchema, " :: projects schema = ", tryingAnotherWay, " :: paths = ", tryingAnotherWay2);
	}, []);
    
	useEffect(() => {
		// On initial mount, build data model.
		let model = data.schemaToModel(formDataSchema);
		console.log("AdminProjects.js :: formDataSchema = ", formDataSchema, " :: generated model = ", model);
		setFormDataModel(model);
	}, [formDataSchema]);
	*/

	const onSetPolyfill = () => {
		let generated = data.schemaToModel( formDataSchema, true );
		setFormModalType( "add" );
		setFormModalInitialData( generated );
		setFormModalOpen( true );
		updateCurrentData( generated );
	};

	useEffect( () => {
		if ( debug ) console.log( "AdminProjects.js :: formDataModel is now = ", formDataModel );
	}, [ formDataModel ] );

	const onDelete = async ( values ) => {
		if ( debug )
			console.log(
				"AdminProjects",
				" :: onDelete()",
				" :: values = ",
				values,
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
			dispatch( SetLoading( true ) );
			const response = await API.post( "/api/portfolio/delete-project", {
				_id: values._id,
			} );
			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				if ( debug ) console.log( "AdminProjects.js :: onDelete :: After API response :: response.data.success = ", response.data.success );
				message.success( response.data.message );
				dispatch( SetLoading( false ) );
				dispatch( ReloadData( true ) );
			} else {
				if ( debug ) console.log( "AdminProjects.js :: onDelete :: After API response :: ERROR :: response.data.error = ", response.data );
				message.error( response.data.message );
			}
		} catch ( error ) {
			dispatch( SetLoading( false ) );
			message.error( error.message );
		}
		// Reset the dashboard.
		onSetCancel();
	};

	// axios.defaults.baseURL = `http://147.182.184.250:4000`;
	const onFinish = async ( values ) => {
		if ( debug ) console.log( "AdminProjects :: onFinish :: onFinish triggered :: Values = ", values );
		try {
			// const tempSubjects = values.subjects?.split(/[\s,]+/) || [];
			// values.subjects = tempSubjects;

			dispatch( SetLoading( true ) );
			let response;
			if ( debug ) console.log( "AdminProjects :: onFinish :: Before API response :: API.defaults = ", API.defaults, " :: Values being sent = ", values );
			if ( formModalType === `edit` && formModalInitialData ) {
				// Update operation
				response = await API.post( "/api/portfolio/update-project", values );
			} else if ( formModalType === "delete" ) {
				// Delete operation
				response = await API.post( "/api/portfolio/delete-project", {
					_id: values._id,
				} );
			} else {
				// Add operation
				console.log( "Projects :: ADD :: Values = ", values );
				response = await API.post( "/api/portfolio/add-project", values );
			}
			// if ( debug ) 
			console.log( "AdminProjects :: onFinish :: After API response :: response = ", response );
			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				if ( debug ) console.log( "AdminProjects :: onFinish :: After API response :: response.data.success = ", response.data.success );
				message.success( response.data.message );

				// Reset modal form on success.
				// setFormModalOpen(false);
				// setFormModalInitialData(null);

				dispatch( SetLoading( false ) );
				dispatch( ReloadData( true ) );
				// form.resetFields();
				// updateCurrentData(null); // Reset fields.

				// Reset the dashboard on success.
				onSetCancel();
			} else {
				if ( debug ) console.log( "AdminProjects :: onFinish :: After API response :: ERROR :: response.data.error = ", response.data );
				message.error( response.data.message );
			}
		} catch ( error ) {
			dispatch( SetLoading( false ) );
			message.error( error.message );
		} finally {
			dispatch( ReloadData( true ) );
		}
	};

	const onSubmit = async ( values ) => {
		if ( debug ) console.log( `AdminProjects :: onSubmit() :: Testing form return data :: values = `, JSON.stringify( values ) + ", formModalType = ", formModalType );
		if ( formModalType === "add" ) {
			// Remove _id field.
			let valtemp = { ...values };
			valtemp = utils.ao.filterKeys( values, [ "_id" ] );
			values = valtemp;
		} else if ( formModalInitialData ) {
			values = { ...values, _id: formModalInitialData._id };
		}
		updateCurrentData( values );
		if ( debug ) console.log( `AdminProjects :: onSubmit() :: Submitting to onFinish :: values = `, JSON.stringify( values ) + ", formModalType = ", formModalType );
		onFinish( values );
	};

	const onClone = ( values ) => {
		if ( utils.val.isObject( values ) ) {
			// Remove _id field.
			let valtemp = { ...values };
			valtemp = utils.ao.filterKeys( values, [ "_id" ] );

			// Increment the index. 
			valtemp.index = projects.length + 1;
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
		if ( formModalType === "add" || formModalType === "edit" ) {
			// Build a modal with field inputs for each key in this data set's schema.
			if ( debug ) console.log( "AdminProjects.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input );
			if ( !formModalInitialData ) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={ formModalOpen }
					motion={ `slide` }
					footer={
						<div className="flex justify-end w-full">
							<Button
								classes="admin-button bg-white px-10 py-2 text-primary"
								icon={ <FaTimes /> }
								label={ `Cancel` }
								onClick={ () => {
									onSetCancel();
								} }></Button>
							<Button
								classes="admin-button px-10 py-2 bg-primary text-white"
								icon={ <FaPlus /> }
								label={ `${ formModalType === `edit` ? "Update" : formModalType === `add` ? "Add" : `Submit` }` }
								onClick={ () => {
									console.log( "Projects :: Form :: FaPlus :: formModalInitialData = ", formModalInitialData, " :: currentInputRef.current = ", currentInputRef.current );
									onSubmit( currentInputRef.current );
								} }></Button>
						</div>
					}
					title={ formModalInitialData ? "Edit" : "Add" }
					onCancel={ () => {
						onSetCancel();
					} }
					onFinish={ onFinish }>
					<Form
						// schema={dataSchema}
						schema={ formDataSchema }
						model={ formDataModel }
						initialData={ input }
						onSubmit={ ( values ) => {
							updateCurrentData( values );
							console.log( "Projects :: Form :: onSubmit :: values = ", values, " :: ", "formModalInitialData = ", formModalInitialData, " :: currentInputRef.current = ", currentInputRef.current );
							onSubmit( values );
						} }
						// onChange={(values) => {
						//     // setFormModalInitialData(values);
						//     updateCurrentData(values);
						// }}
						onChange={ ( values ) => {
							updateCurrentData( values );
						} }
						layout={ `inline` }
						showViewport={ true }
					></Form>
				</Dialog>
			);
		} else if ( formModalType === "delete" ) {
			let element = input;
			return (
				<Dialog
					open={ formModalOpen }
					motion={ `fade` }
					footer={
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
					}
					title={ "Are you sure?" }
					onCancel={ () => {
						onSetCancel();
					} }
					onFinish={ ( e ) => {
						onDelete( element );
					} }></Dialog>
			);
		}
	};

	const adminControls = [
		{
			name: `delete`,
			type: `text`,
			icon: <FaTimes className={ `button-text button-icon` } />,
			onClick: ( element, elementIndex ) => {
				onSetDelete( element );
			},
		},
		{
			name: `edit`,
			type: `text`,
			icon: <FaEdit className={ `button-text button-icon` } />,
			onClick: ( element, elementIndex ) => {
				onSetEdit( element );
			},
		},
		{
			name: `duplicate`,
			type: `text`,
			icon: <FaCopy className={ `button-text button-icon` } />,
			onClick: ( element, elementIndex ) => {
				onClone( element );
			},
		},
	];

	const buildViewport = ( input ) => {
		return utils.val.isDefined( input ) ? (
			<div
				className={ `section-viewport` }
				style={ {
					display: `${ `flex` }`,
					flexDirection: `${ `row` }`,
					justifyContent: `${ `center` }`,
					alignContent: `${ `stretch` }`,
				} }>
				<Droplist
					label={ `Planner Schema` }
					data={ formDataSchema }
					type={ `list` }
					showControls={ true }
					expandable={ true }
					debug={ false }
					height={ `auto` }
					width={ `50%` }
				/>
				<Droplist
					label={ `Current Item Data` }
					data={ currentInputRef.current }
					type={ `list` }
					showControls={ true }
					expandable={ true }
					debug={ false }
					height={ `auto` }
					width={ `50%` }
				/>
			</div>
		) : (
			<></>
		);
	};

	const buildGrid = ( input ) => {
		return (
			<Card.Grid
				data={ input }
				enableControls={ true }
				elementControls={ adminControls }
				itemWidth={ `25rem` }>
				{
					input.map( ( element ) => (
						<Card classes="text-white shadow">

							<Card.Header>
								<Section.Text
									classes="text-xl font-bold"
									type="text"
									content={ element.title } />
							</Card.Header>

							<Card.Body>

								<Section>

									{
										"context" in element &&
										<Section.Text
											classes="grid-card-body-text"
											type="subtitle"
											scale={ `1xl` }
											separator={ true }
											content={ element.context }
										/>
									}

									{
										"description" in element &&
										<Section.Text
											classes="grid-card-body-text"
											type="text"
											scale={ `1xl` }
											content={ element.description }></Section.Text>
									}

									{
										<Droplist
											label={ `${ element?.title }` }
											data={ element }
											showControls={ true }
											expandable={ true }
										/>
									}

									{
										( "image" in element && utils.file.checkImageURL( element.image ) ) ?
											( <Section.Image
												classes="grid-card-image-container"
												separator={ false }
												content={ {
													image: element.image,
													link: element.link
												} }
											/> )
											:
											(
												"images" in element && (
													utils.val.isValidArray( element.images, true ) ? (
														//  element.images.map( ( image, index ) =>
														//  {
														//  	if ( utils.file.checkImageURL( image ) )
														//  	{
														//  		return (
														//  			<Section.Image
														//  				classes="grid-card-image-container"
														//  				content={ {
														//  					image: element.image,
														//  					link: element.link
														//  				} }
														//  				separator={false}
														//  			/>
														//  		);
														//  	}
														//  })
														<Section.Content
															type={ "default" }
															responsive={ true }
															responsiveBreakpoints={ 768 }
															styles={ {} }>
															{
																element.images.length === 1 ? (
																	<Section.Image
																		classes="grid-card-image-container"
																		content={ {
																			image: element.image,
																			link: element.link
																		} }
																		separator={ false }
																	/>
																) : (
																	<Section.Collection
																		content={
																			[ ...element.images ].map(
																				( img ) => {
																					if ( utils.file.checkImageURL( img ) ) {
																						return { "image": img, "link": img };
																					}
																				} )
																		}
																		datakeys={ [ "link", "image" ] }
																		data={ element }
																		type={ `carousel` }
																		key={ `section-img-collection-mosaic` }
																		lockHeight={ true }
																		setLockHeight={ `500px` }
																		scrollTimer={ 20000 }
																		scrollEnabled={ false }
																		classes={ `section-img-collection-mosaic` }
																		styles={ {
																			border: `1px solid green`,
																		} }
																	/>
																)
															}
														</Section.Content>
													) : (
														<></>
													)
												)
											)
									}
									{/* 
									{
										"images" in element && (
											utils.val.isValidArray( element.images, true ) ? (
												//  element.images.map( ( image, index ) =>
												//  {
												//  	if ( utils.file.checkImageURL( image ) )
												//  	{
												//  		return (
												//  			<Section.Image
												//  				classes="grid-card-image-container"
												//  				content={ {
												//  					image: element.image,
												//  					link: element.link
												//  				} }
												//  				separator={false}
												//  			/>
												//  		);
												//  	}
												//  })
												<Section.Content
													type={ "default" }
													responsive={ true }
													responsiveBreakpoints={ 768 }
													styles={ {} }>
													{
														element.images.length === 1 ? (
															<Section.Image
																classes="grid-card-image-container"
																content={ {
																	image: element.image,
																	link: element.link
																} }
																separator={ false }
															/>
														) : (
															<Section.Collection
																content={
																	[ ...element.images ].map(
																		( img ) => {
																			if ( utils.file.checkImageURL( img ) ) {
																				return { "image": img, "link": img };
																			}
																		} )
																}
																datakeys={ [ "link", "image" ] }
																data={ element }
																type={ `carousel` }
																key={ `section-img-collection-mosaic` }
																lockHeight={ true }
																setLockHeight={ `500px` }
																scrollTimer={ 20000 }
																scrollEnabled={ false }
																classes={ `section-img-collection-mosaic` }
																styles={ {
																	border: `1px solid green`,
																} }
															/>
														)
													}
												</Section.Content>
											) : (
												<></>
											)
										)
									}
									*/}
									{
										"title" in element &&
										<Card.Frame
											src={ element.link }
											title={ element.title }
											styles={ { border: `none` } }
											height={ `400px` }
											width={ `100%` }>

											<input
												id="link"
												className=""
												type="text"
												value={ element.link } />

										</Card.Frame>
									}

								</Section>

							</Card.Body>

							<Card.Footer>

								<Section
									height={ `auto` }
									styles={ {
										position: `relative`,
										bottom: `0`,
									} }>

									{ "technologies" in element && (
										// Get a cell list for the listed technologies used.
										<Tags
											dataLabel={ "Technologies used:" }
											dataLabelSize={ "2xl" }
											dataList={ element.technologies }
											dataDisplayKey={ "name" }
											filteringEnabled={ false }
											separator={ false }
										/>
									) }

									<a
										href={ element.link }
										className="button">
										See It Here
									</a>

								</Section>

							</Card.Footer>

							<Card.Footer>
								<div className={ `flex justify-end w-full` }>
									<Button
										label={ `Delete` }
										icon={ <FaTimes /> }
										classes="button admin-button admin-button-red"
										onClick={ () => {
											onSetDelete( element );
										} }
									/>
									<Button
										label={ `Edit` }
										classes="button admin-button admin-button-primary"
										onClick={ () => {
											onSetEdit( element );
										} }
									/>

									<Button
										icon={ <FaCopy className={ `button-text button-icon` } /> }
										label={ `Clone` }
										classes="admin-button admin-button-primary bg-primary text-white rounded-sm"
										onClick={ () => {
											onClone( element );
										} }
									/>
								</div>
							</Card.Footer>
						</Card>
					) )
				}
			</Card.Grid>
		);
	};

	if ( debug ) console.log( "AdminProjects.js :: appsData = ", appsData, " :: dataSchema = ", dataSchema );

	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="Projects"
					type="title"
					scale={ `3xl` }
					separator={ true }>
					<div className="section-nav">
						<Button
							classes="admin-button bg-primary px-5 py-2 text-white"
							icon={ <FaPlus /> }
							label={ `New` }
							onClick={ () => {
								onSetAdd();
							} }
						/>
					</div>
				</Section.Text>
			</Section.Header>
			{ formDataSchema && buildViewport( formDataSchema ) }

			{ projects && utils.val.isValidArray( projects, true ) && buildGrid( projects ) }

			{ ( formModalType === "add" || formModalInitialData ) && buildModal( formModalInitialData ) }
			{ formModalOpen && formModalType === "delete" && formModalInitialData && buildModal( formModalInitialData ) }
		</Section>
	);
}

export default AdminProjects;

/*
		useEffect(() => {
			// On initial mount, fetch data.
			console.log("AdminProjects.JS :: dataSchema = ", dataSchema);
		}, []);

		const buildContent = () => {
			return (
				<Card.Grid>
					{projects.map((project) => (
						<Card classes="text-white shadow ">
							<Card.Header>
								<Section.Text
									classes="text-xl font-bold"
									type="text"
									content={project.title}></Section.Text>
							</Card.Header>
							<Card.Body>
								<Section>
									<Card.Frame
										src={project.link}
										title={project.title}
										styles={{ border: `none` }}
										height={`400px`}
										width={`100%`}>
										<input
											id="link"
											className=""
											type="text"
											value={project.link}></input>
									</Card.Frame>
									<Section.Image
										classes="grid-card-image-container"
										content={{ image: project.image, link: project.link }}
									/>
									<Section.Text
										classes="grid-card-body-text"
										type="text"
										content={project.description}></Section.Text>
								</Section>
								<Section
									height={`auto`}
									styles={{
										position: `relative`,
										bottom: `0`,
									}}>
									{"technologies" in project && (
										// Get a cell list for the listed technologies used.
										<Tags
											dataLabel={"Technologies used:"}
											dataLabelSize={"2xl"}
											dataList={project.technologies}
											dataDisplayKey={"name"}
											filteringEnabled={false}
										/>
									)}
								</Section>
							</Card.Body>
							<Card.Footer>
								<a
									href={project.link}
									className="button">
									See It Here
								</a>
								<button
									className="button admin-button admin-button-red"
									onClick={() => {
										onDelete(project);
									}}>
									Delete
								</button>
								<button
									className="button admin-button admin-button-primary"
									onClick={() => {
										setType("edit");
										setSelectedItemForEdit(project);
										setShowAddEditModal(true);
									}}>
									Edit
								</button>
							</Card.Footer>
						</Card>
					))}
				</Card.Grid>
			);
		};

		return (
			<>
				<Section.Text
					type="title"
					content="Projects"
					scale={`3xl`}
					separator={true}
				/>
				<div className="flex justify-end">
					<button
						className="admin-button bg-primary px-5 py-2 text-white"
						onClick={() => {
							setType("add");
							setSelectedItemForEdit(null);
							setShowAddEditModal(true);
						}}>
						Add project
					</button>
				</div>

				{!true && (
					<div className="grid-card-container">
						{projects.map((project) => (
							<div className="grid-card">
								<div className="grid-card-header">
									<h1 className="text-xl font-bold">{project.title}</h1>
								</div>
								<div className="grid-card-body">
									<div className="grid-card-image-container">
										<img
											src={project.image}
											alt=""
											className="grid-card-image"></img>
									</div>
									<div className="grid-card-iframe">
										<input
											id="link"
											className=""
											type="text"
											value={project.link}></input>
									</div>
									<div className="grid-card-body-text">
										<h1 className="">{project.description}</h1>
									</div>
									Technologies used:{" "}
									<div className="cell-list">
										{project.technologies.map((technology) => (
											<div className="cell-list-item">
												<h1 className="cell-list-item-text">
													{
														// JSON.stringify(technology)
														technology.name
													}
												</h1>
											</div>
										))}
									</div>
								</div>
								<div className="grid-card-footer">
									<a
										href={project.link}
										className="button">
										See It Here
									</a>
									<button
										className="button admin-button admin-button-red"
										onClick={() => {
											onDelete(project);
										}}>
										Delete
									</button>
									<button
										className="button admin-button admin-button-primary"
										onClick={() => {
											setType("edit");
											setSelectedItemForEdit(project);
											setShowAddEditModal(true);
										}}>
										Edit
									</button>
								</div>
							</div>
						))}
					</div>
				)}

				{projects && utils.val.isValidArray(projects, true) && buildContent(projects)}

				{(type === "add" || selectedItemForEdit) && buildModal()}
			</>
		);
	}

	export default AdminProjects;
*/

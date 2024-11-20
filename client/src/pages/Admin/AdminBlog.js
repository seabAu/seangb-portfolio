import React, { useState, useEffect, useRef } from "react";
import {
// Form,
// Button,
// Input,
// Modal,
message
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetDebug, SetLoading, SetPortfolioData, SetBlogData, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../lib/services/api.js";
import Table from "../../components/Table/Table";
// import { Form, Button, Row, Col } from "react-bootstrap";

import * as utils from 'akashatools';
import * as data from './../../utilities/Data.js';
import Posts from "../../components/Posts/Posts";
import Section from "../../components/Section";
import Dialog from "../../components/Dialog";
import Form from "../../components/Form";
import Button from "../../components/Button";


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
	FaTable,
	FaTasks,
	FaDatabase,
	FaBuromobelexperte,
	FaThList,
	FaWpforms,
} from "react-icons/fa";
import Droplist from "../../components/Droplist";
import Card from "../../components/Card";

function AdminBlog () {
	const dispatch = useDispatch();
	const {
		debug,
		isLoading,
		dataSchema,
		portfolioData,
		blogData,
		reloadData,
		loggedIn,
		// token,
		// role,
		user,
	} = useSelector( ( state ) => state.root );

	const [ formModalOpen, setFormModalOpen ] = React.useState( false );
	const [ formModalInitialData, setFormModalInitialData ] = React.useState( null ); // null | { an existing item's data }
	const [ formModalType, setFormModalType ] = React.useState( "add" ); // "" | "ADD" | "EDIT"
	const [ formDataModel, setFormDataModel ] = React.useState( [] );
	const [ formDataSchema, setFormDataSchema ] = React.useState( {} );
	const [ formInitializeRandom, setFormInitializeRandom ] = React.useState( false );
	const currentInputRef = useRef( null );
	const [ displayMode, setDisplayMode ] = React.useState( "posts" ); // FORM | (CARD)GRID | TABLE | TASK(LIST)
	const [ displaySchemaViewport, setDisplaySchemaViewport ] = React.useState( false );
	const [ confirmed, setConfirmed ] = React.useState( false ); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.
	const currentDisplayData = useRef( null );

	const updateCurrentData = ( input ) => {
		currentInputRef.current = input;
		/// * setCurrentData( input );
		if ( debug ) console.log( "AdminBlog.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current );
	};


	const getPosts = async () => {
		try {
			dispatch( SetLoading( true ) );
			dispatch( ReloadData( false ) );
			const response = await API.get( `/api/blog/posts` )
				.then( ( res ) => {
					if ( debug ) console.log( "Blog.js :: getPosts :: res = ", res );
					dispatch( SetBlogData( res.data ) );

					// Set reloadData flag false.
					dispatch( ReloadData( false ) );
				} )
				.catch( ( err ) => {
					if ( debug ) console.error( err );

					// Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
					dispatch( ReloadData( false ) );
				} );

			// console.log( response.data );
			dispatch( SetBlogData( response.data ) );
			// Set reloadData flag false.
			/// dispatch(ReloadData(false));
			dispatch( SetLoading( false ) );
		} catch ( error ) {
			dispatch( SetLoading( false ) );
		}
	};

	// const { posts } = blogData;

	useEffect( () => {
		// On initial mount, fetch posts.
		let postsTemp = getPosts();
		if ( debug ) console.log( "AdminBlog.js :: postsTemp: ", postsTemp, " :: dataSchema = ", dataSchema );
		if ( dataSchema ) {
			if ( dataSchema.hasOwnProperty( "blog" ) ) {
				if ( dataSchema.blog.hasOwnProperty( "posts" ) ) {
					let postSchema = dataSchema.blog.posts;
					if ( postSchema.hasOwnProperty( "paths" ) ) {
						setFormDataSchema( postSchema.paths );
					}
				}
			}
		}
	}, [] );

	useEffect( () => {
		// On initial mount, build data model.
		let model = data.schemaToModel( formDataSchema );
		if ( debug ) console.log( "AdminBlog.js :: formDataSchema = ", formDataSchema, " :: generated model = ", model );
		setFormDataModel( model );
	}, [ formDataSchema ] );

	useEffect( () => {
		if ( debug ) console.log( "AdminBlog.js :: formDataModel is now = ", formDataModel );
	}, [ formDataModel ] );

	// axios.defaults.baseURL = `http://147.182.184.250:4000`;
	const onFinish = async ( values ) => {
		if ( debug ) console.log( "AdminBlog :: onFinish :: onFinish triggered :: Values = ", values );
		try {
			// const tempSubjects = values.subjects?.split(/[\s,]+/) || [];
			// values.subjects = tempSubjects;

			dispatch( SetLoading( true ) );
			let response;
			if ( debug ) console.log( "AdminBlog :: onFinish :: Before API response :: API.defaults = ", API.defaults, " :: Values being sent = ", values );
			if ( formModalType === `edit` && formModalInitialData ) {
				// Update operation
				response = await API.post( "/api/blog/edit-post", values );
			} else if ( formModalType === "delete" ) {
				// Delete operation
				response = await API.post( "/api/blog/delete-post", {
					_id: values._id,
				} );
			} else {
				// Add operation
				response = await API.post( "/api/blog/add-post", values );
			}
			if ( debug ) console.log( "AdminBlog :: onFinish :: After API response :: response = ", response );
			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				if ( debug ) console.log( "AdminBlog :: onFinish :: After API response :: response.data.success = ", response.data.success );
				message.success( response.data.message );

				// Reset modal form on success.
				// setFormModalOpen(false);
				// setFormModalInitialData(null);

				dispatch( SetLoading( false ) );
				dispatch( ReloadData( true ) );
				// form.resetFields();
				// updateCurrentData( null ); // Reset fields.

				// Reset the dashboard on success.
				onSetCancel();
			} else {
				if ( debug ) console.log( "AdminBlog :: onFinish :: After API response :: ERROR :: response.data.error = ", response.data );
				message.error( response.data.message );
			}
		} catch ( error ) {
			dispatch( SetLoading( false ) );
			message.error( error.message );
		}
	};

	const onEdit = async ( item ) => {
		try {
			dispatch( SetLoading( true ) );
			const response = await API.post( "/api/blog/edit-post", {
				_id: item._id,
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
	};

	const onDelete = async ( item ) => {
		if ( debug )
			console.log(
				"AdminBlogs",
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
			dispatch( SetLoading( true ) );
			const response = await API.post( "/api/blog/delete-post", {
				_id: item._id,
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
		if ( debug ) console.log( "AdminBlog.js", " :: onSubmit()", " :: Testing form return data", " :: values = ", values );
		if ( formModalType === "add" ) {
			// Remove _id field.
			let valtemp = { ...values };
			valtemp = utils.ao.filterKeys( values, [ "_id" ] );
			values = valtemp;
		} else if ( formModalInitialData ) {
			values = { ...values, _id: formModalInitialData._id };
		}
		updateCurrentData( values );
		if ( debug ) console.log( `AdminBlog.js :: onSubmit() :: Submitting to onFinish :: values = `, values );
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

	const onSetPolyfill = () => {
		let generated = data.schemaToModel( formDataSchema, true );
		setFormModalType( "add" );
		setFormModalInitialData( generated );
		setFormModalOpen( true );
		updateCurrentData( generated );
	};

	let defaultPost = {
		// Post content
		author: "",
		title: "",
		imageUrl: "",
		content: "",
		// Post Timestamps
		timestampPosted: Date.now(),
		timestampUpdated: Date.now(),
		// Allows for customized styling for specific posts, if provided.
		options: [],
		// Post categorization
		topic: "",
		categories: [],
		tags: [],
		// Post Interactions
		views: 0,
		comments: [],
		likes: 0,
		dislikes: 0,
	};

	const buildModal = ( input ) => {
		if ( formModalType === "edit" || formModalType === "add" ) {
			// Build a modal with field inputs for each key in this data set's schema.
			if ( debug ) console.log( "AdminPlanner.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input );
			if ( !formModalInitialData ) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={ formModalOpen }
					title={ formModalInitialData ? "Edit" : "Add" }
					onCancel={ () => {
						onSetCancel();
					} }
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
								classes="admin-button bg-primary px-5 py-2 text-white"
								icon={ <FaRobot /> }
								label={ `Autofill Random` }
								onClick={ () => {
									// onSetPolyfill();
									setFormInitializeRandom( formInitializeRandom === true ? false : true );
								} }></Button>
							<Button
								classes="admin-button px-10 py-2 bg-primary text-white"
								icon={ <FaPlus /> }
								label={ `${
									// formModalInitialData ? "Update" : "Add"
									formModalType === `edit` ? "Update" : formModalType === `add` ? "Add" : `Submit`
									}` }
								onClick={ () => {
									// setFormModalType("add");
									// setFormModalOpen(false);
									// setFormModalInitialData(null);
									onSubmit( formModalInitialData );
								} }></Button>
						</div>
					}
					onFinish={ onFinish }>
					<Form.Schema
						// schema={dataSchema}
						schema={ formDataSchema }
						initialData={ input }
						onSubmit={ ( values ) => {
							onSubmit( values );
						} }
						initialDataAutofillRandom={ formInitializeRandom }
						onChange={ ( values ) => {
							updateCurrentData( values );
						} }
						layout={ `inline` }
						showViewport={ true }></Form.Schema>
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
							icon={ <FaTimes /> }
							onClick={ () => {
								onSetCancel();
							} }
						/>
						<Button
							classes="admin-button px-10 py-2 bg-primary text-white"
							label={ `Confirm` }
							icon={ <FaCheck /> }
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

	const buildDisplay = ( input ) => {
		let display = [];
		if ( utils.val.isDefined( input ) ) {
			currentDisplayData.current = input;
			if ( displayMode === "posts" ) {
				display.push( <Posts
					layout={ `flex` }
					dataModel={ defaultPost }
					data={ input }
					// rowHeight={`300px`}
					// colWidth={`400px`}
					activeFocusIndex={ -1 }
					gap={ `0.5rem` }
					margin={ `0.0rem` }
					padding={ `0.0rem` }></Posts> );
			}
			else if ( displayMode === "list" ) {
				display.push(
					<div
						className={ `section-viewport` }
						style={ {
							display: `${ `flex` }`,
							flexDirection: `${ `row` }`,
							justifyContent: `${ `center` }`,
							alignContent: `${ `stretch` }`,
						} }>
						<Droplist
							label={ `Planner Data | Display: ${ utils.str.toCapitalCase( displayMode ) }` }
							data={ input }
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
					</div>,
				);
			} else if ( displayMode === "grid" ) {
				display.push(
					<Card.Grid
						data={ input }
						enableControls={ true }
						elementControls={ adminControls }
						itemWidth={ `25rem` }
					/>,
				);
			} else if ( displayMode === "table" ) {
				display.push( <Table
					// isVisible={showTable}
					isFetching={ isLoading }
					isFilterable={ true }
					isSortable={ true }
					dataName={ `Blog Posts` }
					tableData={ input }
					// setShowSidePanel={setShowSidePanel}
					// setSidePanelID={setSidePanelID}
					rowActions={
						adminControls
					}
					cellOnClick={ ( cellIndex, cellData ) => {
						if ( debug ) console.log( "Cellonclick triggered :: ", cellIndex, cellData );
					} }
					rowOnClick={ ( rowIndex, rowData ) => {
						if ( debug ) console.log( "Rowonclick triggered :: ", rowIndex, rowData );
					} } />
				);
			}
		}
		return display;
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
			name: `clone`,
			type: `text`,
			icon: <FaCopy className={ `button-text button-icon` } />,
			onClick: ( element, elementIndex ) => {
				onClone( element );
			},
		},
		{
			name: `delete`,
			type: `text`,
			icon: <FaTimes className={ `button-text button-icon` } />,
			onClick: ( element, elementIndex ) => {
				onSetDelete( element );
			},
		},
	];

	const devControls = [
		{
			name: "displayPosts",
			label: "Posts",
			icon: <FaTasks />,
			classes: `${ displayMode === "posts" ? "active" : "" }`,
			onClick: ( e ) => {
				setDisplayMode( "posts" );
			},
		},
		{
			name: "displayForm",
			label: "Form",
			icon: <FaWpforms />,
			classes: `${ displayMode === "form" ? "active" : "" }`,
			onClick: ( e ) => {
				setDisplayMode( "form" );
			},
		},
		{
			name: "displayForm",
			label: "List",
			icon: <FaThList />,
			classes: `${ displayMode === "list" ? "active" : "" }`,
			onClick: ( e ) => {
				setDisplayMode( "list" );
			},
		},
		{
			name: "displayForm",
			label: "Grid",
			icon: <FaBuromobelexperte />,
			classes: `${ displayMode === "grid" ? "active" : "" }`,
			onClick: ( e ) => {
				setDisplayMode( "grid" );
			},
		},
		{
			name: "displayForm",
			label: "Table",
			icon: <FaTable />,
			classes: `${ displayMode === "table" ? "active" : "" }`,
			onClick: ( e ) => {
				setDisplayMode( "table" );
			},
		},
		{
			name: "showSchema",
			label: "Show Schema",
			icon: <FaDatabase />,
			classes: `${ displaySchemaViewport === true ? "active" : "" }`,
			onClick: ( e ) => {
				setDisplaySchemaViewport( displaySchemaViewport === true ? false : true );
			},
		},
	];

	if ( debug ) console.log( "AdminBlog.js :: blogData = ", blogData );
	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="Blog"
					type="title"
					scale={ `3xl` }
					separator={ true }>
					<div className="section-nav">
						<Button
							classes="admin-button bg-primary px-5 py-2 text-white"
							icon={ <FaPlus /> }
							label={ `Add Task` }
							onClick={ () => {
								onSetAdd();
							} }
						/>
					</div>
				</Section.Text>
			</Section.Header>

			<Section.Content
				layout={ `col` }
				behavior={ `wrap` }>
				<div className={ `button-controls` }>
					<Button.Controls
						show={ true }
						controls={ devControls }
					/>
				</div>

				{ displaySchemaViewport && formDataSchema && buildViewport( formDataSchema ) }

				{ ( formModalType === "add" || formModalInitialData ) && buildModal( formModalInitialData ) }
				{ formModalOpen && formModalType === "delete" && formModalInitialData && buildModal( formModalInitialData ) }

				{
					// dataSchema && utils.ao.has( dataSchema, "blog" ) ? utils.val.isValidArray( dataSchema.blog, true ) && buildDisplay( blogData.posts ) : <></>
				}

				{ blogData && utils.ao.has( blogData, "posts" ) ? utils.val.isValidArray( blogData.posts, true ) && buildDisplay( blogData.posts ) : <></> }
			</Section.Content>
		</Section>
	);
}

export default AdminBlog;

/* 	const onFinish = async (values) => {
		try {
			dispatch(SetLoading(true));
			let response;
			// Here's some hacky bullshit to remove the ","'s the form adds to arrays, without removing ", "'s you'll see in normal input.
			let duties = selectedItemForEdit.duties;
			duties = removeEmpty(
				selectedItemForEdit.duties
					.toString()
					.replaceAll(",", "%^(*&)")
					.replaceAll("%^(*&) ", ", ")
					.replaceAll("%^(*&)", "|")
					.split("|"),
			);
			console.log(
				"AdminBlog :: values = ",
				values,
				selectedItemForEdit,
				utils.ao.removeEmpty(values.duties.toString().replaceAll(",", "%^(*&)").replaceAll("%^(*&) ", ", ").replaceAll("%^(*&)", "|").split("|")),
				utils.ao.cleanArray(values.duties.toString().replaceAll(",", "%^(*&)").replaceAll("%^(*&) ", ", ").replaceAll("%^(*&)", "|").split("|")),
			);
			if (selectedItemForEdit) {
				// Update operation
				response = await API.post("/api/portfolio/update-experience", {
					...values,
					_id: selectedItemForEdit._id,
					// duties: utils.ao.cleanArray(values.duties.toString().replaceAll(",", "%^(*&)").replaceAll("%^(*&) ", ", ").replaceAll("%^(*&)", "|").split("|")),
				});
			} else {
				// Add operation
				response = await API.post(
					"/api/portfolio/add-experience",
					// values
					{
						...values,
						// duties: utils.ao.cleanArray(values.duties.toString().replaceAll(",", "%^(*&)").replaceAll("%^(*&) ", ", ").replaceAll("%^(*&)", "|").split("|")),
						// duties: parseTextToArray(selectedItemForEdit.duties, [
						//     "|",
						// ]),
					},
				);
			}

			dispatch(SetLoading(false));
			if (response.data.success) {
				message.success(response.data.message);
				setShowAddEditModal(false);
				setSelectedItemForEdit(null);
				dispatch(SetLoading(false));
				dispatch(ReloadData(true));
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(SetLoading(false));
			message.error(error.message);
		}
	};
*/ 
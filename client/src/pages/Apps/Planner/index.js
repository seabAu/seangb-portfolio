import React, { useState, useEffect, useRef, Children, Component } from "react";
import * as utils from 'akashatools';
import * as data from './../../../utilities/Data.js';
// Redux state management
import { useDispatch, useSelector } from "react-redux";
import { SetDebug, SetLoading, SetPortfolioData, SetAppsData, SetBlogData, ReloadData, SetDataSchema } from "../../../redux/rootSlice";
// import "./CardGrid.css";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import {
	FaTh,
	FaThLarge,
	FaThList,
	FaWindowMaximize,
	FaWindowMinimize,
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
	FaAngleDoubleLeft,
	FaAngleDoubleRight,
	FaArrowDown,
} from "react-icons/fa";
import Tags from "../../../components/Tags/index.js";
import Button from "../../../components/Button/index.js";
import Input from "../../../components/Form/Input.js";
import Section from "../../../components/Section/index.js";
import "./tasks.css";
import { message } from "antd";
import API from "../../../lib/services/api.js";
import Progress from "../../../components/Loader/Progress.js";
import Form from "../../../components/Form/index.js";
import Dialog from "../../../components/Dialog/index.js";
function Planner ( props ) {
	const dispatch = useDispatch();
	const { debug, loading, portfolioData, appsData, reloadData, loggedIn, user, dataSchema } = useSelector( ( state ) => state.root );
	const {
		// Child components passed inside this component's element.
		id = "",
		children,
		tasks = [],
		controls = [],
		// onEdit = (e) => {},
		// onDelete = (e) => {},
		// onCopy = (e) => {},
		// onAdd = (e) => {},
		// Render overrides, if ever needed.
		show = true,
		// Style settings.
		margin,
		padding,
		height,
		width,
		// Can import extra styles.
		classes = "",
		styles = {},
	} = props;

	const [ taskRenderData, setTaskRenderData ] = useState( [] );
	const [ tasksActive, setTasksActive ] = useState( [] );
	const [ formModalOpen, setFormModalOpen ] = React.useState( false );
	const [ formModalInitialData, setFormModalInitialData ] = React.useState( null ); // null | { an existing item's data }
	const [ formModalType, setFormModalType ] = React.useState( "add" ); // "" | "ADD" | "EDIT"
	const [ formDataModel, setFormDataModel ] = React.useState( [] );
	const [ confirmed, setConfirmed ] = React.useState( false ); // A basic TRUE / FALSE flag for handling asking to confirm when deleting an entry.

	const currentDisplayData = useRef( null );
	const currentInputRef = useRef( null );
	const updateCurrentData = ( input ) => {
		currentInputRef.current = input;
		/// * setCurrentData( input );
		if ( debug ) console.log( "AdminPlanner.js :: updateCurrentData() :: input = ", input, " :: currentInputRef.current is now = ", currentInputRef.current );
	};

	const getData = async ( apiCall, callback ) => {
		// TODO :: !Important! :: Make this generic and put it in a utility file.
		try {
			// dispatch(SetLoading(true));
			const response = await API.get( `/api/apps/planner/tasks` )
				.then( ( res ) => {
					if ( debug ) console.log( "Planner.js :: getData :: res = ", res );
					// dispatch( SetAppsData( res.data ) );
					return res.data;
					// Set reloadData flag false.
					// dispatch(ReloadData(false));
				} )
				.catch( ( err ) => {
					if ( debug ) console.error( err );
					message.error( 'Planner task fetch error: ', err );

					// Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
					// dispatch(ReloadData(false));
				} );

			// Set reloadData flag false.
			// dispatch(SetLoading(false));
			return response;
		} catch ( error ) {
			// dispatch(SetLoading(false));
		}
	};

	const loadData = async () => {
		let data = await getData( "/apps/planner/tasks" );
		if ( debug ) console.log( "Planner.js :: loadData() :: data = ", data );
		if ( data ) {
			dispatch( SetAppsData( data ) );
		}
	}

	useEffect( () => {
		// On initial mount, fetch data.
		// if (utils.val.isValidArray(tasks)) {
		// 	setTaskRenderData(tasks);
		// }
		loadData();
	}, [] );

	useEffect( () => {
		// On initial mount, fetch data.
		if ( utils.val.isValidArray( appsData.tasks ) ) {
			if ( debug ) console.log( "Planner.js :: appsData.tasks = ", appsData.tasks );
			setTaskRenderData( appsData.tasks );
			setFormDataModel( data.initializeModel( appsData.tasks[ 0 ] ) );
		}
	}, [ appsData ] );

	useEffect( () => {
		// On initial mount, build data model.
		// setFormDataModel(data.initializeModel(taskRenderData));
	}, [ taskRenderData ] );

	useEffect( () => {
		if ( debug ) console.log( "Planner.js :: formDataModel is now = ", formDataModel );
	}, [ formDataModel ] );

	const componentStyles = {
		// Default styles go here.
		// User-set styles override default settings.
		// display: `${"flex"}`,
		// flexDirection: `${"row"}`,
		// justifyContent: `${"flex-start"}`,
		// alignItems: `${"flex-start"}`,
		// alignContent: `${"flex-start"}`,
		/// verticalAlign: `top`,
		/// textAlign: `left`,
		// height: `100%`,
		// width: `100%`,
		// border: `1px solid white`,
		...styles,
		// Responsiveness overrides go here.
	};

	const toggleTaskActive = ( index ) => {
		if ( debug ) console.log( "Planner.js :: toggleTaskActive :: index = ", index, " :: currently active list = [", tasksActive, "]" );
		if ( tasksActive.includes( index ) ) {
			// Already in list, so remove it.
			let temp = [ ...tasksActive ];
			temp = temp.filter( ( val ) => {
				return val !== index;
			} );
			setTasksActive( temp );
		} else {
			// Not in list, add it.
			setTasksActive( [ ...tasksActive, index ] );
		}
	};

	const onSetCancel = () => {
		setFormModalOpen( false );
		setFormModalInitialData( null );
		setFormModalType( "" );
		updateCurrentData( null );
	};

	const onSetEdit = ( element = {} ) => {
		// if (utils.val.isValidArray(Object.keys(data), true)) {
		// 	setFormModalType("edit");
		// 	setFormModalInitialData(data);
		// 	setFormModalOpen(true);
		// 	updateCurrentData(data);
		// }
		if ( utils.val.isObject( element ) ) {
			if ( utils.ao.hasAll( element, Object.keys( formDataModel ) ) ) {
				if ( debug ) console.log( "Planner.JS :: onSetEdit :: element = ", element, " :: formDataModel = ", formDataModel );
				setFormModalType( "edit" );
				setFormModalInitialData( element );
				setFormModalOpen( true );
				updateCurrentData( element );
			}
		}
	};

	const onSetDelete = ( element ) => {
		// if (!confirmed) {
		// Prompt with a simple modal to confirm.
		if ( utils.val.isObject( element ) ) {
			if ( utils.ao.hasAll( element, Object.keys( formDataModel ) ) ) {
				if ( debug ) console.log( "Planner.JS :: onSetDelete :: element = ", element, " :: formDataModel = ", formDataModel );
				setFormModalType( "delete" );
				setFormModalInitialData( element );
				updateCurrentData( element );
				setFormModalOpen( true );
			}
		}
		// } else {
		// Confirmed, proceed with deleting.
		// onDelete(element);
		// }
	};

	const sendUpdate = async ( element, mode = "edit" ) => {
		if ( debug ) console.log( "PLANNER.JS :: sendUpdate", " :: mode = ", mode, " :: element = ", element, " :: sendUpdate triggered." );
		// if (!utils.val.isObject(element)) return;

		try {
			let response;
			if ( debug )
				console.log(
					"PLANNER.JS :: sendUpdate",
					" :: mode = ",
					mode,
					" :: element = ",
					element,
					" :: Before API response :: API.defaults = ",
					API.defaults,
					" :: element being sent = ",
					element,
				);
			if ( mode === `edit` ) {
				// Update operation
				response = await API.post( "/api/apps/planner/edit-task", element );
			} else if ( mode === "add" ) {
				// Add operation
				response = await API.post( "/api/apps/planner/add-task", element );
			} else if ( mode === "delete" ) {
				// Add operation
				response = await API.post( "/api/apps/planner/delete-task", element._id );
			}
			if ( debug ) console.log( "PLANNER.JS :: sendUpdate", " :: mode = ", mode, " :: element = ", element, " :: After API response :: response = ", response );

			if ( response.data.success ) {
				if ( debug )
					console.log(
						"PLANNER.JS :: sendUpdate",
						" :: mode = ",
						mode,
						" :: element = ",
						element,
						" :: After API response :: response.data.success = ",
						response.data.success,
					);
				message.success( response.data.message );

				// Reload data.
				// getData();
				getData( "/apps/planner/tasks" );

				// Reset modal / cleanup.
				onSetCancel();
			} else {
				if ( debug )
					console.log(
						"PLANNER.JS :: sendUpdate",
						" :: mode = ",
						mode,
						" :: element = ",
						element,
						" :: After API response :: ERROR :: response.data.error = ",
						response.data,
					);
				message.error( response.data.message );
			}
		} catch ( error ) {
			message.error( error.message );
		}
	};

	const updateData = ( key, value, element, mode = "edit" ) => {
		let temp = { ...element };
		value = value.toLowerCase();
		// let updatedData = utils.ao.deepFindSet(temp, "priority", value);
		let updatedData = { ...element };
		updatedData[ key ] = value;
		// let tempDataArray = [...taskRenderData];
		// tempDataArray[index] = updatedData;
		// if ( debug )
		if ( debug ) console.log( "Planner.JS :: Select :: updateData()", "\n :: key = ", key, "\n :: value = ", value, "\n :: temp = ", temp, "\n :: updatedData = ", updatedData );
		// setTaskRenderData( tempDataArray );

		sendUpdate( updatedData, mode );
	};

	const buildModal = ( input ) => {
		if ( formModalType === "edit" ) {
			// Render a basic modal to add or edit content.
			// Build a modal with field inputs for each key in this data set's schema.
			if ( debug ) console.log( "AdminPlanner.js :: buildModal() :: formModalInitialData = ", formModalInitialData, " :: input = ", input );
			if ( !formModalInitialData ) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={ formModalOpen }
					footer={ null }
					title={ "Edit" }
					onCancel={ () => {
						onSetCancel();
					} }
				// onFinish={onFinish}
				>
					<Form
						// schema={dataSchema}
						model={ formDataModel }
						initialData={ input }
						onSubmit={ ( values ) => {
							sendUpdate( values, formModalType );
						} }
						onCancel={ ( e ) => {
							onSetCancel();
						} }
						// onChange={(values) => {
						// 	// updateCurrentData(values);
						// 	sendUpdate(values, formModalType);
						// }}
						layout={ `inline` }
						showViewport={ false }></Form>
					<div className="flex justify-end w-full">
						<Button
							classes="admin-button bg-white px-10 py-2 text-primary"
							icon={ <FaTimes /> }
							label={ `Cancel` }
							onClick={ () => {
								onSetCancel();
							} }></Button>
					</div>
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
						sendUpdate( element, formModalType );
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
									sendUpdate( element, formModalType );
								}, 1000 );
							} }
						/>
					</div>
				</Dialog>
			);
		}
	};

	const buildTasks = ( input ) => {
		let tasks = [];
		if ( debug ) console.log( "Planner.js :: Task list display mode :: data currently loaded: ", input );
		if ( utils.val.isValidArray( input, true ) ) {
			input.forEach( ( task, index ) => {
				// console.log("Planner.js :: Task list display mode", "\n :: index = ", index, "\n :: task = ", task, " :: dropdownActive = ", dropdownActive);
				/*	// Each element will look like:
					{
						"_id": "643d7812480469442397ed97",
						"workspace": "",
						"title": "",
						"category": "",
						"description": "",
						"notes": [""],
						"subtasks": [""],
						"priority": "asap", 		// ENUM
						"status": "incomplete", 	// ENUM
						"completeness": 60, 		// PCT
						"prerequisites": [],
						"timestampDue": "2023-04-17T16:47:12.141Z",
						"timestampEstimated": "2023-04-17T16:47:12.141Z",
						"timestampCreated": "2023-04-17T16:47:12.141Z",
						"timestampUpdated": "2023-04-17T16:47:12.141Z",
						"__v": 0
					}
					
					* Title, completeness (as a % progress bar), category, priority, status, and workspace are shown in the main view, as well as dropdown buttons for the subtasks. 
					* Workspace determines if it shows up under the current render (add a available-workspaces dropdown later)
					* priority and status are both simple text dropdowns. Changing them will have to update the data and submit the change WITHOUT running a loading screen.
					* Notes show up in a side panel popout that includes a (+) button to add new notes, and a (-) button on each note to delete it. 
					* Subtasks show up in a dropdown that pushes elements below this one down. 
				*/

				let uniqueId = Math.ceil( Math.random() * 100000 );

				// * It's safe to assume every entry has the right object keys available, so don't need to check for them, as mongoose has already taken care of that.
				tasks.push(
					<div className={ `task-container` }>
						<div className={ `task-content` }>
							<div className={ `task-controls` }>
								<Button
									classes={ `${ !!tasksActive.includes( index ) ? `dropdown-button-active` : '' }` }
									icon={ <FaArrowDown className={ `button-icon` } /> }
									onClick={ ( e ) => {
										// dropdownActive = dropdownActive === true ? false : true;
										toggleTaskActive( index );
									} }></Button>
							</div>
							<div className={ `task-details` }>
								<div className={ `task-detail task-title` }>{ task.title }</div>
								<div className={ `task-detail task-status task-detail-select` }>
									{
										<Input.Control
											label=""
											fieldType="select"
											fieldLayout="inline"
											name={ `task-${ index }-input-select-${ `status` }-${ uniqueId }` }
											id={ `task-${ index }-input-select-${ `status` }-${ uniqueId }` }
											key={ `task-${ index }-input-select-${ `status` }-${ uniqueId }` }
											defaultValue={ utils.str.toCapitalCase( task.status ) }
											inputProps={ {
												options: [ "Cancelled", "Postponed", "Waitingrequirements", "Incomplete", "Inprogress", "Completed" ],
												multiple: false,
												// defaultValue: task.status,
												// value: task.status,
												unsetOption: "-",
											} }
											multiple={ false }
											dropdown={ false }
											disabled={ false }
											onChange={ ( value ) => {
												updateData( "status", value, task, "edit" );
											} }
										/>
									}
								</div>
								<div className={ `task-detail task-priority task-detail-select` }>
									{
										<Input.Control
											label=""
											fieldType="select"
											fieldLayout="inline"
											name={ `task-${ index }-input-select-${ `priority` }-${ uniqueId }` }
											id={ `task-${ index }-input-select-${ `priority` }-${ uniqueId }` }
											key={ `task-${ index }-input-select-${ `priority` }-${ uniqueId }` }
											// classes={`task-input-select`}
											defaultValue={ utils.str.toCapitalCase( task.priority ) }
											inputProps={ {
												options: [ "None", "Low", "Medium", "High", "Urgent", "Asap", "Critical" ],
												multiple: false,
												// defaultValue: task.priority,
												// value: task.priority,
												// unsetOption: "-",
											} }
											// multiple={false}
											// dropdown={false}
											// disabled={false}
											onChange={ ( value ) => {
												updateData( "priority", value, task, "edit" );
											} }
										/>
									}
								</div>
								<div className={ `task-detail task-detail-timestamp` }>
									<p className={ `task-detail-label task-detail-label-block` }>{ "Due" }</p>
									<Input.Control
										fieldType="date"
										label={ "Due" }
										fieldLayout={ `block` }
										name={ `task-${ index }-input-date-${ `timestampDue` }-${ uniqueId }` }
										key={ `task-${ index }-input-date-${ `timestampDue` }-${ uniqueId }` }
										id={ `task-${ index }-input-date-${ `timestampDue` }-${ uniqueId }` }
										classes={ `task-detail-input task-input-date` }
										inputProps={ {
											defaultValue: utils.time.formatTimestampDDMMYYYY( task.timestampDue ),
										} }
										onChange={ ( e ) => {
											updateData( "timestampDue", e.target.value, task, "edit" );
										} }
									/>
								</div>
								<div className={ `task-detail task-detail-timestamp` }>
									<p className={ `task-detail-label task-detail-label-block` }>{ "Estimated" }</p>
									<Input.Control
										fieldType="date"
										label={ "Estimated" }
										fieldLayout={ `block` }
										name={ `task-${ index }-input-date-${ `timestampEstimated` }-${ uniqueId }` }
										key={ `task-${ index }-input-date-${ `timestampEstimated` }-${ uniqueId }` }
										id={ `task-${ index }-input-date-${ `timestampEstimated` }-${ uniqueId }` }
										classes={ `task-detail-input task-input-date` }
										inputProps={ {
											defaultValue: utils.time.formatTimestampDDMMYYYY( task.timestampEstimated ),
										} }
										onChange={ ( e ) => {
											updateData( "timestampEstimated", e.target.value, task, "edit" );
										} }
									/>
								</div>
								<div className={ `task-detail task-detail-timestamp` }>
									<p className={ `task-detail-label task-detail-label-block` }>{ "Created" }</p>
									<Input.Control
										fieldType="date"
										label={ "Created" }
										fieldLayout={ `block` }
										name={ `task-${ index }-input-date-${ `timestampCreated` }-${ uniqueId }` }
										key={ `task-${ index }-input-date-${ `timestampCreated` }-${ uniqueId }` }
										id={ `task-${ index }-input-date-${ `timestampCreated` }-${ uniqueId }` }
										classes={ `task-detail-input task-input-date` }
										inputProps={ {
											defaultValue: utils.time.formatTimestampDDMMYYYY( task.timestampCreated ),
										} }
										onChange={ ( e ) => {
											updateData( "timestampCreated", e.target.value, task, "edit" );
										} }
									/>
								</div>
								<div className={ `task-detail task-detail-timestamp` }>
									<p className={ `task-detail-label task-detail-label-block` }>{ "Updated" }</p>
									<Input.Control
										fieldType="date"
										label={ "Updated" }
										fieldLayout={ `block` }
										name={ `task-${ index }-input-date-${ `timestampUpdated` }-${ uniqueId }` }
										key={ `task-${ index }-input-date-${ `timestampUpdated` }-${ uniqueId }` }
										id={ `task-${ index }-input-date-${ `timestampUpdated` }-${ uniqueId }` }
										classes={ `task-detail-input task-input-date` }
										inputProps={ {
											defaultValue: utils.time.formatTimestampDDMMYYYY( task.timestampUpdated ), // task.timestampUpdated,
										} }
										onChange={ ( e ) => {
											updateData( "timestampUpdated", e.target.value, task, "edit" );
										} }
									/>
								</div>
								<div className={ `task-detail task-detail-progress progress-bar-container` }>
									{
										<Progress
											startValue={ 0 }
											currValue={ task.completeness }
											endValue={ 100 }
											bgcolor={ `#668811` }
											fillercolor={ `#ff3322` }
											width={ `80` }
										/>
									}
								</div>
							</div>
							<div className={ `task-options` }>
								<Button.Controls
									showLabels={ false }
									appearance={ `flat` }
									layout={ "column" }
									controls={ [
										{
											name: `editTask`,
											label: "Edit",
											type: `text`,
											classes: ``,
											icon: <FaEdit className={ `button-text` } />,
											onClick: ( element, elementIndex ) => {
												onSetEdit( task );
											},
										},
										{
											name: `deleteTask`,
											label: "Delete",
											type: `text`,
											classes: ``,
											icon: <FaTimes className={ `button-text` } />,
											onClick: ( element, elementIndex ) => {
												onSetDelete( task );
											},
										},
									] }></Button.Controls>
							</div>
						</div>
						<div className={ `task-dropdown ${ !!tasksActive.includes( index ) ? "dropdown-active" : "" }` }>
							<div className={ `task-dropdown-detail task-description` }>{ task.description }</div>

							<ul className={ `task-dropdown-detail subtask-list` }>
								{ task.subtasks.map( ( subtask, subtaskIndex ) => {
									return <li className="subtask-list-item">{ subtask }</li>;
								} ) }
							</ul>
							<ul className={ `task-dropdown-detail note-list` }>
								{ task.notes.map( ( note, subtaskIndex ) => {
									return <li className="note-list-item">{ note }</li>;
								} ) }
							</ul>
						</div>
					</div>,
				);
			} );
			return tasks;
		}
		return tasks;
	};

	const buildPlanner = ( input ) => {
		let planner = [];
		if ( utils.val.isValidArray( input, true ) ) {
			let tasks = buildTasks( input );
			planner.push(
				<div
					className={ `tasks-container ${ classes ? classes : "" }` }
					style={ componentStyles }>
					<div className={ `tasks-controls` }></div>
					<div className={ `tasks-content` }>{ tasks }</div>
				</div>,
			);
		}
		return planner;
	};

	return (
		<div
			className={ `planner-container ${ ``
				// showExpanded ? `card-full` : `card-summary`
				}` }
			style={ componentStyles }>
			{ show && ( utils.val.isValidArray( children, true ) || utils.val.isValid( children ) ) && children }
			{ show && taskRenderData && utils.val.isValidArray( taskRenderData, true ) ? buildPlanner( taskRenderData ) : <></> }

			{ formModalOpen && ( formModalType === "add" || formModalType === "edit" ) && buildModal( formModalInitialData ) }

			{ formModalOpen && ( formModalType === "delete" ) && formModalInitialData && buildModal( formModalInitialData ) }
		</div>
	);
}

function Task ( props ) {
	const {
		// Child components passed inside this component's element.
		children,
		id = "",
		taskData = {},
		// Render overrides, if ever needed.
		show = true,
		showChildren = true,
		showExpanded = true,
		type = "default",
		title = "",
		// Style settings.
		margin,
		padding,
		height,
		width,
		// Can import extra styles.
		classes = "",
		styles = {},
		debug = false,
	} = props;

	const componentStyles = {
		// Default styles go here.
		// User-set styles override default settings.
		// display: `${"flex"}`,
		// flexDirection: `${"row"}`,
		// justifyContent: `${"flex-start"}`,
		// alignItems: `${"flex-start"}`,
		// alignContent: `${"flex-start"}`,
		/// verticalAlign: `top`,
		/// textAlign: `left`,
		// height: `100%`,
		// width: `100%`,
		// border: `1px solid white`,
		...styles,
		// Responsiveness overrides go here.
	};

	const buildTask = ( input ) => {
		let task = [];
		return task;
	}

	return (
		<div
			className={ `task-container ${ classes ? classes : "" }` }
			style={ componentStyles }
			id={ id === `` ? `planner-task-${ Math.floor( Math.random() * 100000 ) }` : `grid-card-item-${ id }` }
			key={ id === `` ? `planner-task-${ Math.floor( Math.random() * 100000 ) }` : `grid-card-item-${ id }` }>
			{ show && taskData && utils.val.isObject( taskData ) ? buildTask( taskData ) : <></> }
		</div>
	);
}

Planner.Task = Task;

export default Planner;

// const onTaskEdit = (element) => {
// 	console.log("Planner.JS :: onTaskEdit :: element = ", element);
// 	onEdit(element);
// };
// const onTaskDelete = (id) => {
// 	console.log("Planner.JS :: onTaskDelete :: id = ", id);
// 	onDelete(id);
// };

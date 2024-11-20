// Testing ground for creating dynamic reactive forms.
/*
	These forms will replace all the ones used in the admin dashboard.
	They will accept a JSON object as their model, and construct a form based on that. 
		For each key-value pair: 
			If the value is a scalar, render a regular input based on the data type.
			If the value is an array of scalars,
			If the value is an array of objects, 
	The form component will keep track of the data entered into it in a global state array.
	Updating the data in the form triggers a search in the global dataset for that specific input's specific key and updating just that value. 
*/

import React, { useState, useEffect, useRef } from "react";
import * as utils from 'akashatools';
import {
	/// Form,
	// Input,
	/// Button,
	// Checkbox,
	message,
} from "antd";

// Redux state management
import { useDispatch, useSelector } from "react-redux";
import { SetDebug, SetLoading, SetPortfolioData, SetBlogData, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../lib/services/api.js";
import Input from "../../components/Form/Input.js";
import FormList from "antd/es/form/FormList.js";
import { Form } from "../../components/Form/index.js";
import Tabs from "../../components/Tabs";

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
	FaReadme,
	FaBookOpen,
	FaBook,
	FaRegWindowClose,
	FaWindowMaximize,
	FaWindowMinimize,
	FaThList,
	FaThLarge,
	FaTh,
	FaWpforms,
	FaTable,
} from "react-icons/fa";
import Button from "../../components/Button/index.js";
import Table from "../../components/Table/Table.js";
import Droplist from "../../components/Droplist/index.js";

function AdminDashboard () {
	const dispatch = useDispatch();
	// Get the current values.
	const {
		debug,
		isLoading,
		portfolioData,
		dataSchema,
		blogData,
		reloadData,
		loggedIn,
		// token,
		// role,
		user,
	} = useSelector( ( state ) => state.root );
	const [ dataLayout, setDataLayout ] = React.useState( false );

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

	const [ formModel, setFormModel ] = React.useState( {
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		statement: {
			type: String,
		},
		summary: {
			type: String,
		},
		description: {
			type: Array,
			model: String,
		},
		description1: {
			type: Array,
			model: String,
		},
		description2: {
			type: Array,
			model: String,
		},
		certifications: {
			type: Array,
			model: String,
		},
		achievements: {
			type: Array,
			model: String,
		},
		skills: {
			// type: [skillSchema],
			type: Array,
			model: {
				index: {
					type: Number,
				},
				showIndex: {
					type: Number,
				},
				enabled: {
					type: Boolean,
				},
				name: {
					type: String,
				},
				category: {
					type: String,
				},
				tags: {
					type: Array,
					model: String,
				},
				proficiency: {
					type: Number,
					min: 0,
					max: 10,
				},
				years: {
					type: Number,
					min: 0,
					max: 50,
				},
			},
		},
		social: {
			type: Array,
			model: {
				site: {
					type: String,
				},
				url: {
					type: String,
				},
				icon: {
					type: String,
				},
			},
		},
	} );
	// Initialize formData as a duplicate of formModel, and fill in each value.
	const [ loadForm, setLoadForm ] = React.useState( false );
	const [ formData, setFormData ] = React.useState( {
		firstName: " ",
		lastName: " ",
		statement: " ",
		summary: " ",
		description: [ " " ],
		description1: [ " " ],
		description2: [ " " ],
		certifications: [ " " ],
		achievements: [ " " ],
		enabled: true,
		skills: [
			{
				index: 0,
				showIndex: 0,
				enabled: true,
				name: " ",
				category: " ",
				tags: [ " " ],
				proficiency: 0,
				years: 0,
			},
		],
		social: [
			{
				site: " ",
				url: " ",
				icon: " ",
			},
		],
	} );

	useEffect( () => {
		// On initial mount, fetch posts.
		let postsTemp = getPosts();
		if ( debug ) console.log( "AdminDashboard.js :: postsTemp: ", postsTemp );
	}, [] );

	useEffect( () => {
		if ( debug ) console.log( "AdminDashboard.js :: FormData is now = ", formData );
	}, [ formData ] );

	const submitData = async ( values ) => {
		try {
			const tempSkills = values.skills.split( /[\s,]+/ );
			values.skills = tempSkills;

			dispatch( SetLoading( true ) );
			const response = await API.post( "/api/portfolio/update-about", {
				...values,
				_id: portfolioData.about._id,
			} );
			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				message.success( response.data.message );
			} else {
				message.error( response.data.message );
			}
		} catch ( error ) {
			message.error( error.message );
		}
	};

	const onSubmit = async ( values ) => {
		if ( debug ) console.log( `AdminDashboard :: Testing form return data :: values = `, values );
	};

	const devData = [
		{
			_id: 95734957345345,
			index: 0,
			textContent: `Here is some text`,
			arrayContent: [ `Line 1 of content`, `Line 2 of content`, `Line 3 of content` ],
			oaContent: [
				{
					_id: 2387429384793284,
					index: 0,
					enabled: true,
					info: `Object content`,
					data: [ "Item 0 Data 1", "Item 0 Data 2", "Item 0 Data 3", "Item 0 Data 4" ],
					tags: [ "MERN Stack", "Full Stack Development", "Javascript Frameworks", "Back End Development" ],
				},
			],
		},
		{
			_id: 744563456,
			index: 1,
			textContent: `Here is some text`,
			arrayContent: [ `Line 1 of content`, `Line 2 of content`, `Line 3 of content` ],
			oaContent: [
				{
					_id: 2387429384793284,
					index: 0,
					enabled: true,
					info: `Object content`,
					data: [ "Item 1 Data 1", "Item 1 Data 2", "Item 1 Data 3", "Item 1 Data 4" ],
					tags: [ "MERN Stack", "Full Stack Development", "Javascript Frameworks", "Back End Development" ],
				},
			],
		},
	];

	const devControls = [
		{
			name: "displayList",
			label: "List",
			icon: <FaThList />,
			classes: ``,
			onClick: ( e ) => {
				setDataLayout( "list" );
			},
		},
		{
			name: "displayForm",
			label: "Form",
			icon: <FaWpforms />,
			classes: ``,
			onClick: ( e ) => {
				setDataLayout( "form" );
			},
		},
		{
			name: "displayTable",
			label: "Table",
			icon: <FaTable />,
			classes: ``,
			onClick: ( e ) => {
				setDataLayout( "table" );
			},
		},
		{
			name: "displayGrid",
			label: "Grid",
			icon: <FaTh />,
			classes: `${ `` }`,
			onClick: ( e ) => {
				setDataLayout( "grid" );
			},
		},
		{
			name: "displayFlex",
			label: "Flex",
			icon: <FaThLarge />, //FaJira
			classes: ``,
			onClick: ( e ) => {
				setDataLayout( "flex" );
			},
		},
		// {
		//     name: "postExpandBehavior",
		//     label: `${dataLayout === "Fill" ? "Overlay" : "Fill"}`,
		//     icon: dataLayout ? <FaWindowMaximize /> : <FaWindowMinimize />,
		//     classes: ``,
		//     onClick: (e) => {
		//         setDataLayout(dataLayout === "Fill" ? "Overlay" : "Fill");
		//     },
		// },
	];

	const buildForm = ( initialData, onSubmitFunc ) => {
		return (
			<Form
				// initialData={ portfolioData.about }
				// initialData={ portfolioData.projects[0] }
				initialData={ initialData }
				onSubmit={ ( values ) => {
					onSubmit( values );
				} }
				layout={ `block` }
				showViewport={ true }></Form>
		);
	};

	const buildFormComponents = ( input ) => {
		return utils.val.isObject( input ) ? (
			buildForm( input, ( values ) => {
				onSubmit( values );
			} )
		) : utils.val.isArray( input ) ? (
			input.map( ( item, index ) => {
				return buildForm( item, ( values ) => {
					onSubmit( values );
				} );
			} )
		) : (
			<></>
		);
	};

	const buildTable = ( input, title, rowActions, rowOnClick, cellOnClick, inputProps ) => {
		if ( debug ) console.log( "AdminDashboard.js :: buildTable :: ", input, rowActions, rowOnClick, cellOnClick, inputProps );
		return (
			<Table
				// isVisible={showTable}
				// tableData={utils.val.isValidArray(input, true) ? input : [input]}
				tableData={ input }
				isFetching={ isLoading }
				isFilterable={ true }
				isSortable={ true }
				dataName={ `Portfolio Database :: ${ title }` }
				// setShowSidePanel={setShowSidePanel}
				// setSidePanelID={setSidePanelID}
				rowActions={
					[
						// {
						//     name: `delete`,
						//     type: `text`,
						//     onClick: (rowIndex) => {
						//         // nDelete(rowIndex);
						//     },
						// },
					]
				}
				{ ...{
					...( cellOnClick ? { cellOnClick: cellOnClick } : {} ),
				} }
				{ ...{
					...( rowOnClick ? { rowOnClick: rowOnClick } : {} ),
				} }
			// cellOnClick={(cellIndex, cellData) => { cellOnClick(cellIndex, cellData); }}
			// rowOnClick={(rowIndex, rowData) => { console.log("Rowonclick triggered :: ", rowIndex, rowData); rowOnClick(rowIndex, rowData); }}
			/>
		);
	};

	const buildTableComponents = ( input, rowActions, rowOnClick, cellOnClick, inputProps ) => {
		return utils.val.isObject( input ) ? (
			Object.keys( input ).map( ( key, index ) => {
				return buildTable( input[ key ], key, rowActions, rowOnClick, cellOnClick, inputProps );
			} )
		) : utils.val.isValidArray( input, true ) ? (
			input.map( ( item, index ) => {
				return buildTable( item, index, rowActions, rowOnClick, cellOnClick, inputProps );
			} )
		) : (
			<></>
		);
	};

	const buildDataViewer = ( input ) => {
		let viewer = [];

		return utils.val.isAO( input ) ? (
			<div className="data-viewer-container">
				<div className={ `button-controls` }>
					<Button.Controls
						show={ true }
						controls={ devControls }
					/>
				</div>
				<div className={ `data-viewer` }>
					{ dataLayout === "list" ? (
						<Droplist
							label={ `${ `Data Viewer` }` }
							data={ input }
							showControls={ true }
							expandable={ true }
						/>
					) : dataLayout === "table" ? (
						buildTableComponents( input )
					) : dataLayout === "form" ? (
						buildFormComponents(
							input,
							[],
							( cellIndex, cellData ) => {
								if ( debug ) console.log( "Cellonclick triggered :: ", cellIndex, cellData );
							},
							( rowIndex, rowData ) => {
								if ( debug ) console.log( "Rowonclick triggered :: ", rowIndex, rowData );
							},
						)
					) : (
						<></>
					) }
				</div>
			</div>
		) : (
			<></>
		);
	};

	const makeDroplist = ( label, data ) => {
		if ( label && data ) {
			return (
				<Droplist
					key={ `admin-dashboard-droplist-${ label }` }
					label={ label }
					data={ data }
					type={ `list` }
					showControls={ true }
					expandable={ true }
					debug={ false }
					height={ `auto` }
					width={ `auto` }
				/>
			);
		}
	};

	if ( debug ) console.log( "AdminDashboard :: dataSchema = ", dataSchema );

	return (
		<div
			className={ `panel-form-container` }
		>
			{
				// buildFormComponents(devData)
			}

			{ portfolioData && (
				<div
					className="panel-content"
					style={ {
						/* max-width: 100%; */
						padding: `${ `0.25rem` }`,
						margin: `${ `0 !important` }`,
						display: `${ `flex` }`,
						flexDirection: `${ `column` }`,
						justifyContent: `${ `flex-start` }`,
						alignItems: `${ `center` }`,
						flex: `${ `1 1 auto` }`,
					} }>
					<Tabs
						// Setup & Runtime
						// items={items}
						type="card"
						navPosition="top"
						size={ "small" }
						defaultActiveIndex="2"
						activeIndex="2"
						// Styling
						centered={ true }
						padContent={ true }
						padding={ `0.5rem 0.5rem` }
						fillArea={ true }
						roundedNav={ false }
						contentBoxShadow={ true }
						navBoxShadow={ true }
						// onChange={onChange}
						style={ { margin: 0 } }>

						<div
							key="0"
							className="tab-item"
							label="Schema"
							enabled={ true }
							access={ "admin" }>
							{ dataSchema && (
								<Tabs
									type="card"
									navPosition="left"
									size={ "small" }
									defaultActiveIndex="2"
									activeIndex="2"
									// Styling
									centered={ true }
									padContent={ true }
									padding={ `0.5rem 0.5rem` }
									fillArea={ true }
									roundedNav={ false }
									contentBoxShadow={ true }
									navBoxShadow={ true }
								// onChange={onChange}
								>
									<div
										key="2"
										label={ `User Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`User Schema`,
												dataSchema.user
											)
										}
										<Droplist
											label={ `User Schema` }
											data={ dataSchema.user }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="3"
										label={ `Portfolio Intro Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio Intro Schema`,
												dataSchema.portfolioData.intro
											)
										}
									</div>
									<div
										key="4"
										label={ `Portfolio About Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio About Schema`,
												dataSchema.portfolioData.about
											)
										}
									</div>
									<div
										key="5"
										label={ `Portfolio Experiences Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio Experiences Schema`,
												dataSchema.portfolioData.experiences
											)
										}
									</div>
									<div
										key="6"
										label={ `Portfolio Projects Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio Projects Schema`,
												dataSchema.portfolioData.projects
											)
										}
									</div>
									<div
										key="7"
										label={ `Portfolio Education Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio Education Schema`,
												dataSchema.portfolioData.educations
											)
										}
									</div>
									<div
										key="8"
										label={ `Portfolio Contact Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio Contact Schema`,
												dataSchema.portfolioData.contact
											)
										}
									</div>
									<div
										key="9"
										label={ `Portfolio Messages Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Portfolio Messages Schema`,
												dataSchema.portfolioData.messages
											)
										}
									</div>
									<div
										key="10"
										label={ `Planner Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Planner Schema`,
												dataSchema.planner.planners
											)
										}
									</div>
									<div
										key="11"
										label={ `Tasks Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Tasks Schema`,
												dataSchema.planner.tasks
											)
										}
									</div>
									<div
										key="12"
										label={ `Blog Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Blog Schema`,
												dataSchema.blog.blog
											)
										}
									</div>
									<div
										key="13"
										label={ `Blog Posts Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Blog Posts Schema`,
												dataSchema.blog.posts
											)
										}
									</div>
									<div
										key="14"
										label={ `Blog Comments Schema` }
										className={ `tab-item tab-sub-item` }>
										{
											makeDroplist(
												`Blog Comments Schema`,
												dataSchema.blog.comments
											)
										}
									</div>
								</Tabs>
							) }
						</div>

						<div
							key="1"
							className="tab-item"
							label="Database"
							enabled={ true }
							access={ "admin" }>
							{ portfolioData && (
								<Tabs
									type="card"
									navPosition="left"
									size={ "small" }
									defaultActiveIndex="2"
									activeIndex="2"
									// Styling
									centered={ true }
									padContent={ true }
									padding={ `0.5rem 0.5rem` }
									fillArea={ true }
									roundedNav={ false }
									contentBoxShadow={ true }
									navBoxShadow={ true }
								// onChange={onChange}
								>
									<div
										key="1"
										label={ `Portfolio Intro Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio Intro Schema` }
											data={ portfolioData.intro }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="2"
										label={ `Portfolio About Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio About Schema` }
											data={ portfolioData.about }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="3"
										label={ `Portfolio Experiences Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio Experiences Schema` }
											data={ portfolioData.experiences }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="4"
										label={ `Portfolio Projects Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio Projects Schema` }
											data={ portfolioData.projects }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="5"
										label={ `Portfolio Education Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio Education Schema` }
											data={ portfolioData.educations }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="6"
										label={ `Portfolio Contact Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio Contact Schema` }
											data={ portfolioData.contact }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
									<div
										key="7"
										label={ `Portfolio Messages Schema` }
										className={ `tab-item tab-sub-item` }>
										<Droplist
											label={ `Portfolio Messages Schema` }
											data={ portfolioData.messages }
											type={ `list` }
											showControls={ true }
											expandable={ true }
											debug={ false }
											height={ `auto` }
											width={ `auto` }
										/>
									</div>
								</Tabs>
							) }
						</div>
						<div
							key="1"
							className="tab-item"
							label="Intro"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.intro ) }
						</div>
						<div
							className="tab-item"
							label="About"
							key="2"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.about ) }
						</div>
						<div
							className="tab-item"
							label="Experiences"
							key="3"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.experiences ) }
						</div>
						<div
							className="tab-item"
							label="Projects"
							key="4"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.projects ) }
						</div>
						<div
							className="tab-item"
							label="Education"
							key="5"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.educations ) }
						</div>
						<div
							className="tab-item"
							label="Messages"
							key="6"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.messages ) }
						</div>
						<div
							className="tab-item"
							label="Blog"
							key="7"
							enabled={ true }
							access={ "admin" }>
							{ blogData && utils.val.isValidArray( blogData.posts, true ) && buildFormComponents( blogData.posts ) }
						</div>
						<div
							className="tab-item"
							label="To Do"
							key="8"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( portfolioData.planner ) }
						</div>
						<div
							className="tab-item"
							label="Dev"
							key="9"
							enabled={ true }
							access={ "admin" }>
							{ buildFormComponents( devData ) }
						</div>
						<div
							className="tab-item"
							label="Data"
							key="9"
							enabled={ true }
							access={ "admin" }>
							{ buildDataViewer( portfolioData ) }
						</div>
					</Tabs>
					{
						/*  FUTURE PAGES
								- Blog
								- Tutorials
								- Tools & Other Resources
								- Ask Me Anything
									-> Very similar to Contact page, except it will post the messages directly to the front end page, and I will be able to post responses to them.
									-> For obvious reasons, i'll include a feature to remove inappropriate questions. 
								- Updates
	
								Beyond its initial release as a portfolio site, my end goal is to have a personal site that doubles as a portfolio-serving front page. To do that, it should include various features that are worth me checking in on the site every day, such as a weight and exercise tracker, message board, a blog, etc. 
						*/
					}
				</div>
			) }
		</div>
	);
}

export default AdminDashboard;

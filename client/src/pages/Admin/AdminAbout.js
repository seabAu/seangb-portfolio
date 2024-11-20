import React, { useState, useEffect, useRef } from "react";
import * as utils from 'akashatools';
import {
	/// Form,
	// Input,
	/// Button,
	// Checkbox,
	message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../lib/services/api.js";
import Input from "../../components/Form/Input.js";
import { Form } from "../../components/Form/index.js";
import Section from "../../components/Section/index.js";

function AdminAbout () {
	const dispatch = useDispatch();
	// Get the current values.
	const { portfolioData, debug } = useSelector( ( state ) => state.root );

	const [ formModel, setFormModel ] = useState( {
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
	const [ loadForm, setLoadForm ] = useState( false );
	const [ formData, setFormData ] = useState( {
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
		if ( debug ) console.log( "AdminAbout.js :: FormData is now = ", formData );
	}, [ formData ] );

	const onSubmit = async ( values ) => {
		try {
			// const tempSkills = values.skills.split(/[\s,]+/);
			// values.skills = tempSkills;

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

	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="About"
					type="title"
					scale={ `3xl` }
					separator={ true }></Section.Text>
			</Section.Header>
			<Section.Content layout={ `col` } behavior="wrap">
				<Form
					// initialData={portfolioData.about}
					// initialData={portfolioData.projects[0]}
					initialData={ portfolioData.about }
					onSubmit={ ( values ) => {
						onSubmit( values );
					} }
					layout={ `block` }
					showViewport={ true }></Form>
				{
					// * constructForm({
					// *     ...portfolioData.about,
					// *     // skills: portfolioData.about.skills.join( ", " ),
					// *     // enabled: true
					// * })
				}

				<div className="flex justify-end w-full">
					<button
						className="px-10 py-2 bg-primary text-white"
						type="submit"
						onClick={ ( event ) => {
							onSubmit( event );
						} }>
						SAVE
					</button>
				</div>
			</Section.Content>
		</Section>
	);
}

export default AdminAbout;

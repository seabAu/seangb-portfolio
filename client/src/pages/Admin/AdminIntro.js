import React, { useState, useEffect, useRef } from "react";
import {
	// Form,
	// Input,
	// Button,
	// Checkbox,
	message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";

// import FormList from "antd/es/form/FormList.js";
import { Form } from "../../components/Form/index.js";
import Input from "../../components/Form/Input.js";
import Section from "../../components/Section/index.js";
import API from "../../lib/services/api.js";
import * as utils from 'akashatools';
function AdminIntro() {
	const dispatch = useDispatch();
	// Get the current values.
	const { portfolioData, debug } = useSelector((state) => state.root);
	// const [formData, setFormData] = React.useState(portfolioData.intro);
	// const [formModel, setFormModel] = React.useState([{}]);

	// Destructure data.
	// const { intros } = portfolioData;
	// const { firstName, lastName, welcomeText, description, caption } = intros[ 0 ];

	const onFinish = async (values) => {
		// axios.defaults.baseURL = `http://147.182.184.250:4000`;
		try {
			dispatch(SetLoading(true));
			const response = await API.post("/api/portfolio/update-intro", {
				...values,
				_id: portfolioData.intro._id,
			});
			dispatch(SetLoading(false));
			if (response.data.success) {
				message.success(response.data.message);
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			message.error(error.message);
		}
	};

	const onSubmit = async (values) => {
		if (debug) console.log(`AdminIntro :: Testing form return data :: values = `, values);
		// Make sure all data fields are filled in, the quick and easy ™ way!
        let requiredKeys = Object.keys( portfolioData.intro );
        if ( utils.ao.hasAll( values, requiredKeys ) )
        {
			if (debug) console.log("requiredKeys = ", requiredKeys, " :: values = ", values);
			onFinish(values);
		}
	};

	return (
		<Section>
			<Section.Header>
				<Section.Text
					content="Intro"
					type="title"
					scale={`3xl`}
					separator={true}
				/>
			</Section.Header>

			<Section.Content>
				<Form
					initialData={portfolioData.intro}
					onSubmit={(values) => {
						onSubmit(values);
					}}
					layout={`block`}
					showViewport={true}></Form>
			</Section.Content>
		</Section>
	);
}

export default AdminIntro;

/*  // Archived 03-29-23 Before rebuilding the form component. // 
    const onFinish = async (values) => {
        // axios.defaults.baseURL = `http://147.182.184.250:4000`;
        try {
            dispatch( SetLoading(true) );
            const response = await API.post("/api/portfolio/update-intro", {
                ...values,
                _id: portfolioData.intro._id,
            });
            dispatch( SetLoading(false) );
            if ( response.data.success )
            {
                message.success(response.data.message);
            }
            else
            {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error( error.message);
        }
    };
    
    return (
        <>
            <Form
                onFinish={onFinish}
                layout="vertical"
                initialValues={portfolioData.intro}>
                <Form.Item name="welcomeText" label="Intro">
                    <input type="text" placeholder="Intro" />
                </Form.Item>
                <Form.Item name="firstName" label="First Name">
                    <input type="text" placeholder="First Name" />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                    <input type="text" placeholder="Last Name" />
                </Form.Item>
                <Form.Item name="caption" label="Caption">
                    <input type="text" placeholder="Caption" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <textarea placeholder="Description" />
                </Form.Item>
                <div className="flex justify-end w-full">
                    <button className="admin-button px-10 py-2 bg-primary text-white" type="submit">
                        SAVE
                    </button>
                </div>
            </Form>
        </>
    );
}

*/

import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminIntro() {
    const dispatch = useDispatch();
    // Get the current values.
    const { portfolioData } = useSelector((state) => state.root);

    // Destructure data.
    // const { intros } = portfolioData;
    // const { firstName, lastName, welcomeText, description, caption } = intros[ 0 ];

    const onFinish = async (values) => {
        try {
            dispatch( SetLoading(true) );
            const response = await axios.post( "/api/portfolio/update-intro",
                {
                    ...values,
                    _id: portfolioData.intro._id,
                } );
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

export default AdminIntro;

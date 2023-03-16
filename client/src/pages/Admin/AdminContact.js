import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminContact() {
    const dispatch = useDispatch();
    // Get the current values.
    const { portfolioData } = useSelector((state) => state.root);

    // Destructure data.
    // const { intros } = portfolioData;
    // const { firstName, lastName, welcomeText, description, caption } = intros[ 0 ];
    // const { contact } = portfolioData;
    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/portfolio/update-contact", {
                ...values,
                _id: portfolioData.contact._id,
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
    return (
        <div>
            <Form
                onFinish={onFinish}
                layout="vertical"
                initialValues={portfolioData.contact}>
                <Form.Item name="welcomeText" label="Contact">
                    <input type="text" placeholder="Contact" />
                </Form.Item>
                <Form.Item name="name" label="Name">
                    <input type="text" placeholder="Name" />
                </Form.Item>
                <Form.Item name="email" label="Email Address">
                    <input type="text" placeholder="Email Address" />
                </Form.Item>
                <Form.Item name="phone" label="Phone Number">
                    <input type="text" placeholder="Phone Number" />
                </Form.Item>
                <Form.Item name="age" label="Age">
                    <input type="text" placeholder="Age" />
                </Form.Item>
                <Form.Item name="location" label="Location">
                    <input type="text" placeholder="Location" />
                </Form.Item>
                <div className="flex justify-end w-full">
                    <button
                        className="admin-button px-10 py-2 bg-primary text-white"
                        type="submit">
                        SAVE
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default AdminContact;

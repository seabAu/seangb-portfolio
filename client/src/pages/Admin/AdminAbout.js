import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminAbout() {
    const dispatch = useDispatch();
    // Get the current values.
    const { portfolioData } = useSelector((state) => state.root);

    const onFinish = async (values) => {
        try
        {
            const tempSkills = values.skills.split(/[\s,]+/);
            values.skills = tempSkills;

            dispatch(SetLoading(true));
            const response = await axios.post("/api/portfolio/update-about", {
                ...values,
                _id: portfolioData.about._id,
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
        <>
            <Form
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    ...portfolioData.about,
                    skills: portfolioData.about.skills.join( ", " ),
                }}>
                <Form.Item name="lottieURL" label="Lottie URL">
                    <input type="text" placeholder="Lottie URL" />
                </Form.Item>
                <Form.Item name="description1" label="Description 1">
                    <textarea type="text" placeholder="Description 1" />
                </Form.Item>
                <Form.Item name="description2" label="Description 2">
                    <textarea type="text" placeholder="Description 2" />
                </Form.Item>
                <Form.Item name="skills" label="Skills">
                    <textarea type="text" placeholder="Skills" />
                </Form.Item>
                <div className="flex justify-end w-full">
                    <button
                        className="px-10 py-2 bg-primary text-white"
                        type="submit">
                        SAVE
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AdminAbout;

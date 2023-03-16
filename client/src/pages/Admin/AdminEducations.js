import React from "react";
import { Form, Input, Button, Checkbox, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import axios from "axios";

function AdminEducations() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { educations } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");
    const [ form ] = Form.useForm();
    const onFinish = async (values) => {
        try {
            const tempSubjects = values.subjects?.split(/[\s,]+/) || [];
            values.subjects = tempSubjects;
            console.log(values);
            dispatch(SetLoading(true));
            let response;
            if (selectedItemForEdit) {
                // Update operation
                response = await axios.post("/api/portfolio/update-education", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                // Add operation
                response = await axios.post(
                    "/api/portfolio/add-education",
                    values,
                );
            }

            dispatch(SetLoading(false));
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                dispatch(SetLoading(false));
                dispatch( ReloadData( true ) );
                // form.resetFields();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/portfolio/delete-education", {
                _id: item._id,
            });
            dispatch(SetLoading(false));
            if (response.data.success) {
                message.success(response.data.message);
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

    return (
        <div>
            <div className="flex justify-end">
                <button
                    className="admin-button bg-primary px-5 py-2 text-white"
                    onClick={() => {
                        setType("add");
                        setSelectedItemForEdit(null);
                        setShowAddEditModal(true);
                    }}>
                    Add education
                </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-1 gap-5">
                {educations.map((education) => (
                    <div className="admin-panel shadow border-2 p-5 flex flex-col gap-5">
                        <h1 className="text-secondary text-xl font-bold">
                            {education.degree}
                        </h1>
                        <hr />
                        <img
                            src={education.image}
                            alt=""
                            className="h-60 w-80"></img>
                        <h1 className="">{education.major}</h1>
                        <hr />
                        <h1 className="">{education.date}</h1>
                        <h1 className="">{education.link}</h1>
                        <h1 className="">
                            Subjects Studied:{" "}
                            <div className="py-2 m-0">
                                {education.subjects.map((subject) => (
                                    <h1 className="m-0">• {subject}</h1>
                                ))}
                            </div>
                        </h1>
                        <div className="flex justify-end gap-5 mt-5 items-end">
                            <button
                                className="admin-button admin-button-red bg-red-500 text-white rounded-sm"
                                onClick={() => {
                                    onDelete(education);
                                }}>
                                Delete
                            </button>
                            <button
                                className="admin-button admin-button-primary bg-primary text-white rounded-sm"
                                onClick={() => {
                                    setType("edit");
                                    setSelectedItemForEdit(education);
                                    setShowAddEditModal(true);
                                }}>
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {(type === "add" || selectedItemForEdit) && (
                <Modal
                    open={showAddEditModal}
                    footer={null}
                    title={
                        selectedItemForEdit ? "Edit education" : "Add education"
                    }
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                        setType("");
                    }}
                    onFinish={onFinish}>
                    <Form
                        layout="vertical"
                        onFinish={ onFinish }
                        // form={form}
                        initialValues={
                            {
                                ...selectedItemForEdit,
                                subjects:
                                    selectedItemForEdit?.subjects?.join(", "),
                            } || {}
                        }>
                        <Form.Item name="degree" label="Degree">
                            <Input placeholder="Degree"></Input>
                        </Form.Item>
                        <Form.Item name="date" label="Date">
                            <Input placeholder="Date"></Input>
                        </Form.Item>
                        <Form.Item name="major" label="Major">
                            <Input placeholder="Major"></Input>
                        </Form.Item>
                        <Form.Item name="location" label="Location">
                            <textarea placeholder="Location"></textarea>
                        </Form.Item>
                        <Form.Item name="subjects" label="Subjects">
                            <Input placeholder="Subjects"></Input>
                        </Form.Item>
                        <Form.Item name="image" label="Image URL">
                            <Input placeholder="Image URL"></Input>
                        </Form.Item>
                        <Form.Item name="link" label="Link URL">
                            <Input placeholder="Link URL"></Input>
                        </Form.Item>
                        <div className="flex justify-end w-full">
                            <button
                                className="admin-button bg-white px-10 py-2 text-primary"
                                onClick={() => {
                                    setType("add");
                                    setShowAddEditModal(false);
                                    setSelectedItemForEdit(null);
                                }}>
                                Cancel
                            </button>
                            <button className="admin-button px-10 py-2 bg-primary text-white">
                                {selectedItemForEdit ? "Update" : "Add"}
                            </button>
                        </div>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default AdminEducations;

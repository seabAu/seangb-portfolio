import React from "react";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import SectionTitle from "../../components/SectionTitle";
// import { Form, Button, Row, Col } from "react-bootstrap";
function AdminProjects() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            // values.technologies = values.technologies.split( "," );
            const tempTechnologies = values.technologies?.split(/[\s,]+/) || [];
            values.technologies = tempTechnologies;
            console.log(values);
            dispatch(SetLoading(true));
            let response;
            if (selectedItemForEdit) {
                // Update operation
                response = await axios.post("/api/portfolio/update-project", {
                    ...values,
                    _id: selectedItemForEdit._id,
                });
            } else {
                // Add operation
                response = await axios.post(
                    "/api/portfolio/add-project",
                    values,
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

    const onDelete = async (item) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/portfolio/delete-project", {
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
        <>
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

            <div className="grid-card-container">
                {projects.map((project) => (
                    <div className="grid-card">
                        <div className="grid-card-header">
                            <h1 className="text-xl font-bold">
                                {project.title}
                            </h1>
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
                            <a href={project.link} className="button">
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

            {(type === "add" || selectedItemForEdit) && (
                <Modal
                    open={showAddEditModal}
                    footer={null}
                    title={selectedItemForEdit ? "Edit Project" : "Add Project"}
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                        setType("");
                    }}
                    onFinish={onFinish}>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={
                            {
                                ...selectedItemForEdit,
                                technologies:
                                    selectedItemForEdit?.technologies?.join(
                                        " , ",
                                    ),
                            } || {}
                        }>
                        <Form.Item name="title" label="Title">
                            <Input placeholder="Title"></Input>
                        </Form.Item>
                        <Form.Item name="image" label="Image URL">
                            <Input placeholder="Image URL"></Input>
                        </Form.Item>
                        <Form.Item name="link" label="Link URL">
                            <Input placeholder="Link URL"></Input>
                        </Form.Item>
                        <Form.Item name="context" label="Context">
                            <Input placeholder="Context"></Input>
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <textarea placeholder="Description"></textarea>
                        </Form.Item>
                        <Form.Item name="technologies" label="Technologies">
                            <Input placeholder="Technologies"></Input>
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
        </>
    );
}

export default AdminProjects;

/*

                    <div className="grid-card5">
                        <h1 className="text-xl font-bold text-white">
                            {project.title}
                        </h1>
                        <hr />
                        <img
                            src={project.image}
                            alt=""
                            className="h-60 w-80"></img>
                        <h1 className="">{project.context}</h1>
                        <hr />
                        <h1 className="">{project.description}</h1>
                        <h1 className="">{project.link}</h1>
                        <input
                            id="link"
                            class=""
                            type="text"
                            value={project.link}></input>
                        <h1 className="">
                            Technologies used:{" "}
                            <div className="py-2 m-0">
                                {project.technologies.map((technology) => (
                                    <h1 className="m-0">• {technology}</h1>
                                ))}
                            </div>
                        </h1>
                        <div className="flex justify-end gap-5 mt-5 items-end">
                            <button
                                className="admin-button admin-button-red bg-red-500 text-white rounded-sm"
                                onClick={() => {
                                    onDelete(project);
                                }}>
                                Delete
                            </button>
                            <button
                                className="admin-button admin-button-primary bg-primary text-white rounded-sm"
                                onClick={() => {
                                    setType("edit");
                                    setSelectedItemForEdit(project);
                                    setShowAddEditModal(true);
                                }}>
                                Edit
                            </button>
                        </div>
                    </div>
                    */

/*

            {(type === "add" || selectedItemForEdit) && (
                <Modal
                    open={showAddEditModal}
                    footer={null}
                    title={selectedItemForEdit ? "Edit Project" : "Add Project"}
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                        setType("");
                    }}
                    >
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={
                            {
                                ...selectedItemForEdit,
                                technologies:
                                    selectedItemForEdit?.technologies?.join(
                                        " , ",
                                    ),
                            } || {}
                        }>
                        <Form.Group as={Row} className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Title"></Form.Control>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="image">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control placeholder="Image URL"></Form.Control>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="link">
                            <Form.Label>Link URL</Form.Label>
                            <Form.Control placeholder="Link URL"></Form.Control>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="context">
                            <Form.Label>Context</Form.Label>
                            <Form.Control placeholder="Context"></Form.Control>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="description">
                            <Form.Label>Description</Form.Label>
                            <textarea placeholder="Description"></textarea>
                        </Form.Group>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="technologies">
                            <Form.Label>Technologies</Form.Label>
                            <Form.Control placeholder="Technologies"></Form.Control>
                        </Form.Group>
                        <div className="flex justify-end w-full">
                            <Button
                                variant="primary"
                                className="admin-button bg-white px-10 py-2 text-primary"
                                onClick={() => {
                                    setType("add");
                                    setShowAddEditModal(false);
                                    setSelectedItemForEdit( null );
                                    onFinish();
                                }}>
                                Cancel
                            </Button>
                            <Button className="admin-button px-10 py-2 bg-primary text-white">
                                {selectedItemForEdit ? "Update" : "Add"}
                            </Button>
                        </div>
                    </Form>
                </Modal>
            )}
*/

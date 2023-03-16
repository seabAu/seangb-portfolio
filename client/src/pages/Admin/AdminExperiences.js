import React from "react";
import { Form, Input, Button, Checkbox, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import { isArray, isString } from "../../components/Utilities/Val";
import { cleanArray } from "../../components/Utilities/AO";
import * as util from "../../components/Utilities/index.js";

function AdminExperiences() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [type, setType] = React.useState("add");

    const onFinish = async (values) => {
        try {
            dispatch(SetLoading(true));
            let response;
            // Here's some hacky bullshit to remove the ","'s the form adds to arrays, without removing ", "'s you'll see in normal input.
            // let duties = selectedItemForEdit.duties;
            // duties = removeEmpty(
            //     selectedItemForEdit.duties
            //         .toString()
            //         .replaceAll(",", "%^(*&)")
            //         .replaceAll("%^(*&) ", ", ")
            //         .replaceAll("%^(*&)", "|")
            //         .split("|"),
            // );
            console.log(
                "AdminExperience :: values = ",
                values,
                selectedItemForEdit,
                removeEmpty(
                    values.duties
                        .toString()
                        .replaceAll(",", "%^(*&)")
                        .replaceAll("%^(*&) ", ", ")
                        .replaceAll("%^(*&)", "|")
                        .split("|"),
                ),
                cleanArray(
                    values.duties
                        .toString()
                        .replaceAll(",", "%^(*&)")
                        .replaceAll("%^(*&) ", ", ")
                        .replaceAll("%^(*&)", "|")
                        .split("|"),
                )
            );
            if (selectedItemForEdit) {
                // Update operation
                response = await axios.post(
                    "/api/portfolio/update-experience",
                    {
                        ...values,
                        _id: selectedItemForEdit._id,
                        duties: cleanArray(
                            values.duties
                                .toString()
                                .replaceAll(",", "%^(*&)")
                                .replaceAll("%^(*&) ", ", ")
                                .replaceAll("%^(*&)", "|")
                                .split("|"),
                        ),
                    },
                );
            } else {
                // Add operation
                response = await axios.post(
                    "/api/portfolio/add-experience",
                    // values
                    {
                        ...values,
                        duties: cleanArray(
                            values.duties
                                .toString()
                                .replaceAll(",", "%^(*&)")
                                .replaceAll("%^(*&) ", ", ")
                                .replaceAll("%^(*&)", "|")
                                .split("|"),
                        ),
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

    const onDelete = async (item) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post(
                "/api/portfolio/delete-experience",
                {
                    _id: item._id,
                },
            );
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
    // Accepts an array and filters out empty or invalid values. 
    const removeEmpty = (arr) => {
        return isArray(arr)
            ? util.val.isValidArray(arr)
                ? arr.filter(
                      (a) =>
                          a !== null &&
                          a !== undefined &&
                          a.toString() !== "" &&
                          a !== "" &&
                          a !== " ",
                  )
                : arr
            : arr;
    };

    // @Accepts a string and a split value, containing either a single string or an array of strings as separators. 
    // @Returns an array divided by the split value(s).
    const parseTextToArray = (text, split) => {
        console.log(
            "parseText2Array :: ",
            text,
            split,
            text.toString(),
            text.toString().split(split),
        );
        if (!isString(text)) {
            text = text.toString();
        }
        if (split) {
            // if ( typeof split === "string" ) { return text.split( split ); }
            if (isString(split)) {
                return text.toString().split(split);
            } else if (Array.isArray(split)) {
                if (split[0] !== undefined) {
                    let temp = text;
                    split.forEach((separator, index) => {
                        if (separator) {
                            temp = temp.replaceAll(separator, "******");
                        }
                    });
                    return temp.split("******");
                }
            }
        }
        return [text];
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
                    Add Experience
                </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-1 gap-5">
                {experiences.map((experience) => (
                    <div className="admin-panel shadow border-2 p-5 flex flex-col gap-5">
                        <h1 className="text-white text-xl font-bold">
                            {experience.period}
                        </h1>
                        <hr />
                        <h1 className="">{experience.company}</h1>
                        <h1 className="">{experience.location}</h1>
                        <hr />
                        <h1 className="">Role: {experience.role}</h1>
                        <h1 className="">{experience.description}</h1>
                        <h1 className="">
                            Duties:{" "}
                            <div className="py-2 m-0">
                                {experience.duties.map((duty) => (
                                    <h1 className="m-0">
                                        <br />• {duty}
                                    </h1>
                                ))}
                            </div>
                        </h1>
                        <div className="flex justify-end gap-5 mt-5 items-end">
                            <button
                                className="admin-button admin-button-red bg-red-500 text-white rounded-sm"
                                onClick={() => {
                                    onDelete(experience);
                                }}>
                                Delete
                            </button>
                            <button
                                className="admin-button admin-button-primary bg-primary text-white rounded-sm"
                                onClick={() => {
                                    setType("edit");
                                    setSelectedItemForEdit(experience);
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
                        selectedItemForEdit
                            ? "Edit Experience"
                            : "Add Experience"
                    }
                    onCancel={() => {
                        setShowAddEditModal(false);
                        setSelectedItemForEdit(null);
                        setType("");
                    }}
                    onFinish={onFinish}>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={selectedItemForEdit || {}}>
                        <Form.Item name="period" label="Period">
                            <Input placeholder="Period"></Input>
                        </Form.Item>
                        <Form.Item name="title" label="Title">
                            <Input placeholder="Title"></Input>
                        </Form.Item>
                        <Form.Item name="company" label="Company">
                            <Input placeholder="Company"></Input>
                        </Form.Item>
                        <Form.Item name="location" label="Location">
                            <Input placeholder="Location"></Input>
                        </Form.Item>
                        <Form.Item name="duties" label="Duties">
                            <textarea
                                placeholder="Duties"
                                name="duties"
                                label="Duties"
                                // defaultValue={
                                //     selectedItemForEdit
                                //         ? selectedItemForEdit.duties
                                //         : ""
                                // }
                            ></textarea>
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input placeholder="Description"></Input>
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

export default AdminExperiences;

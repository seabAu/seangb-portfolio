import React, { useState, useEffect } from "react";
import * as utils from "../../components/Utilities/index.js";
import {
    Form,
    // Input,
    Button,
    // Checkbox,
    message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../api/api.js";
import Input from "../../components/Form/Input.js";

function AdminAbout() {
    const dispatch = useDispatch();
    // Get the current values.
    const { portfolioData } = useSelector((state) => state.root);

    const [formModel, setFormModel] = React.useState({
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
    });
    // Initialize formData as a duplicate of formModel, and fill in each value.
    const [loadForm, setLoadForm] = React.useState(false);
    const [formData, setFormData] = React.useState({
        firstName: " ",
        lastName: " ",
        statement: " ",
        summary: " ",
        description: [" "],
        description1: [" "],
        description2: [" "],
        certifications: [" "],
        achievements: [" "],
        enabled: true,
        skills: [
            {
                index: 0,
                showIndex: 0,
                enabled: true,
                name: " ",
                category: " ",
                tags: [" "],
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
    });

    useEffect(() => {
        console.log("AdminAbout.js :: FormData is now = ", formData);
    }, [formData]);

    const modelToData = (model) => {
        // Extract all keys from the model and build a database that can be filled from it.
    };

    // To make this work, we're going to need a way to update values deep inside the data array stored in state.
    const constructForm = (model) => {
        let form = [];
        if (utils.val.isObject(model)) {
            // console.log("AdminAbout.js :: constructForm(", model, ") :: is valid object. It has ", Object.keys( model ).length, " keys.");

            // Valid input. Proceed.
            if (Object.keys(model).length > 0) {
                // console.log("AdminAbout.js :: constructForm(", model, ") :: is valid object.");

                Object.keys(model).forEach((key, index) => {
                    // Figure out what type of value is at each key.
                    let value = model[key];
                    let fieldtype;
                    let datatype;
                    // console.log("AdminAbout.js :: constructForm(", model, ") :: key = ", key, ' :: value = ', value, ' :: index = ', index);
                    // if (utils.val.isObject(value)) {
                    if (typeof value === "object" && Array.isArray(value)) {
                        // Value is an array.
                        fieldtype = "data";
                        if (utils.val.isValidArray(value, true)) {
                            let test = value[0];
                            // Get the datatype of the array element to see if it's a scalar array or object array.
                            if (typeof test === "object") {
                                // Array of objects.
                                datatype = "oa";
                            } else if (Array.isArray(test)) {
                                // Array of arrays.
                                datatype = "array";
                            } else if (
                                ["string", "number", "boolean"].includes(
                                    typeof test,
                                )
                            ) {
                                // Array of scalars.
                                datatype = "array";
                            }
                        }
                        // Value is a nested object array.
                        // Render a specialized input.
                        // console.log( "ARRAY :: value = ", value, ' :: datatype = ', datatype, ' :: fieldtype = ', fieldtype );
                        if (fieldtype && datatype) {
                            form.push(
                                Field(
                                    formData,
                                    key,
                                    value,
                                    datatype,
                                    fieldtype,
                                ),
                            );
                        }
                    } else if (
                        utils.val.isObject(value) &&
                        !utils.val.isArray(value)
                    ) {
                        // Value is an object.
                        if (Object.keys(value).length > 0) {
                            // Valid object.
                            fieldtype = "data";
                            datatype = "object";
                            if (fieldtype && datatype) {
                                form.push(
                                    Field(
                                        formData,
                                        key,
                                        value,
                                        datatype,
                                        fieldtype,
                                    ),
                                );
                            }
                        }
                    }
                    // } else if (
                    //     value instanceof Array ||
                    //     value instanceof Object
                    // ) {
                    //     // if (typeof value === "object" && !Array.isArray(value)) {
                    //     // Value is a nested object.
                    //     // Render a specialized input.
                    //     console.log("OBJECT :: ", value);
                    //     datatype = "object";
                    //     fieldtype = "data";
                    //     form.push( Field( formData, key, value, datatype, fieldtype ) );
                    // } else if (Array.isArray(value)) {
                    //     // utils.val.isArray(value)) {
                    //     // Value is a nested array.
                    //     // Render a specialized input.
                    //     console.log("ARRAY :: ", value);
                    //     datatype = "array";
                    //     fieldtype = "data";
                    //     form.push( Field( formData, key, value, datatype, fieldtype ) );
                    else {
                        // Value is a scalar of some kind. Dig into the specific type.
                        // if (utils.val.isString(value)) {
                        if (typeof value === "string") {
                            // Value is a String.
                            // Render a text input.
                            console.log("STRING :: ", value);
                            datatype = "string";
                            fieldtype = "text";
                        } else if (utils.val.isNumber(value)) {
                            // Value is a Number.
                            // Render a number input.
                            datatype = "number";
                            fieldtype = "number";

                            // } else if (utils.val.isBool(value)) {
                        } else if (value === true || value === false) {
                            // Value is a Boolean.
                            // Render a checkbox.
                            datatype = "boolean";
                            fieldtype = "checkbox";
                        } else {
                            // I dunno lol.
                            // return '';
                        }
                        form.push(
                            Field(formData, key, value, datatype, fieldtype),
                        );
                        console.log(
                            "AdminAbout.js :: constructForm(",
                            model,
                            ") :: after typecheck run :: key = (",
                            key,
                            ") :: value = (",
                            value,
                            ") :: datatype = (",
                            datatype,
                            ") :: fieldtype = (",
                            fieldtype,
                            ")",
                        );
                    }
                });
            }
        }
        return form;
    };

    const Field = (data, key, value, datatype, fieldtype) => {
        console.log(
            "AdminAbout.js :: Field(",
            [data, key, value, datatype, fieldtype],
            ")",
        );
        // Turns an input into a field. Simple as.
        if (
            ["array", "object", "symbol", "oa", "data"].includes(datatype) ||
            fieldtype === "data"
        ) {
            // Dealing with a complex, possibly nested data input type.
            return (
                <Input.DataInput
                    data={value}
                    datamodel={data}
                    datatype={datatype}
                    fieldtype={fieldtype}
                    // value={value}
                    // defaultValue={value}
                    inputProps={
                        {
                            // value: value,
                            // defaultValue: value,
                            // checked: value === true,
                            // defaultChecked: value === true,
                        }
                    }
                    label={key}
                    id={key}
                    name={key}
                    onChange={(e) => {
                        setFormData(
                            utils.ao.findAndSetObject(
                                data,
                                key,
                                e.target.value.toString(),
                            ),
                        );
                    }}
                    disabled={false}
                    required={false}
                    placeholder={key}
                    classes={`input-field-textarea`}
                />
            );
        } else if (
            ["string", "number", "boolean", "bigint"].includes(datatype)
        ) {
            // Dealing with a scalar data type.
            //
            if (datatype === "boolean") {
                // Special case for booleans, render as checkbox.
                return (
                    <Input
                        fieldtype={"checkbox"}
                        label={key}
                        id={key}
                        name={key}
                        value={value}
                        defaultValue={value}
                        inputProps={{
                            // value: value,
                            defaultValue: value,
                            // checked: value === true,
                            // defaultChecked: value === true,
                        }}
                        onChange={(e) => {
                            setFormData(
                                utils.ao.findAndSetObject(
                                    data,
                                    key,
                                    e.target.checked
                                        ? e.target.checked === true
                                        : false,
                                ),
                            );
                        }}
                        disabled={false}
                        required={false}
                    />
                );
            } else {
                return (
                    <Input
                        fieldtype={fieldtype}
                        value={value}
                        defaultValue={value}
                        inputProps={{
                            // value: value,
                            defaultValue: value,
                            // checked: value === true,
                            // defaultChecked: value === true,
                        }}
                        label={key}
                        id={key}
                        name={key}
                        onChange={(e) => {
                            setFormData(
                                utils.ao.findAndSetObject(
                                    data,
                                    key,
                                    e.target.value,
                                ),
                            );
                        }}
                        disabled={false}
                        required={false}
                        placeholder={key}
                    />
                );
            }
        }
    };

    const onSubmit = async (values) => {
        try {
            const tempSkills = values.skills.split(/[\s,]+/);
            values.skills = tempSkills;

            dispatch(SetLoading(true));
            const response = await API.post("/api/portfolio/update-about", {
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
            <div
                className={`form-container-admin`}
                // onSubmit={onSubmit}
                // layout="vertical"
                // initialValues={{
                //     ...portfolioData.about,
                //     skills: portfolioData.about.skills.join(", "),
                // }}
            >
                {constructForm({
                    ...portfolioData.about,
                    // skills: portfolioData.about.skills.join( ", " ),
                    // enabled: true
                })}
                <div className="flex justify-end w-full">
                    <button
                        className="px-10 py-2 bg-primary text-white"
                        type="submit"
                        onClick={(event) => {
                            onSubmit(event);
                        }}>
                        SAVE
                    </button>
                </div>
            </div>
        </>
    );
}

export default AdminAbout;

/*

                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    placeholder={formData.firstName}
                    label="Username"
                    className="input-field"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            firstName: e.target.value,
                        })
                    }></input>
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
                
    return (
        <div className="admin-login-container flex justify-center items-center h-screen bg-primary">
                <div className="admin-login-card w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 text-white bg-tertiary">
                    <h1 className="text-2xl">Sign Up</h1>
                    <hr />
                    <input
                        name="username"
                        type="text"
                        value={credentials.username}
                        placeholder="Username"
                        label="Username"
                        className="input-field"
                        onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })
                        }></input>
                    <input
                        name="password"
                        type="password"
                        value={credentials.password}
                        placeholder="Password"
                        label="Password"
                        className="input-field"
                        onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })
                        }></input>
                    <input
                        name="display_name"
                        type="text"
                        value={credentials.display_name}
                        placeholder="Display Name"
                        label="Display Name"
                        className="input-field"
                        onChange={(e) =>
                            setCredentials({ ...credentials, display_name: e.target.value })
                        }></input>
                    <input
                        name="email"
                        type="email"
                        value={credentials.email}
                        placeholder="Email"
                        label="Email"
                        className="input-field"
                        onChange={(e) =>
                            setCredentials({ ...credentials, email: e.target.value })
                        }></input>
                    <div className="button-group button-row">
                        <button
                            className="button admin-button admin-button-primary"
                            onClick={() => {
                                setMode("login");
                            }}>
                            Sign In
                        </button>
                        <button
                            className="button admin-button admin-button-red"
                            onClick={signup}>
                            Sign Up
                        </button>
                    </div>
                </div>
        </div>
    );
*/

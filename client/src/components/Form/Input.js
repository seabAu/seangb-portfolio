import React, { useState, useEffect } from "react";
import * as utils from "../Utilities/index.js";

import "./Input.css";
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
} from "react-icons/fa";
import * as types from "../../config/types.js";
const debug = false;
function Input(props) {
    const {
        // Input-field constructor properties.
        fieldtype = "text", // Default to text type.
        inputProps,
        label = "",
        id = "", // Field ID
        name = "", // Value ID
        onChange,
        disabled = false,
        required = true,
        value = "",
        defaultValue = "",
        placeholder = "",
        // Extra styling.
        classes = "",
        styles = {},
    } = props;

    const debugReadProps = () => {
        if(debug)console.log("Input :: {Props} = ", props);
    };

    const inputStyles = {
        ...styles,
    };

    const createField = (type) => {
        if (types.validInputTypes.includes(type)) {
            // Type given is valid, proceed.
            if (type === "checkbox") {
                // Render checkbox-specific properties.
                return (
                    <input
                        type="checkbox"
                        className={`input-field-checkbox`}
                        name={name}
                        key={`checkbox-input-${name}`}
                        id={`checkbox-input-${name}`}
                        inputProps={inputProps}
                        onChange={onChange}
                        required={required ?? false}
                        disabled={disabled ?? false}
                    />
                );
            } else {
                // Render as normal.
                if (type === "text" && value.toString().length > 80) {
                    // Render a text area instead.
                    return (
                        <textarea
                            // type="text"
                            className={`input-field-textarea`}
                            name={name}
                            key={`textarea-input-${name}-${id}`}
                            id={`textarea-input-${name}-${id}`}
                            {...inputProps}
                            // value={value}
                            // defaultValue={defaultValue}
                            placeholder={`${placeholder}`}
                            onChange={onChange}
                            required={required ?? false}
                            disabled={disabled ?? false}
                            wrap={"soft"}
                            rows={4}
                            cols={50}
                            // onBlur={''}
                            // onFocus={''}
                        />
                    );
                } else {
                    return (
                        <input
                            styles={inputStyles}
                            type={
                                types.validInputTypes.includes(type)
                                    ? type
                                    : "text"
                            }
                            className={`input-field-${
                                types.validInputTypes.includes(type)
                                    ? type
                                    : "text"
                            } ${classes ? classes : ""}`}
                            name={name}
                            key={`${type}-input-${name}-${id}`}
                            id={`${type}-input-${name}-${id}`}
                            {...inputProps}
                            // value={value}
                            // defaultValue={defaultValue}
                            placeholder={`${placeholder}`}
                            onChange={onChange}
                            required={required ?? false}
                            disabled={disabled ?? false}
                        />
                    );
                }
            }
        }
    };

    // debugReadProps();
    return (
        <Input.Field>
            <Input.Label label={label} name={name}>
                {createField(fieldtype)}
            </Input.Label>
        </Input.Field>
    );
}

function Field(props) {
    const { children } = props;

    // if(debug)console.log("Input.Field :: {Props} = ", props);
    return (
        <div className="input-field">
            {children && children !== false && children}
        </div>
    );
}
Input.Field = Field;

function Label(props) {
    const {
        children,
        label = "",
        name = "", // Value ID
        // fieldtype = "text", // Default to text type.
    } = props;

    // if(debug)console.log("Input.Label :: {Props} = ", props);
    return (
        <div className="input-field">
            <label
                className="input-field-label"
                htmlFor={name}
                key={`input-label-${label}-${name}`}>
                <p className={`input-field-label-text`}>
                    {utils.str.captitalize(label.toLowerCase())}
                </p>
                {children && children !== false && children}
            </label>
        </div>
    );
}
Input.Label = Label;

function DataInput(props) {
    const {
        // Data properties.
        data, // The values to put into each processed element's value fields.
        datamodel, // Descriptive object
        datatype = "array", // Array | Object | ObjectArray (or OA)
        fieldtype, // The type of input element to create.
        formtype, // Type of display: List | Column | Cell Mosiac
        // Input-field constructor properties.
        inputProps,
        // value = [],
        // defaultValue = [],
        label = "",
        id = "",
        name = "",
        onChange,
        disabled = false,
        required = false,
        placeholder = "",
        // Extra styling.
        classes = "",
        styles = {},
    } = props;

    const [currentInput, setCurrentInput] = React.useState(null);

    const debugReadProps = () => {
        if(debug)console.log("DataInput :: {Props} = ", props);
    };

    debugReadProps();

    const buildInput = (input, datatype = "array") => {
        // Create the input field to enter new data into.
        // Depending on the datatype, this may have extra interfaces such as an "add new" button, a "delete" button, etc.
        if(debug)console.log("DataInput :: buildInput(", input, datatype, ")");
        let type = "text";

        if (input) {
            // Input is valid. Proceed.
            if (datatype === "array") {
                // Input is an array of scalars. Easy to handle.
                if (utils.val.isValidArray(input, true)) {
                    // Input is valid array. Proceed.
                    // For array input fields, we don't provide a label.
                    return (
                        <Input
                            fieldtype={type}
                            // value={value}
                            // defaultValue={value}
                            inputProps={{
                                ...inputProps,
                                // defaultValue: input[0]
                                /// value: value,
                                /// defaultValue: value,
                            }}
                            label={""}
                            name={name}
                            key={`data-input-${name}-${id}`}
                            id={`data-input-${name}-${id}`}
                            // onChange={(e) => {
                            //     setCurrentInput(
                            //         utils.ao.findAndSetObject(data, name, e.target.value),
                            //     );
                            // }}
                            onChange={(event) => {}}
                            disabled={disabled ?? false}
                            required={required ?? false}
                            placeholder={`${placeholder}`}
                            classes={`input-field-data input-field-data-array`}
                            styles={``}
                        />
                    );
                }
            } else if (datatype === "oa" || datatype === "objectarray") {
                // Input is an array of objects. In this case, for each key in the objects in the array, we create an input field, arranged in a grid.
                if (utils.val.isValidArray(input, true)) {
                    // Input is valid array. Proceed.
                }
            } else if (datatype === "object") {
                // Input is just one object. For convenience, we can treat it as an array of one item.
            }
        }
    };

    const buildOutput = (input, datatype = "array") => {
        // Create the elements representing values currently stored in the array.
        if(debug)console.log("DataInput :: buildOutput(", input, datatype, ")");
        if (input) {
            // Input is valid. Proceed.
            if (datatype === "array") {
                // Input is an array of scalars. Easy to handle.
                return getCellList(input);
            } else if (datatype === "oa" || datatype === "objectarray") {
                // Input is an array of objects. In this case, for each key in the objects in the array, we create an input field, arranged in a grid.
                if (utils.val.isValidArray(input, true)) {
                    // Input is valid array of objects. Proceed.
                    if(debug)console.log(
                        "DataInput :: buildOutput(",
                        input,
                        datatype,
                        ") :: Running for OA data. ",
                    );
                    return (
                        <div className="data-input-cell-list mosaic">
                            {input.map((item, index) => {
                                // return createCell(item, index, true, true);
                                // For each element in the array.
                                let celldata = [];
                                if (utils.val.isObject(item)) {
                                    if (Object.keys(item).length > 0) {
                                        // Valid object item - Iterate over its keys.
                                        Object.keys(item).forEach(
                                            (key, index) => {
                                                let value = item[key];
                                                if (value) {
                                                    celldata.push(
                                                        <div
                                                            className={`data-input-cell-item-text`}
                                                            // contentEditable
                                                        >{`${key}: ${value}`}</div>,
                                                    );
                                                }
                                            },
                                        );
                                    }
                                }
                                return (
                                    <div
                                        className={`data-input-cell-item mosaic-item`}>
                                        <div
                                            className={`data-input-cell-item-data`}>
                                            {celldata}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }
            } else if (datatype === "object") {
                // Input is just one object. For convenience, we can treat it as an array of one item.
            }
        }
    };

    const buildInput2 = (input, datatype = "array") => {
        // Create the input field to enter new data into.
        // Depending on the datatype, this may have extra interfaces such as an "add new" button, a "delete" button, etc.
        if(debug)console.log("DataInput :: buildInput(", input, datatype, ")");
        let type = "text";

        if (input) {
            // Input is valid. Proceed.
            if (datatype === "array") {
                // Input is an array of scalars. Easy to handle.
                if (utils.val.isValidArray(input, true)) {
                    // Input is valid array. Proceed.
                    // For array input fields, we don't provide a label.
                    return (
                        <Input
                            fieldtype={type}
                            // value={value}
                            // defaultValue={value}
                            inputProps={{
                                ...inputProps,
                                // defaultValue: input[0]
                                /// value: value,
                                /// defaultValue: value,
                            }}
                            label={""}
                            name={name}
                            key={`data-input-${name}-${id}`}
                            id={`data-input-${name}-${id}`}
                            // onChange={(e) => {
                            //     setCurrentInput(
                            //         utils.ao.findAndSetObject(data, name, e.target.value),
                            //     );
                            // }}
                            onChange={(event) => {}}
                            disabled={disabled ?? false}
                            required={required ?? false}
                            placeholder={`${placeholder}`}
                            classes={`input-field-data input-field-data-array`}
                            styles={``}
                        />
                    );
                }
            } else if (datatype === "oa" || datatype === "objectarray") {
                // Input is an array of objects. In this case, for each key in the objects in the array, we create an input field, arranged in a grid.
                if (utils.val.isValidArray(input, true)) {
                    // Input is valid array. Proceed.
                }
            } else if (datatype === "object") {
                // Input is just one object. For convenience, we can treat it as an array of one item.
            }
        }
    };

    const buildDataInput = (input, datatype = "array") => {
        // Create the elements representing values currently stored in the array.
        if(debug)console.log("DataInput :: buildOutput(", input, datatype, ")");
        if (input) {
            // Input is valid. Proceed.
            if (datatype === "array") {
                // Input is an array of scalars. Easy to handle.
                return getCellList(input);
            } else if (datatype === "oa" || datatype === "objectarray") {
                // Input is an array of objects. In this case, for each key in the objects in the array, we create an input field, arranged in a grid.
                if (utils.val.isValidArray(input, true)) {
                    // Input is valid array of objects. Proceed.
                    if(debug)console.log(
                        "DataInput :: buildOutput(",
                        input,
                        datatype,
                        ") :: Running for OA data. ",
                    );
                    return (
                        <div className="data-input-cell-list mosaic">
                            {input.map((item, index) => {
                                // Build a cell for each element in the array.
                                let celldata = [];
                                if (utils.val.isObject(item)) {
                                    if (Object.keys(item).length > 0) {
                                        // Valid object item - Iterate over its keys.
                                        Object.keys(item).forEach(
                                            (key, index) => {
                                                let value = item[key];
                                                if (value) {
                                                    celldata.push(
                                                        <div
                                                            className={`data-input-cell-item-row`}>
                                                            <div
                                                                className={`data-input-cell-item-text data-key`}
                                                                // contentEditable={
                                                                //     false
                                                                // }
                                                            >{`${key}:`}</div>
                                                            <div
                                                                className={`data-input-cell-item-text data-value`}
                                                                // contentEditable={
                                                                //     true
                                                                // }
                                                            >{`${value}`}</div>
                                                        </div>,
                                                    );
                                                }
                                            },
                                        );
                                    }
                                }
                                return (
                                    <div
                                        className={`data-input-cell-item mosaic-item`}>
                                        <div
                                            className={`data-input-cell-item-toolbar`}>
                                            <div
                                                className={`button-group button-row`}>
                                                <button
                                                    className={`button cell-toolbar-button edit-button`}
                                                    onClick={(e) => {}}>
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className={`button cell-toolbar-button delete-button`}
                                                    onClick={(e) => {}}>
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            className={`data-input-cell-item-content`}>
                                            {celldata}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }
            } else if (datatype === "object") {
                // Input is just one object. For convenience, we can treat it as an array of one item.
            }
        }
    };

    /*
        DataCell hierarchy
        CellList
            CellListItem
                CellToolbar
                CellContent
                    CellHeader
                    CellText
                    CellFooter
    */

    const buildDataFieldArray = (input) => {
        // Helper function for building the input and output specific for Array data.
    };
    const buildDataFieldOA = (input) => {
        // Helper function for building the input and output specific for OA data.
    };
    const buildDataFieldObject = (input) => {
        // Helper function for building the input and output specific for Object data.
    };

    const getCellList = (input) => {
        if (utils.val.isValidArray(input, true)) {
            return (
                <div className="data-input-cell-list">
                    {input.map((item, index) => {
                        return createCell(item, index, true, true);
                    })}
                </div>
            );
        }
    };

    const createCell = (
        text = "",
        index = 0,
        hasDelete = false,
        hasEdit = false,
        layout = "mosaic",
    ) => {
        // Helper function for buildOutput. Returns a basic text cell.
        if (text) {
            return (
                <div className={`data-input-cell-item`}>
                    <div className={`data-input-cell-item-text`}>{text}</div>
                </div>
            );
        }
    };
    const onNext = (event) => {
        // When the user enters the comma key, the text in the field is cleared, and a new element is added to the output list grid with that text.
    };
    const onBack = (event) => {
        // When the user backspaces in the data input field, it will unmount the last-added element in the output list, and insert the text into the field they have focused.
    };
    return (
        <Input.Field>
            <Input.Label label={label} name={name}>
                {data && (
                    <div className={`data-input-container`}>
                        <div className={`data-input-visual-container`}>
                            {buildDataInput(data, datatype)}
                        </div>
                        <br />
                        <div className={`data-input-field-container`}>
                            {buildInput(data, datatype)}
                        </div>
                    </div>
                )}
            </Input.Label>
        </Input.Field>
    );
}
Input.DataInput = DataInput;

function InputArea(props) {
    const {
        inputProps = {},
        label = "",
        id = "",
        name = "",
        onChange,
        disabled = false,
        required = false,
        // value,
        // defaultValue,
        placeholder = "",
        rows = `${4}`,
        cols = `${50}`,
        wrap = `${"soft"}`,
    } = props;

    const debugReadProps = () => {
        if(debug)console.log("InputArea :: {Props} = ", props);
    };

    // debugReadProps();
    return (
        <Input.Field>
            <Input.Label label={label} name={name}>
                <textarea
                    // type="text"
                    className={`input-field-textarea`}
                    name={name}
                    key={`textarea-input-${name}-${id}`}
                    id={`textarea-input-${name}-${id}`}
                    {...inputProps}
                    // value={value}
                    // defaultValue={defaultValue}
                    placeholder={`${placeholder}`}
                    onChange={onChange}
                    required={required ?? false}
                    disabled={disabled ?? false}
                    wrap={wrap}
                    rows={rows}
                    cols={cols}
                    // onBlur={''}
                    // onFocus={''}
                />
            </Input.Label>
        </Input.Field>
    );
}
Input.InputArea = InputArea;

export default Input;

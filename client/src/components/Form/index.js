import React, { useState, useEffect } from "react";
import * as utils from "../../components/Utilities/index.js";
// Form component hierarchy:
// <Form>
//     <FormGroup>
//         <FormText>Generic text to add descriptions or instructions.</FormText>
//         <FormField>
//             <FormFieldLabel>
//                 <Label></Label>
//             </FormFieldLabel>
//             <FormFieldInput>
//                 <Input></Input>
//             </FormFieldInput>
//         </FormField>
//         <FormField>
//             <FormFieldInput>
//                 <ArrayInput>Dynamic input for elemental array based data.</ArrayInput>
//             </FormFieldInput>
//         </FormField>
//         <FormField>
//             <FormFieldInput>
//                 <OAInput>Dynamic input for object array based data.</OAInput>
//             </FormFieldInput>
//         </FormField>
//         <FormSubmit>Button(s) to config and submit the form.</FormSubmit>
//     </FormGroup>
// </Form>;
//
// Unique components:
//  <Form />
//      <FormGroup />
//          <FormField />
//              <Label />
//              <Input />
//              <ArrayInput />
//              <OAInput />

// This form will self-build based on the data provided to it. 
export const Form = (props) => {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        type = "default",
        model = {},
        // Style settings.
        styles = {},
        classes = "",
    } = props;

    const componentStyles = {
        // Default styles go here.
        // Flex properties
        display: `${"flex"}`,
        flexDirection: `${"row"}`,
        justifyContent: `${"center"}`,
        alignItems: `${"center"}`,
        alignContent: `${"center"}`,
        // Size properties
        height: `${"100%"}`,
        minHeight: `${"auto"}`,
        width: `${"100%"}`,
        minWidth: `${"50%"}`,
        padding: `0.25rem 1.0rem`,
        border: `1px dashed black`,
        // User-set styles override default settings.
        ...styles,
        // Responsiveness overrides go here.
    };

    return (
        showParent && (
            <div className={`form-container`} style={componentStyles}>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
};

export const ArrayInput = (props) => {
    const {
        type = "default",
        model = {},
        // Style settings.
        styles = {},
        classes = "",
    } = props;

    return (
            <div className={`form-input-array`} style={styles}>
                
            </div>
    );
};


/*

    form-container
    form-row
    form-group
    form-input
    form-group
    input-field
    input-field .input-field-label input
    input-field .input-field-label
    input-field .input-field-select
    input-field .input-field-text
    input-field.input-field-inline .input-field-label
    input-field.input-field-inline .input-field-label .input-field-label-text
    input-field.input-field-inline .input-field-label .input-field-checkbox
    button-form-submit
    form-submit-container

    .form-container {
        padding: 4px 0;
        margin: 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .form-container * {
        max-width: 100% !important;
        min-width: 0% !important;
    }
    .form-row {
        align-items: center;
        justify-content: center;
        width: 100%;
        display: inline-flex;
        flex-direction: row;
    }
    .form-group {
        width: 100%;
        display: inline-flex;
        flex-direction: column;
        padding: 10px;
    }
    .form-input {
        width: 100%;
        height: 2rem;
    }
    .form-group {
        width: 100%;
        border: none;
        outline: none;
        background: inherit;
        box-shadow: inset 2px 2px 2px #171717, inset -2px -2px 2px rgb(68, 60, 60);
    }
    .input-field {
        margin: 0;
        padding: 2px 4px;
        width: 100%;
        flex-grow: 1;
    }
    .input-field .input-field-label input {
        margin: 0;
        padding: 4px 2px;
        width: 100%;
        outline: none;
    }
    .input-field .input-field-label {
        margin: 0;
        padding: 2px 0;
        width: 100%;
    }
    .input-field .input-field-select {
        margin: 0;
        padding: 4px 2px;
        width: 100%;
    }
    .input-field .input-field-text {
        margin: 0;
        padding: 2px 0;
        width: 100%;
    }
    .input-field.input-field-inline .input-field-label {
        display: inline;
        padding: 4px 4px;
        margin: 0;
        width: 100%;
        width: auto;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: flex-end;
    }
    .input-field.input-field-inline .input-field-label .input-field-label-text {
        min-width: 1rem !important;
        overflow-wrap: normal!important;
        white-space: nowrap;
        width: auto;
    }
    .input-field.input-field-inline .input-field-label .input-field-checkbox {
        width: auto;
    }
    .button-form-submit {
        width: 100%;
        align-self: center;
        text-align: center;
    }
    .form-submit-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
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
*/

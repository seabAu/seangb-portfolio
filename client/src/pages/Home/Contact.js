import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    Modal,
    message
} from "antd";
import { SetLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";
import API from "../../lib/services/api.js";
import Input from "../../components/Form/Input";
import * as utils from 'akashatools';
import Section from "../../components/Section";
import { FaPowerOff } from "react-icons/fa6";
import Button from "../../components/Button/index.js";

function Contact () {
    const dispatch = useDispatch();
    // Destructure data.
    const { portfolioData } = useSelector( ( state ) => state.root );
    // const { contact } = portfolioData;
    // const user = contact;

    const [ currentInput, setCurrentInput ] = React.useState( null );

    const sendMessage = async ( values ) => {
        try {
            dispatch( SetLoading( true ) );
            let response;
            response = await API.post( "/api/portfolio/send-message", values );
            // dispatch(SetLoading(false));
            // console.log( "Contact :: sendMessage :: response = ", response );
            if ( response.data.success ) {
                message.success( response.data.message );
                dispatch( SetLoading( false ) );
                dispatch( ReloadData( true ) );
            } else {
                message.error( "Error sending message: ", response.data.error );
            }
        } catch ( error ) {
            dispatch( SetLoading( false ) );
            message.error( error.message );
        }
    };

    return (
        <Section>
            <Section.Text
                type="title"
                content="Get In Touch"
				// scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
            <div className="flex flex-col items-center justify-center" style={ {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row-reverse",
                alignItems: "flex-start",
                alignContent: "center",
                justifyContent: "center",
            } }>
                <div className="contact-form ">
                    <div className={ `input-group input-group-block` }>
                        <Input
                            fieldtype={ `text` }
                            inputProps={ {
                                defaultValue: utils.ao.has( "name" ) ? currentInput.name : "",
                            } }
                            label={ `name` }
                            id={ `name` }
                            name={ `name` }
                            onChange={ ( e ) => {
                                setCurrentInput( {
                                    ...currentInput,
                                    name: e.target.value,
                                } );
                            } }
                            placeholder={ `Name` }
                            required={ true }
                        />
                        <Input
                            fieldtype={ `email` }
                            inputProps={ {
                                defaultValue: utils.ao.has( "email" ) ? currentInput.email : "",
                            } }
                            label={ `email` }
                            id={ `email` }
                            name={ `email` }
                            onChange={ ( e ) => {
                                setCurrentInput( {
                                    ...currentInput,
                                    email: e.target.value,
                                } );
                            } }
                            placeholder={ `Email Address` }
                            required={ true }
                        />
                        <Input
                            fieldtype={ `text` }
                            inputProps={ {
                                defaultValue: utils.ao.has( "company" ) ? currentInput.company : "",
                            } }
                            label={ `company` }
                            id={ `company` }
                            name={ `company` }
                            onChange={ ( e ) => {
                                setCurrentInput( {
                                    ...currentInput,
                                    company: e.target.value,
                                } );
                            } }
                            placeholder={ `Company` }
                            required={ true }
                        />
                        <Input
                            fieldtype={ `text` }
                            inputProps={ {
                                defaultValue: utils.ao.has( "subject" ) ? currentInput.subject : "",
                            } }
                            label={ `subject` }
                            id={ `subject` }
                            name={ `subject` }
                            onChange={ ( e ) => {
                                setCurrentInput( {
                                    ...currentInput,
                                    subject: e.target.value,
                                } );
                            } }
                            placeholder={ `Subject` }
                            required={ true }
                        />
                        <Input
                            fieldtype={ `tel` }
                            inputProps={ {
                                defaultValue: utils.ao.has( "phone" ) ? currentInput.phone : "",
                                minLength: 9,
                            } }
                            label={ `phone` }
                            id={ `phone` }
                            name={ `phone` }
                            onChange={ ( e ) => {
                                setCurrentInput( {
                                    ...currentInput,
                                    phone: e.target.value,
                                } );
                            } }
                            placeholder={ `Phone Number` }
                            required={ false }
                        />
                        <Input.InputArea
                            fieldtype={ `text` }
                            inputProps={ {
                                defaultValue: utils.ao.has( "message" ) ? currentInput.message : "",
                            } }
                            label={ `message` }
                            id={ `message` }
                            name={ `message` }
                            onChange={ ( e ) => {
                                setCurrentInput( {
                                    ...currentInput,
                                    message: e.target.value,
                                } );
                            } }
                            placeholder={ `Message` }
                            required={ true }
                        />
                        <div className="flex justify-center w-full px-10 py-2 ">
                            <Button
                                id={ `landing-page-nav-button` }
                                icon={ <FaPowerOff className={ `button-text button-icon` } /> }
                                className="px-10 py-2 bg-primary text-white"
                                label={ `Submit` }
                                appearance={ `glassmorphic` }
                                onClick={ ( e ) => {
                                    sendMessage( currentInput );
                                } }></Button>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}

export default Contact;

/*
    <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
        background="transparent"
        speed="1"
        loop="1"
        autoplay></lottie-player>

    <div>
        <SectionTitle title="Say Hello"></SectionTitle>
        <div className="flex sm:flex-col items-center justify-center">
            <div className="flex flex-col gap-1">
                <h1 className="text-white text-xl">
                    {"{"}
                    { Object.keys( user ).map( ( key ) => (
                        // if ( key != "_id" )
                        key !== "_id" && <p className="ml-5">
                            &emsp;&emsp;&emsp;
                            <span className="text-highlightColor2">
                                {key}
                            </span>
                            :{" "}
                            <span className="text-white">{user[key]}</span>
                        </p>
                    ))}
                    {"}"}
                </h1>
            </div>
            <div className="h-[400px]">
                <lottie-player
                    src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
                    background="transparent"
                    speed="1"
                    loop="1"
                    autoplay></lottie-player>
            </div>
        </div>
    </div>
*/

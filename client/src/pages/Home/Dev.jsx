// Page to talk about projects and other things i'm currently working on. 
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Form,
    // Input,
    Modal,
    message
} from "antd";
import { SetLoading, ReloadData } from "../../redux/rootSlice";
import API from "../../lib/services/api.js";
import Section from "../../components/Section";
import * as utils from 'akashatools';

function Dev () {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector( ( state ) => state.root );
    const { user } = portfolioData;

    const getData = async ( values ) => {
        try {
            dispatch( SetLoading( true ) );
            let response;
            response = await API.get( "/api/portfolio/dev/getlog", values );
            // dispatch(SetLoading(false));
            // console.log( "Contact :: getData :: response = ", response );
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
                type='title'
                content={ `What I'm Working On` }
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
            <div
                className={ `flex flex-col` }
            >
                <h1 className={ `text-4xl` }>
                    Nothing here right now.
                </h1>

                <h1 className={ `text-2xl` }>
                    Stay tuned!
                </h1>

            </div>
        </Section>
    );
}


export default Dev;

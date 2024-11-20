// Dependencies
import React, { useState, useEffect } from "react";

// Redux state management
import { useDispatch, useSelector } from "react-redux";
import {
    SetDebug,
    SetLoading,
    SetPortfolioData,
    ReloadData,
    // SetRole,
    // SetToken,
    SetLoggedIn,
    SetUser,
} from "../../redux/rootSlice";
import * as utils from 'akashatools';
import { message } from "antd";
import API from "../services/api";

const useAuth = () => {
    const [ authData, setAuthData ] = useState( null );
    const [ userData, setUserData ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState( null );

    const dispatch = useDispatch();
    const {
        debug,
        loading,
        portfolioData,
        blogData,
        appsData,
        reloadData,
        loggedIn,
        user,
    } = useSelector( ( state ) => state.root );

    const authUser = async ( requiredRoles = [] ) => {
        // Gatekeep access to specific routes and resources based on role and permissions in user data. 

        // Get the session token from the stored token, if there is one. If there isn't one, automatically reject.
        dispatch( SetLoading( true ) );
        let token = localStorage.getItem( "token" );
        if ( !token ) {
            // No token, no dice.
            if ( debug )
                console.log(
                    "Admin index.js :: auth :: token is not set: ",
                    token,
                );

            dispatch( SetLoggedIn( false ) );
            dispatch( SetUser( {} ) );
            dispatch( SetLoading( false ) );

            return false;
        }

        if ( debug ) console.log( "authUser :: token = ", token );
        try {
            const response = await API.get( "/api/users/auth/user", {
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json",
                },
            } );

            if ( debug )
                console.log(
                    "authUser :: full response = ",
                    response,
                    " :: full response data = ",
                    response.data,
                );
            if ( response.data.success ) {
                // Successfully authenticated.
                if ( debug )
                    message.success( response.data.message );
                // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
                let userdata = utils.ao.deepGetKey( response.data, "user" );
                let auth = utils.ao.deepGetKey( response.data, "auth" );
                let role = utils.ao.deepGetKey( response.data, "role" );
                if ( debug )
                    console.log(
                        "authUser :: auth = ",
                        auth,
                        " :: role = ",
                        role,
                    );
                // dispatch(SetRole(role));
                dispatch( SetLoggedIn( true ) );
                // dispatch( SetUser( response.data.user ) );
                dispatch( SetUser( userdata ) );

                /// TODO :: Put routing here based on user priveleges.
                dispatch( SetLoading( false ) );
                if ( requiredRoles.includes( role ) ) {
                    // setAuthorized(true);
                    return true;
                } else {
                    // setAuthorized(false);
                    return false;
                }
            } else {
                // Failed to log in. Return to homepage.
                if ( debug )
                    message.error( response.data.message );
                // window.location.href = "/";
                if ( debug )
                    console.log(
                        "authUser requiredRoles = ",
                        requiredRoles,
                        " :: response.data.message = ",
                        response.data.message,
                    );
                dispatch( SetLoading( false ) );
                // setAuthorized(false);
                return false;
            }
        } catch ( error ) {
            if ( debug )
                console.log(
                    "authUser requiredRoles = ",
                    requiredRoles,
                    " :: error.message = ",
                    error.message,
                );
            if ( debug )
                message.error( `Authentication error: ${ error.message }` );
            dispatch( SetLoading( false ) );
            // setAuthorized(false);
            return false;
        }
    };

    const [ credentials, setCredentials ] = React.useState( {
        username: "",
        password: "",
        email: "",
        display_name: "",
    } );

    // const [ dispatch, setDispatch ] = React.useState( null );
    const login = async () => {
        try {
            dispatch( SetLoading( true ) );
            // const response = await API.post( "/api/users/login", // user
            const response = await API.post(
                "/api/users/auth", // user
                {
                    username: credentials.username,
                    password: credentials.password,
                },
            );
            dispatch( SetLoading( false ) );
            if ( debug )
                console.log( "Login.js :: login :: response = ", response );
            if ( response.data.success ) {
                // Successfully logged in.
                message.success( response.data.message );
                let token = utils.ao.deepGetKey( response.data, "token" );
                let role = utils.ao.deepGetKey( response.data, "role" );
                let userdata = utils.ao.deepGetKey( response.data, "user" );
                localStorage.setItem(
                    "token",
                    token,
                );
                if ( debug )
                    console.log(
                        "Login.js :: login :: token = ",
                        token,
                        ", role = ",
                        role,
                        ", userdata = ",
                        userdata,
                    );
                dispatch( SetLoggedIn( true ) );
                // dispatch(SetRole(role));
                // dispatch( SetToken( token ) );
                dispatch( SetUser( userdata ) );
                // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
                if ( debug )
                    console.log(
                        "Login.js :: login :: token = ",
                        token,
                        ", role = ",
                        role,
                        ", user = ",
                        user,
                    );
                if ( role ) {
                    // Handle routing based on role permissions.
                    if ( role === "guest" ) {
                        window.location.href = "/portfolio";
                    } else if ( role === "admin" ) {
                        window.location.href = "/admin";
                    } else {
                        window.location.href = "/";
                    }
                } else {
                    window.location.href = "/";
                }
            } else {
                // Failed to log in. Return to homepage.
                message.error( response.data.message );
                window.location.href = "/";
            }
        } catch ( error ) {
            message.error( error.message );
            dispatch( SetLoading( false ) );
        }
    };

    const signup = async () => {
        try {
            dispatch( SetLoading( true ) );
            const response = await API.post(
                "/api/users/signup", // user
                {
                    username: credentials.username,
                    password: credentials.password,
                    email: credentials.email,
                    display_name: credentials.display_name,
                },
            );
            dispatch( SetLoading( false ) );
            if ( debug )
                console.log( "Login.js :: signup :: response = ", response );
            if ( response.data.success ) {
                // Successfully logged in.
                // Retrieve the token.
                message.success( response.data.message );
                // localStorage.setItem("token", JSON.stringify(response.message));
                // window.location.href = "/admin";
                login();
            } else {
                // Failed to log in. Return to homepage.
                message.error( response.data.message );
                // window.location.href = "/";
            }
        } catch ( error ) {
            message.error( error.message );
            dispatch( SetLoading( false ) );
        }
    };


    return {
        authUser,
        authData,
        userData,
        isLoading,
        error,
        login,
        signup,
    };
};

export default useAuth;


/*
import { useState } from 'react';
import { loginUser, fetchUserData } from './authService';  // Import your specific API functions

const useAuthApi = () => {
    const [ authData, setAuthData ] = useState( null );
    const [ userData, setUserData ] = useState( null );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ error, setError ] = useState( null );

    // Login Function
    const login = async ( credentials ) => {
        setIsLoading( true );
        try {
            const data = await loginUser( credentials );
            setAuthData( data );
        } catch ( err ) {
            setError( err.message );
        } finally {
            setIsLoading( false );
        }
    };

    // Fetch User Data
    const getUserData = async ( userId ) => {
        setIsLoading( true );
        try {
            const data = await fetchUserData( userId );
            setUserData( data );
        } catch ( err ) {
            setError( err.message );
        } finally {
            setIsLoading( false );
        }
    };

    return {
        authData,
        userData,
        isLoading,
        error,
        login,
        getUserData,
    };
};

export default useAuthApi;
*/
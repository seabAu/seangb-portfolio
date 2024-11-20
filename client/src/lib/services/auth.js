// Clientside request for authenticating as specific roles. 

import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

// Redux state management
import {
    SetLoading,
    SetPortfolioData,
    ReloadData,
    SetRole,
    SetLoggedIn,
    SetToken,
} from "./redux/rootSlice";
import * as utils from 'akashatools';
import API from "../api.js";

// const dispatch = useDispatch();

const auth = async () => {
    // Get the session token from the stored token, if there is one. If there isn't one, automatically reject.
    let token = localStorage.getItem( "token" );
    console.log( "Admin index.js :: auth :: token = ", token );
    try {
        const response = await API.get( "/api/users/auth/user", {
            headers: {
                "x-auth-token": token,
                "Content-type": "application/json",
            },
        } );

        console.log( "Admin index.js :: auth :: response = ", response );
        if ( response.data.success ) {
            // Successfully authenticated.
            // .success(response.data.message);
            // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
            let auth = utils.ao.deepGetKey( response.data, "auth" );
            let role = utils.ao.deepGetKey( response.data, "role" );
            console.log(
                "Admin index.js :: auth :: auth = ",
                auth,
                " :: role = ",
                role,
            );
            // dispatch(SetRole(role));
            // dispatch(SetLoggedIn(true));
            // dispatch(SetToken(token));
            // if (role) {
            //     if (role === "guest") {
            //         window.location.href = "/portfolio";
            //     } else if (role === "admin") {
            //         window.location.href = "/admin";
            //     } else {
            //         window.location.href = "/";
            //     }
            // } else {
            //     window.location.href = "/";
            // }
        } else {
            // Failed to log in. Return to homepage.
            // message.error(response.data.message);
            // window.location.href = "/";
        }
    } catch ( error ) {
        // message.error(error.message);
    }
};


export default auth;
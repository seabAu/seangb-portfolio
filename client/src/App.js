// Dependencies
import React, { useState, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import axios from "axios";
import API from "./api/api.js";
import local_portfolio_data from "./resources/localData.json";

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
} from "./redux/rootSlice";

// Components
import Loader from "./components/Loader/Loader";
import { message } from "antd";

// Pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import * as utils from "./utilities";
import { importFile } from "./api/import.js";

const offlineMode = false;

const ProtectedRoute = ({
    children,
    isAllowed,
    redirectPath = "/",
    // loggedIn,
    // token,
    // role,
    // user,
    reqRoles = [],
}) => {
    const dispatch = useDispatch();
    const {
        debug,
        loading,
        portfolioData,
        reloadData,
        loggedIn,
        token,
        role,
        user,
    } = useSelector((state) => state.root);

    // if (isAllowed) {
    //     return (
    //         <Navigate
    //             to={redirectPath}
    //             replace
    //         />
    //     );
    // }

    // // return children;
    // return children ? children : <Outlet />;
    // 

    if (!isAllowed) {
        return (
            <Navigate
                to={redirectPath}
                replace
            />
        );
    }

    return children ? children : <Outlet />;
};

function App() {
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
    } = useSelector((state) => state.root);

    // const [authorized, setAuthorized] = React.useState(false);
    const authRef = React.useRef( false );

    // Whether we've CHECKED for token authenticity yet. If not, hold off on rerouting, to give the server a moment to respond. 
    const [ authenticated, setAuthenticated ] = useState( false ); 

    const auth = async (requiredRoles = []) => {
        // Get the session token from the stored token, if there is one. If there isn't one, automatically reject.
        dispatch(SetLoading(true));
        let token = localStorage.getItem("token");
        if (!token) {
            // No token, no dice.
            if (debug)
                console.log(
                    "Admin index.js :: auth :: token is not set: ",
                    token,
                );
            
            dispatch(SetLoggedIn(false));
            dispatch(SetUser({}));
            dispatch(SetLoading(false));

            return false;
        }

        if ( debug )
            console.log( "Admin index.js :: auth :: token = ", token );
        try {
            const response = await API.get("/api/users/auth/user", {
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json",
                },
            });

            if (debug)
                console.log(
                    "Admin index.js :: auth :: full response = ",
                    response,
                    " :: full response data = ",
                    response.data,
                );
            if (response.data.success) {
                // Successfully authenticated.
                if ( debug )
                    message.success( response.data.message );
                // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
                let userdata = utils.ao.deepGetKey(response.data, "user");
                let auth = utils.ao.deepGetKey(response.data, "auth");
                let role = utils.ao.deepGetKey(response.data, "role");
                if (debug)
                    console.log(
                        "Admin index.js :: auth :: auth = ",
                        auth,
                        " :: role = ",
                        role,
                    );
                // dispatch(SetRole(role));
                dispatch(SetLoggedIn(true));
                // dispatch( SetUser( response.data.user ) );
                dispatch(SetUser(userdata));

                /// TODO :: Put routing here based on user priveleges.

                dispatch(SetLoading(false));
                if (requiredRoles.includes(role)) {
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
                if (debug)
                    console.log(
                        "Auth requiredRoles = ",
                        requiredRoles,
                        " :: response.data.message = ",
                        response.data.message,
                    );
                dispatch(SetLoading(false));
                // setAuthorized(false);
                return false;
            }
        } catch (error) {
            if (debug)
                console.log(
                    "Auth requiredRoles = ",
                    requiredRoles,
                    " :: error.message = ",
                    error.message,
                );
            if ( debug )
                message.error( `Authentication error: ${ error.message }` );
            dispatch(SetLoading(false));
            // setAuthorized(false);
            return false;
        }
    };

    // Make sure a visitor is successfully logged in before letting them access any page other than "/admin-login".
    useEffect(() => {
        // Run stored token through auth checks and make sure access is confirmed.
        // setAuthorized(auth(["admin"]));
        auth(["admin"]);
        // if ( !localStorage.getItem( "token" ) )
        // {
        //     window.location.href = "/login";
        // }
    }, []);

    const getPortfolioData = async () => {
        try {
            dispatch(SetLoading(true));
            dispatch(ReloadData(false));
            const response = await API.get(`/api/portfolio/get-portfolio-data`)
                .then((res) => {
                    if (debug)
                        console.log(
                            "App.js :: getPortfolioData :: res = ",
                            res,
                        );
                    dispatch(SetPortfolioData(res.data));

                    // Set reloadData flag false.
                    dispatch(ReloadData(false));
                })
                .catch((err) => {
                    if (debug) console.error(err);

                    // Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
                    dispatch(ReloadData(false));
                });

            // console.log( response.data );
            dispatch(SetPortfolioData(response.data));
            // Set reloadData flag false.
            /// dispatch(ReloadData(false));
            dispatch(SetLoading(false));
        } catch (error) {
            dispatch(SetLoading(false));
        }
    };

    // Database API Call
    useEffect(() => {
        if (!portfolioData) {
            if ( !offlineMode )
            {
                getPortfolioData();
            }
            else
            {
                // let path = `${process.env.PUBLIC_URL}/data/localData.json`;
                // let data = importFile(path);
                // console.log(
                //     "App.js :: offlineMode :: data imported from local data file = ",
                //     data,
                //     " :: file location = ",
                //     path,
                // );
                // if ( utils.val.isValidArray( data, true ) ) SetPortfolioData( data );
                // else SetPortfolioData(offlineData);
                if (debug)
                    console.log("App.js :: offlineMode :: data imported from local data file = ", local_portfolio_data, " :: file location = ", "./resources/localData.json");
                dispatch(SetPortfolioData(local_portfolio_data));
                dispatch(ReloadData(false));
                dispatch(SetLoading(false));
            }
        }
    }, [portfolioData]);

    useEffect(() => {
        if (reloadData) {
            getPortfolioData();
        }
    }, [getPortfolioData]);

    useEffect( () =>
    {
        // Debug output for tracking important values. 
        if (debug)
            console.log(
                "App.js :: Redux data is now = ",
                "\n :: debug = ",
                debug,
                "\n :: loading = ",
                loading,
                "\n :: portfolioData = ",
                portfolioData,
                "\n :: blogData = ",
                blogData,
                "\n :: appsData = ",
                appsData,
                "\n :: reloadData = ",
                reloadData,
                "\n :: loggedIn = ",
                loggedIn,
                "\n :: user = ",
                user,
            );
    }, [
        debug,
        loading,
        portfolioData,
        blogData,
        appsData,
        reloadData,
        loggedIn,
        user,
    ]);

    useEffect(() => {
        if (debug) console.log("App.js :: authRef.current is now = ", authRef.current);
    }, [authRef.current]);
    
    // // Crosscheck data. This triggers whenever portfolioData changes.
    // useEffect(() => {
    //     console.log("App.js:", portfolioData);
    // }, [portfolioData]);
    return (
        <BrowserRouter>
            {loading ? <Loader /> : null}
            <Routes>
                <Route
                    index
                    path="/"
                    element={<Landing />}
                />
                <Route
                    path="/portfolio"
                    element={<Home />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute
                            redirectPath="/"
                            isAllowed={ ( !!user && user?.role?.includes("admin") ) }>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={<p>There's nothing here: 404!</p>}
                />
            </Routes>{" "}
        </BrowserRouter>
    );
}
/*
                <Route
                    path="/admin"
                    loggedIn={loggedIn}
                    element={
                        <ProtectedRoute
                            reqRoles={["admin", "superadmin"]}
                            user={user}
                            loggedIn={loggedIn}
                            // role={role}  <Route path="/admin" element={<Admin />} />
                            // token={token}
                        >
                            <Admin />
                        </ProtectedRoute>
                    }
                />
*/
export default App;


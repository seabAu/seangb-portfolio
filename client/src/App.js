// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import axios from "axios";
import API from "./api/api.js";
import { message } from "antd";

// Redux state management
import
    {
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

// Pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { deepGetKey } from "./components/Utilities/AO.js";

// const debug = false;
const ProtectedRoute = ({
    children,
    loggedIn,
    token,
    role,
    user,
    reqRoles = [],
    redirectPath = "/",
}) => {
    const dispatch = useDispatch();
    const {
        debug,
        ///loading,
        ///portfolioData,
        ///reloadData,
        ///loggedIn,
        // token,
        // role,
        ///user,
    } = useSelector((state) => state.root);

    // Make sure a visitor is successfully logged in before letting them access any page other than "/admin-login".
    // useEffect(() => {
    //     // Run stored token through auth checks and make sure access is confirmed.
    //     auth(reqRoles);
    //     // if ( !localStorage.getItem( "token" ) )
    //     // {
    //     //     window.location.href = "/login";
    //     // }
    // }, []);

    // if (!loggedIn || !user.token || !reqRoles.includes(user.role)) {
    if (!loggedIn || !token || !reqRoles.includes(role)) {
        if (debug)
            console.log(
                "App.js :: ProtectedRoute :: state.root = ",
                // [loading, portfolioData, reloadData, loggedIn, token, role],
                " :: LoggedIn = ",
                loggedIn,
                " :: token = ",
                token,
                " :: role = ",
                role,
                " :: reqroles = ",
                reqRoles,
                " :: userdata = ",
                user,
            );
        return <Navigate to={redirectPath} replace />;
    }

    // return children;
    return children ? children : <Outlet />;
};

function App() {
    const dispatch = useDispatch();
    const {
        debug,
        loading,
        portfolioData,
        reloadData,
        loggedIn,
        // token,
        // role,
        user,
    } = useSelector((state) => state.root);

    const [authorized, setAuthorized] = React.useState(false);

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
            return false;
        }

        if (debug) console.log("Admin index.js :: auth :: token = ", token);
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
                if(debug)message.success(response.data.message);
                // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
                let userdata = deepGetKey(response.data, "user");
                let auth = deepGetKey(response.data, "auth");
                let role = deepGetKey(response.data, "role");
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
                if(debug)message.error(response.data.message);
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
            if(debug)message.error(`Authentication error: ${error.message}`);
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

    // Make sure a visitor is successfully logged in before letting them access any page other than "/admin-login".
    useEffect(() => {
        if (debug) console.log("App.js :: Authorized is now = ", authorized);
    }, [authorized]);

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
            getPortfolioData();
        }
    }, [portfolioData]);

    useEffect(() => {
        if (reloadData) {
            getPortfolioData();
        }
    }, [getPortfolioData]);

    // // Crosscheck data. This triggers whenever portfolioData changes.
    // useEffect(() => {
    //     console.log("App.js:", portfolioData);
    // }, [portfolioData]);
    return (
        <BrowserRouter>
            {loading ? <Loader /> : null}
            <Routes>
                <Route index path="/" element={<Landing />} />
                <Route path="/portfolio" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route
                    path="/adminpanel"
                    loggedIn={loggedIn}
                    // token={token}
                    // role={role}
                    element={
                        <ProtectedRoute
                            reqRoles={["admin"]}
                            user={user}
                            loggedIn={loggedIn}
                            // role={role}
                            // token={token}
                        >
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>{" "}
        </BrowserRouter>
    );
}

export default App;

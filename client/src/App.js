// Dependencies
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import API from './api/api.js';
import { message } from "antd";

// Redux state management
import {
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
    // const { loading, portfolioData, reloadData, loggedIn, token, role } = useSelector((state) => state.root);
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
        console.log(
            "App.js :: ProtectedRoute :: state.root = ",
            // [loading, portfolioData, reloadData, loggedIn, token, role],
            " :: LoggedIn = ", loggedIn, " :: token = ", token, " :: role = ", role, " :: reqroles = ",
            reqRoles, " :: userdata = ", user
        );
        return <Navigate to={redirectPath} replace />;
    }

    // return children;
    return children ? children : <Outlet />;
};

function App() {
    const dispatch = useDispatch();
    const { 
        loading, 
        portfolioData, 
        reloadData, 
        loggedIn, 
        // token, 
        // role, 
        user 
    } = useSelector( ( state ) => state.root );
    
    const [authorized, setAuthorized] = React.useState();

    const auth = async (requiredRoles = []) => {
        // Get the session token from the stored token, if there is one. If there isn't one, automatically reject.
        dispatch(SetLoading(true));
        let token = localStorage.getItem("token");

        console.log("Admin index.js :: auth :: token = ", token);
        try {
            const response = await API.get("/api/users/auth/user", {
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json",
                },
            });

            console.log("Admin index.js :: auth :: response = ", response);
            if (response.data.success) {
                // Successfully authenticated.
                message.success(response.data.message);
                // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
                let auth = deepGetKey(response.data, "auth");
                let role = deepGetKey(response.data, "role");
                console.log(
                    "Admin index.js :: auth :: auth = ",
                    auth,
                    " :: role = ",
                    role,
                );
                // dispatch(SetRole(role));
                dispatch(SetLoggedIn(true));
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
                dispatch(SetLoading(false));
                if (requiredRoles.includes(role)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                // Failed to log in. Return to homepage.
                message.error(response.data.message);
                // window.location.href = "/";
                console.log(
                    "Auth requiredRoles = ",
                    requiredRoles,
                    " :: response.data.message = ",
                    response.data.message,
                );
                dispatch(SetLoading(false));
                return false;
            }
        } catch (error) {
            console.log(
                "Auth requiredRoles = ",
                requiredRoles,
                " :: error.message = ",
                error.message,
            );
            message.error(error.message);
            dispatch(SetLoading(false));
            return false;
        }
        dispatch(SetLoading(false));
    };

    // Make sure a visitor is successfully logged in before letting them access any page other than "/admin-login".
    useEffect(() => {
        // Run stored token through auth checks and make sure access is confirmed.
        setAuthorized(auth(["admin"]));
        // if ( !localStorage.getItem( "token" ) )
        // {
        //     window.location.href = "/login";
        // }
    }, []);

    const getPortfolioData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await API.get(`/api/portfolio/get-portfolio-data`)
                .then((res) => {
                    console.log("App.js :: getPortfolioData :: res = ", res);
                    dispatch(SetPortfolioData(res.data));
                })
                .catch((err) => {
                    console.error(err);
                });

            // console.log( response.data );
            dispatch(SetPortfolioData(response.data));
            // Set reloadData flag false.
            dispatch(ReloadData(false));
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

/*

                <Route path="/admin" element={<Admin />} />
                <ProtectedRoute path="/admin" element={<Admin />} />

const Navigation = () => (
  <nav>
    <Link to="/landing">Landing</Link>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/analytics">Analytics</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);
*/
/*
// Dependencies
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import {
    HideLoading,
    SetPortfolioData,
    ShowLoading,
    ReloadData,
} from "./redux/rootSlice";
import Login from "./pages/Admin/Login";

function App() {
    // const [ showLoading, setShowLoading ] = useState( false );
    const { loading, portfolioData, reloadData } = useSelector(
        (state) => state.root,
    );
    const dispatch = useDispatch();
    
    // const axiosDefaultConfig = {
    //     proxy: {
    //         host: "http://localhost:3000",
    //         hostname: "127.0.0.1",
    //         port: 5000,
    //         protocol: "http",
    //     },
    // };
    // const axiosFixed = require("axios-https-proxy-fix").create(axiosDefaultConfig);
    axios.defaults.baseURL = 'http://localhost:5000';
    const getPortfolioData = async () => {
        try {
            // Set reloadData flag false.

            dispatch(ShowLoading());

            // For some reason this function dies right here.
            const response = await axios.get(
                "/api/portfolio/get-portfolio-data",
            );
            // const response = await axios
            //     .get("http://localhost:5000/api/portfolio/get-portfolio-data")
            //     .then((res) => console.log(res))
            //     .catch((err) => console.error(err));
            dispatch(ReloadData(false));
            // const response = await axios
            //     .get("/api/portfolio/get-portfolio-data", {
            //         proxy: {
            //             host: "http://localhost",
            //             hostname: "http://127.0.0.1",
            //             port: 5000,
            //             protocol: "http",
            //         },
            //         headers: {
            //             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            //             "Access-Control-Allow-Origin": "*",
            //             "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            //         },
            //     })
            //     .then((res) => console.log(res))
            //     .catch((err) => console.error(err));
            // console.log(response.data);
            dispatch(SetPortfolioData(response.data));
            // console.log("test");

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
    }, [portfolioData, getPortfolioData]);

    useEffect(() => {
        if (reloadData) {
            getPortfolioData();
        }
    }, [getPortfolioData]);

    // // Crosscheck data. This triggers whenever portfolioData changes.
    useEffect(() => {
        console.log("App.js:", portfolioData);
    }, [portfolioData]);
    return (
        <BrowserRouter>
            {" "}
            {loading ? <Loader> </Loader> : null}{" "}
            <Routes>
                <Route path="/" element={<Home />} />{" "}
                <Route path="/admin" element={<Admin />} />{" "}
                <Route path="/admin-login" element={<Login />} />
            </Routes>{" "}
        </BrowserRouter>
    );
}

export default App;

*/

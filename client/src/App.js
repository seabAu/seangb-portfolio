// Dependencies
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Loader from "./components/Loader/Loader";

// Pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import {
    SetLoading,
    SetPortfolioData,
    ReloadData,
} from "./redux/rootSlice";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

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
    console.log( "AXIOS DEFAULTS :: ", axios.defaults, axios );
    axios.defaults.baseURL = `http://localhost:4000`;
    const getPortfolioData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.get(
                "/api/portfolio/get-portfolio-data",
            );
            // console.log( response.data );
            dispatch(SetPortfolioData(response.data));
            // Set reloadData flag false.
            dispatch(ReloadData(false));
            dispatch(SetLoading(false));
        } catch (error) {
            dispatch(SetLoading(false));
        }
    };
    // axios.defaults.baseURL = "http://localhost:4000";
    //
    // const getPortfolioData = async () => {
    //     try {
    //         // Set reloadData flag false.
    //         dispatch(SetLoading(true));
    //         dispatch(ReloadData(false));
    //         console.log("getPortfolioData :: Before axios fetch.");
    //         // For some reason this function dies right here.
    //         const response = await axios
    //             .get("/api/portfolio/get-portfolio-data")
    //             .then((res) => {
    //                 console.log("getPortfolioData :: res = ", res);
    //                 dispatch(SetPortfolioData(res.data));
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //
    //         dispatch(SetLoading(false));
    //     } catch ( error )
    //     {
    //         console.error( error );
    //         dispatch(SetLoading(false));
    //     }
    // };
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
                <Route path="/" element={<Landing />} />
                <Route path="/portfolio" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
            </Routes>{" "}
        </BrowserRouter>
    );
}

export default App;

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

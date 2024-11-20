// Import system stuff
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as utils from 'akashatools';
import * as debug from './../../utilities/Debug.js';

// Import components
// import { Tabs } from "antd";
import Tabs from "../../components/Tabs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import Blog from "./Blog";
import Tools from "./Tools";
import AMA from "./AMA";
import SidePanel from "../../components/SidePanel";
import Sidebar from "../../components/Sidebar";

import {
    FaCloudDownloadAlt,
    FaFilePdf,
    FaUser,
    FaUserTimes,
    FaTimesCircle,
    FaThList,
    FaThumbsUp,
    FaSwatchbook,
    FaBook,
} from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/index.js";
import Dev from "./Dev.jsx";
// Import UI components
// import 'bootstrap/dist/css/bootstrap.css';

function Home ( props ) {
    const {
        // pages,
        defaultActiveIndex = 0,
        options
    } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        debug,
        loading,
        portfolioData,
        reloadData,
        loggedIn,
        token,
        role,
        user,
        theme,
        themeMode,
        themeBehavior
    } = useSelector( ( state ) => state.root );
    let userData = user;
    let userRole = user.hasOwnProperty( "role" ) ? user.role : "guest";
    let userToken = user.hasOwnProperty( "token" ) ? userData.token : "";
    let tokenValid = utils.val.isValid( userToken, true );

    let [ currentTab, setCurrentTab ] = useState( defaultActiveIndex );

    const portfolioPages = [
        {
            key: "1",
            slug: `about`,
            label: `About`,
            children: <About />,
            enabled: true,
        },
        {
            key: "2",
            slug: `projects`,
            label: `Projects`,
            children: <Projects />,
            enabled: true,
        },
        {
            key: "3",
            slug: `experiences`,
            label: `Experiences`,
            children: <Experiences />,
            enabled: true,
        },
        {
            key: "4",
            slug: `education`,
            label: `Education`,
            children: <Education />,
            enabled: true,
        },
        {
            key: "5",
            slug: `blog`,
            label: `Blog`,
            children: <Blog />,
            enabled: false,
        },
        {
            key: "6",
            slug: `tools`,
            label: `Tools`,
            children: <Tools />,
            enabled: false,
        },
        {
            key: "7",
            slug: `dev`,
            label: `My Work`,
            children: <Dev />,
            enabled: false,
        },
        {
            key: "8",
            slug: `ask`,
            label: `AMA`,
            children: <AMA />,
            enabled: false,
        },
        {
            key: "9",
            slug: `contact`,
            label: `Contact`,
            children: <Contact />,
            enabled: true,
        },
    ];

    // const v = 'trees';
    // console.log( 'name of var v: ', debug.nameOf( v ) );

    return (
        portfolioData && (
            <div className="page-content">
                <Tabs
                    defaultActiveIndex={ defaultActiveIndex }
                    items={ portfolioPages }
                    tabPosition={ "top" }
                    size={ "large" }
                    styles={ {
                        margin: `0.0rem`,
                        maxWidth: `1200px`
                    } }
                    type="left"
                    centered={ true }
                    padContent={ false }
                    fillArea={ true }
                    roundedNav={ true }
                    contentBoxShadow={ false }
                    navBoxShadow={ false }
                    containerOverflowLock={ true }
                    overflowLock={ true }
                // onChange={onChange}
                >
                    {/*  FUTURE PAGES
                                - Blog
                                - Tutorials
                                - Tools & Other Resources
                                - Ask Me Anything
                                    -> Very similar to Contact page, except it will post the messages directly to the front end page, and I will be able to post responses to them.
                                    -> For obvious reasons, i'll include a feature to remove inappropriate questions. 
                                - Updates

                                Beyond its initial release as a portfolio site, my end goal is to have a personal site that doubles as a portfolio-serving front page. To do that, it should include various features that are worth me checking in on the site every day, such as a weight and exercise tracker, message board, a blog, etc. 
                    */}
                </Tabs>
            </div>
        )
    );
}

export default Home;


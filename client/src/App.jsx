// Dependencies
import React, { useState, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    redirect,
} from "react-router-dom";
import API from "./lib/services/api.js";
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
    SetTheme,
} from "./redux/rootSlice";

// Components
import Loader from "./components/Loader/Loader";
import { useNavigate } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import * as utils from 'akashatools';
// import { importFile } from "./lib/services/import.js";
import Blog from "./pages/Home/Blog.js";
import { usePortfolio } from "./lib/hooks/usePortfolio.js";
import useAuth from "./lib/hooks/useAuth.js";
// import { usePortfolio } from "./api/services/usePortfolio.js";
import useLocalStorage from 'use-local-storage';

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
import About from "./pages/Home/About.js";
import Projects from "./pages/Home/Projects.js";
import Experiences from "./pages/Home/Experiences.js";
import Education from "./pages/Home/Education.js";
import Tools from "./pages/Home/Tools.js";
import AMA from "./pages/Home/AMA.js";
import Contact from "./pages/Home/Contact.js";
import Footer from "./components/Footer/index.js";
import Header from "./components/Header/index.js";
import Button from "./components/Button/index.js";
import Errpage from "./pages/Errpage.jsx";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { FaPersonCircleExclamation, FaPersonCircleXmark, FaTwitter } from "react-icons/fa6";
import Dev from "./pages/Home/Dev.jsx";
const offlineMode = false;

const ProtectedRoute = ( {
    children,
    isAllowed,
    redirectPath = "/",
    // loggedIn,
    // token,
    // role,
    // user,
    reqRoles = [],
} ) => {
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
    } = useSelector( ( state ) => state.root );

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

    if ( !isAllowed ) {
        return (
            <Navigate
                to={ redirectPath }
                replace
            />
        );
    }

    return children ? children : <Outlet />;
};

function App () {
    const dispatch = useDispatch();

    const {
        debug,
        loading,
        token,
        role,
        portfolioData,
        blogData,
        appsData,
        reloadData,
        loggedIn,
        user,
        // theme,
        theme,
        themeMode,
        themeBehavior,
    } = useSelector( ( state ) => state.root );
    const { getPortfolioData } = usePortfolio();
    const { authUser } = useAuth();

    // const [authorized, setAuthorized] = React.useState(false);
    const authRef = React.useRef( false );

    const defaultDark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
    const [ localTheme, setLocalTheme ] = useLocalStorage( 'theme', defaultDark ? 'dark' : 'light' );


    let userData = user;
    let userRole = user ? ( user.hasOwnProperty( "role" ) ? user.role : "guest" ) : '';
    let userToken = user ? ( user.hasOwnProperty( "token" ) ? userData.token : "" ) : '';
    let tokenValid = utils.val.isValid( userToken, true );

    const fileRepo = [
        {
            filename: "Sean G Brown Web Developer Resume (March 2023).pdf",
            label: `Developer Resume (PDF)`,
            icon: <FaCloudDownloadAlt />
        },
        {
            filename: "Sean G Brown EE Resume (March 2023).pdf",
            label: `Engineering Resume (PDF)`,
            icon: <FaCloudDownloadAlt />
        },
    ];

    const handleDownload = ( event, fileID ) => {
        // FileID is the index of the file in the above basic repo.
        let filedata = fileRepo[ fileID ];
        let file = filedata.filename;

        // using Java Script method to get PDF file
        fetch( file ).then( ( response ) => {
            response.blob().then( ( blob ) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL( blob );
                // Setting various property values
                let alink = document.createElement( "a" );
                alink.href = fileURL;
                alink.download = file;
                alink.click();
            } );
        } );
    };
    /* 
        const loginOnClick = () => {
            // If not logged in, the button will say Log In.
            // If logged in, the button will say Log Out.
            let currentPath = window.location.href;
            let loggedIn = localStorage.getItem( "token" );
            if ( debug ) console.log( "Currently logged in? = ", loggedIn, " :: currentPath = ", currentPath );

            if ( loggedIn ) {
                // Currently logged in, so delete the token to log them out, and send them to the home page.
                if ( debug ) console.log( "HEADER.JS :: DELETING TOKEN." );
                localStorage.removeItem( "token" );
                navigate( "/login" );
            } else {
                // Not logged in. Send to login page.
                navigate( "/login" );
            }
        };
    */

    let sidebarHeaderNav = [];

    let sidebarFooterNav = [
        {
            index: 0,
            enabled: true,
            type: 'navlink',
            name: "login",
            label: ( tokenValid ? "Log Out" : "Log In" ),
            classes: `nav-list-item`,
            link: `/login`,
            icon: (
                tokenValid
                    ?
                    <FaUserTimes className={ `nav-link-item-icon icon` } />
                    :
                    <FaUser className={ `nav-link-item-icon icon` } />
            ),
            onClick: ( e ) => { }
        }
    ];

    let nav = [
        {
            index: 0,
            enabled: true,
            type: 'navlink',
            name: "home",
            label: "Home",
            link: '/',
            icon: <FaSwatchbook className="fa fa-2x nav-button-icon icon" />,
            classes: `nav-list-item`,
            onClick: ( e ) => { }
        },
        {
            index: 1,
            enabled: true,
            type: 'navlink',
            name: "portfolio",
            label: "Portfolio",
            link: '/portfolio',
            icon: <FaBook className="fa fa-2x nav-button-icon icon" />,
            classes: `nav-list-item`,
            onClick: ( e ) => { }
        },
        {
            index: 2,
            enabled: ( [ "admin", "superadmin" ].includes( userRole ) ) ? true : false,
            type: 'navlink',
            name: "admin",
            label: "Admin",
            link: '/admin',
            icon: <FaThList className="fa fa-2x nav-button-icon icon" />,
            classes: `nav-list-item`,
            onClick: ( e ) => { }
        },
        // {
        //     index: 3,
        //     enabled: true,
        //     type: 'href',
        //     name: "akasha",
        //     label: "Akasha",
        //     link: `https://akasha.seangb.com/`,
        //     icon: <FaThumbsUp className="fa fa-2x nav-button-icon icon" />,
        //     classes: `nav-list-item`,
        //     onClick: ( e ) => { }
        // },
        // 
        // Not yet implemented. 
        // 
        // {
        //     index: 4,
        //     enabled: true,
        //     type: 'navlink',
        //     name: "gather",
        //     label: "Gather",
        //     link: `https://akasha.seangb.com/`,
        //     icon: <FaThumbsUp className="fa fa-2x nav-button-icon icon" />,
        //     classes: `nav-list-item`,
        //     onClick: ( e ) => {
        //     }
        // },
        // 
        {
            index: 3,
            enabled: true,
            type: 'dropdown',
            name: "sites",
            label: 'Sites',
            link: ``,
            icon: <FaThumbsUp className={ `fa fa-2x nav-button-icon icon` } />,
            classes: `nav-list-item`,
            children: (
                [
                    (
                        <a className="button nav-button" href="https://akasha.seangb.com/">
                            <div className="nav-button-text">
                                Akasha
                            </div>
                        </a>
                    ),
                    (
                        <a className={ `button nav-button disabled` } href="#">
                            <div className={ `nav-button-text` }>
                                { `Compass` }
                            </div>
                        </a>
                    )
                ]
            )
        },
        {
            index: 4,
            enabled: true,
            type: 'dropdown',
            name: "social",
            label: 'Social',
            link: ``,
            icon: <FaTwitter className={ `fa fa-2x nav-button-icon icon` } />,
            classes: `nav-list-item`,
            children: (
                [
                    (
                        <a className="button nav-button" href="https://github.com/seabAu">
                            <AiFillGithub className={ `fa fa-2x nav-button-icon icon` } />
                            <div className={ `nav-button-text` }>
                                GitHub
                            </div>
                        </a>
                    ),
                    (
                        <a className="button nav-button" href="https://www.linkedin.com/in/sean-brown-116b4b79/">
                            <AiFillLinkedin className={ `fa fa-2x nav-button-icon icon` } />
                            <div className={ `nav-button-text` }>
                                LinkedIn
                            </div>
                        </a>
                    ),
                    (
                        <a className="button nav-button" href="mailto:sean.george.brown@gmail.com">
                            <AiOutlineMail className={ `fa fa-2x nav-button-icon icon` } />
                            <div className={ `nav-button-text` }>
                                Email
                            </div>
                        </a>
                    ),
                ]
            )
        },
        {
            index: 5,
            enabled: true,
            type: 'dropdown',
            name: "resumes",
            label: 'Resume',
            link: ``,
            icon: <FaCloudDownloadAlt className={ `fa fa-2x nav-button-icon icon` } />,
            classes: `nav-list-item`,
            children: (
                fileRepo.map( ( file, index ) => {
                    return (
                        <Button
                            label={ <div className="nav-item-text">{ file.label }</div> }
                            icon={ file.hasOwnProperty( "icon" ) ? <i className="fa fa-2x nav-button-icon icon">{ file.icon }</i> : <></> }
                            classes="nav-button"
                            onClick={ ( e ) => { handleDownload( e, index ); } } />
                    );
                } )
            )
        },
        {
            index: 6,
            enabled: true,
            type: 'link',
            name: "login",
            label: ( tokenValid ? "Log Out" : "Log In" ),
            classes: `nav-list-item`,
            link: `/login`,
            icon: (
                tokenValid
                    ?
                    <FaUserTimes className={ `nav-link-item-icon icon` } />
                    :
                    <FaUser className={ `nav-link-item-icon icon` } />
            ),
            onClick: ( e ) => {
                // If not logged in, the button will say Log In.
                // If logged in, the button will say Log Out.
                let currentPath = window.location.href;
                let userToken = localStorage.getItem( "token" );
                if ( userToken ) {
                    // Currently logged in, so delete the token to log them out, and send them to the home page.
                    if ( debug ) console.log( "HEADER.JS :: DELETING TOKEN." );
                    localStorage.removeItem( "token" );
                    // navigate( "/login" );
                    dispatch( SetUser( null ) );
                    window.history.pushState( "/", '', '/' );
                    redirect( '/' );
                } else {
                    // Not logged in. Send to login page.
                    // navigate( "/login" );
                    window.history.pushState( "/login", '', '/login' );
                    redirect( '/login' );
                }
            }
        },
    ];

    useEffect( () => {
        console.log( 'App.js :: themeMode = ', themeMode );
        if ( themeBehavior === 'static' ) {
            // Reflect normal style theme changes.
            document.documentElement.setAttribute( "data-theme", themeMode );
        }
        else if ( themeBehavior === 'dynamic' ) {
            // Change theme over time based on eye strain science, and what just looks cool, influenced by the theme mode as a basis.
            document.documentElement.setAttribute( "data-theme", themeMode );
        }
    }, [ themeMode ] );

    useEffect( () => {
        console.log( 'App.js :: themeBehavior = ', themeBehavior );
        if ( themeBehavior === 'static' ) {
            // Reflect normal style theme changes.
        }
        else if ( themeBehavior === 'dynamic' ) {
            // Change theme over time based on eye strain science, and what just looks cool, influenced by the theme mode as a basis.
        }
    }, [ themeBehavior ] );
    // Whether we've CHECKED for token authenticity yet. If not, hold off on rerouting, to give the server a moment to respond. 
    const [ authenticated, setAuthenticated ] = useState( false );

    // Make sure a visitor is successfully logged in before letting them access any page other than "/admin-login".
    useEffect( () => {
        // Run stored token through auth checks and make sure access is confirmed.
        // setAuthorized(auth(["admin"]));
        authUser( [ "admin" ] );
    }, [] );

    // Database API Call
    useEffect( () => {
        if ( !portfolioData ) {
            if ( !offlineMode ) {
                getPortfolioData();
            }
            else {
                // TODO :: Replace this with skeleton elements.

                if ( debug )
                    console.log( "App.js :: offlineMode :: data imported from local data file = ", local_portfolio_data, " :: file location = ", "./resources/localData.json" );
                dispatch( SetPortfolioData( local_portfolio_data ) );
                dispatch( ReloadData( false ) );
                dispatch( SetLoading( false ) );
            }
        }
    }, [ portfolioData ] );

    useEffect( () => {
        if ( reloadData ) {
            getPortfolioData();
        }
    }, [ getPortfolioData ] );

    useEffect( () => {
        // Debug output for tracking important values. 
        if ( debug )
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
    ] );

    useEffect( () => {
        if ( debug ) console.log( "App.js :: authRef.current is now = ", authRef.current );
    }, [ authRef.current ] );

    return (
        <div
            className={ `App` }
            data-theme={ themeMode }
            style={ {} }
        >
            { loading ? <Loader /> : null }
            { (
                portfolioData && (
                    <div className={ `page-container theme-${ themeMode }` }>
                        {/* { loading ? <Loader /> : null } */ }
                        <BrowserRouter>
                            <Header
                                enabled={ true }
                                user={ user }
                                nav={ nav }
                                layout={ "column" }
                                appearance={ "glassmorphic" }
                            ></Header>
                            {/* 
                        <Sidebar
                            enabled={ true }
                            expanded={ false }
                            headerNav={ [] }
                            nav={ nav }
                            footerNav={ sidebarFooterNav }
                        >

                        </Sidebar> */}

                            <Routes>
                                <Route
                                    index
                                    path="/"
                                    element={ <Landing /> }
                                />
                                <Route
                                    path={ `/portfolio` }
                                    element={ <Home defaultActiveIndex={ 0 } /> }
                                />
                                {/* {
                                    portfolioPages.filter( ( page ) => ( page.enabled ) ).map( ( page, index ) => (
                                        <Route
                                            path={ `/portfolio/${ page.slug }` }
                                            element={ <Home pages={ portfolioPages } defaultActiveIndex={ index } /> }
                                        />
                                    ) )
                                } */}
                                <Route
                                    path="/login"
                                    element={ <Login /> }
                                />
                                <Route
                                    path="/blog"
                                    element={ <Blog /> }
                                />
                                {/*
                        <Route
                            path="/apps"
                            element={<Apps />}
                        />
                        <Route
                            path="/api"
                            element={<API />}
                        />
                    */}
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute
                                            redirectPath="/"
                                            isAllowed={ ( !!user && user?.role?.includes( "admin" ) ) }>
                                            <Admin />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={ <Errpage /> }
                                />
                            </Routes>
                            <Footer></Footer>
                        </BrowserRouter>
                    </div>
                )
            ) }
        </div>
    );
}

export default App;



/*
    const getPortfolioData2 = async () => {
        try {
            dispatch( SetLoading( true ) );
            dispatch( ReloadData( false ) );
            const response = await API.get( `/api/portfolio/get-portfolio-data` )
                .then( ( res ) => {
                    if ( debug )
                        console.log(
                            "App.js :: getPortfolioData :: res = ",
                            res,
                        );
                    dispatch( SetPortfolioData( res.data ) );

                    // Set reloadData flag false.
                    dispatch( ReloadData( false ) );
                } )
                .catch( ( err ) => {
                    if ( debug ) console.error( err );

                    // Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
                    dispatch( ReloadData( false ) );
                } );

            // console.log( response.data );
            dispatch( SetPortfolioData( response.data ) );
            // Set reloadData flag false.
            /// dispatch(ReloadData(false));
            dispatch( SetLoading( false ) );
        } catch ( error ) {
            dispatch( SetLoading( false ) );
        }
    };

*/

/*
    const auth = async ( requiredRoles = [] ) => {
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

        if ( debug )
            console.log( "Admin index.js :: auth :: token = ", token );
        try {
            const response = await API.get( "/api/users/auth/user", {
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json",
                },
            } );

            if ( debug )
                console.log(
                    "Admin index.js :: auth :: full response = ",
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
                        "Admin index.js :: auth :: auth = ",
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
                        "Auth requiredRoles = ",
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
                    "Auth requiredRoles = ",
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

*/
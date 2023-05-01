import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt, FaFilePdf, FaUser, FaUserTimes, FaTimesCircle, FaThList } from "react-icons/fa";

import API from "../../api/api.js";
import Button from "../Button";
import "./nav.css";
import "./header.css";

import * as utils from "../../utilities";
function Header ( props )
{
    const navigate = useNavigate();
    const { debug, loading, portfolioData, reloadData, loggedIn, token, role, user } = useSelector((state) => state.root);

    const [showDropdown, setShowDropdown] = React.useState(false);
    const showDropdownRef = useRef(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [ height, setHeight ] = useState( window.innerHeight );
    
    const handleDownload = (event, fileID) => {
        let file;
        // let filepath;
        if (fileID === 1) {
            file = "Sean G Brown Web Developer Resume (March 2023).pdf";
        } else if (fileID === 2) {
            file = "Sean G Brown EE Resume (March 2023).pdf";
        }
        // Check if the public url has a "/" at the end.
        // var pubURL = process.env.PUBLIC_URL;
        // console.log( "pubURL = ", pubURL, pubURL.endsWith( '/' ) );

        // filepath =
        //     process.env.PUBLIC_URL +
        //     (process.env.PUBLIC_URL.endsWith("/") ? "" : "/") +
        //     "files" +
        //     "/" +
        //     file;
        // using Java Script method to get PDF file
        fetch(file).then((response) => {
            response.blob().then((blob) => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = file;
                alink.click();
            });
        });
        // if(debug)console.log("HandleDownload triggered :: ", "\n", "fileID = ", fileID, "\n", "file = ", file, "\n", "filepath = ", filepath);
    };

    function onHover(toggle) {
        const button = document.querySelector("#menu-button");
        const menu = document.querySelector("#menu");
        if (menu) {
            if (toggle) {
                menu.classList.remove("md:hidden");
            } else {
                menu.classList.add("md:hidden");
            }
        }
    }

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        // if(debug)console.log(
        //     "HEADER :: updateDimensions ::  ",
        //     "\n",
        //     "window.innerWidth = ",
        //     window.innerWidth,
        //     "\n",
        //     "window.innerHeight = ",
        //     window.innerHeight,
        //     "\n",
        //     "showDropdown = ",
        //     showDropdown,
        // );
    };

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const loginOnClick = () => {
        // If not logged in, the button will say Log In.
        // If logged in, the button will say Log Out.
        let currentPath = window.location.href;
        let loggedIn = localStorage.getItem("token");
        if (debug) console.log("Currently logged in? = ", loggedIn, " :: currentPath = ", currentPath);

        if (loggedIn) {
            // Currently logged in, so delete the token to log them out, and send them to the home page.
            // window.location.href = "/admin";
            if (debug) console.log("HEADER.JS :: DELETING TOKEN.");
            localStorage.removeItem("token"); 
            /// window.location.href = "/"; 
            navigate("/login");
        } else {
            // Not logged in. Send to login page.
            /// window.location.href = "/login";
            navigate("/login");
        }
    };

    const headerNav = ( show ) =>
    {
        let userData = user;
        let userRole = userData.hasOwnProperty("role") ? userData.role : "guest";
        let userToken = userData.hasOwnProperty("token") ? userData.token : "";
        // let token = localStorage.getItem("token");
        let tokenValid = utils.val.isValid(userToken, true);

        if ( debug )
            console.log(
			"HEADER.JS :: headerNav :: show = ",
			show,
			" :: tokenValid = ",
			tokenValid,
			" :: userData = ",
			userData,
			" :: userRole = ",
			userRole,
			" :: userToken = ",
			userToken,
		);
        return (
			<ul className="nav-list flex justify-between whitespace-nowrap h-full">
				<li className="nav-list-item h-full">
					<Link
						className="nav-button"
						to={`${window.location.href.includes("/portfolio") ? (["admin", "superadmin"].includes(userRole) ? "/admin" : "/") : "/portfolio"}`}>
						<Button
							classes="nav-button"
							label={
								<div className="nav-button-text">
									{
										window.location.href.includes("/portfolio") ? (["admin", "superadmin"].includes(userRole) ? "Admin" : "Home") : "Portfolio"
										// localStorage.getItem( "token" ) ? "Admin" : "Portfolio" )
									}
								</div>
							}
							icon={<FaThList className="nav-button-icon icon" />}
							onClick={(event) => {
								/// route("/admin");
							}}></Button>
					</Link>
				</li>
				<li className="nav-list-item h-full">
					<Button.Dropdown
						// open={showDropdown}
						// setOpen={handleDropdown}
						label={<FaCloudDownloadAlt className="nav-button-icon icon" />}>
						<Button
							label={<div className="nav-button-text">Developer Resume (PDF)</div>}
							icon={<FaCloudDownloadAlt className="nav-button-icon icon" />}
							classes="nav-button"
							onClick={(event) => {
								handleDownload(event, 1);
							}}></Button>
						<Button
							label={<div className="nav-button-text">Engineering Resume (PDF)</div>}
							icon={<FaCloudDownloadAlt className="nav-button-icon icon" />}
							classes="nav-button"
							onClick={(event) => {
								handleDownload(event, 2);
							}}></Button>
					</Button.Dropdown>
				</li>
				<li className="nav-list-item h-full">
					<Button
						label={<div className="nav-button-text">{tokenValid ? "Log Out" : "Log In"}</div>}
						icon={<i className="nav-button-icon icon">{tokenValid ? <FaUserTimes className={`nav-icon`} /> : <FaUser className={`nav-icon`} />}</i>}
						classes="nav-button"
						onClick={(event) => {
							loginOnClick();
						}}></Button>
				</li>
			</ul>
		);
    };

    return (
        <div
            className={`page-header w-full
                ${
                    width > 768
                        ? // width over 768px:
                          "flex-row"
                        : showDropdown
                        ? // showDropdown == true && width under 768px:
                          "h-auto flex-column"
                        : // showDropdown == false && width under 768px:
                          "h-full flex-row"
                    // : "hidden w-0"
                }
            `}>
            <div
                className={`page-header-left flex align-middle items-center h-full ${
                    width > 768
                        ? "justify-end"
                        : showDropdown // & width under 768px
                        ? // showDropdown == true && width under 768px:
                          "justify-center whitespace-nowrap"
                        : // showDropdown == false && width under 768px:
                          "justify-center whitespace-nowrap"
                }`}>
                <div className="page-header-logo-container">
                    <div className="page-header-icon-container">
                        <Link
                            to={`${
                                window.location.href.includes("/portfolio")
                                    ? (user ? (utils.ao.has(user, "role") ? ["admin", "superadmin"].includes(user.role) : "/admin") : "/")
                                        ? "/admin"
                                        : "/"
                                    : "/portfolio"
                            }`}>
                            <img
                                className="page-header-icon"
                                src={process.env.PUBLIC_URL + "/assets/img/portfolio_icon.jpg"}
                                alt="User Icon"
                                onClick={(event) => {
                                    // iconOnClick();
                                }}></img>
                        </Link>
                    </div>
                    <div className="page-header-title-container">
                        <div className="page-header-title">
                            <h1 className="text-textColor ">S</h1>
                            <h1 className="text-highlightColor ">G</h1>
                            <h1 className="text-textColor ">B</h1>
                        </div>
                    </div>
                </div>
                {width < 768 && (
                    <div className="page-header-dropdown-toggle">
                        <svg
                            id="menu-button"
                            xmlns="http://www.w3.org/2000/svg"
                            // lg:hidden
                            className={`nav-toggle-button h-6 w-6 cursor-pointer 
                    text-lg text-gray-700`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={(e)=>{setShowDropdown(showDropdown === true ? false : true);}}
                            // onClick={onHover(true)}
                            // onMouseOver={onHover(true)}
                            // onMouseOut={onHover(false)}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </div>
                )}
            </div>

            <div
                id="menu"
                className={`page-header-right w-max ${
                    width > 768
                        ? "flex justify-end w-auto"
                        : showDropdown // & width under 768px
                        ? "flex justify-center w-full whitespace-nowrap"
                        : "section-hidden"
                }`}>
                {
                    // width > 768 && headerNav( true )
                    headerNav(true)
                }
            </div>
        </div>
    );
}

export default Header;
/*  const iconOnClick = () => {
        let currentPath = window.location.href;
        let loggedIn = localStorage.getItem("token");
        if (debug) console.log("Currently logged in? = ", loggedIn, " :: currentPath = ", currentPath);

        if (loggedIn) {
            // Currently logged in. Send to admin dashboard page.
            // if ( currentPath === '/admin' )
            if (currentPath.includes("/admin")) {
                // Currently in admin directory.
                window.location.href = "/";
            } else if (currentPath.includes("/") || currentPath.includes("/portfolio")) {
                // Currently in the main site.
                // if (currentPath === '/' || currentPath === '/portfolio')
                window.location.href = "/admin";
            }
        } else {
            // Not logged in. Send to login page.
            // / window.location.href = "/login";
            window.location.href = currentPath.includes("/portfolio") ? (window.location.href = "/") : (window.location.href = "/portfolio");
        }
    };

    const handleDropdown = (event) => {
        setShowDropdown(showDropdown === true ? false : true);
    };
*/ 

/*  // Kind of a temporary function; provide a destination and current location and this will check it against the user's permissions to see if they can go there. If not, it will route to a public location like the landing page or portfolio site.
    const route = (dest) => {
        let src = window.location.href;
        let token = localStorage.getItem("token");
        if (debug) console.log("HEADER index.js :: route(", dest, ") :: src = ", src, ", token = ", token, ", role = ", role, ", userdata = ", user);
        if (dest === "/") {
            // Public page, send them on their way.
            window.location.href = "/";
        } else if (dest === "/portfolio") {
            // Public page, send them on their way.
            window.location.href = "/portfolio";
        } else if (dest === "/admin") {
            if (debug)
                console.log(
                    "HEADER index.js :: route(",
                    dest,
                    ") :: Trying to go to admin. Checking auth. :: src = ",
                    src,
                    ", token = ",
                    token,
                    ", role = ",
                    role,
                    ", userdata = ",
                    user,
                );
            if (token) {
                // We are logged in. Check for permissions.

                if (role) {
                    if (debug) console.log("HEADER index.js :: route(", dest, ") :: Role is set :: ", role);
                    if (role === "guest") {
                        window.location.href = "/portfolio";
                    } else if (role === "admin") {
                        if (debug) console.log("HEADER index.js :: route(", dest, ") :: Role is admin, proceeding to admin panel!!!");
                        window.location.href = "/admin";
                    } else {
                        window.location.href = "/";
                    }
                } else {
                    window.location.href = "/";
                }
                /// window.location.href = "/admin";
            }
            /// window.location.href = "/";
        } else {
            window.location.href = "/";
        }
    };

    const checkauth = async (requiredRoles = []) => {
        // Get the session token from the stored token, if there is one. If there isn't one, automatically reject.
        let token = localStorage.getItem("token");
        if (debug) console.log("HEADER index.js :: auth :: token = ", token);
        try {
            const response = await API.get("/api/users/auth/user", {
                headers: {
                    "x-auth-token": token,
                    "Content-type": "application/json",
                },
            });

            if (debug) console.log("Admin index.js :: auth :: response = ", response);
            if (response.data.success) {
                // Successfully authenticated.
                // Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
                let auth = utils.ao.deepGetKey(response.data, "auth");
                let role = utils.ao.deepGetKey(response.data, "role");
                if (debug) console.log("HEADER index.js :: auth :: auth = ", auth, " :: role = ", role);
                if (requiredRoles.includes(role)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                // Failed to log in. Return to homepage.
                // window.location.href = "/";
                if (debug) console.log("Auth requiredRoles = ", requiredRoles, " :: response.data.message = ", response.data.message);
                return false;
            }
        } catch (error) {
            if (debug) console.log("Auth requiredRoles = ", requiredRoles, " :: error.message = ", error.message);
            return false;
        }
    };

    const authroute = (dest) => {
        let src = window.location.href;
        let token = localStorage.getItem("token");
        console.log("HEADER index.js :: route(", dest, ") :: src = ", src, ", token = ", token, ", role = ", role, ", userdata = ", user);
        if (dest === "/") {
            // Public page, send them on their way.
            return "/";
        } else if (dest === "/portfolio") {
            // Public page, send them on their way.
            return "/portfolio";
        } else if (dest === "/admin") {
            console.log(
                "HEADER index.js :: route(",
                dest,
                ") :: Trying to go to admin. Checking auth. :: src = ",
                src,
                ", token = ",
                token,
                ", role = ",
                role,
                ", userdata = ",
                user,
            );
            if (token) {
                // We are logged in. Check for permissions.

                if (role) {
                    console.log("HEADER index.js :: route(", dest, ") :: Role is set :: ", role);
                    if (role === "guest") {
                        return "/portfolio";
                    } else if (role === "admin") {
                        console.log("HEADER index.js :: route(", dest, ") :: Role is admin, proceeding to admin panel!!!");
                        return "/admin";
                    } else {
                        return "/";
                    }
                } else {
                    return "/";
                }
                /// window.location.href = "/admin";
            }
            /// window.location.href = "/";
        } else {
            return "/";
        }
    };
*/ 

/*          <div
                className={`page-header-center ${
                    width < 768 ? "" : "hidden w-0"
                }`}>
                <svg
                    id="menu-button"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`burger-menu h-6 w-6 cursor-pointer lg:hidden 
                    text-lg text-gray-700`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleDropdown}
                    // onClick={onHover(true)}
                    // </div>onMouseOver={onHover(true)}
                    // </div>onMouseOut={onHover(false)}
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </div>
            <HeaderNav
                showDropdown={showDropdown}
                handleDropdown={handleDropdown}
                loginOnClick={loginOnClick}
                width={width}
                height={height}></HeaderNav>
*/

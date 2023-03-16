import React, { useState, useEffect, useRef } from "react";
import HeaderNav from "./HeaderNav";
import { FaCloudDownloadAlt, FaFilePdf } from "react-icons/fa";
import "./nav.css";
import "./header.css";
function Header() {
    const [showDropdown, setShowDropdown] = React.useState(false);
    const showDropdownRef = useRef(false);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const handleDownload = ( event, fileID ) =>
    {
        let file;
        let filepath;
        if ( fileID === 1 )
        {
            file = "Sean G Brown Web Developer Resume (March 2023).pdf";
        }
        else if ( fileID === 2 )
        {
            file = "Sean G Brown EE Resume (March 2023).pdf";
        }
        filepath = process.env.PUBLIC_URL + "files/" + file;
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
        console.log("HandleDownload triggered :: ", "\n", "fileID = ", fileID, "\n", "file = ", file, "\n", "filepath = ", filepath);
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
        // console.log(
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
    const handleLogin = () => {
        if (window.location.href === "/") {
            console.log(localStorage.getItem("token"));
            if (!localStorage.getItem("token")) {
                window.location.href = "/login";
            } else {
                window.location.href = "/admin";
            }
        } else {
            window.location.href = "/";
        }
    };
    // useEffect(() => {
    //     // setShowDropdown(false);
    //     console.log("HEADER :: showDropdown.current", showDropdown.current);
    // }, [showDropdown.current]);

    // useEffect(() => {
    //     // setShowDropdown(false);
    //     console.log("HEADER :: window.innerWidth = ", window.innerWidth,);
    // }, [window.innerWidth]);

    const handleDropdown = (event) => {
        // setShowDropdown(!showDropdown);
        if (showDropdown === false) {
            setShowDropdown(true);
        } else if (showDropdown === true) {
            setShowDropdown(false);
        }
        // if (showDropdown.current) {
        //     showDropdown.current = false;
        // } else {
        //     showDropdown.current = true;
        // }
        // showDropdown.current = !showDropdown.current;
    };

    const headerNav = (show) =>
    {
        return (<ul className="nav-button-row text-base text-gray-700 md:flex md:justify-between p-0 whitespace-nowrap">
                    <li>
                        <button className="nav-button" onClick={handleDownload}>
                            <div className="nav-button-text">
                                Developer Resume (PDF)
                            </div>
                            <i className="nav-button-icon pdf-icon">
                                {FaCloudDownloadAlt}
                            </i>
                        </button>
                    </li>
                    <li>
                        <button className="nav-button" onClick={handleDownload}>
                            <div className="nav-button-text">
                                Engineering Resume (PDF)
                            </div>
                            <i className="nav-button-icon pdf-icon">
                                {FaCloudDownloadAlt}
                            </i>
                        </button>
                    </li>
                    <li>
                        <button className="nav-button" onClick={handleLogin}>
                            <div className="nav-button-text">
                                {localStorage.getItem("token") == null
                                    ? "Log In"
                                    : "Log Out"}
                            </div>
                            <i className="nav-button-icon user-icon">
                                {FaCloudDownloadAlt}
                            </i>
                        </button>
                    </li>
                </ul>);
    }

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
                        <img
                            className="page-header-icon"
                            src={
                                process.env.PUBLIC_URL +
                                "/assets/img/portfolio_icon.jpg"
                            }
                            alt="User Icon"
                            onClick={handleLogin}></img>
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
                            onClick={handleDropdown}
                            // onClick={onHover(true)}
                            // </div>onMouseOver={onHover(true)}
                            // </div>onMouseOut={onHover(false)}
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
                    <ul className="nav-list flex justify-between whitespace-nowrap h-full">
                        <li className="nav-list-item h-full">
                            <button
                                className="nav-button"
                                onClick={(event)=>{
                                    handleDownload(event, 1)
                                }}>
                                <div className="nav-button-text">
                                    Developer Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                        <li className="nav-list-item h-full">
                            <button
                                className="nav-button"
                                onClick={(event)=>{
                                    handleDownload(event, 2)
                                }}>
                                <div className="nav-button-text">
                                    Engineering Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                        <li className="nav-list-item h-full">
                            <button
                                className="nav-button"
                                onClick={handleLogin}>
                                <div className="nav-button-text">
                                    {localStorage.getItem("token") == null
                                        ? "Log In"
                                        : "Log Out"}
                                </div>
                                <i className="nav-button-icon user-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                    </ul>
                }
            </div>
        </div>
    );
}

export default Header;

/*

            <div
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
                handleLogin={handleLogin}
                width={width}
                height={height}></HeaderNav>
*/
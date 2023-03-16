import React, { useState, useEffect, useRef } from "react";
import { FaCloudDownloadAlt, FaFilePdf } from "react-icons/fa";
function Header() {
    // const [showDropdown, setShowDropdown] = React.useState(false);
    const showDropdown = React.useRef(false);
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
    const handleDownload = (event) => {
        console.log("HandleDownload triggered.");
    };

    useEffect(() => {
        // setShowDropdown(false);
        console.log( "HEADER :: showDropdown.current", showDropdown.current );
    }, [showDropdown.current]);

    const handleDropdown = (event) => {
        // setShowDropdown(!showDropdown);
        if ( showDropdown.current )
        {
            showDropdown.current = false;
        }
        else
        {
            showDropdown.current = true;
        }
        // showDropdown.current = !showDropdown.current;
    };
    
    function onHover ( toggle )
    {
        const button = document.querySelector("#menu-button");
        const menu = document.querySelector( "#menu" );
        if ( menu )
        {
            if (toggle) {
                menu.classList.remove("md:hidden");
            } else {
                menu.classList.add('md:hidden');
            }
        }
      }
    return (
        <header className="">
            <nav
                className="
                    page-header
                    flex flex-wrap
                    items-center
                    justify-between
                    w-full
                    md:py-0
                    md:h-auto
                    px-4
                    text-lg text-gray-700
                    bg-primary
                ">
                <div className="page-header-left">
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
                    <div className="md:hidden block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="menu-button"
                            className={`h-6 w-6 cursor-pointer lg:hidden block`}
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
                </div>
                <div
                    className={`page-header-right w-auto flex align-middle items-end ${
                        showDropdown.current ? "" : "hidden"
                    }`}
                    id="menu">
                    <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
                        <li>
                            <button
                                className="px-4 h-auto block hover:bg-purple-400"
                                onClick={handleDownload}>
                                <div className="nav-button-text">
                                    Developer Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                        <li>
                            <button
                                className="px-4 h-auto block hover:bg-purple-400"
                                onClick={handleDownload}>
                                <div className="nav-button-text">
                                    Engineering Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                        <li>
                            <button
                                className="px-4 h-auto block hover:bg-purple-400"
                                onClick={handleLogin}>
                                <div className="nav-button-text">
                                    {localStorage.getItem("token") == null
                                        ? "Log In"
                                        : "Log Out"}
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;

/*
        <div className="page-header ">
            <div className="page-header-left">
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
            <div className="page-header-center"></div>
            <div className="page-header-right">
                <div className="nav-container">
                    <ul className="nav-list-container nav-collapse">
                        <li className="nav-list-item">
                            <button className="nav-button" onClick={handleDownload}>
                                <div className="nav-button-text">
                                    Download Engineering Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>

                        <li className="nav-list-item">
                            <button className="nav-button" onClick={handleDownload}>
                                <div className="nav-button-text">
                                    Download Developer Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>

                        <li className="nav-list-item">
                            <button
                                className="nav-button"
                                onClick={handleLogin}>
                                <div className="nav-button-text">
                                    {localStorage.getItem("token") == null
                                        ? "Log In"
                                        : "Log Out"}
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        */
/*
import React from "react";
import { FaCloudDownloadAlt, FaFilePdf } from "react-icons/fa";
function Header() {
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
    const handleDownload = (event) =>
    {
        console.log( "HandleDownload triggered." );
    }
    return (
        <div className="page-header ">
            <div className="page-header-left">
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
            <div className="page-header-center"></div>
            <div className="page-header-right">
                <div className="nav-container">
                    <ul className="nav-list-container nav-collapse">
                        <li className="nav-list-item">
                            <button className="nav-button" onClick={handleDownload}>
                                <div className="nav-button-text">
                                    Download Engineering Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>

                        <li className="nav-list-item">
                            <button className="nav-button" onClick={handleDownload}>
                                <div className="nav-button-text">
                                    Download Developer Resume (PDF)
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>

                        <li className="nav-list-item">
                            <button
                                className="nav-button"
                                onClick={handleLogin}>
                                <div className="nav-button-text">
                                    {localStorage.getItem("token") == null
                                        ? "Log In"
                                        : "Log Out"}
                                </div>
                                <i className="nav-button-icon pdf-icon">
                                    {FaCloudDownloadAlt}
                                </i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;

*/

/*
<button
    className="button text-highlightColor"
    onClick={() => {
        window.location.href = "/admin-login";
    }}>
    Log In
</button>*/

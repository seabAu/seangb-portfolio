import React, { useState, useEffect, useRef } from "react";
import { FaCloudDownloadAlt, FaFilePdf } from "react-icons/fa";
import "./nav.css";

function HeaderNav(props) {
    const { showDropdown, handleDropdown, handleLogin, width,
        height } = props;
    const handleDownload = (event) => {
        console.log("HandleDownload triggered.");
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
    return (
        <>
            <div
                className={`${
                    width < 768 ? "page-header-center " : "hidden w-0"
                }`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 cursor-pointer lg:hidden 
                    text-lg text-gray-700`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={handleDropdown}
                    // onClick={onHover(true)}
                    // </div>onMouseOver={onHover(true)}
                    // </div>onMouseOut={onHover(false)}
                    id="menu-button">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </div>
            <div
                className={`${
                    width > 768
                        ? "page-header-right h-full w-full flex align-middle items-center justify-end"
                        : showDropdown // & width under 768px
                        ? "page-header-right h-full w-full flex align-middle items-center justify-center whitespace-nowrap"
                        : "hidden w-0"
                }`}
                id="menu">
                <ul className="nav-button-row text-base text-gray-700 md:flex md:justify-between p-0 whitespace-nowrap">
                    <li>
                        <button
                            className="nav-button p-1 h-full hover:bg-quinary"
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
                            className="nav-button p-1 h-full"
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
                            className="nav-button p-1 h-full"
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
        </>
    );
}

export default HeaderNav;

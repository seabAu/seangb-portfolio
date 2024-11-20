import React, { useState, useEffect, useRef } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    Link,
    Navigate,
    useNavigate
} from "react-router-dom";
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
    FaCameraRetro,
    FaCogs,
    FaComments,
    FaFilm,
    FaGlobe,
    FaHome,
    FaInfo,
    FaMapMarker,
    FaPowerOff
} from "react-icons/fa";
import * as utils from 'akashatools';

// import "./nav.css";
// import "./header.css";
import "./Sidebar.css";
import Button from "../Button";

export const buildNav = ( controls ) => {
    // if ( debug )
    //     console.log(
    // 	"HEADER.JS :: headerNav :: show = ",
    // 	show,
    // 	" :: tokenValid = ",
    // 	tokenValid,
    // 	" :: userData = ",
    // 	userData,
    // 	" :: userRole = ",
    // 	userRole,
    // 	" :: userToken = ",
    // 	userToken,
    // );

    let elements = [];

    controls.forEach( ( nav, index ) => {
        // Create button element. No matter what type this nav button is - the part wrapped around the button itself - the button itself will be the same.

        if ( nav.type === 'navlink' ) {
            elements.push(
                <li
                    className={ `sidebar-nav-item` }
                    key={ `nav-button-${ nav.index }-${ nav.name }` }
                >
                    <Link
                        className={ `nav-item-link ${ nav.classes ? nav.classes : '' }` }
                        to={ `${ nav.link }` }>
                        { nav.icon && nav.icon }
                        { nav.label && <div className="nav-text">{ nav.label }</div> }
                    </Link>
                </li>
            );
        }
        else if ( nav.type === 'href' ) {
            elements.push(
                <li
                    className={ `sidebar-nav-item` }
                    key={ `nav-button-${ nav.index }-${ nav.name }` }
                >
                    <a
                        className={ `nav-item-link ${ nav.classes ? nav.classes : '' }` }
                        href={ `${ nav.link }` }>
                        { nav.icon && nav.icon }
                        { nav.label && <div className="nav-text">{ nav.label }</div> }
                    </a>
                </li>
            );
        }
        else if ( nav.type === 'button' ) {
            // Just the button.
            elements.push(
                <li
                    className={ `sidebar-nav-item` }
                    key={ `nav-button-${ nav.index }-${ nav.name }` }
                >
                    <Button
                        classes={ `nav-item-link ${ nav.classes ? nav.classes : '' }` }
                        // label={ nav.label ? <div className="nav-button-text">{ nav.label }</div> : '' }
                        // label={ nav.label ? nav.label : '' }
                        icon={ nav.icon ? nav.icon : '' }
                        onClick={ nav.onClick ? nav.onClick : ( e ) => { } }>
                        { nav.label && <span className={ `nav-text` }>{ nav.label }</span> }
                    </Button>
                </li>
            );
        }
        else if ( nav.type === 'dropdown' ) {
            elements.push(
                <li
                    className={ `sidebar-nav-item` }
                    key={ `nav-button-${ nav.index }-${ nav.name }` }
                >

                    
                    <div 
                        className={ `nav-item-link ${ nav.classes ? nav.classes : '' }` }
                        // label={ nav.label ? nav.label : '' }
                        // icon={ nav.icon ? nav.icon : '' }
                    >
                        { nav.icon && nav.icon }
                        { nav.label && <div className="nav-text">{ nav.label }</div> }
                        { nav.children ? nav.children : <></> }
                    </div>
                </li>
            );
        }
    } );

    return (
        <ul className="sidebar-nav">
            { elements }
        </ul>
    );
};

const Sidebar = ( props ) => {
    const {
        expanded = false,
        overrideStyles,
        classes,
        header,
        headerNav = [],
        body,
        nav = [],
        footer,
        footerNav = [],
        layout = "column", // ROW | COL | MOSAIC | DROPDOWN
        appearance = `glassmorphic`, // FLAT (or DEFAULT) | NEUMORPHIC | GLASSMORPHIC | CONSOLE
        children,
    } = props;


    return (
        <div
            className={ `${ overrideStyles ? overrideStyles : `sidebar`
                } ${ classes ? classes : ''
                } ${ appearance
                    ? appearance === `glassmorphic`
                        ? `sidebar-glassmorphic`
                        : appearance === `neumorphic`
                            ? `sidebar-neumorphic`
                            : appearance === `console`
                                ? `sidebar-console`
                                : appearance === `control`
                                    ? `sidebar-control`
                                    : ``
                    : ``
                }` }>

            <Sidebar.Header
                nav={ headerNav }
                appearance={ appearance }
            >

            </Sidebar.Header>

            <Sidebar.Body
                nav={ nav }
                appearance={ appearance }
            >

            </Sidebar.Body>

            <Sidebar.Footer
                nav={ footerNav }
            >

            </Sidebar.Footer>
        </div>
    );
};


const Header = ( props ) => {
    const {
        styles,
        classes,
        nav = [],
        layout = "column", // ROW | COL | MOSAIC | DROPDOWN
        appearance = `glassmorphic`, // FLAT (or DEFAULT) | NEUMORPHIC | GLASSMORPHIC | CONSOLE
        children,
    } = props;

    return (
        <div className='sidebar-header'>
            {
                nav && buildNav( nav )
            }
        </div>
    );
};

Sidebar.Header = Header;

const Body = ( props ) => {
    const {
        styles,
        classes,
        nav = [],
        layout = "column", // ROW | COL | MOSAIC | DROPDOWN
        appearance = `glassmorphic`, // FLAT (or DEFAULT) | NEUMORPHIC | GLASSMORPHIC | CONSOLE
        children,
    } = props;

    return (
        <div className='sidebar-body'>
            {
                nav && buildNav( nav )
            }
        </div>
    );
};

Sidebar.Body = Body;

const Footer = ( props ) => {
    const {
        styles,
        classes,
        nav = [],
        layout = "column", // ROW | COL | MOSAIC | DROPDOWN
        appearance = `glassmorphic`, // FLAT (or DEFAULT) | NEUMORPHIC | GLASSMORPHIC | CONSOLE
        children,
    } = props;

    const buildFooterNav = ( items ) => {
        let elements = [];
        if ( utils.val.isValidArray( items, true ) ) {
            items.forEach( ( item, index ) => {
                elements.push(
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaPowerOff className='fa fa-2x nav-icon' />
                            <span className="nav-text">
                                { item.label }
                            </span>
                        </a>
                    </li>
                );
            } );
        }

        return (
            <ul className="sidebar-nav">
                { elements }
            </ul>
        );
    };

    return (
        <div className='sidebar-footer'>
            {
                nav && buildFooterNav( nav )
            }
        </div>
    );
};

Sidebar.Footer = Footer;

export default Sidebar;


/*

                <ul className='sidebar-nav'>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="https://jbfarrow.com">
                            <FaHome className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Community Dashboard
                            </span>
                        </a>

                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaGlobe className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Global Surveyors
                            </span>
                        </a>

                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaComments className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Group Hub Forums
                            </span>
                        </a>

                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaCameraRetro className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Survey Photos
                            </span>
                        </a>

                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaFilm className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Surveying Tutorials
                            </span>
                        </a>
                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaBook className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Surveying Jobs
                            </span>
                        </a>
                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaCogs className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Tools & Resources
                            </span>
                        </a>
                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaMapMarker className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Member Map
                            </span>
                        </a>
                    </li>
                    <li className='sidebar-nav-item nav-item'>
                        <a className='nav-item-link' href="#">
                            <FaInfo className='fa-2x nav-icon' />
                            <span className="nav-text">
                                Documentation
                            </span>
                        </a>
                    </li>
                </ul>

*/
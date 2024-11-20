import React, { Children, Component, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import * as utils from 'akashatools';
import "./Button.css";

import { FaArrowDown } from "react-icons/fa";

function Button ( props ) {
    const {
        children,
        showChildren = true,

        // Basic parameters.
        id,
        name = ``,
        label,
        icon,
        endIcon,
        ref,

        // Custom interaction functions.
        onMouseEnter = ( e ) => { },
        onMouseLeave = ( e ) => { },
        onFocus = ( e ) => { },
        onBlur = ( e ) => { },
        onClick,

        // Styling.
        type = "button", // BUTTON | SUBMIT | RESET
        appearance = `flat`, // FLAT (or DEFAULT) | NEUMORPHIC | GLASSMORPHIC | CONSOLE
        model,
        overrideStyles = false, // Override default button class styling.
        classes = "",
        styles = {},
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        // display: `${"flex"}`,
        ...styles,
        // Responsiveness overrides go here.
    };

    const buildButton = () => {
        return (
            <button
                id={ `button-${ id ?? `` }-${ Math.random() * 100000 }` }
                key={ `button-${ id ?? `` }-${ Math.random() * 100000 }` }
                className={ `${ overrideStyles ? `` : `button` } ${ classes
                    // utils.val.isValidArray(classes, true)
                    //     ? classes
                    //     : ""
                    } ${ appearance
                        ? appearance === `glassmorphic`
                            ? `button-glassmorphic`
                            : appearance === `neumorphic`
                                ? `button-neumorphic`
                                : appearance === `console`
                                    ? `button-console`
                                    : appearance === `control`
                                        ? `button-control`
                                        : ``
                        : ``
                    }` }
                style={ componentStyles }
                onClick={ onClick }
                // {...onMouseEnter ? (onMouseEnter={onMouseEnter}) : null}
                onMouseEnter={ onMouseEnter }
                onMouseLeave={ onMouseLeave }
                onFocus={ onFocus }
                onBlur={ onBlur }
                type={ [ `button`, `submit`, `reset` ].includes( type ) ? type : `button` }
            >
                { icon && icon }
                { label && <div className={ `button-text` }>{ label }</div> }
                { showChildren && children && children !== false && children }
                { endIcon && endIcon }
            </button>
        );
    };

    return buildButton();
}

function Group ( props ) {
    // For rendering and controlling a collection of buttons. These can either act independently, or as a selection array (only the last-clicked button can be active at once).
    const {
        children,
        type = "default", // DEFAULT | DROPDOWN
        layout = "row", // ROW | COL | MOSAIC | DROPDOWN
        inputProps,
        debug = false,
    } = props;
    const [ activeIndex, setActiveIndex ] = React.useState( 0 );

    // if(debug)console.log("Button.Group :: {Props} = ", props);
    return <div className={ `button-group ${ layout ? `button-group-${ layout }` : "" }` }>{ children && children !== false && children }</div>;
}
Button.Group = Group;

function Dropdown ( props ) {
    const {
        // open=false,
        // setOpen=()=>{},
        children, // Children in a dropdown are assumed to be the nav button elements in the opened dropdown. 
        active = false,
        orientation = "left",
        setActive = () => { },
        icon,
        label,
        classes = "",
        name = '',
        endIcon,
        type = "default", // DEFAULT | DROPDOWN
        layout = "row", // ROW | COL | MOSAIC | DROPDOWN
        appearance = `flat`, // FLAT (or DEFAULT) | NEUMORPHIC | GLASSMORPHIC | CONSOLE
        inputProps,
        styles = {},
        childClasses = "",
        childStyles = {},
        // Operation option booleans.
        openOnHover = false,
        openOnClick = true,
    } = props;

    // const [ active, setActive ] = useState( false );
    const [ open, setOpen ] = useState( false );
    const [ isHovering, setIsHovering ] = useState( false );

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        opacity: `${ isHovering ? `${ "1.0" }` : `0.0` }}`,
        ...styles,
        // Responsiveness overrides go here.
    };

    const containerStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        display: `${ ( open ) ? "block" : "none" }`,
        opacity: `${ isHovering ? `${ "1.0" }` : `0.0` }}`,
        ...childStyles,
        // Responsiveness overrides go here.
    };

    const buildDropdown = ( elements ) => {
        let dropdownElements = [];
        if ( utils.val.isValidArray( elements, true ) ) {
            elements.forEach( ( element, index ) => {
                dropdownElements.push(
                    <li
                        key={ `button-dropdown-item-${ index }` }
                        className={ `dropdown-item` }
                    >
                        { element }
                    </li>
                );
            } );
        }

        return (
            <ul
                className={ `dropdown-menu ` }
                style={ containerStyles }
            >
                { dropdownElements }
            </ul>
        );
    };

    const handleOnClick = () => {
        console.log( "Button.Dropdown :: onClick triggered." );
        // handleClick();
        // handleDropdown( e );
        // if ( openOnClick ) {
        // if ( open ) setOpen( false );
        // else setOpen( true );
        // }

        setOpen( !open );
        setActive( !open );
    };

    // if (debug) console.log("Button.Dropdown :: {Props} = ", props);
    return (

        <div
            className={ `dropdown dropdown-${ orientation ? orientation : 'left' } ${ layout ? `dropdown-${ layout }` : "" } ${ open ? `dropdown-active` : `` } ${ isHovering ? 'dropdown-hovering' : '' }` }
        >
            <Button
                label={ label ? label : '' }
                icon={ icon ? icon : '' }
                endIcon={ <div className={ `dropdown-toggle` }></div> }
                type={ type }
                appearance={ appearance }
                onMouseEnter={ ( e ) => {
                    // console.log( "Button.Dropdown :: onMouseEnter triggered." );
                    setIsHovering( true );
                    if ( openOnHover ) setOpen( true );
                } }
                onMouseLeave={ ( e ) => {
                    // console.log( "Button.Dropdown :: onMouseLeave triggered." );
                    // setIsHovering( false );
                    // if ( openOnHover || open ) setOpen( false );
                } }
                onClick={ ( e ) => {
                    handleOnClick();
                } }
                onBlur={ ( e ) => {
                    // Event called when we click away from the dropdown.
                    // console.log( "Button.Dropdown :: onBlur triggered." );
                    setOpen( false );
                } }
                onFocusOut={ () => {
                    // Event called when we click away from the dropdown.
                    // console.log( "Button.Dropdown :: onFocusOut triggered." );
                    setOpen( false );
                } }
                classes={ `button-full ${ classes ? classes : '' }` }
            />
            { children && buildDropdown( children ) }
        </div>
    );

}
Button.Dropdown = Dropdown;

function Controls ( props ) {
    const {
        // Content settings.
        show = true,
        // controls = [],
        layout = "row",
        appearance = "control",
        controls = [
            { label: "fullscreen", func: () => { }, classes: "" },
            { label: "edit", func: () => { }, classes: "" },
            { label: "delete", func: () => { }, classes: "" },
            { label: "share", func: () => { }, classes: "" },
        ],
        showLabels = true,
        // Styling properties.
        gap = false,
        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const controlsModel = [
        {
            name: "",
            label: "",
            icon: {},
            classes: ``,
            func: ( e ) => { },
        },
    ];

    const renderControls = () => {
        if ( debug )
            console.log( "Button.Controls.js :: renderControls :: controls = ", controls );

        return (
            <div className={ `button-controls ${ layout === 'row' ? `button-row` : layout === 'column' ? `button-col` : `` } ${ gap === true ? `button-group-gapped` : `` }` }>
                { utils.val.isValidArray( controls, true )
                    ? controls.map( ( control, index ) => {
                        return utils.ao.has( control, "label" ) && utils.ao.has( control, "onClick" ) ? (
                            <div
                                id={ `control-button-${ control.label }` }
                                key={ `control-button-${ control.label }` }
                                className={ `button ${ utils.ao.has( control, "classes" ) ? control.classes : "" } ${ appearance
                                    ? appearance === `glassmorphic`
                                        ? `button-glassmorphic`
                                        : appearance === `neumorphic`
                                            ? `button-neumorphic`
                                            : appearance === `console`
                                                ? `button-console`
                                                : appearance === `control`
                                                    ? `button-control`
                                                    : ``
                                    : ``
                                    }` }
                                onClick={ control.onClick }>
                                { showLabels && <div className={ `button-text` }>{ control.label }</div> }
                                { control.hasOwnProperty( "icon" ) ? <i className="button-icon icon">{ control.icon }</i> : <></> }
                            </div>
                        ) : (
                            <></>
                        );
                    } )
                    : "" }
            </div>
        );
    };

    if ( debug ) console.log( "Button.Controls :: {Props} = ", props );
    return show && utils.val.isValidArray( controls, true ) && renderControls();
}
Button.Controls = Controls;

export default Button;



/*
const handleDropdown = ( e ) =>
{
    // setShowDropdown(!showDropdown);
    if ( utils.dom.hasClass( e, "dropdown-toggle" ) || utils.dom.hasClass( e, "dropdown" ) || utils.dom.hasClass( e, "nav-list-item" ) )
    {
        // 
        console.log( "handleDropdown :: e = ", e, " :: Dropdown is now = ", open === true ? false : true );
        setOpen( open === true ? false : true );
    }
    // if (showDropdown.current) {
    //     showDropdown.current = false;
    // } else {
    //     showDropdown.current = true;
    // }
    // showDropdown.current = !showDropdown.current;
};

return (
    <Button
        classes={ `dropdown ${ layout ? `dropdown-${ layout }` : "" } ${ open ? `dropdown-active` : `` } ${ isHovering ? 'dropdown-hovering' : '' }` }
        label={ label ? label : '' }
        icon={ icon ? icon : '' }
        onMouseEnter={ ( e ) =>
        {
            console.log( "Button.Dropdown :: onMouseEnter triggered." );
            setIsHovering( true );
            if ( openOnHover ) setOpen( true );
        } }
        onMouseLeave={ ( e ) =>
        {
            console.log( "Button.Dropdown :: onMouseLeave triggered." );
            // setIsHovering( false );
            // if ( openOnHover || open ) setOpen( false );
        } }
        // onBlur={ ( e ) =>
        // {
        //     // Event called when we click away from the dropdown.
        //     setOpen( false );
        // }}
        // onFocus={ ( e ) =>
        // {
        //     // Event called when we click on the dropdown.
        //     setOpen( true );
        // }}
        onClick={ ( e ) =>
        {
            console.log( "Button.Dropdown :: onClick triggered." );
            // handleClick();
            // handleDropdown( e );
            if ( open ) setOpen( false );
            else setOpen( true );
        } }
        onBlur={ ( e ) =>
        {
            // Event called when we click away from the dropdown.
            console.log( "Button.Dropdown :: onBlur triggered." );
            setOpen( false );
        } }
        styles={ componentStyles }
        endIcon={<div className={ `dropdown-toggle` }></div>}
    >
        { children && buildDropdown( children ) }
    </Button>
);
*/
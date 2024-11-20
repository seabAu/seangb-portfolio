import React, { Children, Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as utils from 'akashatools';
import "./Section.css";
import { FaAngleLeft, FaAngleRight, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { FaPause, FaPlay } from "react-icons/fa6";
/*
    Section (Container)
    {
        SectionTitle {}
        SectionContent
        {
            SectionPane
            {
                SectionTitle
                SectionText
                SectionImage
                SectionPane
                    SectionTitle
                    SectionText
                    ...
                ...
            }
            SectionPane
            {
                SectionText
                SectionText
                SectionText
                SectionText
            }
        }
        SectionFooter {}
    }
*/

const fillContainerStyles = {
    // Generic inline styling for making an element fill its container.
    height: `${ "100%" }`,
    minHeight: `${ "auto" }`,
    maxHeight: `${ "100%" }`,
    width: `${ "100%" }`,
    minWidth: `${ "auto" }`,
    maxWidth: `${ "100%" }`,
};

const flexStyles = {
    // Generic inline styling for flex.
    display: `${ "flex" }`,
    flexDirection: `${ "row" }`,
    justifyContent: `${ "center" }`,
    alignItems: `${ "center" }`,
    alignContent: `${ "center" }`,
    alignSelf: `${ "center" }`,
};

const overlapStyles = {
    // Generic inline styling making an element freely overlap with others.
    display: `${ "flex" }`,
    flexDirection: `${ "row" }`,
    /// flexDirection: `${"column"}`,
    justifyContent: `${ "center" }`,
    alignItems: `${ "center" }`,
    alignContent: `${ "center" }`,
    alignSelf: `${ "center" }`,
};

const centerStyles = {
    // Generic inline styling making an element centered in its container.
    display: `${ "inline-block" }`,
    position: `${ "relative" }`,
    // position: `${"fixed"}`,
    transform: `${ "translate(0%, -50%)" }`,
    top: `${ "50%" }`,
};

function Section ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showSection = true,
        showChildren = true,
        // Responsive settings.
        responsive = true,
        responsiveBreakpoints = 768,
        // Style settings.
        type = "default",
        display = "block",
        flexDirection = "column",
        fillArea = true,
        height = "auto",
        width = "auto",
        overflowX = `hidden`,
        overflowY = `auto`,
        minHeight, //  = "auto",
        minWidth, //  = "auto",
        maxHeight, //  = "100%",
        maxWidth, //  = "100%",
        padding,
        margin = "0.0rem",
        border = "none",
        borderRadius = "0%",
        boxShadowEnabled = true,
        // Can import extra styles.
        classes = "",
        styles = {},
        // parentStyles = {},
        // childStyles = {},
    } = props;
    useEffect( () => {
        if ( children ) {
            if ( children.length > 0 ) {
            }
        }
    }, [ children ] );

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        display: `${ display ? display : 'block' }`,
        // flexDirection: `${flexDirection}`,
        // justifyContent: `${justifyContent}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        height: `${ height }`,
        // minHeight: `${minHeight}`,
        width: `${ width }`,
        // minWidth: `${minWidth}`,
        padding: `${ padding ? padding : "0.0rem" }`,
        overflowX: `${ overflowX }`,
        overflowY: `${ overflowY }`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    return (
        showSection && (
            <div
                className={ `section-container ${ classes ? classes : "" }` }
                style={
                    componentStyles
                    /// * (
                    /// *     display === 'flex' ? {
                    /// *     ...flexStyles,
                    /// *     ...sectionStyles,
                    /// * } : sectionStyles
                    /// * )
                }>
                { showChildren && children && children !== false && children }
            </div>
        )
    );
}

/*  /// * Boilerplate functional react component return statement for parent elements.
    return (
        show && (
            <div className={`component-container ${classes ? classes : ''}`} style={styles}>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
*/

/*
    const sectionStyles = {
        ...(display === 'flex' ? flexStyles : {}),
        // (display === 'flex' ? ...flexStyles : ''),
        // display: "grid",
        // gridTemplateRows: `auto 1fr auto`,
        // gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        // grid: `repeat(auto-fit, 1fr) / auto-flow 1fr`,
        display: `${display}`,
        flexDirection: `${flexDirection ? flexDirection : "column"}`,
        // * justifyContent: "center",
        // * alignItems: "center",
        // * flexDirection: `${flexDirection ? flexDirection : "column"}`,
        // * alignContent: "center",
        /// height: `${height ? (height > 100 ? 100 : height) : "auto"}%`,
        // minHeight: `${minHeight ? (fillArea ? "100%" : minHeight) : "auto"}`,
        // maxHeight: `${maxHeight ? maxHeight : "100%"}`,
        /// width: `${width ? (width > 100 ? 100 : width) : "auto"}%`, // `${width > 100 ? 100 : width}%`,
        // minWidth: `${minWidth ? (fillArea ? "100%" : minWidth) : "auto"}`,
        // maxWidth: `${maxWidth ? maxWidth : "100%"}`,
        height: `${height}`,
        minHeight: `${minHeight}`,
        maxHeight: `${maxHeight}`,
        width: `${width}`,
        minWidth: `${minWidth}`,
        maxWidth: `${maxWidth}`,
        // backgroundColor: fillercolor,
        border: `${border}`,
        borderRadius: `${borderRadius}px`,
        padding: `${padding}`,
        margin: `${margin}`,
        textAlign: "middle",
        transition: "width 1s ease-in-out",
        boxShadow: `${
            boxShadowEnabled ? "1px 1px 2px 2px rgba(0, 0, 0, 0.25)" : "none"
        }`,
        // If extra styles are passed in, make sure they override the settings here.
        ...styles,
    };

*/

function Pane ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Responsive settings.
        layout = `${ `row` }`, // ROW | COL | MOSAIC
        behavior = `${ `wrap` }`, // SPREAD | SHRINK | WRAP
        responsive = true,
        responsiveBreakpoints = 768,
        // Style settings.
        type = "default",
        flexDirection = `${ "column" }`,
        alignContent = `${ "flex-start" }`,
        justifyContent = `${ "flex-start" }`,
        flexWrap = `${ "wrap" }`,
        height = `${ "auto" }`,
        minHeight = `${ "auto" }`,
        maxHeight = `${ "100%" }`,
        width = `${ "auto" }`,
        minWidth = `${ "auto" }`,
        maxWidth = `${ "100%" }`,
        padding = `${ "0.25rem 1.0rem" }`,
        margin = `${ "0.0rem" }`,
        border = `${ "none" }`,
        borderRadius = `${ "0%" }`,
        boxShadowEnabled = `${ true }`,
        overflowX = `hidden`,
        overflowY = `hidden`,

        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        display: `${ "flex" }`,
        flexDirection: `${ flexDirection }`,
        justifyContent: `${ justifyContent }`,
        alignItems: `${ alignContent }`,
        alignContent: `${ alignContent }`,
        height: `${ height }`,
        minHeight: `${ minHeight }`,
        width: `${ width }`,
        minWidth: `${ minWidth }`,
        padding: `${ padding ? padding : "0.0rem" }`,
        overflowX: `${ overflowX }`,
        overflowY: `${ overflowY }`,
        // border: `1px solid white`,
        flexDirection: `${ layout === "col" ? "column" : "row" } !important`,
        ...styles,
        // Responsiveness overrides go here.
    };

    return (
        showParent && (
            <div
                className={ `section-pane ${ classes ? classes : "" } section-${ layout === "col" ? "col" : layout === "row" ? "row" : layout === "mosaic" ? "mosaic" : "flex" } section-pane-${ behavior === "spread" ? "spread" : behavior === "shrink" ? "shrink" : "wrap"
                    }` }
                style={
                    {}
                    // componentStyles
                }>
                { showChildren && children && children !== false && children }
            </div>
        )
    );
}
Section.Pane = Pane;

function Separator ( props ) {
    const {
        // Style settings.
        type = "default", // DEFAULT | BAR | FLAT | NEUMORPHIC | HOLLOW
        color, // = `${"white"}`,
        thickness,
        height = `${ "auto" }`,
        width = `${ "auto" }`,
        padding, // = `${"0.125rem 1.0rem"}`,
        margin = `${ "0.0rem" }`,

        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        padding: `${ padding ? padding : `0.0rem` } 1.0rem`,
        margin: `${ `${ margin } auto` }`,
        width: `${ width }`, // `${`90%`}`,
        height: `${ height }`,
        backgroundColor: `${ color ? color : `inherit` }`,
        zIndex: `100`,
        ...flexStyles,
    };

    // Select the scale class based on the scale value provided.
    // text-9xl, text-8xl, text-7xl, text-6xl, text-5xl, text-4xl, text-3xl, text-2xl, text-xl, text-lg, text-md, text-sm, text-xs
    const getStyle = ( input ) => {
        switch ( input ) {
            case `1`:
                return "hr-style-1";
            case `2`:
                return "hr-style-2";
            case `3`:
                return "hr-style-3";
            case `4`:
                return "hr-style-4";
            case `5`:
                return "hr-style-5";
            case `6`:
                return "hr-style-6";
            case `7`:
                return "hr-style-7";
            case `8`:
                return "hr-style-8";
            case `9`:
                return "hr-style-9";
            case `10`:
                return "hr-style-10";
            case `11`:
                return "hr-style-11";
            case `12`:
                return "hr-style-12";
            case `13`:
                return "hr-style-13";
            case `14`:
                return "hr-style-14";
            case `15`:
                return "hr-style-15";
            case `16`:
                return "hr-style-16";
            case `17`:
                return "hr-style-17";
            case `18`:
                return "hr-style-18";
            case `neumorphic`:
                return "hr-style-neumorphic";
            default:
                return "hr-style-neumorphic";
        }
    };

    return (
        <div
            className={ `section-bar ${ classes ? classes : "" }` }
            id={ `section-bar-${ getStyle( type ) }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
            key={ `section-bar-${ getStyle( type ) }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }>
            <hr
                className={ `${ getStyle( type ) }` }
                style={ componentStyles }
            />
        </div>
    );
}
Section.Separator = Separator;

function Header ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        title = "",
        nav = [],
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Responsive settings.
        responsive = true,
        responsiveBreakpoints = 768,
        // Style settings.
        type = "default",
        flexDirection = `${ "column" }`,
        alignContent = `${ "center" }`,
        justifyContent = `${ "flex-start" }`,
        height = `${ "auto" }`,
        minHeight = `${ "auto" }`,
        maxHeight = `${ "100%" }`,
        width = `${ "auto" }`,
        minWidth = `${ "auto" }`,
        maxWidth = `${ "100%" }`,
        padding = `${ "0.25rem 1.0rem" }`,
        margin = `${ "0.0rem" }`,
        border = `${ "none" }`,
        borderRadius = `${ "0%" }`,
        boxShadowEnabled = `${ true }`,
        overflowX = `hidden`,
        overflowY = `hidden`,

        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        /// * display: `${"flex"}`,
        /// * flexDirection: `${flexDirection}`,
        /// * justifyContent: `${justifyContent}`,
        /// * alignItems: `${alignContent}`,
        /// * alignContent: `${alignContent}`,
        /// * height: `${height}`,
        /// * minHeight: `${minHeight}`,
        /// * width: `${width}`,
        /// * minWidth: `${minWidth}`,
        /// * padding: `${padding ? padding : "0.0rem"}`,
        /// * overflowX: `${overflowX}`,
        /// * overflowY: `${overflowY}`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    return (
        showParent && (
            <div
                className={ `section-header ${ classes ? classes : "" }` }
                style={ componentStyles }>
                { showChildren && children && children !== false && children }
            </div>
        )
    );
}

Section.Header = Header;

function Content ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Responsive settings.
        layout = `${ `row` }`, // ROW | COL | MOSAIC
        behavior = `${ `nowrap` }`, // SPREAD | SHRINK | WRAP
        responsive = true,
        responsiveBreakpoints = 768,
        // Style settings.
        type = "default",
        flexDirection = `${ "column" }`,
        alignContent = `${ "center" }`,
        justifyContent = `${ "flex-start" }`,
        height = `${ "auto" }`,
        minHeight = `${ "auto" }`,
        maxHeight = `${ "100%" }`,
        width = `${ "auto" }`,
        minWidth = `${ "auto" }`,
        maxWidth = `${ "100%" }`,
        padding = `${ "0.25rem 1.0rem" }`,
        margin = `${ "0.0rem" }`,
        border = `${ "none" }`,
        borderRadius = `${ "0%" }`,
        boxShadowEnabled = `${ true }`,
        overflowX = `auto`,
        overflowY = `auto`,

        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        // display: `${"flex"}`,
        // flexDirection: `${flexDirection}`,
        // justifyContent: `${justifyContent}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        height: `${ height }`,
        minHeight: `${ minHeight }`,
        width: `${ width }`,
        minWidth: `${ minWidth }`,
        padding: `${ padding ? padding : "0.0rem" }`,
        overflowX: `${ overflowX }`,
        overflowY: `${ overflowY }`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    return (
        showParent && (
            <div
                className={ `section-content ${ classes ? classes : "" } section-${ layout === "col" ? "col" : layout === "row" ? "row" : layout === "mosaic" ? "mosaic" : "flex"
                    } section-pane-${ behavior === "spread" ? "spread" : behavior === "shrink" ? "shrink" : behavior === "wrap" ? "wrap" : "nowrap" }` }
                style={ componentStyles }>
                { showChildren && children && children !== false && children }
            </div>
        )
    );
}

Section.Content = Content;

function List ( props ) {
    // Just a handy component to handle building multiple Section.Text elements at once.
    // Later merge this into the Section.Collection component
    const {
        // Child components passed inside this component's element.
        datalabel = "",
        data,
        datatype = "array", // ARRAY | OBJECT
        datakeys = [], // Only applicable if the datatype is object.
        children,
        // Render overrides, if ever needed.
        show = true,
        // Responsive settings.
        responsive = true,
        responsiveBreakpoints = 768,
        // Style settings.
        type = "default",
        flexDirection = `${ "column" }`,
        alignContent = `${ "flex-start" }`,
        justifyContent = `${ "flex-start" }`,
        height = `${ "auto" }`,
        minHeight = `${ "auto" }`,
        maxHeight = `${ "100%" }`,
        width = `${ "auto" }`,
        minWidth = `${ "auto" }`,
        maxWidth = `${ "100%" }`,
        padding = `${ "0.25rem 1.0rem" }`,
        margin = `${ "0.0rem" }`,
        border = `${ "none" }`,
        borderRadius = `${ "0%" }`,
        boxShadowEnabled = `${ true }`,
        overflowX = `hidden`,
        overflowY = `hidden`,

        // Can import extra styles.
        classes = "",
        containerClasses = '',
        childClasses = '',
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        display: `${ "flex" }`,
        flexDirection: `${ flexDirection }`,
        justifyContent: `${ justifyContent }`,
        alignItems: `${ alignContent }`,
        alignContent: `${ alignContent }`,
        height: `${ height }`,
        minHeight: `${ minHeight }`,
        width: `${ width }`,
        minWidth: `${ minWidth }`,
        padding: `${ padding ? padding : "0.0rem" }`,
        overflowX: `${ overflowX }`,
        overflowY: `${ overflowY }`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    const data2Text = ( data, keys = [] ) => {
        let text = [];
        if ( utils.val.isObject( data ) && utils.val.isValidArray( Object.keys( data ), true ) && utils.val.isValidArray( keys, true ) ) {
            keys.forEach( ( key, index ) => {
                let idnum = Math.floor( utils.rand.rand( 0, 1e6 ) );
                let listData = {};

                let value = "-";
                if ( data.hasOwnProperty( key ) ) {
                    value = data[ key ];
                }
                // Object.defineProperty(listData, key, {
                //     value: value,
                // } );

                text.push(
                    <li
                        className={ `list-item section-list-item ${ childClasses ? childClasses : "" }` }
                        id={ `section-list-item-${ key }-${ idnum }` }
                        key={ `section-list-item-${ key }-${ idnum }` }>
                        <div className={ `section-list-item-content` }>
                            <Section.Text
                                scale={ `sm` }
                                // key={`data-${key}-${index}`}
                                // id={`data-${key}-${index}`}
                                classes={ `list-item-key` }
                                before={ `` }
                                after={ `: ` }
                                content={ utils.str.toCapitalCase( key ) }
                            />
                            <Section.Text
                                scale={ `sm` }
                                // key={`data-${key}-${index}`}
                                // id={`data-${key}-${index}`}
                                classes={ `list-item-value` }
                                before={ `` }
                                after={ `` }
                                content={ data.hasOwnProperty( key ) ? data[ key ] : "-" }
                            />
                        </div>
                    </li>,
                );
                // data.push(
                //     buildCell(columnKey, value, rowIndex, cellIndex),
                //     // buildCell(cellData, rowIndex, cellIndex),
                // );
            } );
        }
        return text;
    };

    const array2Text = ( data ) => {
        let text = [];
        if ( utils.val.isValidArray( data, true ) ) {
            data.forEach( ( val, index ) => {
                if ( val ) {
                    let idnum = Math.floor( utils.rand.rand( 0, 1e6 ) );
                    text.push(
                        <li
                            className={ `list-item section-list-item ${ childClasses ? childClasses : "" }` }
                            id={ `section-list-item-${ index }-${ idnum }` }
                            key={ `section-list-item-${ index }-${ idnum }` }>
                            <Section.Text
                                scale={ `sm` }
                                key={ `data-${ val }-${ index }` }
                                id={ `data-${ val }-${ index }` }
                                before={ `` }
                                after={ `` }
                                content={ val }
                            />
                        </li>
                    );
                }
            } );
        }
        return text;
    };

    const buildContent = ( content, keys ) => {
        return (
            <ul
                className={ `list section-list ${ containerClasses ? containerClasses : "" }` }
                style={
                    {}
                    // componentStyles
                }>
                { datalabel ? (
                    <Section.Text
                        type="title"
                        content={ `${ utils.str.toCapitalCase( datalabel.toLowerCase() ) }` }
                    />
                ) : (
                    <></>
                ) }
                {
                    // utils.val.isValidArray( data, true )
                    datatype === "array"
                        ? array2Text( data )
                        : datatype === "object" // utils.val.isObject( data )
                            ? data2Text( data, datakeys )
                            : array2Text( [ data.toString() ] )
                }
            </ul>
        );
    };

    return (
        show && (
            <div className={ `section-list-container ${ classes ? classes : "" }` }>
                { buildContent( data, datakeys ) }
            </div>
        )
    );
}

Section.List = List;

function Text ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        show = true,
        showChildren = true,
        // Content settings.
        content = "",
        type = "text", // TEXT | TITLE | SUBTITLE | CAPTION
        truncate = false,
        before,
        after,
        // yrcy = "",
        // Style settings.
        // / Container Styles
        align = "",
        justify = "",
        weight = 400,
        border,
        bg = `${ 'inherit' }`,
        boxShadow,
        // / Text Styles
        scale = "3",
        color = "text-white",
        transition = "none",
        transform = "none",
        animation = "none",
        textShadow,
        textSpacing,
        lineHeight,
        underline,
        overflowBehavior, // NONE | AUTO | WRAP | NOWRAP | HIDE
        wrapBehavior, // NONE | AUTO | WRAP | NOWRAP | HIDE
        maxLength, // After this number of characters, it cuts off with an ellipsis.

        // / Separator Styles
        separator = false,
        separatorVariant = `${ 'neumorphic' }`,
        separatorColor = `${ "rgba(0, 0, 0, 0.25)" }`,
        separatorWeight = `${ "1px" }`,
        separatorWidth = `${ `90%` }`,
        separatorMargin = `${ `0.0rem` }`,
        separatorPadding = `${ `0.0rem` }`,
        // Can import extra styles.
        containerClasses = "",
        classes = '', // = "text-highlightColor",
        styles = {},
        debug = false,
    } = props;

    // Select the scale class based on the scale value provided.
    // text-9xl, text-8xl, text-7xl, text-6xl, text-5xl, text-4xl, text-3xl, text-2xl, text-xl, text-lg, text-md, text-sm, text-xs

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // display: `${"flex"}`,
        // flexDirection: `${"row"}`,
        // justifyContent: `${"flex-start"}`,
        // alignItems: `${"flex-start"}`,
        // alignContent: `${"flex-start"}`,
        /// verticalAlign: `top`,
        /// textAlign: `left`,
        // height: `100%`,
        // width: `100%`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    const scaleConfig = [
        { name: `text-xxs`, style: { fontSize: `0.65rem`, lineHeight: `0.65rem` } },
        { name: `text-xs`, style: { fontSize: `0.75rem`, lineHeight: `1.0rem` } },
        { name: `text-sm`, style: { fontSize: `0.875rem`, lineHeight: `1.25rem` } },
        { name: `text-md`, style: { fontSize: `1.0rem`, lineHeight: `1.5rem` } },
        { name: `text-base`, style: { fontSize: `1.0rem`, lineHeight: `1.5rem` } },
        { name: `text-lg`, style: { fontSize: `1.125rem`, lineHeight: `1.75rem` } },
        { name: `text-xl`, style: { fontSize: `1.25rem`, lineHeight: `1.75rem` } },
        { name: `text-2xl`, style: { fontSize: `1.5rem`, lineHeight: `2.0rem` } },
        { name: `text-3xl`, style: { fontSize: `1.875rem`, lineHeight: `2.25rem` } },
        { name: `text-4xl`, style: { fontSize: `2.25rem`, lineHeight: `2.5rem` } },
        { name: `text-5xl`, style: { fontSize: `3.0rem`, lineHeight: `1.0` } },
        { name: `text-6xl`, style: { fontSize: `3.75rem`, lineHeight: `1.0` } },
        { name: `text-7xl`, style: { fontSize: `4.5rem`, lineHeight: `1.0` } },
        { name: `text-8xl`, style: { fontSize: `6.0rem`, lineHeight: `1.0` } },
        { name: `text-9xl`, style: { fontSize: `8.0rem`, lineHeight: `1.0` } },
    ];

    const [ textStyle, setTextStyle ] = React.useState( {} );

    useEffect( () => {
        let find = [ "text", scale ].join( "-" );
        let s = utils.ao.findOne( scaleConfig, "name", find, "style" );
        let scaleStyles = scaleConfig.filter( ( element ) => {
            if ( element.name === find ) {
                setTextStyle( element.style );
            }
            return element.name === find;
        } );
    }, [ scale ] );

    const textStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // display: `${"flex"}`,
        // flexDirection: `${"row"}`,
        // justifyContent: `${"flex-start"}`,
        // alignItems: `${"flex-start"}`,
        // alignContent: `${"flex-start"}`,
        /// verticalAlign: `top`,
        /// textAlign: `left`,
        // height: `100%`,
        // width: `100%`,
        // border: `1px solid white`,
        // ...{
        //     ...(scale
        //         ? {
        //               ...findOne(scaleConfig, "name", `text-${scale}`).style
        //           }
        //         : {
        //             fontSize: `0.75rem`,
        //             lineHeight: `0.75rem`
        //         }),
        // },
        // backgroundColor: bg,
        ...textStyle,
        ...styles,
        // Responsiveness overrides go here.
    };

    const separatorStyles = {
        padding: `${ separatorPadding }`,
        margin: `${ `${ separatorMargin } auto` }`,
        // width: `${`90%`}`,
        width: `${ separatorWidth }`,
        height: `${ separatorWeight }`,
        backgroundColor: `${ separatorColor }`,
        zIndex: `100`,
        ...flexStyles,
    };

    const getSeparatorType = ( variant ) => {
        const separatorVariants = [
            "neumorphic",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18"
        ];
        if ( variant != '' ) {
            if ( separatorVariants.includes( variant ) ) {
                return [ 'hr-style-', variant ].join( '' );
            }
            else {
                return 'hr-style-neumorphic';
            }
        }
        else {
            return 'hr-style-neumorphic';
        }
    };

    return (
        show && (
            <div
                className={ `section-text-container${ type === "title" ? " section-title" : "" } ${ containerClasses }` }
                style={ componentStyles }>
                <div
                    className={ `section-text ${ classes ? classes : "" } ${ color !== "" ? `${ color }` : `` }` }
                    style={ {
                        ...textStyles,
                        // ...textStyle,
                        // ...{ fontSize: `0.75rem`,
                        //       lineHeight: `0.75rem`},
                        // ...( {
                        //     ...scaleConfig.filter( ( element ) =>
                        //     {
                        //         let find = ["text", scale].join('-');
                        //         console.log("element.name === text-${ scale } = ", element.name === find, textStyles);
                        //         if ( element.name === `text-${ scale }` ) {
                        //             console.log( element.style );
                        //         }
                        //         return element.name === `text-${ scale }`;
                        //     } ).style,
                        //       }
                        //     ),
                    } }>
                    { `${ before ? before : "" }` }
                    { content }
                    { `${ after ? after : "" }` }
                </div>
                { separator && (
                    <div
                        className={ `section-bar ${ getSeparatorType( separatorVariant ) }` }
                        style={ separatorStyles }></div>
                ) }
                { showChildren && children && children !== false && children }
            </div>
        )
    );
}

Section.Text = Text;

function Gallery ( props ) {

}

function Image ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        content = {},
        // Render overrides, if ever needed.
        showParent = true,
        // showChildren = true,
        // Style settings.
        type = "default",
        boxShadowEnabled = true,
        // Can import extra styles.
        classes = "",
        containerStyles = {},
        elementStyles = {},
        containerClasses = "",
        elementClasses = "",
        debug = false,
    } = props;

    useEffect( () => {
        if ( debug ) console.log( `SectionImage.js :: onmount :: props = `, props );
    }, [] );

    const imageContainerStyles = {
        // display: "grid",
        // gridTemplateRows: `auto 1fr auto`,
        // gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        // grid: `repeat(auto-fit, 1fr) / auto-flow 1fr`,
        display: `${ "flex" }`,
        justifyContent: `${ "center" }`,
        alignItems: `${ "center" }`,
        /// flexDirection: `${"column"}`,
        flexDirection: `${ "row" }`,
        alignContent: `${ "center" }`,
        // height: `${"100"}%`,
        // minHeight: `${"auto"}`,
        // maxHeight: `${"auto"}`,
        // width: `${"100"}%`, // `${width > 100 ? 100 : width}%`,
        // minWidth: `${"auto"}`,
        // maxWidth: `${"auto"}`,
        // backgroundColor: fillercolor,
        border: `${ "none" }`,
        borderRadius: `${ "0" }px`,
        padding: `${ "8" }px`,
        margin: `${ "0" }`,
        transition: "width 1s ease-in-out",
        boxShadow: `${ boxShadowEnabled ? "2px 2px 2px 2px rgba(0, 0, 0, 0.25)" : "none" }`,
        // If extra styles are passed in, make sure they override the settings here.
        // ...styles,
        ...containerStyles,
    };

    const imageStyles = {
        height: `${ "auto" }`,
        minHeight: `${ "10px" }`,
        maxHeight: `${ "100%" }`,
        width: `${ "auto" }`, // `${width > 100 ? 100 : width}%`,
        minWidth: `${ "10px" }`,
        maxWidth: `${ "100%" }`,
        // backgroundColor: fillercolor,
        border: `${ "none" }`,
        borderRadius: `${ "0" }px`,
        padding: `${ "0" }`,
        margin: `${ "0" }`,
        transition: "width 0.5s ease-in",
        boxShadow: `${ boxShadowEnabled ? "1px 1px 5px 5px rgba(0, 0, 0, 0.25)" : "none" }`,
        // If extra styles are passed in, make sure they override the settings here.
        // ...styles,
        ...elementStyles,
    };

    useEffect( () => {
        // if (utils.val.isValidArray(content, true)) {
        //     let filteredContent = content;
        //     filteredContent = filteredContent.filter((img, index) => {
        //         return utils.val.isString(img) && img !== "" && img.includes("http");
        //     });
        //     if (debug) console.log(`SectionImage.js :: Useeffect for Content :: Original Content array = `, content, ` :: cleaned Content array = `, filteredContent);
        //     setImageSet(filteredContent);
        // }
    }, [ content ] );

    const [ expanded, setExpanded ] = useState( false );
    const [ isHovering, setIsHovering ] = useState( false );

    const buildContent = ( input, displayType ) => {
        let displayContent = [];
        if ( utils.val.isObject( input ) ) {
            // TODO :: Later, create standardized a way to verify that all elements in an array is a certain type.
            let imageId = utils.ao.has( input, "id" ) ? input.id : "";
            let imageLabel = utils.ao.has( input, "label" ) ? input.label : "";
            let imageUrl = utils.ao.has( input, "image" ) ? input.image : "";
            let linkUrl = utils.ao.has( input, "link" ) ? input.link : "";
            displayContent.push(
                ////<img
                ////    className={`section-img ${elementClasses}`}
                ////    style={imageStyles}
                ////    src={`${linkUrl}`}
                ////    alt={`${input.url}`}></img>,
                <a
                    key={ `section-image-${ imageId }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                    id={ `section-image-${ imageId }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                    href={ `${ linkUrl }` }
                    className={ `section-image-link` }
                    style={ {
                        ...{
                            ...overlapStyles,
                            ...( isHovering
                                ? {
                                    // height: `100% !important`,
                                    // width: `0% !important`,
                                    filter: `brightness(50%)`,
                                }
                                : {
                                    // height: `100% !important`,
                                    // width: `100% !important`,
                                    filter: `brightness(100%)`,
                                } ),
                        },
                    } }
                    onMouseEnter={ ( e ) => {
                        setIsHovering( true );
                    } }
                    onMouseLeave={ ( e ) => {
                        setIsHovering( false );
                    } }>
                    <img
                        className={ `section-image ${ elementClasses }` }
                        style={ {
                            ...{
                                ...imageStyles,
                                ...( isHovering
                                    ? {
                                        // height: `100% !important`,
                                        // width: `0% !important`,
                                        filter: `brightness(50%)`,
                                    }
                                    : {
                                        // height: `100% !important`,
                                        // width: `100% !important`,
                                        filter: `brightness(100%)`,
                                    } ),
                            },
                        } }
                        onLoad={ ( event ) => { } }
                        src={ `${ imageUrl }` }
                        alt={ `${ imageUrl }` }
                        key={ `section-image-${ imageId }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                        id={ `section-image-${ imageId }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                    // onMouseEnter={() => (isHover = true)}
                    // onMouseLeave={() => (isHover = false)}
                    />
                </a>,
            );
            // Input is valid.
            // If type is 'default', just render all of them at once.
            // displayContent = input.map((item, index) => {
            //     return utils.val.isDefined(item) ? (
            //         <img
            //             className={`section-img ${elementClasses}`}
            //             style={imageStyles}
            //             src={`${item}`}
            //             alt={`${item}`}></img>
            //     ) : (
            //         ""
            //     );
            // });
        }

        // Render a NEXT and BACK button, and utilize the state.
        return displayContent;
    };

    return (
        showParent && (
            <div
                className={ `section-img-container ${ containerClasses }` }
                style={ {
                    display: `${ "flex" }`,
                    justifyContent: `${ "center" }`,
                    alignItems: `${ "center" }`,
                    flexDirection: `${ "row" }`,
                    alignContent: `${ "center" }`,
                    overflow: `${ "hidden" }`,
                    ...imageContainerStyles,
                } }>
                { buildContent( content, type ) }
            </div>
        )
    );
}

Section.Image = Image;

function Collection ( props ) {
    const {
        children,
        type = "default", //
        content = [], // This should be an array of objects, each containing an image URL, and possibly a link if they are to be hyperlinked. Other image-specific parameters can be passed in via each object as well.
        data = [], // Full data from parent / calling component/
        datakeys = [], // The specific keys from the full data that this component is to be concerned with.
        scrollTimer = 3000,
        scrollEnabled = true,
        boxShadowEnabled = false,
        lockHeight = true,
        setLockHeight = `500px`,
        paginationType = `${ "0.65rem" }`,
        paginationSize = `${ "0.65rem" }`,
        paginationGap = `${ "0.65rem" }`,
        paginationColor = `${ "#00000047" }`,
        styles = {},
        classes = "",
        containerStyles = {},
        elementStyles = {},
        containerClasses = "",
        elementClasses = "",
        debug = false,
    } = props;

    // if ( debug ) console.log( `SectionCollection.js :: props = `, props );

    const collectionPaginationStyles = {
        borderRadius: `50%`,
        marginInline: `${ 0 }`,
        fontSize: `${ paginationSize * 0.8 }`,
    };

    const collectionPaginationContainerStyles = {
        // ...flexStyles,
        gap: `${ paginationGap }`, // Between-dot-gap
    };

    const slideshowButtonStyles = {
        height: `${ "50px" }`,
        width: `${ "50px" }`,
    };

    const collectionContainerStyles = {
        ...flexStyles,
        flexDirection: `column`,
    };

    const collectionItemStyles = {
        height: `${ lockHeight ? setLockHeight : `100%` }`,
        opacity: `0%`,
        transition: `300ms all cubic-bezier(0.645, 0.045, 0.355, 1)`
    };

    const collectionItemActiveStyles = {
        opacity: `100% !important`
    };

    const [ imageSet, setImageSet ] = useState( [] );
    const [ contentIndex, setContentIndex ] = useState( 0 );
    const [ play, setPlay ] = useState( true );

    useEffect( () => {
        // On content mount, load imageSet data.
        setImageSet( content );
    }, [ content, type ] );

    useEffect( () => {
        // Allow timed scrolling of the slideshow / carousel.
        if ( scrollEnabled ) {
            if ( type === "carousel" || type === "slideshow" ) {
                const interval = setInterval( () => {
                    handleScroll();
                }, scrollTimer );
                // Clean up function.
                return () => clearInterval( interval );
            }
        }
    } );

    const handleScroll = () => {
        // Simply ++ the index.
        if ( play ) {
            const newIndex = contentIndex + 1;
            changeContentIndex( newIndex );
        }
    };

    const changeContentIndex = ( i ) => {
        if ( utils.val.isValidArray( imageSet, true ) ) {
            if ( i < 0 ) {
                i = imageSet.length - 1;
            } else if ( i > imageSet.length - 1 ) {
                i = 0;
            }
            setContentIndex( i );
        }
    };

    const buildContent = ( input, displayType ) => {
        let displayContent = [];
        let indicators = [];
        if ( utils.val.isValidArray( input, true ) ) {
            // TODO :: Later, create standardized a way to verify that all elements in an array is a certain type.
            // input = input.filter((img, index) => {
            //     // if ( utils.val.isString( img ) )
            //     // {
            //         return ( utils.val.isString( img ) ) && (img !== '' && img.includes( "http" )); //  && img.includes("http");
            //     // }
            // });
            if ( debug ) console.log( `SectionImage.js :: Original array = `, content, ` :: cleaned image array = `, input );
            // Input is valid.
            if ( displayType === "slideshow" || displayType === "carousel" ) {
                // If type is 'slideshow', render only one at a time. Constrain all of them to the same space to avoid jitter.

                // Add a pause/play toggle button.
                indicators.push(
                    <div
                        className={ `collection-pagination-playpause` }
                        key={ `section-collection-item-playtoggle` }
                        id={ `section-collection-item-playtoggle` }
                        onClick={ ( e ) => {
                            setPlay( !play );
                        } }>
                        {
                            play ? <FaPause className="collection-pagination-icon" /> : <FaPlay className="collection-pagination-icon" />
                        }
                    </div>
                );

                // Finally, build the pagination controls.
                input.forEach( ( item, index ) => {
                    let imageUrl = utils.ao.has( item, "image" ) ? item.image : item;
                    let linkUrl = utils.ao.has( item, "link" ) ? item.link : item;
                    // let isHover = false;

                    indicators.push(
                        <div
                            className={ `collection-pagination-bullet collection-pagination-control ${ index === contentIndex // || isHover
                                ? "collection-pagination-active"
                                : ""
                                }` }
                            style={
                                index === contentIndex
                                    ? {
                                        ...collectionPaginationStyles,
                                        // width: `${paginationSize * 1.1}`,
                                        // height: `${paginationSize * 1.1}`,
                                    }
                                    : { ...collectionPaginationStyles }
                            }
                            key={ `section-collection-item-${ index }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                            id={ `section-collection-item-${ index }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                            onClick={ ( e ) => {
                                changeContentIndex( index );
                            } }>
                            {
                                // index === contentIndex // || isHover
                                //     ? index
                                //     : ""
                            }
                        </div>,
                    );


                    displayContent.push(
                        <a
                            key={ `collection-item-${ index }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                            id={ `collection-item-${ index }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                            href={ `${ linkUrl }` }
                            className={ `section-collection-item ${ index === contentIndex ? "section-collection-item-visible" : "" }` }
                        // style={
                        //     index === contentIndex 
                        //     ? 
                        //     collectionItemActiveStyles 
                        //     : 
                        //     collectionItemStyles
                        // }
                        // className={`section-img section-img-link ${elementClasses} ${index === contentIndex ? "" : "hidden-img"}`}
                        >
                            <img
                                className="collection-img"
                                onLoad={ ( event ) => { } }
                                src={ `${ imageUrl }` }
                                alt={ `${ imageUrl }` }
                                key={ `section-collection-item-${ index }-img-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                                id={ `section-collection-item-${ index }-img-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                            // onMouseEnter={() => (isHover = true)}
                            // onMouseLeave={() => (isHover = false)}
                            />
                        </a>,
                    );
                } );
            }
        }

        const randInt = () => {
            return Number( Math.random() * 1e3 );
        };

        // Render a NEXT and BACK button, and utilize the state.
        return (
            <div
                // className={`section-img-slideshow-container ${""}`}
                // style={imageSlideshowContainerStyles}
                className={ `section-collection-container ${ classes ? classes : "" }` }
                key={ `section-collection-container-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                id={ `section-collection-container-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                style={ collectionContainerStyles }>
                <div
                    className={ `section-collection-content` }
                    style={ {} }>
                    { displayContent }
                </div>
                <div
                    className={ `collection-pagination-container` }
                    style={ collectionPaginationContainerStyles }
                    key={ `section-pagination-container-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                    id={ `section-pagination-container-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }>
                    <button
                        className={ `collection-pagination-button prev glassmorphic-button image-slideshow-button` }
                        style={ slideshowButtonStyles }
                        onClick={ ( e ) => {
                            changeContentIndex( contentIndex - 1 );
                        } }
                        key={ `collection-pagination-button-prev-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                        id={ `collection-pagination-button-prev-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }>
                        <FaAngleLeft />
                    </button>
                    <button
                        className={ `collection-pagination-button next glassmorphic-button image-slideshow-button` }
                        style={ slideshowButtonStyles }
                        onClick={ ( e ) => {
                            changeContentIndex( contentIndex + 1 );
                        } }
                        key={ `collection-pagination-button-next-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                        id={ `collection-pagination-button-next-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }>
                        <FaAngleRight />
                    </button>
                    { indicators }
                </div>
            </div>
        );
    };


    const buildContentImages = ( input ) => {
        let displayContent = [];
        if ( utils.val.isValidArray( input, true ) ) {
            // TODO :: Later, create standardized a way to verify that all elements in an array is a certain type.
            // input = input.filter((img, index) => {
            //     if ( utils.val.isString( img ) )
            //     {
            //         return ( utils.val.isString( img ) ) && (img !== '' && img.includes( "http" )); //  && img.includes("http");
            //     }
            // });
            if ( debug ) console.log( `SectionImage.js :: Original array = `, content, ` :: cleaned image array = `, input );
            // Input is valid.
            // If type is 'slideshow', render only one at a time. Constrain all of them to the same space to avoid jitter.

            // Finally, build the pagination controls.
            input.forEach( ( item, index ) => {
                let imageUrl = utils.ao.has( item, "image" ) ? item.image : "";
                let linkUrl = utils.ao.has( item, "link" ) ? item.link : "";
                // let isHover = false;

                displayContent.push(
                    <a
                        key={ `collection-item-${ index }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                        id={ `collection-item-${ index }-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                        href={ `${ linkUrl }` }
                        className={ `section-collection-item ${ index === contentIndex ? "section-collection-item-visible" : "" }` }
                        // className={`section-img section-img-link ${elementClasses} ${index === contentIndex ? "" : "hidden-img"}`}
                        style={
                            index === contentIndex
                                ? {
                                    height: `100% !important`,
                                    width: `0% !important`,
                                }
                                : {
                                    height: `100% !important`,
                                    width: `100% !important`,
                                }
                        }>
                        <img
                            className="collection-img"
                            style={ collectionItemStyles }
                            onLoad={ ( event ) => { } }
                            src={ `${ imageUrl }` }
                            alt={ `${ imageUrl }` }
                            key={ `section-collection-item-${ index }-img-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                            id={ `section-collection-item-${ index }-img-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                        // onMouseEnter={() => (isHover = true)}
                        // onMouseLeave={() => (isHover = false)}
                        />
                    </a>,
                );
            } );
        }

        const randInt = () => {
            return Number( Math.random() * 1e3 );
        };

        // Render a NEXT and BACK button, and utilize the state.
        return (
            <div
                // className={`section-img-slideshow-container ${""}`}
                // style={imageSlideshowContainerStyles}
                className={ `section-collection-container ${ classes ? classes : "" }` }
                key={ `section-collection-container-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                id={ `section-collection-container-${ Math.floor( utils.rand.rand( 0, 1e6 ) ) }` }
                style={ collectionContainerStyles }>
                <div
                    className={ `section-collection-content` }
                    style={ {} }>
                    { displayContent }
                </div>
            </div>
        );
    };


    return buildContent( content, type );
}
Section.Collection = Collection;

export default Section;

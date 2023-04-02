import React, { Children, Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as utils from "../Utilities/index.js";
import './Section.css';
/*
    Section
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

function Section(props) {
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
        display = 'block',
        flexDirection = "column",
        fillArea = true,
        height = "auto",
        width = "auto",
        minHeight, //  = "auto",
        minWidth, //  = "auto",
        maxHeight, //  = "100%",
        maxWidth, //  = "100%",
        padding = "0.25rem",
        margin = "0.0rem",
        border = "none",
        borderRadius = "0%",
        boxShadowEnabled = true,
        // Can import extra styles.
        styles = {},
        // parentStyles = {},
        // childStyles = {},
    } = props;
    useEffect(() => {
        if (children) {
            if (children.length > 0) {
            }
        }
    }, [children]);

    const flexStyles = {
        display: `${"flex"}`,
        /// flexDirection: `${"row"}`,
        /// flexDirection: `${"column"}`,
        flexDirection: `${flexDirection ? flexDirection : "column"}`,
        justifyContent: `${"center"}`,
        alignItems: `${"center"}`,
        alignContent: `${"center"}`,
        alignSelf: `${"center"}`,
    };

    const sectionStyles = {
        // (display === 'flex' ? ...flexStyles : ''),
        // display: "grid",
        // gridTemplateRows: `auto 1fr auto`,
        // gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        // grid: `repeat(auto-fit, 1fr) / auto-flow 1fr`,
        display: `${display}`,
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

    return (
        showSection && (
            <div className={ `section-container` } style={
                {}
                // sectionStyles
                /// * (
                /// *     display === 'flex' ? {
                /// *     ...flexStyles,
                /// *     ...sectionStyles,
                /// * } : sectionStyles
                /// * )
            }>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
}

export default Section;

Section.propTypes = {
    // children: PropTypes.object.isRequired,
    // isFetching: PropTypes.bool.isRequired,
};


/*
    /// * Boilerplate functional react component return statement for parent elements.
    return (
        showParent && (
            <div className="section-img" style={styles}>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
*/ 
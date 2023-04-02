import React, { Children, Component, useEffect } from "react";
import PropTypes from "prop-types";
import TabNav from "./TabNav";
import { isValidArray } from "../Utilities/Val";
import { has } from "../Utilities/AO";
import * as utils from "../Utilities/index.js";
import "./tabs.css";
// import styles from "./Tabs.module.css";

const Tabs = (props) => {
    const {
        children,
        items = [],
        navPosition = "top",
        defaultActiveIndex,
        activeIndex,
        centered = true,
        padContent = true,
        fillArea = true,
        roundedNav = false,
        // boxShadow = "0 0 5px black",
        boxShadow = "0px 0px 6px 1px #00000077",
        contentBoxShadow = true,
        navBoxShadow = true,

        styles = {},
        navStyles = {},
        contentStyles = {},
        debug = false,
    } = props;

    const itemsToTabs = (input) => {
        if (isValidArray(input, true)) {
            return input.map((item, index) => {
                if (has(item, "label") && has(item, "children")) {
                    if (debug)
                        console.log(
                            "itemsToTabs :: ",
                            item,
                            item.label,
                            item.children,
                        );
                    return (
                        <div
                            className="tabs-item"
                            label={item.label}
                            id={`tab-${index}-${item.label}`}
                            key={has(item, "key") ? item.key : index}>
                            {item.children}
                        </div>
                    );
                }
                return "";
            });
        }
    };

    const [tabChildren, setTabChildren] = React.useState(
        children
            ? children
            : isValidArray(items, true)
            ? itemsToTabs(items)
            : [],
    );
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const onClickSetActiveTab = (index) => {
        setSelectedTabIndex(index);
    };
    // const tabContents = Children.toArray( children );
    // console.log("TABS :: props = ", props);

    useEffect(() => {
        if (children) {
            if (children.length > 0) {
                if (selectedTabIndex >= children.length - 1) {
                    // console.log("TABS :: selectedTabIndex = ", selectedTabIndex, " children.length = ", children.length);
                    setSelectedTabIndex(children.length - 1);
                }
            }
        }
    }, [children]);

    const tabContainerStyles = {
        height: `${centered ? "100%" : "auto"}`,
        width: `${centered ? "100%" : "auto"}`,
        // display: "flex",
        // justifyContent: "space-around",
        // alignItems: "center",
        // flexDirection: "row",
        // alignContent: "center",
        // height: height,
        // width: `${width > 100 ? 100 : width}%`,
        // backgroundColor: fillercolor,
        // borderRadius: borderRadius,
        // padding: `${padding}px`,
        // margin: `${margin}`,
    };

    const tabNavListStyles = {
        // padding: `${spinnerPadding}px`,
        // textAlign: "right",
        // transition: "width 1s ease-in-out",
        // display: "flex",
        // justifyContent: "flex-end",
        // alignItems: "center",
        // top: "50%",
        // left: "50%",
        // margin: "-25px 0 0 -25px",
        // width: "50px",
        // height: "50px",
    };

    const tabContentStyles = {
        gap: `${padContent ? "0.125rem" : "0rem"}`,
        padding: `${padContent ? "2rem" : "0rem"}`,
        boxShadow: `${contentBoxShadow ? boxShadow : "none"}`,
        minHeight: `${fillArea ? "100% !important" : "auto"}`,
        // height: `${fillArea ? "100% !important" : "auto"}`,
    };

    // console.log(
    //     "Tabs.js :: props = ",
    //     props,
    //     " :: tabChildren = ",
    //     tabChildren,
    // );

    const buildTabNav = (tab, index) => {
        // This assumes the tab has already been validated.
        if (tab) {
            return (
                <TabNav
                    tabIndex={index}
                    activeTabIndex={selectedTabIndex}
                    label={has(tab.props, "label") ? tab.props.label : ""} // {label ?? ' '}
                    sublabel={
                        has(tab.props, "sublabel") ? tab.props.sublabel : ""
                    }
                    onClick={onClickSetActiveTab}
                    id={
                        has(tab.props, "id")
                            ? tab.props.id
                            : has(tab.props, "label")
                            ? tab.props.label
                            : ""
                    } // {id === "" ? "" : id}
                    key={
                        has(tab.props, "id")
                            ? tab.props.id
                            : has(tab.props, "label")
                            ? tab.props.label
                            : ""
                    }
                    rounded={roundedNav}
                    navBoxShadow={navBoxShadow}
                />
            );
        } else {
            return (
                <TabNav
                    tabIndex={0}
                    defaultActiveIndex={defaultActiveIndex ?? 0}
                    activeTabIndex={selectedTabIndex}
                    label={""}
                    onClick={onClickSetActiveTab}
                    id={`blank-tab-nav-${Math.random() * 100}`}
                    key={`blank-tab-nav-${Math.random() * 100}`}
                    rounded={roundedNav}
                    navBoxShadow={navBoxShadow}
                />
            );
        }
    };

    const getTabNav = (input) => {
        if (input) {
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            return utils.ao.has(tab.props, "enabled")
                                ? tab.props.enabled
                                    ? buildTabNav(tab, index)
                                    : ""
                                : buildTabNav(tab, index);
                        }
                    }
                    return <></>;
                });
            }
        }
        return buildTabNav({}, 0);
    };

    const getTabContent = (input) => {
        if (input) {
            // console.log(
            //     "getTabContent :: input = ",
            //     input,
            //     typeof input,
            //     Array.isArray(input),
            // );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (index !== selectedTabIndex) {
                            return undefined;
                        } else {
                            if (utils.ao.has(tab, "props")) {
                                if (utils.ao.has(tab.props, "children")) {
                                    if (utils.ao.has(tab.props, "enabled")) {
                                        if (tab.props.enabled) {
                                            return tab.props.children;
                                        }
                                    } else {
                                        // DEVNOTE ::
                                        //      Assume enabled by default, even if the property isn't provided.
                                        //      I'll iron out this messy way of handling tabs and their children and properties later when I convert it into a compound component later in development.
                                        return tab.props.children;
                                    }
                                }
                            }
                            return undefined;
                        }
                    } else {
                        return "";
                    }
                });
            }
        }
    };

    // Runs through all child elements and removes any that are invalid and/or do not contain the designated properties.
    const validateChildren = (input, mustHaveProps = []) => {
        let output = [];
        if (typeof input === "object" && !Array.isArray(input)) {
            input = [input];
        }
        if (utils.val.isValidArray(input, true)) {
            output = input.filter((tab, index) => {
                if (tab) {
                    if (utils.ao.has(tab, "props")) {
                        if (utils.ao.has(tab.props, "children")) {
                            return utils.ao.has(tab.props, "enabled")
                                ? tab.props.enabled
                                    ? tab
                                    : ""
                                : tab;
                        }
                    }
                    return false;
                }
            });
        }
        return output;
    };

    const childHasProps = (input, props = []) => {
        if (input) {
            if (utils.ao.has(input, "props")) {
                let props = input.props;
                props.forEach((prop, index) => {
                    if (!props.includes(prop)) {
                        return false;
                    }
                });
            }
            return true;
        }
        return false;
    };

    const validateChild = (input, mustHaveProps = []) => {
        if (input) {
            if (utils.ao.has(input, "props")) {
                if (utils.ao.has(input.props, "children")) {
                    if (utils.ao.has(input.props, "enabled")) {
                        if (input.props.enabled) {
                            return true;
                        }
                    } else {
                        // DEVNOTE ::
                        //      Assume enabled by default, even if the property isn't provided.
                        //      I'll iron out this messy way of handling tabs and their children and properties later when I convert it into a compound component later in development.
                        return true;
                    }
                }
            }
        }
    };

    const getTabContentQuickRender = (input) => {
        if (input) {
            if (debug)
                console.log(
                    "getTabContent :: input = ",
                    input,
                    typeof input,
                    Array.isArray(input),
                );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            if (utils.ao.has(tab.props, "children")) {
                                // return tab.props.children;
                                return (
                                    <div
                                        style={tabContentStyles}
                                        className={`tab-content ${
                                            padContent
                                                ? "tab-content-padded"
                                                : ""
                                        } ${
                                            index !== selectedTabIndex
                                                ? "tab-content-hidden"
                                                : ""
                                        }`}>
                                        {tab.props.children}
                                    </div>
                                );
                            }
                        }
                    }
                    return "";
                });
            }
        }
    };

    return (
        <div
            style={tabContainerStyles}
            className={`tabs-container ${
                navPosition === "top"
                    ? "tabs-top"
                    : navPosition === "left"
                    ? "tabs-left"
                    : ""
            } ${fillArea ? "fill-area" : ""}`}
            id={`tabs-container`}>
            <div className={`tabs-nav-list`}>{getTabNav(children)}</div>
            <div className="tab-content-container">
                <div
                    style={tabContentStyles}
                    className={`tab-content ${
                        padContent ? "tab-content-padded" : ""
                    }`}>
                    {
                        // getTabContent(children)
                        getTabContent(children)
                    }
                </div>
            </div>
        </div>
    );
};

export default Tabs;

/*

    // Runs through all child elements and removes any that are invalid and/or do not contain the designated properties.
    const validateChildren = ( input, mustHaveProps = [] ) =>
    {
        let output = [];
        if (typeof input === "object" && !Array.isArray(input)) {
            input = [input];
        }
        if (utils.val.isValidArray(input, true)) {
            output = input.filter((tab, index) => {
                if (tab) {
                    if (utils.ao.has(tab, "props")) {
                        if ( utils.ao.has( tab.props, "children" ) )
                        {
                            return utils.ao.has(tab.props, "enabled")
                                ? tab.props.enabled
                                    ? tab
                                    : ""
                                : tab;
                            // if (utils.ao.has(tab.props, "enabled")) {
                            //     if (tab.props.enabled) {
                            //         // output.push(tab);
                            //         return tab;
                            //     }
                            // } else {
                            //     // DEVNOTE ::
                            //     //      Assume enabled by default, even if the property isn't provided.
                            //     //      I'll iron out this messy way of handling tabs and their children and properties later when I convert it into a compound component later in development.
                            //     // output.push(tab);
                            //     return tab;
                            // }
                        }
                    }
                    return false;
                }
            });
        }
        return output;
    };

    const childHasProps = ( input, props = [] ) => {
        if ( input )
        {
            if (utils.ao.has(input, "props")) {
                let props = input.props;
                props.forEach((prop, index) => {
                    if (!props.includes(prop)) {
                        return false;
                    }
                });
            }
            return true;
        }
        return false;
    }

    const validateChild = ( input, mustHaveProps = [] ) =>
    {
        if (input) {
            if (utils.ao.has(input, "props")) {
                if (utils.ao.has(input.props, "children")) {
                    if (utils.ao.has(input.props, "enabled")) {
                        if (input.props.enabled) {
                            return true;
                        }
                    } else {
                        // DEVNOTE ::
                        //      Assume enabled by default, even if the property isn't provided.
                        //      I'll iron out this messy way of handling tabs and their children and properties later when I convert it into a compound component later in development.
                        return true;
                    }
                }
            }
        }
    };

    const getTabContent2 = (input) => {
        if (input) {
            // if ( debug ) console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            if (utils.ao.has(tab.props, "children")) {
                                return (
                                    <div
                                        style={tabContentStyles}
                                        className={`tab-content ${
                                            padContent
                                                ? "tab-content-padded"
                                                : ""
                                        } ${
                                            index !== selectedTabIndex
                                                ? "tab-content-hidden"
                                                : ""
                                        }`}>
                                        {tab.props.children}
                                    </div>
                                );
                            }
                        }
                    } else {
                        return "";
                    }
                });
            }
        }
    };

*/ 
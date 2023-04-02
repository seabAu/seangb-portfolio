import React, { Children, Component, useEffect } from "react";
import PropTypes from "prop-types";
import * as utils from "../Utilities/index.js";
import "./tabs.css";
// import styles from "./Tabs.module.css";
import {
    FaRegEdit,
    FaExpand,
    FaExpandArrowsAlt,
    FaFilter,
    FaEllipsisH,
    FaEllipsisV,
    // Icons for adding content
    FaPlusSquare,
    FaPlusCircle,
    FaPlus,
    // Icons for removing content
    FaWindowClose,
    FaTimesCircle,
    FaTimes,
    FaRedoAlt,
    // Icons for adjusting index
    FaSortDown,
    FaSortUp,
    FaSort,
    FaEdit,
} from "react-icons/fa";

function Tabs(props) {
    const {
        children,
        items = [],
        label = "",
        name = "", // Value ID
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
    } = props;

    const itemsToTabs = (input) => {
        if (isValidArray(input, true)) {
            return input.map((item, index) => {
                if (has(item, "label") && has(item, "children")) {
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

    // On mount, read props.
    useEffect(() => {
        console.log("Input :: {Props} = ", props);
    }, []);

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
        ...styles,
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
        ...styles,
    };

    const tabContentStyles = {
        gap: `${padContent ? "0.125rem" : "0rem"}`,
        padding: `${padContent ? "2rem" : "0rem"}`,
        boxShadow: `${contentBoxShadow ? boxShadow : "none"}`,
        minHeight: `${fillArea ? "100% !important" : "auto"}`,
        // height: `${fillArea ? "100% !important" : "auto"}`,
        ...styles,
    };

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

    const getTabNav = (input) => {
        if (input) {
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (Array.isArray(input)) {
                if (
                    input[0] !== undefined &&
                    input[0] !== null &&
                    input[0] !== false
                ) {
                    return input.map((tab, index) => {
                        // console.log(tab);
                        if (tab) {
                            if (utils.ao.has(tab, "props")) {
                                // if (has(tab.props, "label") && has(tab.props, "id")) {
                                // const { label, id } = tab.props;
                                // console.log(tab, tab.props);
                                return (
                                    <Tabs.TabNav
                                        tabIndex={index}
                                        activeTabIndex={selectedTabIndex}
                                        label={
                                            utils.ao.has(tab.props, "label")
                                                ? tab.props.label
                                                : ""
                                        } // {label ?? ' '}
                                        sublabel={
                                            utils.ao.has(tab.props, "sublabel")
                                                ? tab.props.sublabel
                                                : ""
                                        }
                                        onClick={onClickSetActiveTab}
                                        id={
                                            utils.ao.has(tab.props, "id")
                                                ? tab.props.id
                                                : utils.ao.has(tab.props, "label")
                                                ? tab.props.label
                                                : ""
                                        } // {id === "" ? "" : id}
                                        rounded={roundedNav}
                                        navBoxShadow={navBoxShadow}
                                    />
                                );
                                // }
                            }
                        }
                        return <></>;
                    });
                }
            }
        }
        return (
            <Tabs.TabNav
                tabIndex={0}
                defaultActiveIndex={defaultActiveIndex ?? 0}
                activeTabIndex={selectedTabIndex}
                label={""}
                onClick={onClickSetActiveTab}
                id={"blank-tab-nav"}
                rounded={roundedNav}
                navBoxShadow={navBoxShadow}
            />
        );
    };

    const getTabContent = (input) => {
        if (input) {
            // console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
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
                                    return tab.props.children;
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

    // console.log(
    //     "Tabs.js :: props = ",
    //     props,
    //     " :: tabChildren = ",
    //     tabChildren,
    // );

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
            <div className={`tabs-nav-list`}>
                {
                    // getTabNav( children )
                    getTabNav(children)
                }
            </div>
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
    return (
        <Tabs.TabNav>
            <Tabs.TabContent label={label} name={name} style={tabContentStyles}>
                {children && children !== false && children}
            </Tabs.TabContent>
        </Tabs.TabNav>
    );
}

function TabNav(props) {
    const {
        // children,
        tabIndex,
        activeTabIndex,
        id,
        label,
        sublabel,
        onClick,
        rounded = false,
        navBoxShadow = false,
    } = props;
    // console.log("Input.Field :: {Props} = ", props);

    const tabNavItemStyles = {
        // borderRadius: `${rounded ? "8px" : "0px"}`,
        boxShadow: `${navBoxShadow ? "0 0 5px black" : "none"}`,
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

    return (
        <div
            style={tabNavItemStyles}
            className={`tab-nav-item ${
                activeTabIndex === tabIndex ? "tab-active" : ""
            } ${rounded ? "tab-nav-rounded" : ""}`}
            onClick={(event) => {
                onClick(tabIndex);
            }}
            id={id === "" ? "" : id}
            key={id === "" ? "" : id}>
            {label && label !== undefined && label !== null && (
                <div className="tab-nav-item-label">{label ? label : "-"}</div>
            )}
            {sublabel && sublabel !== undefined && sublabel !== null && (
                <div className="tab-nav-item-sublabel">
                    {sublabel ? sublabel : "-"}
                </div>
            )}
        </div>
    );
    // return (
    //     <div className="input-field">
    //         {children && children !== false && children}
    //     </div>
    // );
}

Tabs.TabNav = TabNav;

function TabContent(props) {
    const {
        children,
        // fieldtype = "text", // Default to text type.
    } = props;

    // console.log("Input.Label :: {Props} = ", props);
    return (
        <div className="input-field">
            {children && children !== false && children}
        </div>
    );
}
Tabs.TabContent = TabContent;

export default Tabs;

/*

    const getTabContent2 = (input) => {
        if (input) {
            // console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (has(tab, "props")) {
                            if (has(tab.props, "children")) {
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

    
    const getTabContentQuickRender = (input) => {
        if (input) {
            console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            if (utils.ao.has(tab.props, "children")) {
                                return tab.props.children;
                                // return (
                                //     <div
                                //         style={tabContentStyles}
                                //         className={`tab-content ${
                                //             padContent
                                //                 ? "tab-content-padded"
                                //                 : ""
                                //         } ${
                                //             index !== selectedTabIndex
                                //                 ? "tab-content-hidden"
                                //                 : ""
                                //         }`}>
                                //         {tab.props.children}
                                //     </div>
                                // );
                            }
                        }
                    }
                    return "";
                });
            }
        }
    };

*/

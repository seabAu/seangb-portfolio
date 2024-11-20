import React, { Children, Component, useEffect } from "react";
import PropTypes from "prop-types";
// import TabNav from "./TabNav";
import * as utils from 'akashatools';
import "./tabs.css";
// import styles from "./Tabs.module.css";

const Tabs = (props) => {
    const {
        children,
        items = [],
        navPosition = "top",
        defaultActiveIndex,
        activeIndex,
        overflowLock = false,
        centered = true,
        padContent = true,
        fillArea = true,
        roundedNav = false,
        // boxShadow = "0 0 5px black",
        boxShadow = "0px 0px 6px 1px #00000077",
        contentBoxShadow = true,
        navBoxShadow = true,
        padding=`0.5rem 1.0rem`,
        opacity = `1.0`,
        filter = "none",
        backFilter = "none",
        glassmorphic = false,
        styles = {},
        navStyles = {},
        contentStyles = {},
        debug = false,
    } = props;

    const itemsToTabs = (input) => {
        if (utils.val.isValidArray(input, true)) {
            return input.map((item, index) => {
                if (
                    utils.ao.has(item, "label") &&
                    utils.ao.has(item, "children")
                ) {
                    
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
                            key={utils.ao.has(item, "key") ? item.key : index}>
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
            : utils.val.isValidArray(items, true)
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
		// On mount, check if we're using an items array or child components.
		if (items) {
			if (utils.val.isValidArray(items, true)) {
				let components = itemsToTabs(items);
                console.log( "Tabs.js :: items provided :: items = ", items, " :: itemsToTabs( items ) = ", itemsToTabs( items ) );
                setTabChildren(components);
			}
		}
	}, []);

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
        // height: `${centered ? "100%" : "auto"}`,
        width: `${centered ? "100%" : "auto"}`,
        minHeight: `${fillArea ? "100% !important" : "auto"}`,
        height: `${fillArea ? "100% !important" : "auto"}`,
        padding: `${padding ? padding : "0.25rem 0.25rem"}`,
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
        overflow: `${`hidden`}`,
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
        overflow: `${`hidden`}`,
    };

    const tabContentStyles = {
        gap: `${padContent ? padding : "0rem"}`,
        // boxShadow: `${contentBoxShadow ? boxShadow : "none"}`,
        minHeight: `${fillArea ? "100% !important" : "auto"}`,
        height: `${fillArea ? "100% !important" : "auto"}`,
        padding: `${padContent ? padding : "0.0rem 0.0rem"}`,
        overflow: `${overflowLock ? 'hidden' : 'auto'}`,
        // filter: `blur(0.4rem)`,
        // backdropFilter: `blur(100%)`,
        // opacity: `0.7`,
    };

    const buildTabNav = (tab, index) => {
        // This assumes the tab has already been validated.
        if (tab) {
            return (
                <TabNav
                    tabIndex={index}
                    activeTabIndex={selectedTabIndex}
                    label={
                        utils.ao.has(tab.props, "label") ? tab.props.label : ""
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
                    key={
                        utils.ao.has(tab.props, "id")
                            ? tab.props.id
                            : utils.ao.has(tab.props, "label")
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

    /*
    export const validateChildren = (input, mustHaveProps = []) => {
        let output = [];
        if (typeof input === "object" && !Array.isArray(input)) {
            input = [input];
        }
        if (utils.val.isValidArray(input, true)) {
            output = input.filter((element, index) => {
                if (element) {
                    if (utils.ao.has(element, "props")) {
                        if (utils.ao.has(element.props, "children")) {
                            return utils
                                .ao
                                .has(element.props, "enabled")
                                ? (element.props.enabled
                                    ? element
                                    : "")
                                : element;
                        }
                    }
                }
                return false;
            });
        }
        return output;
    };
    */
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
			className={`tabs-container ${navPosition === "top" ? "tabs-top" : navPosition === "left" ? "tabs-left" : ""} ${fillArea ? "fill-area" : ""}
            ${glassmorphic ? "tab-glassmorphic" : ""}`}
			id={`tabs-container`}>
			<div
				className={`tabs-nav-list`}
				style={tabNavListStyles}>
				{tabChildren && getTabNav(tabChildren)}
			</div>
			<div className={`tab-content-container ${contentBoxShadow ? `tab-content-container-shadow` : ``}`}>
				<div
					style={tabContentStyles}
					className={`tab-content ${padContent ? "tab-content-padded" : ""} `}>
					{
						// getTabContent(children)
						tabChildren && getTabContent(tabChildren)
					}
				</div>
			</div>
		</div>
	);
};

const TabNavList = (props) => {
    // Component for containing tab nav items.
    const {
        children,
        tabIndex,
        defaultActiveIndex,
        activeTabIndex,
        id,
        label,
        sublabel,
        onClick,
        rounded = false,
        navBoxShadow = false,
        boxShadow = "0px 0px 6px 1px #00000077",
    } = props;

    const componentStyles = {
        // borderRadius: `${rounded ? "8px" : "0px"}`,
        boxShadow: `${navBoxShadow ? boxShadow : "none"}`,
    };

    return (
        <div
            style={componentStyles}
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
};

const TabNav = ( props ) =>
{
    // Component for individual tab nav items.
    const {
        tabIndex,
        defaultActiveIndex,
        activeTabIndex,
        id,
        label,
        sublabel,
        onClick,
        rounded = false,
        navBoxShadow = false,
        boxShadow = "0px 0px 6px 1px #00000077",
    } = props;

    const componentStyles = {
        // borderRadius: `${rounded ? "8px" : "0px"}`,
        boxShadow: `${navBoxShadow ? boxShadow : "none"}`,
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
            style={componentStyles}
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
};


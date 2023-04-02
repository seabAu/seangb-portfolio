import React, { Children, Component, useEffect } from "react";
import PropTypes from "prop-types";
import TabNav from "./TabNav";
import styles from "./Tabs.module.css";
import { has } from "../Utilities/AO";

const TabContent = (props) => {
    const {
        children,
        items,
        type,
        centered,
        padContent,
        fillArea,
        roundedNav,
        boxShadowEnabled = false,
        boxShadow = "0px 0px 6px 1px #00000077",
    } = props;
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const onClickSetActiveTab = (index) => {
        setSelectedTabIndex(index);
    };
    const tabContents = Children.toArray(children);
    // console.log("TABS :: props = ", props);

    const componentStyles = {
        // borderRadius: `${rounded ? "8px" : "0px"}`,
        boxShadow: `${boxShadowEnabled ? boxShadow : "none"}`,
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

    const getTabContent = (input) => {
        if (input) {
            // console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (Array.isArray(input)) {
                if (input[0] !== undefined && input[0] !== null) {
                    return input.map((tab, index) => {
                        if (tab) {
                            if (index !== selectedTabIndex) {
                                return undefined;
                            } else {
                                // console.log( "getTabContent :: tab = ", tab, ", children = ", children, ", input = ", input );
                                if (has(tab, "props")) {
                                    // console.log(
                                    //     "getTabContent :: tab has props = ",
                                    //     tab.props,
                                    //     ", children = ",
                                    //     children,
                                    //     ", input = ",
                                    //     input,
                                    // );
                                    if (has(tab.props, "children")) {
                                        // console.log(
                                        //     "getTabContent :: tab has props.children = ",
                                        //     tab.props.children,
                                        //     ", children = ",
                                        //     children,
                                        //     ", input = ",
                                        //     input,
                                        // );
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
        }
    };
    return (
        <div className="tab-content-container">
            <div
                className={`tab-content ${
                    padContent ? "tab-content-padded" : ""
                }`}>
                {getTabContent(children)}
            </div>
        </div>
    );
};

export default TabContent;

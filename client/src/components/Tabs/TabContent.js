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
    } = props;
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const onClickSetActiveTab = (index) => {
        setSelectedTabIndex(index);
    };
    const tabContents = Children.toArray(children);
    // console.log("TABS :: props = ", props);

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

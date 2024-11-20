import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Icons from "./Icons";
import Section from "../Section";
import './footer.css';

function Footer () {
    // Destructure down to where the social media links are located.
    const { portfolioData } = useSelector( ( state ) => state.root );
    const { about } = portfolioData;
    const { social } = about;
    // const { portfolioData.about[0].social } = useSelector( ( state ) => state.root );
    // console.log( "icons :: about = ", about );
    return (
        <div className="page-footer ">
            <div className="section-bar hr-style-neumorphic page-footer-divider" ></div>
            <div className="page-footer-content">
                <div className="page-footer-links">
                    <Icons model={ about?.social } />
                </div>
                <div className="page-footer-credit">

                    <span className="created-by ">
                        <h4 className={ `created-by-line text-highlightColor2` }>
                            Sean G Brown © 2024
                        </h4>
                        <h5 className={ `created-by-line text-highlightColor2` }>
                            All Rights Reserved
                        </h5>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Footer;

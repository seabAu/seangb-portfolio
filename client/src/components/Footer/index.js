import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Icons from "./Icons";
import Section from "../Section";
function Footer ()
{
    // Destructure down to where the social media links are located.
    const { portfolioData } = useSelector( ( state ) => state.root );
    const { about } = portfolioData;
    const { social } = about;
    // const { portfolioData.about[0].social } = useSelector( ( state ) => state.root );
    
    return (
        <div className="page-footer ">
            <div className="page-footer-content">
                <div className="page-footer-links">
                    <Icons model={social} />
                </div>
                <div className="page-footer-credit">
                    <h1 className="text-white">
                        
                        {
                            /*
                                <Section.Text
                                    key={ `section-text-footer-name` }
                                    type={"text"}
                                    content={"Sean G Brown 2024"}
                                    color={`text-highlightColor2` }
                                    scale={`xs`}
                                    styles={
                                        {
                                            // border: `1px solid green`,
                                        }
                                  } />
                            */
                        }

                        <span className="text-highlightColor2">
                            Sean G Brown 2024
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Footer;

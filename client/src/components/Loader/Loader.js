import React from "react";
import Spinner from "./Spinner";
import "./loader.css";

function Loader() {
    return (
        <div className="loader-container">
                <Spinner
                    padding={`0`}
                    margin={`0`}
                    radius={`20`}
                    cx={`25`}
                    cy={`25`}
                    height={`150`}
                    width={`150`}
                    fill={`#111111`}
                    stroke={`#555555`}
                    strokeWidth={2}
                    spinnerPadding={0}
                />

            <div className="loader-text-container">
                <h1 className="text-textColor loader-text loader-first-initial">
                    S
                </h1>
                <h1 className="text-highlightColor loader-text loader-middle-initial">
                    G
                </h1>
                <h1 className="text-textColor loader-text loader-last-initial">
                    B
                </h1>
            </div>
        </div>
    );
}

export default Loader;

import React from "react";
import * as util from "../../utilities/index.js";
function Icons(props) {
    const { model } = props;

    const getIcons = (icons) => {
        if (util.val.isValidArray(icons, true) && util.ao._has(icons, ["site", "url", "icon"])) {
            return (
                <ul className="social-icons">
                    {icons.map((icon, index) => {
                        return (
                            <li className="" key={`social-icons-${icon.site}`}>
                                <a href={icon.url}>
                                    {" "}
                                    <i
                                        className={`social-icon ${icon.icon}`}></i>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            );
        }
        // console.log(Array.fill("A", 2000));
    };
    return (
        getIcons(model)
    );
}

export default Icons;

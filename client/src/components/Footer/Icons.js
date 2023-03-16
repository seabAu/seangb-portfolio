import React from "react";
import * as util from "../Utilities/index.js";
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

/*  function SocialIcons() {
        return (
            <div className="fixed left-0 bottom-0 px-10 sm:static">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a href="mailto:sean.george.brown@gmail.com">
                            {" "}
                            <i className="social-icon ri-mail-line text-gray-400 text-2xl"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/sean-brown-116b4b79/">
                            {" "}
                            <i className="social-icon ri-linkedin-box-line text-gray-400 text-2xl"></i>
                        </a>
                        <a href="https://github.com/seabAu">
                            {" "}
                            <i className="social-icon ri-github-line text-gray-400 text-2xl"></i>
                        </a>
                    </div>
                    <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
                </div>
            </div>
        );
    }

    export default SocialIcons;
*/

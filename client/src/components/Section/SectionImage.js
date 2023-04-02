import React, { useState, useEffect } from "react";
import * as utils from "../Utilities/index.js";

function SectionImage(props) {
    const {
        // Child components passed inside this component's element.
        children,
        content = [],
        // Render overrides, if ever needed.
        showParent = true,
        // showChildren = true,
        // Style settings.
        type = "default",
        boxShadowEnabled = true,
        // Can import extra styles.
        classes = "",
        containerStyles = {},
        elementStyles = {},
        containerClasses = "",
        elementClasses = "",
        debug = false,
    } = props;

    useEffect( () =>
    {
        if (debug)
        console.log(`SectionImage.js :: onmount :: props = `, props);
    }, []);

    const imageContainerStyles = {
        // display: "grid",
        // gridTemplateRows: `auto 1fr auto`,
        // gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        // grid: `repeat(auto-fit, 1fr) / auto-flow 1fr`,
        display: `${"flex"}`,
        justifyContent: `${"center"}`,
        alignItems: `${"center"}`,
        /// flexDirection: `${"column"}`,
        flexDirection: `${"row"}`,
        alignContent: `${"center"}`,
        // height: `${"100"}%`,
        // minHeight: `${"auto"}`,
        // maxHeight: `${"auto"}`,
        // width: `${"100"}%`, // `${width > 100 ? 100 : width}%`,
        // minWidth: `${"auto"}`,
        // maxWidth: `${"auto"}`,
        // backgroundColor: fillercolor,
        border: `${"none"}`,
        borderRadius: `${"0"}px`,
        padding: `${"0"}`,
        margin: `${"0"}`,
        transition: "width 1s ease-in-out",
        boxShadow: `${
            boxShadowEnabled ? "2px 2px 2px 2px rgba(0, 0, 0, 0.25)" : "none"
        }`,
        // If extra styles are passed in, make sure they override the settings here.
        // ...styles,
        ...containerStyles,
    };

    const imageStyles = {
        height: `${"auto"}`,
        minHeight: `${"10px"}`,
        maxHeight: `${"100%"}`,
        width: `${"auto"}`, // `${width > 100 ? 100 : width}%`,
        minWidth: `${"10px"}`,
        maxWidth: `${"100%"}`,
        // backgroundColor: fillercolor,
        border: `${"none"}`,
        borderRadius: `${"0"}px`,
        padding: `${"0"}`,
        margin: `${"0"}`,
        transition: "width 0.5s ease-in",
        boxShadow: `${
            boxShadowEnabled ? "1px 1px 5px 5px rgba(0, 0, 0, 0.25)" : "none"
        }`,
        // If extra styles are passed in, make sure they override the settings here.
        // ...styles,
        ...elementStyles,
    };

    const slideshowButtonStyles = {
        // position: `relative`,
        // display: `flex`,
        // flexDirection: `column`,
        height: `${"100%"}`,
        // minHeight: `${"10px"}`,
        // maxHeight: `${"100%"}`,
        // width: `${"auto"}`,
        width: `${"2.0rem"}`,
        minWidth: `${"10px"}`,
        maxWidth: `${"100%"}`,
        // backgroundColor: fillercolor,
        // border: `${"none"}`,
        borderRadius: `${"0"}px`,
        padding: `${"0"}`,
        margin: `${"0"}`,
        // transition: "all 1s ease-in-out",
        // left: `${'0 !important'}`,
        boxShadow: `${
            boxShadowEnabled ? "1px 1px 5px 5px rgba(0, 0, 0, 0.25)" : "none"
        }`,
    };

    const imageSlideshowContainerStyles = {
        // display: `flex`,
        // flexDirection: `row`,
        display: `${"flex"}`,
        justifyContent: `${"center"}`,
        alignItems: `${"center"}`,
        flexDirection: `${"row"}`,
        alignContent: `${"center"}`,
        alignSelf: `${"center"}`,
        height: `${"100%"}`,
        maxHeight: `${"100%"}`,
        width: `${"auto"}`,
        minWidth: `${"100%"}`,
        maxWidth: `${"100%"}`,
    };

    const [imageSet, setImageSet] = useState([]);
    const [currentContent, setCurrentContent] = useState(0);

    useEffect(() => {
        if (utils.val.isValidArray(content, true)) {
            let filteredContent = content;
            filteredContent = filteredContent.filter((img, index) => {
                return (
                    utils.val.isString(img) &&
                    img !== "" &&
                    img.includes("http")
                );
            });
            if(debug)console.log(
                `SectionImage.js :: Useeffect for Content :: Original Content array = `,
                content,
                ` :: cleaned Content array = `,
                filteredContent,
            );
            setImageSet(filteredContent);
        }
    }, [content]);

    const changeCurrentContent = (i) => {
        if (i !== currentContent) {
            if (i > imageSet.length - 1) {
                // Spill over to 0;
                i = 0;
            } else if (i < 0) {
                // Wrap around to max index.
                i = imageSet.length - 1;
            }
        }
        setCurrentContent(i);
    };
    const buildContent = (input, displayType) => {
        let displayContent = [];
        if (utils.val.isValidArray(input, true)) {
            // TODO :: Later, create standardized a way to verify that all elements in an array is a certain type.
            // input = input.filter((img, index) => {
            //     // if ( utils.val.isString( img ) )
            //     // {
            //         return ( utils.val.isString( img ) ) && (img !== '' && img.includes( "http" )); //  && img.includes("http");
            //     // }
            // });
            if (debug)
                console.log(
                    `SectionImage.js :: Original array = `,
                    content,
                    ` :: cleaned image array = `,
                    input,
                );
            // Input is valid.
            if (displayType === "default") {
                // If type is 'default', just render all of them at once.
                displayContent = input.map((item, index) => {
                    return utils.val.isDefined(item) ? (
                        <img
                            className={`section-img ${elementClasses}`}
                            style={imageStyles}
                            src={`${item}`}
                            alt={`${item}`}></img>
                    ) : (
                        ""
                    );
                });
            } else if (displayType === "slideshow") {
                // If type is 'slideshow', render only one at a time. Constrain all of them to the same space to avoid jitter.
                input.forEach((item, index) => {
                    displayContent.push(
                        <img
                            className={`section-img ${elementClasses} ${
                                index === currentContent ? "" : "" // "hidden"
                            }`}
                            style={{
                                // left: `${(index === currentContent) ? 0 : index * 100}vw`,
                                ...imageStyles,
                                width: `${
                                    index === currentContent ? `100%` : `0%`
                                }`,
                                minWidth: `${
                                    index === currentContent ? `auto` : `0%`
                                }`,
                            }}
                            src={`${item}`}
                            alt={`${item}`}></img>,
                    );
                });
            }
        }

        // Render a NEXT and BACK button, and utilize the state.
        return (
            <div
                className={`section-img-slideshow-container ${""}`}
                style={imageSlideshowContainerStyles}>
                <button
                    className={`back-button glass-button image-slideshow-button`}
                    style={{
                        // position: `relative`,
                        // display: `flex`,
                        // flexDirection: `column`,
                        // height: `100%`,
                        left: `0`,
                        ...slideshowButtonStyles,
                    }}
                    onClick={(event) => {
                        changeCurrentContent(currentContent - 1);
                    }}>
                    {"<"}
                </button>
                <div
                    className={`section-img-container ${containerClasses}`}
                    style={{
                        display: `${"flex"}`,
                        justifyContent: `${"center"}`,
                        alignItems: `${"center"}`,
                        flexDirection: `${"row"}`,
                        alignContent: `${"center"}`,
                        overflow: `${"hidden"}`,
                        ...imageContainerStyles,
                    }}>
                    {displayContent}
                </div>
                <button
                    className={`next-button glass-button image-slideshow-button`}
                    style={{
                        // position: `relative`,
                        // display: `flex`,
                        // flexDirection: `column`,
                        // height: `100%`,
                        right: `0`,
                        ...slideshowButtonStyles,
                    }}
                    onClick={(event) => {
                        changeCurrentContent(currentContent + 1);
                    }}>
                    {">"}
                </button>
            </div>
        );
    };

    return (
        showParent && (
            <div className={`${classes}`} style={imageContainerStyles}>
                {utils.val.isValidArray(imageSet, true) &&
                    buildContent(imageSet, type)}
                {
                    // Child components were passed in instead of a content array.
                    // Pass child components.
                    !utils.val.isValidArray(imageSet, true) &&
                        children &&
                        children !== false &&
                        children
                }
            </div>
        )
    );
}

export default SectionImage;
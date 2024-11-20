import React, { Children, Component, useState, useEffect } from "react";
import * as utils from 'akashatools';

import './image.css';

const Image = (props) => {
    const {
        // Child components passed inside this component's element.
        src = "",
        alt = "",
        lightbox=false,
        children,
        content = {},
        layout='section', // SECTION | GRID | MOSAIC | MASONRY
        w,
        h,
        maxW,
        maxH,
        borderRadius,
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
        padding='4px',
        debug = false,
    } = props;

    useEffect(() => {
        if (debug) console.log(`SectionImage.js :: onmount :: props = `, props);
    }, []);

    const overlapStyles = {
        // Generic inline styling making an element freely overlap with others.
        display: `${"flex"}`,
        flexDirection: `${"row"}`,
        /// flexDirection: `${"column"}`,
        justifyContent: `${"center"}`,
        alignItems: `${"center"}`,
        alignContent: `${"center"}`,
        alignSelf: `${"center"}`,
    };
    
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
        padding: padding ? padding : '8px',
        margin: `${"0"}`,
        transition: "width 1s ease-in-out",
        boxShadow: `${boxShadowEnabled ? "2px 2px 2px 2px rgba(0, 0, 0, 0.25)" : "none"}`,
        // If extra styles are passed in, make sure they override the settings here.
        // ...styles,
        ...containerStyles,
    };

    const imageStyles = {
        height: `${h ? h : "auto"}`,
        minHeight: `${"10px"}`,
        maxHeight: `${maxH ? maxH: "100%"}`,
        width: `${w ? w : "100%"}`, // `${width > 100 ? 100 : width}%`,
        minWidth: `${"10px"}`,
        maxWidth: `${maxW ? maxW : "100%"}`,
        // backgroundColor: fillercolor,
        border: `${"none"}`,
        borderRadius: `${borderRadius ? borderRadius : "0"}px`,
        padding: padding ? padding : '0px',
        margin: `${"0"}`,
        transition: "width 0.5s ease-in",
        boxShadow: `${boxShadowEnabled ? "1px 1px 5px 5px rgba(0, 0, 0, 0.25)" : "none"}`,
        // If extra styles are passed in, make sure they override the settings here.
        // ...styles,
        ...elementStyles,
    };

    useEffect(() => {
        // if (utils.val.isValidArray(content, true)) {
        //     let filteredContent = content;
        //     filteredContent = filteredContent.filter((img, index) => {
        //         return utils.val.isString(img) && img !== "" && img.includes("http");
        //     });
        //     if (debug) console.log(`SectionImage.js :: Useeffect for Content :: Original Content array = `, content, ` :: cleaned Content array = `, filteredContent);
        //     setImageSet(filteredContent);
        // }
    }, [content]);

    const [expanded, setExpanded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const buildContent = (input, displayType) => {
        let displayContent = [];
        if (utils.val.isObject(input)) {
            // TODO :: Later, create standardized a way to verify that all elements in an array is a certain type.
            let imageId = utils.ao.has(input, "id") ? input.id : "";
            let imageLabel = utils.ao.has(input, "label") ? input.label : "";
            let imageUrl = utils.ao.has(input, "image") ? input.image : "";
            let linkUrl = utils.ao.has(input, "link") ? input.link : "";
            displayContent.push(
                <a
                    key={`image-${imageId}-${Math.random() * 100}`}
                    id={`image-${imageId}-${Math.random() * 100}`}
                    href={`${linkUrl}`}
                    className={`image-link`}
                    style={{
                        ...{
                            ...overlapStyles,
                            ...(isHovering
                                ? {
                                      // height: `100% !important`,
                                      // width: `0% !important`,
                                      filter: `brightness(50%)`,
                                  }
                                : {
                                      // height: `100% !important`,
                                      // width: `100% !important`,
                                      filter: `brightness(100%)`,
                                  }),
                        },
                    }}
                    onMouseEnter={(e) => {
                        setIsHovering(true);
                    }}
                    onMouseLeave={(e) => {
                        setIsHovering(false);
                    }}>
                    <img
                        className={`image ${elementClasses}`}
                        style={{
                            ...{
                                ...imageStyles,
                                ...(isHovering
                                    ? {
                                          // height: `100% !important`,
                                          // width: `0% !important`,
                                          filter: `brightness(50%)`,
                                      }
                                    : {
                                          // height: `100% !important`,
                                          // width: `100% !important`,
                                          filter: `brightness(100%)`,
                                      }),
                            },
                        }}
                        onLoad={(event) => {}}
                        src={`${imageUrl}`}
                        alt={`${imageUrl}`}
                        key={`image-${imageId}-${Math.random() * 1e9}`}
                        id={`image-${imageId}-${Math.random() * 1e9}`}
                        // onMouseEnter={() => (isHover = true)}
                        // onMouseLeave={() => (isHover = false)}
                    />
                </a>,
            );
        }

        // Render a NEXT and BACK button, and utilize the state.
        return displayContent;
    };

    return (
        showParent && (
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
                {buildContent(content, type)}
            </div>
        )
    );
}

export default Image;

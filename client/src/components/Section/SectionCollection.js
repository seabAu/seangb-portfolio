// Catch-all component for content collections. Primarily, this will be for image collections, rendering them either as a static group in a grid or mosiac, or in a dynamic group as a carousel, slideshow, or some other user-friendly browsing method.

import React, { useState, useEffect } from "react";
import * as utils from "../Utilities/index.js";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
function SectionCollection(props) {
    const {
        children,
        type = "default", //
        content = [], // This should be an array of objects, each containing an image URL, and possibly a link if they are to be hyperlinked. Other image-specific parameters can be passed in via each object as well.
        data = [], // Full data from parent / calling component/
        datakeys = [], // The specific keys from the full data that this component is to be concerned with.
        scrollTimer = 3000,
        boxShadowEnabled = false,
        lockHeight = true,
        setLockHeight = `500px`,
        paginationType = `${"0.65rem"}`,
        paginationSize = `${"0.65rem"}`,
        paginationGap = `${"0.65rem"}`,
        paginationColor = `${"#00000047"}`,
        styles = {},
        classes = "",
        containerStyles = {},
        elementStyles = {},
        containerClasses = "",
        elementClasses = "",
        debug = false,
    } = props;

    if (debug) console.log(`SectionCollection.js :: props = `, props);

    const fillContainerStyles = {
        // Generic inline styling for making an element fill its container.
        height: `${"100%"}`,
        minHeight: `${"auto"}`,
        maxHeight: `${"100%"}`,
        width: `${"100%"}`,
        minWidth: `${"auto"}`,
        maxWidth: `${"100%"}`,
    };

    const flexStyles = {
        // Generic inline styling for flex.
        display: `${"flex"}`,
        flexDirection: `${"row"}`,
        /// flexDirection: `${"column"}`,
        justifyContent: `${"center"}`,
        alignItems: `${"center"}`,
        alignContent: `${"center"}`,
        alignSelf: `${"center"}`,
    };

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

    const centerStyles = {
        // Generic inline styling making an element centered in its container.
        display: `${"inline-block"}`,
        position: `${"relative"}`,
        // position: `${"fixed"}`,
        transform: `${"translate(0%, -50%)"}`,
        top: `${"50%"}`,
    };

    const collectionPaginationStyles = {
        borderRadius: `50%`,
        // marginInline: `${paginationGap}`, // Between-dot-gap
        marginInline: `${0}`,
        // width: `${ paginationSize }`, // Dot size x
        // height: `${ paginationSize }`, // Dot size y
        fontSize: `${paginationSize * 0.8}`,
        // backgroundColor: `${ paginationColor }`,
    };

    const collectionPaginationContainerStyles = {
        // ...flexStyles,
        // flexDirection: `column`,
        // flexDirection: `row`,
        /// ^ height: `${"100%"}`,
        // minHeight: `${"10px"}`,
        // maxHeight: `${"100%"}`,
        // width: `${"auto"}`,
        /// ^ width: `${"2.0rem"}`,
        /// ^ minWidth: `${"10px"}`,
        /// ^ maxWidth: `${"100%"}`,
        // backgroundColor: fillercolor,
        // border: `${"none"}`,
        // transition: "all 1s ease-in-out",
        /// ^ boxShadow: `${`1px 1px 5px 5px rgba(0, 0, 0, 0.25)`}`,
        /// ^ top: `${`50%`}`,
        gap: `${paginationGap}`, // Between-dot-gap
    };

    const slideshowButtonStyles = {
        // position: `relative`,
        // display: `flex`,
        // flexDirection: `column`,
        /// ^ height: `${"100%"}`,
        // minHeight: `${"10px"}`,
        // maxHeight: `${"100%"}`,
        // width: `${"auto"}`,
        /// ^ width: `${"2.0rem"}`,
        /// ^ minWidth: `${"10px"}`,
        /// ^ maxWidth: `${"100%"}`,
        // backgroundColor: fillercolor,
        // border: `${"none"}`,
        /// ^ borderRadius: `${"0"}px`,
        /// ^ padding: `${"0"}`,
        /// ^ margin: `${"0"}`,
        // transition: "all 1s ease-in-out",
        // left: `${'0 !important'}`,
        /// ^ boxShadow: `${`1px 1px 5px 5px rgba(0, 0, 0, 0.25)`}`,
        /// ^ top: `${`50%`}`,
        height: `${"50px"}`,
        width: `${"50px"}`,
    };

    const collectionContainerStyles = {
        ...flexStyles,
        flexDirection: `column`,
    };

    const collectionContentStyles = {
        ...flexStyles,
    };

    const collectionItemStyles = {
        height: `${lockHeight ? setLockHeight : `100%`}`,
    };
    const [imageSet, setImageSet] = useState([]);
    const [contentIndex, setContentIndex] = useState(0);

    useEffect(() => {
        // On content mount, load imageSet data.
        setImageSet(content);
    }, [content, type]);

    useEffect(() => {
        // Allow timed scrolling of the slideshow / carousel.
        if (type === "carousel" || type === "slideshow") {
            const interval = setInterval(() => {
                handleScroll();
            }, scrollTimer);
            // Clean up function.
            return () => clearInterval(interval);
        }
    });

    const handleScroll = () => {
        // Simply ++ the index.
        const newIndex = contentIndex + 1;
        changeContentIndex(newIndex);
    };

    const changeContentIndex = (i) => {
        if (utils.val.isValidArray(imageSet, true)) {
            if (i < 0) {
                i = imageSet.length - 1;
            } else if (i > imageSet.length - 1) {
                i = 0;
            }
            setContentIndex(i);
        }
    };

    const buildContent = (input, displayType) => {
        let displayContent = [];
        let indicators = [];
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
            if (displayType === "slideshow" || displayType === "carousel") {
                // If type is 'slideshow', render only one at a time. Constrain all of them to the same space to avoid jitter.
                input.forEach((item, index) => {
                    let imageUrl = utils.ao.has(item, "image")
                        ? item.image
                        : "";
                    let linkUrl = utils.ao.has(item, "link") ? item.link : "";
                    // let isHover = false;
                    indicators.push(
                        <div
                            className={`collection-pagination-bullet collection-pagination-control ${
                                index === contentIndex // || isHover
                                    ? "collection-pagination-active"
                                    : ""
                            }`}
                            style={
                                index === contentIndex
                                    ? {
                                          ...collectionPaginationStyles,
                                          // width: `${paginationSize * 1.1}`,
                                          // height: `${paginationSize * 1.1}`,
                                      }
                                    : { ...collectionPaginationStyles }
                            }
                            key={`section-collection-item-${index}-${Math.random() * 100}`}
                            id={`section-collection-item-${index}-${Math.random() * 100}`}
                            onClick={(e) => {
                                changeContentIndex(index);
                            }}>
                            {index === contentIndex // || isHover
                                ? index
                                : ""}
                        </div>,
                    );
                    displayContent.push(
                        <a
                            key={`collection-item-${index}-${Math.random() * 100}`}
                            id={`collection-item-${index}-${Math.random() * 100}`}
                            href={`${linkUrl}`}
                            className={`section-collection-item ${
                                index === contentIndex
                                    ? "section-collection-item-visible"
                                    : ""
                            }`}
                            // className={`section-img section-img-link ${elementClasses} ${index === contentIndex ? "" : "hidden-img"}`}
                            style={
                                index === contentIndex
                                    ? {
                                          height: `100% !important`,
                                          width: `0% !important`,
                                      }
                                    : {
                                          height: `100% !important`,
                                          width: `100% !important`,
                                      }
                            }>
                            <img
                                className="collection-img"
                                style={collectionItemStyles}
                                onLoad={(event) => {}}
                                src={`${imageUrl}`}
                                alt={`${imageUrl}`}
                                key={`section-collection-item-${index}-img-${Math.random() * 100}`}
                                id={`section-collection-item-${index}-img-${Math.random() * 100}`}
                                // onMouseEnter={() => (isHover = true)}
                                // onMouseLeave={() => (isHover = false)}
                            />
                        </a>,
                    );
                });
            }
        }

        // Render a NEXT and BACK button, and utilize the state.
        return (
            <div
                // className={`section-img-slideshow-container ${""}`}
                // style={imageSlideshowContainerStyles}
                className={`section-collection-container`}
                key={`section-collection-container-${Math.random() * 100}`}
                id={`section-collection-container-${Math.random() * 100}`}
                style={collectionContainerStyles}>
                <div className={`section-collection-content`} style={{}}>
                    {displayContent}
                </div>
                <div
                    className={`collection-pagination-container`}
                    style={collectionPaginationContainerStyles}
                    key={`section-pagination-container-${Math.random() * 100}`}
                    id={`section-pagination-container-${Math.random() * 100}`}>
                    <button
                        className={`collection-pagination-button prev glassmorphic-button image-slideshow-button`}
                        style={slideshowButtonStyles}
                        onClick={(e) => {
                            changeContentIndex(contentIndex - 1);
                        }}
                        key={`collection-pagination-button-prev-${
                            Math.random() * 100
                        }`}
                        id={`collection-pagination-button-prev-${
                            Math.random() * 100
                        }`}>
                        <FaAngleLeft />
                    </button>
                    <button
                        className={`collection-pagination-button next glassmorphic-button image-slideshow-button`}
                        style={slideshowButtonStyles}
                        onClick={(e) => {
                            changeContentIndex(contentIndex + 1);
                        }}
                        key={`collection-pagination-button-next-${
                            Math.random() * 100
                        }`}
                        id={`collection-pagination-button-next-${
                            Math.random() * 100
                        }`}>
                        <FaAngleRight />
                    </button>
                    {indicators}
                </div>
            </div>
        );
    };

    return buildContent(content, type);
}

export default SectionCollection;

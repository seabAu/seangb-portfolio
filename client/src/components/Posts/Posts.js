import React, { useState, useEffect, useRef, Children, Component } from "react";
import PropTypes from "prop-types";
import * as utils from 'akashatools';
import "./Post.css";
import Post from "./index.js";

// Container item for a collection of posts. Here is where you set information like layout of the post collection, the container width and height, pagination, lazy loading, etc.
/*
    Typical layout:
    List all posts here.
    <Posts>
        <PostsFilters />
        [
            <Post />
        ]
    </Posts>
*/

import {
    FaThList,
    FaTh,
    FaThLarge,
    FaWindowMaximize,
    FaWindowMinimize,
} from "react-icons/fa";
import Input from "../Form/Input.js";
import Button from "../Button/index.js";
import Section from "../Section/index.js";

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

function Posts ( props )
{
    const {
        children,
        dataModel = {},
        data,
        label = "",
        name = "", // Value ID
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Posts collection settings.

        options = [],
        filters, // List of active filters.
        activeFocusIndex,

        // Style settings.
        layout = "grid", // LIST | GRID | FLEX | MASONRY
        rows = 1,
        rowHeight = `300px`,
        cols = 1,
        colWidth = `400px`,
        gap = `${`0.5rem`}`,
        type = "default",
        flexDirection = `${"column"}`,
        alignContent = `${"center"}`,
        padding = `${"0.25rem 1.0rem"}`,
        margin = `${"0.0rem"}`,
        border = `${"none"}`,
        borderRadius = `${"0%"}`,
        boxShadowEnabled = `${true}`,

        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;
    const postExpandTypeRef = useRef(-1);
    const activePostRef = useRef(-1);
    const [activeIndex, setActiveIndex] = useState(activePostRef.current ? activePostRef.current : 0);
    const [postsLayout, setPostsLayout] = useState(`grid`); // LIST | GRID | FLEX | MASONRY
    const [postExpandType, setPostExpandType] = useState(`fill`); // FILL | OVERLAY
    const [posts, setPosts] = useState();
    const [postIndex, setPostIndex] = useState(-1);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageLength, setPageLength] = useState(10);
    const [postWidth, setPostWidth] = useState(`20`);

    const onClickSetActive = (index = -1) => {
        setActiveIndex(index === activeIndex ? -1 : index);
        activePostRef.current = index === activeIndex ? -1 : index;
        if (debug) console.log("Posts.js :: onClickSetActive. index = ", index, " :: activePostRef.current = ", activePostRef.current);
    };
    // Tracking the window size.
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    const controls = [
        {
            name: "displayList",
            label: "List",
            icon: <FaThList />,
            classes: ``,
            onClick: (e) => {
                setPostsLayout("list");
            },
        },
        {
            name: "displayGrid",
            label: "Grid",
            icon: <FaTh />,
            classes: `${``}`,
            onClick: (e) => {
                setPostsLayout("grid");
            },
        },
        {
            name: "displayFlex",
            label: "Flex",
            icon: <FaThLarge />, //FaJira
            classes: ``,
            onClick: (e) => {
                setPostsLayout("flex");
            },
        },
        {
            name: "postExpandBehavior",
            label: `${postExpandType === "Fill" ? "Overlay" : "Fill"}`,
            icon: postExpandType ? <FaWindowMaximize /> : <FaWindowMinimize />,
            classes: ``,
            // onClick: (e) => {
            //     setPostExpandType(
            //         `${postExpandType === "fill" ? "overlay" : (postExpandType === `overlay` ? `fill` : `overlay`)}`,
            //     );
            // },
            onClick: (e) => {
                setPostExpandType(postExpandType === "Fill" ? "Overlay" : "Fill");
            },

            // name: "postExpandBehavior",
            // label: `${postExpandTypeRef.current === "Fill" ? "Overlay" : "Fill"}`,
            // icon: postExpandTypeRef.current ? <FaWindowMaximize /> : <FaWindowMinimize />,
            // classes: ``,
            // // onClick: (e) => {
            // //     setPostExpandType(
            // //         `${postExpandType === "fill" ? "overlay" : (postExpandType === `overlay` ? `fill` : `overlay`)}`,
            // //     );
            // // },
            // onClick: ( e ) =>
            // {
            //     postExpandTypeRef.current = postExpandTypeRef.current === "Fill" ? "Overlay" : "Fill";
            //     // (
            //     //
            //     //     postExpandTypeRef.current === "fill"
            //     //         ? "overlay"
            //     //         : postExpandTypeRef.current === `overlay`
            //     //             ? `fill`
            //     //             : `overlay` );
            // },
        },
    ];
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        postExpandTypeRef.current = postExpandType;
        if (debug) console.log("postExpandTypeRef = ", postExpandTypeRef.current);
    }, [postExpandType]);

    const contentStyles = {
        // Default styles go here.
        // ...flexStyles,
        // ...fillContainerStyles,
        // User-set styles override default settings.
        gap: `${gap}`,
        padding: `${padding ? padding : "0.0rem"}`,
        // border: `1px solid white`,
        // Responsiveness overrides go here.
    };

    const filterStyles = {
        gap: `${gap}`,
        padding: `${padding ? padding : "0.0rem"}`,
    };

    const componentStyles = {
        // Default styles go here.
        // ...flexStyles,
        // ...fillContainerStyles,
        // User-set styles override default settings.{{
        // display: `${"flex"}`,
        // flexDirection: `${flexDirection}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        padding: `${padding ? padding : "0.0rem"}`,
        margin: `${margin ? margin : "0.0rem"}`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    const gridStyles = {
        display: `${`grid`}`,
        gridTemplateRows: `${`auto ${rowHeight} auto`}`,
        gridTemplateColumns: `${`repeat(auto-fill, minmax(${colWidth}, 1fr))`}`,
        gridGap: `${`1rem`}`,
        grid: `${`repeat(auto-fit, 1fr) / auto-flow 1fr`}`,
        transition: `${`300ms all cubic-bezier(0.645, 0.045, 0.355, 1)`}`,
    };

    const gridItemStyles = {
        display: `${`grid`}`,
        gridColumn: `${`1 / span ${cols}`}`,
        gridRow: `${`1 / span ${rows}`}`,
    };

    const flexGridStyles = {
        display: `${"flex"}`,
        flexWrap: `${`wrap`}`,
    };

    useEffect(() => {
        if (debug) console.log("Posts.js :: input data = ", data, " :: posts: ", posts);
    }, [data, posts]);

    useEffect(() => {
        if (debug) console.log("Posts.js :: Re-rendering. activeFocusIndex = ", activeFocusIndex, " :: activePostRef.current = ", activePostRef.current);
    } );
    
    const buildPosts = (input) => {
        if (debug) console.log("Posts.js :: GetPosts :: posts = ", posts);
        return input.map((post, index) => {
            return utils.val.isObject(post) ? (
                <Post
                    show={true}
                    // Post-specific settings.
                    id={`post-${index}-${post._id}`}
                    key={`post-${index}-${post._id}`}
                    index={index}
                    label={""}
                    name={`post-${index}-${post._id}`}
                    isExpanded={
                        index && activePostRef.current
                            ? activePostRef.current === -1
                                ? false
                                : index === activePostRef.current
                                ? true // `post-full`
                                : false
                            : false
                    }
                    setActiveFocusIndex={() => {
                        activePostRef.current = index;
                    }}
                    activeFocusIndex={activeIndex}
                    activePost={activePostRef}
                    expandType={postExpandType}
                    postOnClick={onClickSetActive}
                    data={post}
                    /// options={[...post.options, "expand"]}
                    options={["expand"]}
                    /// // Content settings.
                    // Style settings.
                    layout={"column"}
                    alignContent={"center"}
                    padding={"0.5rem 1.0rem"}
                    // margin={"0.5rem 0.0rem"}
                    border={"none"}
                    borderRadius={"0%"}
                    boxShadowEnabled={true}
                    opacity={`0.9`}
                    // Can import extra styles.
                    classes={
                        ``
                        // index === activePostRef.current
                        //     ? `post-full`
                        //     : `post-summary`
                    }
                    styles={{
                        // width: `${`100%`}`,
                        // minWidth: `${`auto`}`,
                        flex: `1 1 ${postWidth}rem`,
                    }}
                    debug={false}
                    // onClick={(event) => {
                    //     onClickSetActive(index);
                    // } }
                >
                    <Post.Content show={true}>
                        <Post.Pane layout={`col`}>
                            <Post.Pane layout={`row`}>
                                <Post.Image
                                    index={post.id ? post.id : 0}
                                    id={post.id ? post.id : 0}
                                    label={post.title}
                                    url={post.imageUrl}
                                    link={post.imageLink}
                                    type={"title"}
                                    scale={`lg`}
                                    color={"text-highlightColor"}
                                    separator={true}
                                    style={{}}
                                />
                                <Section.Text
                                    index={post.id ? post.id : 0}
                                    name={post.id ? post.id : 0}
                                    label={post.content}
                                    content={post.content}
                                    format={"body"}
                                    type={"text"}
                                    scale={`sm`}
                                    color={"text-white"}
                                    separator={false}
                                    before={``}
                                    after={``}
                                    style={{}}
                                />
                            </Post.Pane>
                        </Post.Pane>
                    </Post.Content>
                </Post>
            ) : (
                <> </>
            );
        });
    };

    // useEffect( () =>
    // {
    //     setPostExpandType(postExpandType === "Fill" ? "Overlay" : "Fill");
    // }, [activePostRef]);
    useEffect(() => {
        if (utils.val.isValidArray(data, true)) {
            setPosts(data);
        }
    }, [data]);

    let controlFields = [
        {
            name: `setpostwidth`,
            label: `x`,
            type: `number`,
            layout: `inline-reverse`,
            inputProps: {
                defaultValue: postWidth,
            },
            onChange: (e) => {
                setPostWidth(e.target.value);
            },
        },
        {
            name: `setpagenum`,
            label: `of ${data.length % parseInt(pageLength !== 0 ? pageLength : 1)}`,
            type: `number`,
            layout: `inline-reverse`,
            inputProps: {
                defaultValue: pageIndex,
                min: 0,
                max: data.length,
            },
            onChange: (e) => {
                // setPageIndex(e.target.value);
                changePage(data.length, pageIndex, pageLength);
            },
        },
        {
            name: `setpagelength`,
            label: ` / page`,
            type: `number`,
            layout: `inline-reverse`,
            inputProps: {
                defaultValue: pageLength,
            },
            onChange: (e) => {
                let value = e.target.value;
                if (value) {
                    if (!isNaN(value)) {
                        if (value > 0 && value < 200) {
                            setPageLength(+value);
                        }
                    }
                }
                // let numpages = data.length % pageLength;
                // setPageLength(utils.math.clamp(e.target.value, 0, numpages));
            },
        },
    ];

    const getPageEntries = (data, page, numPerPage, filters = []) => {
        if (!data) {
            return [{ Error: "No data." }];
        }

        let entries = [];
        let startIndex = page * numPerPage;
        let endIndex = page * numPerPage + numPerPage - 1;
        for (var i = 0; i < data.length; i++) {
            if (data[i]) {
                if (i >= startIndex && i <= endIndex) {
                    entries.push(data[i]);
                }
            }
        }
        return entries;
    };

    const changePage = (dataLen, page, numPerPage) => {
        // console.log( "changePage(): ", pagenum, pageNum );
        // const crimeReportsClone = [...crimeReports];
        // console.log( "Reached bottom of table: ", crimeReports );
        const numPages = Math.ceil(dataLen / parseInt(numPerPage));
        if (page >= 0 && page < numPages) {
            // if (dataLen > entriesPerPage) {
            setTimeout(() => {
                return setPageIndex(parseInt(page));
            }, 10);
        }
    };

    return (
        <div
            // className={`posts-container ${
            //     postsLayout === "grid"
            //         ? `posts-grid`
            //         : postsLayout === "flex"
            //         ? `posts-flex`
            //         : contentStyles
            // }`}
            className={`posts-container posts-${postsLayout}`}
            style={componentStyles}>
            <div
                className={`posts-controls`}
                style={{}}>
                <Button.Controls
                    show={true}
                    controls={controls}
                />
                <Input.Group
                    model={controlFields}
                    groupLayout="inline"
                    fieldLayout="inline"
                />
                {
                    // buildFieldsFor(controlFields)
                }
            </div>
            <div
                className={`posts-options options-container`}
                style={{}}></div>
            <div
                className={`posts-pagination`}
                style={{}}>
                <p>
                    {`Viewing ${pageIndex * pageLength} to ${pageIndex * pageLength + pageLength - 1 > data.length ? data.length : pageIndex * pageLength + pageLength - 1} of ${
                        data.length
                    } entries found.`}
                </p>
            </div>
            <div
                className={`posts-filters`}
                style={filterStyles}></div>
            <div
                className={`posts-content`}
                // style={
                //     postsLayout === "grid"
                //         ? { ...contentStyles, ...gridStyles }
                //         : postsLayout === "flex"
                //         ? { ...contentStyles, ...flexGridStyles }
                //         : contentStyles
                // }
            >
                {!utils.val.isValidArray(posts, true) && children && children !== false && children}
                {utils.val.isValidArray(posts, true) && buildPosts(getPageEntries(data, pageIndex, pageLength, []))}
            </div>
        </div>
    );
}

function Filter(props) {
    const {
        children,
        // fieldtype = "text", // Default to text type.
    } = props;

    return (
        <div className="content-filter">
            {children && children !== false && children}
        </div>
    );
}
Posts.Filter = Filter;

export default Posts;

import React, { Children, Component, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import * as utils from "../Utilities/index.js";
import "./Post.css";
// Basic layout component for post type elements.
/*
    Typical layout:
    List all posts here.
    <PostFilters />
    <Posts>
        <Post>
            <Post.Header>
                <Post.Control>
                    Fullscreen
                    ReturnHome
                    Edit
                    Delete
                </Post.Control>
            </Post.Header>
            <Post.Body>
                <Post.Image />
                <Post.Text />
            </Post.Body>
            <Post.Footer>
                <Post.Info>
                    Date posted
                    Author
                    Category
                    Tags
                </Post.Info>
            </Post.Footer>
        </Post>
    </Posts>
*/

import {
    FaRegEdit,
    FaExpand,
    FaExpandArrowsAlt,
    FaFilter,
    FaEllipsisH,
    FaEllipsisV,
    // Icons for adding content
    FaPlusSquare,
    FaPlusCircle,
    FaPlus,
    // Icons for removing content
    FaWindowClose,
    FaTimesCircle,
    FaTimes,
    FaRedoAlt,
    // Icons for adjusting index
    FaSortDown,
    FaSortUp,
    FaSort,
    FaEdit,
    FaReadme,
    FaBookOpen,
    FaBook,
    FaRegWindowClose,
    FaWindowMaximize,
    FaWindowMinimize,
} from "react-icons/fa";
import Button from "../Button/index.js";

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
    justifyContent: `${"center"}`,
    alignItems: `${"center"}`,
    alignContent: `${"center"}`,
    alignSelf: `${"center"}`,
    /// flexDirection: `${"column"}`,
};

/* // Reference post data schema model:

    {
        // Post content
        author: "",
        title: "",
        topic: "",
        content:"",
        imageUrl: "",
        imageLink: "",
        // Post Timestamps
        timestampPosted: Date.now(),
        timestampUpdated: Date.now(),
        // Allows for customized styling for specific posts, if provided.
        options: ["edit", "delete", "update"],
        // Post categorization
        categories: ["dev", "testing"],
        tags: ["text", "images"],
        // Post Interactions
        views: 56,
        comments: [
            {
                userId: 3487592647,
                title: "Comment title",
                content: "Comment content",
            },
        ],
        likes: 1,
        dislikes: 2,
    },
*/

function Post(props) {
    const {
        children,
        // Render overrides, if ever needed.
        show = true,
        showChildren = true,
        // Content settings.
        data, // In lieu of providing child elements, we can pass in an object to render instead.
        label = "",
        name = "", // Value ID
        // Post-specific settings.
        id,
        index = 0,
        activeFocusIndex = -1,
        activePost = -1,
        expandMode = "fill",
        isExpanded = false,
        // expandMode = `${expandMode}`, // SUMMARY | FILL | OVERLAY
        /// onClick,
        postOnClick,
        setActiveFocusIndex,
        layout = `${"column"}`,
        // Post Header specific properties.
        showHeader = true,
        options = [],
        // Post Content specific properties.
        showContent = true,
        // content = [],
        // Post Footer specific properties.
        showFooter = true,
        // categories,
        // tags,
        // comments = [],

        // Style settings.
        type = "default",
        alignContent = `${"center"}`,
        minHeight = `20rem`,
        minWidth = `20rem`,
        padding = `${"0.0rem"}`,
        margin = `${"0.0rem"}`,
        border = `${"1px solid #000"}`,
        borderRadius = `${"0%"}`,
        boxShadowEnabled = `${true}`,
        boxShadow = `${"1px 1px 2px 2px rgba(0, 0, 0, 0.025)"}`,
        backgroundColor = `colorTertiary`, // = `${"rgba(0, 0, 0, 0.25)"}`,
        textColor = `${"white"}`,
        opacity = 1.0,
        transition,
        transform,
        filter, // none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url(); https://www.w3schools.com/cssref/css3_pr_filter.php
        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const defaultControls = [
        {
            label: "fullscreen",
            classes: `${index && activePost.current ? (activePost.current === -1 ? `` : index === activePost.current ? `active` : ``) : ``}`,
            func: (index) => {
                handleClick();
            },
        },
        { label: "edit", classes: ``, func: () => {} },
        { label: "delete", classes: ``, func: () => {} },
        { label: "share", classes: ``, func: () => {} },
    ];

    const postRef = useRef(null);

    const [expanded, setExpanded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        setExpanded(isExpanded);
        console.log("Post.js :: isExpanded has changed. index = ", index, " :: isExpanded = ", isExpanded);
    }, [isExpanded]);
    useEffect(() => {
        setExpanded(
            index && activePost.current
                ? activePost.current === -1
                    ? false
                    : index === activePost.current
                    ? true // `post-full`
                    : false
                : false,
        );
        console.log("Post.js :: activePost.current has changed. index = ", index, " :: activeFocusIndex = ", activeFocusIndex, " :: activePost = ", activePost);
    }, [activePost]);

    const postStyles = {
        padding: `${padding}`,
        margin: `${margin}`,
        border: `${isHovering ? `${"0px solid #00001122"}` : border}`,
        backgroundColor: `${backgroundColor}`,
        boxShadow: `${isHovering ? `${"1px 1px 2px 2px rgba(0, 0, 0, 0.25)"}` : boxShadow}`,
        ...styles,
        justifyContent: `${`"flex-start`}`,
        // minHeight: `${index === activeFocusIndex ? `100%` : `20rem`}`,
        // minWidth: `${index === activeFocusIndex ? `100%` : `20rem`}`,
    };

    const filterStyles = {
        opacity: `${opacity < 1.0 ? `${isHovering ? `${"1.0"}` : opacity}` : opacity}`,
        // color: `${textColor}`,
        // color: `${isHovering ? 'white' : `${textColor}`}}`,
        // color: isHovering ? 'white' : 'red',
        transition: `${transition ? transition : "none"}`,
        transform: `${transform ? transform : "none"}`,
        filter: `${filter ? filter : "none"}`,
    };

    const styleCombine = (input = []) => {};
    const componentStyles = {
        ...{
            display: `block`,
        },
        // {
        //     filter !== "none" ||
        //     transform !== "none" ||
        //     transition !== "none"
        //         ? { ...filterStyles, ...postStyles }
        //     : { ...postStyles }
        // },
    };

    const handleClick = () => {
        console.log("Post.js :: index = ", index, " :: activeFocusIndex = ", activeFocusIndex, " :: activePost = ", activePost);
        /// setActiveFocusIndex(index);
        postOnClick(index);
        // postRef.current.style.backgroundColor = 'salmon';
        // postRef.current.style.color = 'white';
        // postRef.current.style.padding = '2rem';
        let expanded =
            index && activePost.current
                ? activePost.current === -1
                    ? false
                    : index === activePost.current
                    ? true // `post-full`
                    : false
                : false;
        postRef.current.style.width = `${expanded ? `100%` : `auto`}`;
        postRef.current.style.height = `${expanded ? `100%` : `auto`}`;
    };

    // useEffect( () =>
    // {
    //     console.log(
    //         "Post.js :: postRef.current.style = ",
    //         postRef.current.style,
    //     );
    // }, []);

    const summaryViewStyles = {
        // Styles for the basic on-load view of the post.
        flex: `${`1 0 auto`}`,
        minHeight: `${`20rem`}`,
        minWidth: `${`20rem`}`,
    };
    const fullViewStyles = {
        // Styles for the expanded, full-screen view of the post.

        maxHeight: `${`100%`}`,
        maxWidth: `${`100%`}`,
        minHeight: `${`100%`}`,
        minWidth: `${`100%`}`,
        Height: `${`100%`}`,
        Width: `${`100%`}`,
        flex: `${`1 1 100%`}`,
    };

    const buildControls = (controlsEnabled) => {
        let controlButtons = [];
        const controls = [
            {
                label: "fullscreen",
                classes: `${index && activePost.current ? (activePost.current === -1 ? `` : index === activePost.current ? `active` : ``) : ``}`,
                func: (index) => {
                    handleClick();
                },
            },
            { label: "edit", classes: ``, func: () => {} },
            { label: "delete", classes: ``, func: () => {} },
            { label: "share", classes: ``, func: () => {} },
        ];
        /// console.log(
        ///     "Post.js :: buildControls :: controlsEnabled = ",
        ///     controlsEnabled,
        /// );
        if (utils.val.isValidArray(controlsEnabled, true)) {
            controlsEnabled.forEach((control, index) => {
                // console.log("Post.js :: buildControls :: control = ", control);
                if (control !== "") {
                    switch (control) {
                        case `expand`:
                            controlButtons.push({
                                name: "toggleView",
                                label: "Read",
                                // icon: expanded ? <FaBookOpen /> : <FaBook />,
                                icon: expanded ? <FaWindowMaximize /> : <FaWindowMinimize />,
                                classes: `${
                                    isExpanded ? "active" : ""
                                    // index && activePost.current
                                    //     ? activePost.current === -1
                                    //         ? ``
                                    //         : index === activePost.current
                                    //         ? `active`
                                    //         : ``
                                    //     : ``
                                }`,
                                func: (index) => {
                                    handleClick();
                                },
                            });
                            break;
                        case `edit`:
                            controlButtons.push({
                                name: "edit",
                                label: "Edit",
                                icon: <FaRegEdit />,
                                classes: ``,
                                func: (index) => {},
                            });
                            break;
                        case `delete`:
                            controlButtons.push({
                                name: "delete",
                                label: "Delete",
                                icon: <FaRegWindowClose />,
                                classes: ``,
                                func: (index) => {},
                            });
                            break;
                        case `close`:
                            controlButtons.push({
                                name: "close",
                                label: "Close",
                                icon: <FaWindowClose />,
                                classes: ``,
                                func: (index) => {},
                            });
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        console.log("Post.js :: buildControls :: controlButtons = ", controlButtons);
        return controlButtons;
    };

    const buildPost = (post) => {
        let optionsEnabled = [...options, ...post.options];
        let controls = utils.val.isValidArray(optionsEnabled, true)
            ? buildControls(optionsEnabled) // buildControls([...options, ...post.options])
            : [];
        console.log("Post.js :: buildPost() :: post = ", post, " :: controls = ", controls, post.hasOwnProperty("content"));

        return utils.ao.hasAll(post, ["author", "title", "options"]) ? (
            <div
                id={`post-${index}`}
                key={`post-${index}`}
                ref={postRef}
                className={`post`}>
                {utils.val.isValidArray(controls, true) && (
                    <Button.Controls
                        show={true}
                        controls={controls}
                        showlabels={false}
                    />
                )}
                <Post.Header
                    show={showHeader && post.title && post.title !== ""}
                    title={post.title}
                    info={
                        utils.ao.hasAll(post, ["categories", "tags", "views", "likes", "dislikes", "timestampPosted", "timestampUpdated"])
                            ? {
                                  index: index,
                                  likes: post.likes,
                                  dislikes: post.dislikes,
                                  views: post.views,
                                  categories: post.categories,
                                  tags: post.tags,
                                  timestampUpdated: post.timestampUpdated,
                                  timestampPosted: post.timestampPosted,
                              }
                            : { likes: 0, dislikes: 0, views: 0 }
                    }></Post.Header>
                <Post.Content
                    show={
                        showContent && post.hasOwnProperty("content") // &&
                        //utils.val.isValidArray(post.content, true)
                    }
                    layout={layout}
                    content={post.content}
                    classes={`${isExpanded ? `post-content-summary` : `post-content-full`}`}
                    styles={
                        {
                            // display: `${isExpanded ? `flex` : `none`}`,
                        }
                    }
                    // classes={ `post-body ${ classes }` }
                >
                    <Post.Pane layout={`${`col`}`}>
                        <Post.Pane layout={`row`}>
                            {post.hasOwnProperty("imageUrl") && post.hasOwnProperty("imageLink") && (
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
                            )}
                        </Post.Pane>
                        <Post.Pane
                            layout={`row`}
                            styles={{
                                display: `${isExpanded ? `flex` : `none`}`,
                            }}>
                            {post.hasOwnProperty("content") // && utils.val.isValidArray(post.content, true)
                                ? post.content.map((item, itemIndex) => {
                                      return (
                                          <Post.Text
                                              index={itemIndex}
                                              name={post.id}
                                              content={item}
                                              type={"text"}
                                              scale={`sm`}
                                              color={"text-white"}
                                              separator={true}
                                              // style={}
                                          />
                                      );
                                  })
                                : ""}
                        </Post.Pane>
                    </Post.Pane>
                </Post.Content>
                <Post.Footer
                    show={showFooter}
                    comments={post.hasOwnProperty("comments") ? post.comments : []}></Post.Footer>
            </div>
        ) : (
            ""
        );
    };

    const getPost = () => {
        let controls = utils.val.isValidArray(options, true) ? buildControls(options) : [];
        console.log("Post.js :: getPost() :: props = ", props, " :: data = ", data, " :: controls = ", controls);
        return !data ? (
            <div
                id={`post-${index}`}
                key={`post-${index}`}
                ref={postRef}
                className={`post`}>
                {utils.val.isValidArray(controls, true) && (
                    <Button.Controls
                        show={true}
                        controls={controls}
                    />
                )}
                {children}
            </div>
        ) : (
            buildPost(data)
        );
    };
    // Rendering:
    // If we're given an object array in the data property, we render it ourselves in here.
    // Otherwise, if we're given child components, just pass them through with this as its container.
    return (
        //<Post.Body>
        //    <Post.Content label={label} name={name} style={styles}>
        //        {children && children !== false && children}
        //    </Post.Content>
        //</Post.Body>
        show && (
            <div
                id={`post-${index}`}
                key={`post-${index}`}
                ref={postRef}
                className={`post-container ${classes ? classes : ``} ${
                    index && activePost.current
                        ? activePost.current === -1
                            ? `post-summary`
                            : index === activePost.current
                            ? `post-${expandMode}` // `post-full`
                            : `post-summary`
                        : `post-summary`
                }`}
                onClick={(e) => {
                    // postOnClick(index);
                    // handleClick();
                }}
                /// onClick={onClick}
                // onClick={(index) => {
                //     postOnClick(index);
                // }}
                // style={componentStyles}
                style={
                    // {
                    // ...(opacity < 1.0 ||
                    // filter !== "none" ||
                    // transform !== "none" ||
                    // transition !== "none"
                    //     ? filterStyles
                    //     : {}),
                    // padding: `${padding}`,
                    // margin: `${margin}`,
                    // border: `${
                    //     isHovering ? `${"0px solid #00001122"}` : border
                    // }`,
                    // backgroundColor: `${backgroundColor}`,
                    // boxShadow: `${
                    //     isHovering
                    //         ? `${"1px 1px 2px 2px rgba(0, 0, 0, 0.25)"}`
                    //         : boxShadow
                    // }`,
                    // ...styles,
                    // }
                    // opacity < 1.0 ||
                    // filter !== "none" ||
                    // transform !== "none" ||
                    // transition !== "none"
                    //     ? { ...filterStyles, ...postStyles }
                    //     : { ...postStyles }
                    postStyles
                }
                onMouseEnter={(e) => {
                    setIsHovering(true);
                }}
                onMouseLeave={(e) => {
                    setIsHovering(false);
                }}
                // onMouseEnter={( boxShadow = `${ "1px 1px 2px 2px rgba(0, 0, 0, 0.025)" }` ) }
            >
                {show && getPost()}
            </div>
        )
    );

    /*  // Archived post rendering block on 04-03-23 2143
        // Rendering:
        // If we're given an object array in the data property, we render it ourselves in here.
        // Otherwise, if we're given child components, just pass them through with this as its container. 
        return (
            //<Post.Body>
            //    <Post.Content label={label} name={name} style={styles}>
            //        {children && children !== false && children}
            //    </Post.Content>
            //</Post.Body>
            show && (
                <div
                    id={`post-${index}`}
                    key={`post-${index}`}
                    ref={postRef}
                    className={`post-container ${classes ? classes : ``} ${
                        index && activePost.current
                            ? activePost.current === -1
                                ? `post-summary`
                                : index === activePost.current
                                ? `post-${expandMode}` // `post-full`
                                : `post-summary`
                            : `post-summary`
                    }`}
                    onClick={(e) => {
                        // postOnClick(index);
                        // handleClick();
                    }}
                    /// onClick={onClick}
                    // onClick={(index) => {
                    //     postOnClick(index);
                    // }}
                    // style={componentStyles}
                    style={
                        // {
                        // ...(opacity < 1.0 ||
                        // filter !== "none" ||
                        // transform !== "none" ||
                        // transition !== "none"
                        //     ? filterStyles
                        //     : {}),
                        // padding: `${padding}`,
                        // margin: `${margin}`,
                        // border: `${
                        //     isHovering ? `${"0px solid #00001122"}` : border
                        // }`,
                        // backgroundColor: `${backgroundColor}`,
                        // boxShadow: `${
                        //     isHovering
                        //         ? `${"1px 1px 2px 2px rgba(0, 0, 0, 0.25)"}`
                        //         : boxShadow
                        // }`,
                        // ...styles,
                        // }
                        opacity < 1.0 ||
                        filter !== "none" ||
                        transform !== "none" ||
                        transition !== "none"
                            ? { ...filterStyles, ...postStyles }
                            : { ...postStyles }
                    }
                    onMouseEnter={(e) => {
                        setIsHovering(true);
                    }}
                    onMouseLeave={(e) => {
                        setIsHovering(false);
                    }}
                    // onMouseEnter={( boxShadow = `${ "1px 1px 2px 2px rgba(0, 0, 0, 0.025)" }` ) }
                >
                    <div
                        id={`post-${index}`}
                        key={`post-${index}`}
                        ref={postRef}
                        className={`post`}>
                        {title && title !== "" && (
                            <Post.Header show={showHeader} title={title}>
                                <Post.Text
                                    // styles={
                                    //     index === activeFocusIndex ? {color: `white`,} : {color: `red`,}
                                    // }
                                    index={index}
                                    name={`header-text-${index}-${title}`}
                                    label={title}
                                    content={title}
                                    type={"title"}
                                    scale={index === activeFocusIndex ? "xl" : "lg"}
                                    color={
                                        index === activeFocusIndex
                                            ? "text-white"
                                            : "text-highlightColor2"
                                    }
                                    separator={true}
                                    style={{}}>
                                    {}
                                </Post.Text>
                                {utils.val.isValidArray(controls, true) && (
                                    <Post.Controls show={true} controls={controls} />
                                )}
                            </Post.Header>
                        )}
                        {showChildren && children && children !== false && (
                            <Post.Content show={showContent} classes={`post-body ${classes}`}>
                                {children}
                            </Post.Content>
                        )}
                        {utils.val.isValidArray(controls, true) && (
                            <Post.Footer
                                show={showFooter}
                                controls={controls}></Post.Footer>
                        )}
                    </div>
                </div>
            )
        );
    */
    /*
    useEffect(() => {
        let expanded =
            index && activePost.current
                ? activePost.current === -1
                    ? false
                    : index === activePost.current
                : false;
        setExpanded(expanded);
        console.log(
            "Post.js :: index = ",
            index,
            " :: activePost = ",
            activePost,
            " :: activeFocusIndex = ",
            activeFocusIndex,
        );
        if (expanded) {
            // postRef.current.style.backgroundColor = "salmon";
            // postRef.current.style.color = "white";
            // postRef.current.style.padding = "2rem";
            // postRef.current.style.width = "300px";
            postRef.current.style = {
                ...postRef.current.style,
                ...fullViewStyles,
            };
        } else {
            // postRef.current.style.width = "800px !important";
            // postRef.current.style.height = "800px !important";
            postRef.current.style = {
                ...postRef.current.style,
                ...summaryViewStyles,
            };
        }
    }, [activePost, activeFocusIndex]);

    useEffect( () =>
    {
    }, [expanded]);

    return (
        //<Post.Body>
        //    <Post.Text label={label} name={name} style={styles}>
        //        {children && children !== false && children}
        //    </Post.Text>
        //</Post.Body>
        showParent && (
            <div className={`post-container`} style={componentStyles}>
                <div className={`post-body ${classes}`} style={styles}>
                    {showChildren && children && children !== false && children}
                </div>
            </div>
        )
    );
    */
}

function Controls(props) {
    const {
        // Content settings.
        show = true,
        // controls = [],
        controls = [
            { label: "fullscreen", func: () => {}, classes: "" },
            { label: "edit", func: () => {}, classes: "" },
            { label: "delete", func: () => {}, classes: "" },
            { label: "share", func: () => {}, classes: "" },
        ],
        showlabels = true,
        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    /*
    const controls = [
        {
            name: "displayList",
            label: "List",
            icon: <FaThList />,
            classes: ``,
            func: (e) => {
                setPostsLayout("list");
            },
        },
        {
            name: "displayGrid",
            label: "Grid",
            icon: <FaTh />,
            classes: `${``}`,
            func: (e) => {
                setPostsLayout("grid");
            },
        },
        {
            name: "displayFlex",
            label: "Flex",
            icon: <FaThLarge />, //FaJira
            classes: ``,
            func: (e) => {
                setPostsLayout("flex");
            },
        },
        {
            name: "postExpandBehavior",
            label: `${postExpandType === "Fill" ? "Overlay" : "Fill"}`,
            icon: postExpandType ? <FaWindowMaximize /> : <FaWindowMinimize />,
            classes: ``,
            func: (e) => {
                setPostExpandType(postExpandType === "Fill" ? "Overlay" : "Fill");
            },

        },
    ];
    */

    const renderControls = () => {
        console.log("Post.Controls.js :: renderControls :: controls = ", controls);
        return (
            <div className={`post-controls`}>
                {utils.val.isValidArray(controls, true)
                    ? controls.map((control, index) => {
                          return utils.ao.has(control, "label") && utils.ao.has(control, "func") ? (
                              <div
                                  id={`post-control-button-${control.label}`}
                                  key={`post-control-button-${control.label}`}
                                  className={`post-control-button ${utils.ao.has(control, "classes") ? control.classes : ""}`}
                                  onClick={control.func} //{() => {func}}
                              >
                                  {showlabels && <dev className={`button-text`}>{control.label}</dev>}
                                  <i className="button-icon icon">{control.icon}</i>
                              </div>
                          ) : (
                              <></>
                          );
                      })
                    : ""}
            </div>
        );
    };

    console.log("Post.Controls :: {Props} = ", props);
    return show && utils.val.isValidArray(controls, true) && renderControls();
}
Post.Controls = Controls;

function Header(props) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        show = true,
        showChildren = true,
        // Content settings.
        label = "",
        title = "",
        author = "",
        info,
        controls = [],
        // Style settings.
        type = "default",
        transition = "none",
        transform = "none",
        animation = "none",
        separatorWidth = `${`90%`}`,
        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        // minHeight: `${`200px`}`,
        // flexDirection: `${layout}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        // padding: `${padding ? padding : "0.0rem"}`,
        // border: `1px solid white`,
        // minHeight: `${`2rem`}`,
        minHeight: `${`auto`}`,
        maxHeight: `${`100%`}`,
        height: `${`min-content`}`,
        minWidth: `${`100%`}`,
        ...styles,
        // Responsiveness overrides go here.
    };

    const getHeaderContent = () => {
        if (title === "" && showChildren && children && children !== false) {
            return children;
        } else if (title !== "" && showChildren) {
            let headerContent = [];
            if (title) {
                headerContent.push(
                    <Post.Text
                        label={title}
                        content={title}
                        type={"header"}
                        scale={`xl`}
                        color={"text-white"}
                        separator={true}
                        classes={""}
                        styles={{}}
                    />,
                );
            }
            if (author) {
                headerContent.push(
                    <Post.Text
                        label={author}
                        content={author}
                        type={"author"}
                        scale={`sm`}
                        color={"text-white"}
                        separator={false}
                        classes={""}
                        styles={{}}
                    />,
                );
            }
            if (utils.ao.hasAll(info, ["likes", "dislikes", "views", "categories", "tags", "timestampUpdated", "timestampPosted"])) {
                headerContent.push(<Post.Info info={info}></Post.Info>);
            }

            return headerContent;
        }
    };

    // console.log("Post.Header :: {Props} = ", props);
    return (
        show && (
            <div
                className={`post-header`}
                style={componentStyles}>
                {getHeaderContent()}
            </div>
        )
    );
}
Post.Header = Header;
/* 
    return (
        show && (
            <div className={`post-header`} style={componentStyles}>
                {title === "" &&
                    showChildren &&
                    children &&
                    children !== false &&
                    children}
                {title !== "" && showChildren && (
                    <Post.Text
                        label={title}
                        content={title}
                        type={"author"}
                        scale={`lg`}
                        color={"text-white"}
                        separator={true}
                        classes={""}
                        styles={{}}
                    />
                )}
            </div>
        )
    );
*/

function Footer(props) {
    const {
        // Content settings.
        children,
        show = true,
        controls = [],
        label = "",
        title = "",
        // Style settings.
        type = "default",
        // Can import extra styles.
        alignContent = `${"center"}`,
        padding = `${"0.25rem 1.0rem"}`,
        margin = `${"0.0rem"}`,
        border = `${"1px solid #000"}`,
        borderRadius = `${"0%"}`,
        boxShadowEnabled = `${true}`,
        boxShadow = `${"1px 1px 2px 2px rgba(0, 0, 0, 0.025)"}`,
        backgroundColor = `colorTertiary`, // = `${"rgba(0, 0, 0, 0.25)"}`,
        textColor = `${"white"}`,
        opacity = 1.0,
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        // minHeight: `${`200px`}`,
        // flexDirection: `${layout}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        // padding: `${padding ? padding : "0.0rem"}`,
        // border: `1px solid white`,0.
        minHeight: `${`2rem`}`,
        maxHeight: `${`4rem`}`,
        minWidth: `${`100%`}`,
        padding: `${padding}`,
        ...styles,
        // Responsiveness overrides go here.
    };
    // console.log("Post.Footer :: {Props} = ", props);
    return (
        show && (
            <div
                className={`post-footer`}
                style={componentStyles}>
                {show && children && children !== false && children}
            </div>
        )
    );
}
Post.Footer = Footer;

function Image(props) {
    const {
        index,
        id,
        url,
        link,
        label,
        // Style settings.
        scaling, // AUTO | FIT | FILL | CONTAIN | NONE
        centered = true,
        stretch = false, // TRUE | FALSE
        align = `${"center"}`,
        angle = `${0}`,
        transparency = `100%`,
        padding = `${"0.25rem 1.0rem"}`,
        margin = `${"0.0rem"}`,
        border = `${"none"}`,
        borderRadius = `${"0%"}`,
        boxShadow = `${"1px 1px 5px 5px rgba(0, 0, 0, 0.25)"}`,
        transition,
        transform,
        filter, // none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url(); https://www.w3schools.com/cssref/css3_pr_filter.php
        classes,
        styles,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // minHeight: `${`200px`}`,
        // width: `${scaling ? (scaling === "fit" ? "100%" : "auto") : `100%`}`,
        // height: `${scaling ? (scaling === "fit" ? "100%" : "auto") : `100%`}`,
        padding: `${padding ? padding : "0.0rem"}`,
        margin: `${margin ? margin : "0.0rem"}`,
        border: `1px solid white`,
        boxShadow: boxShadow,
        opacity: `${transparency}`,
        transition: `${transition ? transition : "none"}`,
        transform: `${transform ? transform : "none"}`,
        filter: `${filter ? filter : "none"}`,
        ...styles,
        // Responsiveness overrides go here.
    };

    console.log("Post.Image :: {Props} = ", props);

    const getImage = (url, link) => {
        return url ? (
            <img
                className={`post-image ${classes ? classes : ""}`}
                style={componentStyles}
                onLoad={(event) => {}}
                src={`${url}`}
                alt={`${url}`}
                key={`section-collection-item-${index}-image-${Math.random() * 100}`}
                id={`section-collection-item-${index}-image-${Math.random() * 100}`}
                // onMouseEnter={() => (isHover = true)}
                // onMouseLeave={() => (isHover = false)}
            />
        ) : (
            <div className={`post-image-none`}></div>
        );
    };

    return (
        url && (
            <div className={`post-image-container ${label !== "" ? `post-image-polaroid` : ``}`}>
                {getImage(url, link)}
                {label !== "" && <div className={`post-image-label`}>()</div>}
            </div>
        )
    );
}
Post.Image = Image;

function Pane(props) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        show = true,
        showChildren = true,
        // Style settings.
        layout = `${`row`}`,
        transition = "none",
        transform = "none",
        animation = "none",
        separatorWidth = `${`90%`}`,
        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        flexDirection: `${layout === "col" ? "column" : "row"} !important`,
        ...styles,
        // Responsiveness overrides go here.
    };

    // console.log("Post.Content :: {Props} = ", props);
    return (
        show && (
            <div
                className={`post-section-container section-${layout}`}
                style={componentStyles}>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
}
Post.Pane = Pane;

function Content(props) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Content settings.
        type = "default",
        label = "",
        title = "",
        content = "",
        summary = "",
        // Style settings.
        layout = `${`row`}`,
        transition = "none",
        transform = "none",
        animation = "none",
        separatorWidth = `${`90%`}`,
        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        // minHeight: `${`200px`}`,
        // flexDirection: `${layout}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        // padding: `${padding ? padding : "0.0rem"}`,
        // border: `1px solid white`,
        flexDirection: `${layout}`,
        ...styles,
        // Responsiveness overrides go here.
    };

    // console.log("Post.Content :: {Props} = ", props);
    return (
        showParent && (
            <div
                className={`post-content`}
                style={componentStyles}>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
}
Post.Content = Content;

function Text(props) {
    const {
        // Child components passed inside this component's element.
        children,
        // Content settings.
        show = true,
        truncate = false,
        content = "",
        before = "",
        after = "",
        // Style settings.
        transition = "none",
        transform = "none",
        animation = "none",
        // Text container styling
        type = "default",
        align = "",
        justify = "",
        weight = 400,
        border,
        boxShadow,
        separator = false,
        separatorColor = `${"rgba(0, 0, 0, 0.25)"}`,
        separatorWeight = `${"1px"}`,
        separatorWidth = `${`90%`}`,
        // Text-specific styling
        scale = "3",
        textShadow,
        textSpacing,
        lineHeight,
        underline,
        overflowBehavior, // NONE | AUTO | WRAP | NOWRAP | HIDE
        wrapBehavior, // NONE | AUTO | WRAP | NOWRAP | HIDE
        maxLength, // After this number of characters, it cuts off with an ellipsis.
        // Style settings.
        color = "highlightColor",
        // Can import extra styles.
        classes = "text-highlightColor",
        styles = {},
        debug = false,
    } = props;

    // Select the scale class based on the scale value provided.
    // text-9xl, text-8xl, text-7xl, text-6xl, text-5xl, text-4xl, text-3xl, text-2xl, text-xl, text-lg, text-md, text-sm, text-xs
    const getScale = (scale) => {
        switch (scale) {
            case `9`:
                return "text-9xl";
            case `8`:
                return "text-8xl";
            case `7`:
                return "text-7xl";
            case `6`:
                return "text-6xl";
            case `5`:
                return "text-5xl";
            case `4`:
                return "text-4xl";
            case `3`:
                return "text-3xl";
            case `2`:
                return "text-2xl";
            case `1`:
                return "text-xl";
            case `lg`:
                return "text-lg";
            case `md`:
                return "text-md";
            case `sm`:
                return "text-sm";
            case `xs`:
                return "text-xs";
            default:
                return "text-2xl";
        }
    };

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        // minHeight: `${`200px`}`,
        // flexDirection: `${layout}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        // padding: `${padding ? padding : "0.0rem"}`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    // console.log("Post.Text :: {Props} = ", props);
    return (
        <div className={`post-text-container`}>
            {content !== "" && (
                <p
                    className={`post-${type === "text" ? "text" : type === "title" ? "title" : "text"} ${getScale(scale)} ${color !== "" ? `text-${color}` : ``}`}
                    style={componentStyles}>
                    {`${before}${content}${after}`}
                </p>
            )}
            {separator && (
                <div
                    style={{
                        margin: `${`4px auto`}`,
                        // width: `${`90%`}`,
                        width: `${separatorWidth}`,
                        height: `${separatorWeight}`,
                        backgroundColor: `${separatorColor}`,
                        zIndex: `100`,
                        ...flexStyles,
                    }}></div>
            )}
        </div>
    );
}
Post.Text = Text;

function Info(props) {
    const {
        // Content settings.
        show = true,
        id = "",
        info,
        // views = 0,
        // likes = 0,
        // dislikes = 0,
        // categories = [],
        // tags = [],
        // controls = [],
        // label = "",
        // title = "",
        // Style settings.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        // minHeight: `${`2rem`}`,
        // maxHeight: `${`4rem`}`,
        // minWidth: `${`100%`}`,
        // padding: `${padding}`,
        display: `${`flex`}`,
        flexDirection: `${`row`}`,
        justifyContent: `${`space-between`}`,
        alignContent: `${`center`}`,
        ...styles,
        // Responsiveness overrides go here.
    };
    // console.log("Post.Feedback :: {Props} = ", props);

    // views={info.views}
    // likes={info.likes}
    // dislikes={info.dislikes}
    // categories={info.categories}
    // tags={ info.tags }
    return (
        show &&
        info &&
        utils.ao.hasAll(info, [
            "index",
            `views`,
            "likes",
            "dislikes",
            // "categories",
            // "tags",
            "timestampPosted",
            "timestampUpdated",
        ]) && (
            <div
                className={`post-info-container`}
                style={componentStyles}>
                <div className={`post-info post-feedback-index`}>{`#: ${info.index}`}</div>
                <div className={`post-info post-feedback-likes`}>{`Likes: ${info.likes}`}</div>
                <div className={`post-info post-feedback-dislikes`}>{`Dislikes: ${info.dislikes}`}</div>
                <div className={`post-info post-feedback-views`}>{`Views: ${info.views}`}</div>
                <Post.Text
                    label={info.timestampPosted}
                    content={utils.time.formatDate(info.timestampPosted)}
                    type={"time"}
                    scale={`xs`}
                    color={"text-white"}
                    before={`Posted: `}
                    after={``}
                />
                <Post.Text
                    label={info.timestampUpdated}
                    content={utils.time.formatDate(info.timestampUpdated)}
                    type={"time"}
                    scale={`xs`}
                    color={"text-white"}
                    before={`Updated: `}
                    after={``}
                />
            </div>
        )
    );
}
Post.Info = Info;

function Comments(props) {
    const {
        // Content settings.
        show = true,
        comments = [],
        // Style settings.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.
        // ...flexStyles,
        // ...fillContainerStyles,
        ...styles,
        // Responsiveness overrides go here.
    };
    // console.log("Post.Comments :: {Props} = ", props);

    const buildComment = (comment, index) => {
        // Builds a single comment, with any replies it may have.
        return (
            <Post.Text
                index={index}
                content={comment}
                type={"text"}
                scale={`sm`}
                color={"text-white"}
                separator={true}
                style={{}}
            />
        );
    };

    return (
        //show && (
        <div
            className={`post-comments-container`}
            style={componentStyles}>
            <div
                className={`post-comments`}
                style={{}}>
                {utils.val.isValidArray(comments, true)
                    ? comments.map((comment, index) => {
                          return buildComment(comment, index);
                      })
                    : ""}
            </div>
        </div>
        //)
    );
}
Post.Comments = Comments;

export default Post;

/*


    const buildPost = () =>
    {
        return (
            <Post.Header
            show={showHeader && title && title !== ""}
            title={title}>
                <Post.Text
                    index={index}
                    name={`header-text-${index}-${title}`}
                    label={title}
                    content={title}
                    type={"title"}
                    scale={index === activeFocusIndex ? "xl" : "lg"}
                    color={
                        index === activeFocusIndex
                            ? "text-white"
                            : "text-highlightColor2"
                    }
                    separator={true}
                    styles={{}}></Post.Text>
                {utils.val.isValidArray(controls, true) && (
                    <Post.Controls show={true} controls={controls} />
                )}
            </Post.Header>
            <Post.Content
                show={
                    showContent &&
                    showChildren &&
                    children &&
                    children !== false
                }
                classes={`post-body ${classes}`}>
                {children}
            </Post.Content>
            <Post.Footer
                show={showFooter && utils.val.isValidArray(controls, true)}
                controls={controls}></Post.Footer>
            
        );
    }


*/

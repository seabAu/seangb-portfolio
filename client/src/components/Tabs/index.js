import React, { Children, Component, useEffect } from "react";
import PropTypes from "prop-types";
import * as utils from "../../utilities/index.js";
import "./tabs.css";
// import styles from "./Tabs.module.css";
// import { Tab } from "react-tabs";

const Tabs = (props) => {
    const {
        children,
        items = [],
        navPosition = "top",
        defaultActiveIndex = 0,
        activeIndex,
        // Container style options.
        padding = `0.5rem 1.0rem`,
        opacity = `1.0`,
        filter = "none",
        backFilter = "none",
        glassmorphic = false,
        boxShadow = "0px 0px 6px 1px #00000077",
        // Content-area style options.
        overflowLock = false,
        centered = true,
        padContent = true,
        fillArea = true,
        // Menu-area style options.
        roundedNav = false,
        contentBoxShadow = true,
        navBoxShadow = true,
        styles = {},
        navStyles = {},
        contentStyles = {},
        debug = false,
    } = props;

    const itemsToTabs = ( input ) =>
    {
        let tabitems = [];
        if (utils.val.isValidArray(input, true)) {
            input.forEach( ( item, index ) =>
            {
                // if (debug) console.log("itemsToTabs :: ", item, item.label, item.children);
                if (
                    utils.ao.has(item, "label") &&
                    utils.ao.has(item, "children")
                ) {
                    if ( item.hasOwnProperty( 'enabled' ) )
                    {
                        if ( item.enabled === true )
                        {
        					tabitems.push(
								<div
									className="tabs-item"
									label={item.label}
									id={`tab-${index}-${item.label}`}
									key={utils.ao.has(item, "key") ? item.key : index}>
									{item.children}
								</div>,
							);
                        }
                    }
                }
                return "";
            });
        }
        return tabitems;
    };

    const [tabChildren, setTabChildren] = React.useState(children ? children : utils.val.isValidArray(items, true) ? itemsToTabs(items) : []);
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);
    
	const onClickSetActiveTab = (index) => {
		setActiveTabIndex(index);
	};
	// const tabContents = Children.toArray( children );
	// console.log("TABS :: props = ", props);

	useEffect(() => {
		// On mount, check if we're using an items array or child components.
		if (items) {
			if (utils.val.isValidArray(items, true)) {
				let components = itemsToTabs(items);
				if (debug) console.log("Tabs.js :: items provided :: items = ", items, " :: itemsToTabs( items ) = ", itemsToTabs(items));
				setTabChildren(components);
			}
		}
	}, []);

	useEffect(() => {
		if (children) {
			if (children.length > 0) {
				if (activeTabIndex >= children.length - 1) {
					// console.log("TABS :: activeTabIndex = ", activeTabIndex, " children.length = ", children.length);
					setActiveTabIndex(children.length - 1);
				}
			}
		}
	}, [children]);

    const tabContainerStyles = {
        // height: `${centered ? "100%" : "auto"}`,
        width: `${centered ? "100%" : "auto"}`,
        minHeight: `${fillArea ? "100% !important" : "auto"}`,
        height: `${fillArea ? "100% !important" : "auto"}`,
        padding: `${padding ? padding : "0.25rem 0.25rem"}`,
        // display: "flex",
        // justifyContent: "space-around",
        // alignItems: "center",
        // flexDirection: "row",
        // alignContent: "center",
        // height: height,
        // width: `${width > 100 ? 100 : width}%`,
        // backgroundColor: fillercolor,
        // borderRadius: borderRadius,
        // padding: `${padding}px`,
        // margin: `${margin}`,
        overflow: `${`hidden`}`,
    };

    return (
		<div
			style={tabContainerStyles}
			className={`tabs-container ${navPosition === "top" ? "tabs-top" : navPosition === "left" ? "tabs-left" : ""} ${fillArea ? "fill-area" : ""}
            ${glassmorphic ? "tab-glassmorphic" : ""}`}
			id={`tabs-container`}>
			<Tabs.Menu
				activeTabIndex={activeTabIndex}
				defaultActiveIndex={defaultActiveIndex}
				tabNavOnClick={onClickSetActiveTab}
				// style={tabNavListStyles}
				// id={utils.ao.has(tab.props, "id") ? tab.props.id : utils.ao.has(tab.props, "label") ? tab.props.label : ""} // {id === "" ? "" : id}
				// key={utils.ao.has(tab.props, "id") ? tab.props.id : utils.ao.has(tab.props, "label") ? tab.props.label : ""}
				rounded={roundedNav}
				navBoxShadow={navBoxShadow}>
				{tabChildren && tabChildren}
			</Tabs.Menu>
			<Tabs.Content
				// styles={tabContentStyles}
				padContent={padContent}
				activeTabIndex={activeTabIndex}
				defaultActiveIndex={defaultActiveIndex}
				contentBoxShadow={contentBoxShadow}>
				{
					// (children)
					tabChildren && tabChildren
				}
			</Tabs.Content>
		</div>
	);
};

/*  <section class="tabs-wrapper">
    	<div class="tabs-container">
    		<div class="tabs-block">
    			<div id="tabs-section" class="tabs">
    				<ul class="tab-head">
    					<li>
    						<a href="#tab-1" class="tab-link active"> <span class="material-icons tab-icon">face</span>
    							<span class="tab-label">Face Primer</span></a>
    					</li>
    					<li>
    						<a href="#tab-2" class="tab-link"> <span class="material-icons tab-icon">visibility</span> <span
    								class="tab-label">Foundation</span></a>
    					</li>
    					<li>
    						<a href="#tab-3" class="tab-link"> <span
    								class="material-icons tab-icon">settings_input_hdmi</span> <span class="tab-label">BB
    								Cream</span></a>
    					</li>
    					<li>
    						<a href="#tab-4" class="tab-link"> <span class="material-icons tab-icon">build</span> <span
    								class="tab-label">Concealer</span></a>
    					</li>
    					<li>
    						<a href="#tab-5" class="tab-link"> <span class="material-icons tab-icon">toll</span> <span
    								class="tab-label">Blush</span></a>
    					</li>
    				</ul>

    				<section id="tab-1" class="tab-body entry-content active active-content">
    					<h2>Face Primer</h2>
    					<p>While some people don’t think that <a href="#">face primer</a> is necessary, I personally view it
    						as a vital step in my makeup routine.</p>
    					<p>Face primers’ exact effects on your skin and makeup can vary, but overall, their main purpose is
    						to keep your skin looking smooth and your makeup looking fresh all day long.</p>
    				</section>

    				<section id="tab-2" class="tab-body entry-content">
    					<h2>Foundation</h2>
    					<p>Foundation is probably the hardest part of your makeup routine to get right, as you not only have
    						to consider the type of coverage you want (i.e. sheer/natural, medium, or full), but also your
    						skin type and undertones.</p>
    					<p>If you are new to wearing foundation or aren’t sure what type/shade is right for you, I’d highly
    						recommend going to your nearest Sephora, MAC, or department store and have a makeup artist help
    						you pick out one that matches your complexion and fits your coverage needs. It’s also a good
    						idea to request a sample if you want to see how a formula feels on your skin before buying.</p>
    				</section>

    				<section id="tab-3" class="tab-body entry-content">
    					<h2>BB Cream</h2>
    					<p>Personally, I prefer BB cream to regular foundation, as I find it to be much more
    						natural-looking. It is a great option if you’re looking for something that has skincare benefits
    						such as moisturizing or priming (some BB creams have primer built in).</p>
    					<p>In addition, if you are new to the makeup world, a good BB cream is an even better place to start
    						than foundation, as it feels lighter on the skin, is hard to overdo, and can be applied with
    						your fingers.</p>
    				</section>

    				<section id="tab-4" class="tab-body entry-content">
    					<h2>Concealer</h2>
    					<p>If you have acne, dark circles, or any kind of discoloration, concealer is a must-have.</p>
    					<p>Concealers come in full-coverage and sheerer-coverage formulations, and which one you should
    						choose depends on how much you’re trying to cover up.</p>
    					<p>When choosing a concealer for acne and/or discoloration, find a shade that is as close as
    						possible to your foundation/BB cream shade for the most natural look.</p>
    				</section>

    				<section id="tab-5" class="tab-body entry-content">
    					<h2>Blush</h2>
    					<p>Putting on blush can have a huge effect on your overall look, and I personally never leave it out
    						of my makeup routine. Blush is especially necessary if you’re wearing a foundation with more
    						opaque coverage, which can sometimes leave your complexion looking a little bit flat.</p>
    					<p>Blush comes in powder, gel, and cream formulations, with powder being the most popular. Recently,
    						though, cream and gel blush have become very popular as well.</p>
    				</section>
    			</div>
    		</div>
    	</div>
    </section>
*/ 

function Menu ( props )
{
    // This builds the full list of tab navigation links. 
    const {
        children,
        activeTabIndex,
        defaultActiveIndex=0,
        setActiveTabIndex,
        tabNavOnClick = (index)=>{},
        id,
        rounded = false,

        // Menu-area style options.
        roundedNav = false,
        navBoxShadow = false,
        styles = {},
        navStyles = {},
        contentStyles = {},
    } = props;
    // console.log("Input.Field :: {Props} = ", props);

    const tabNavListStyles = {
        // padding: `${spinnerPadding}px`,
        // textAlign: "right",
        // transition: "width 1s ease-in-out",
        // display: "flex",
        // justifyContent: "flex-end",
        // alignItems: "center",
        // top: "50%",
        // left: "50%",
        // margin: "-25px 0 0 -25px",
        // width: "50px",
        // height: "50px",
        overflow: `${`hidden`}`,
    };

    const buildTabNav = (tab, index) => {
        // This assumes the tab has already been validated.
        if (tab) {
            return (
                <Tabs.Nav
                    tabIndex={index}
                    activeTabIndex={activeTabIndex}
                    label={utils.ao.has(tab.props, "label") ? tab.props.label : ""} // {label ?? ' '}
                    sublabel={utils.ao.has(tab.props, "sublabel") ? tab.props.sublabel : ""}
                    onClick={tabNavOnClick}
                    id={utils.ao.has(tab.props, "id") ? tab.props.id : utils.ao.has(tab.props, "label") ? tab.props.label : ""} // {id === "" ? "" : id}
                    key={utils.ao.has(tab.props, "id") ? tab.props.id : utils.ao.has(tab.props, "label") ? tab.props.label : ""}
                    rounded={roundedNav}
                    navBoxShadow={navBoxShadow}
                />
            );
        } else {
            return (
                <Tabs.Nav
                    tabIndex={0}
                    defaultActiveIndex={defaultActiveIndex ?? 0}
                    activeTabIndex={activeTabIndex}
                    label={""}
                    onClick={tabNavOnClick}
                    id={`blank-tab-nav-${Math.random() * 100}`}
                    key={`blank-tab-nav-${Math.random() * 100}`}
                    rounded={roundedNav}
                    navBoxShadow={navBoxShadow}
                />
            );
        }
    };

    const buildTabMenu = (input) => {
        if (input) {
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            return utils.ao.has(tab.props, "enabled") ? (tab.props.enabled ? buildTabNav(tab, index) : "") : buildTabNav(tab, index);
                        }
                    }
                    return <></>;
                });
            }
        }
        return buildTabNav({}, 0);
    };

    return (
        <div
            className={`tabs-nav-list`}
            style={tabNavListStyles}>
            {buildTabMenu(children)}
        </div>
    );
    // return (
    //     <div className="input-field">
    //         {children && children !== false && children}
    //     </div>
    // );
}

Tabs.Menu = Menu;

function Nav(props) {
    const {
        // children,
        tabIndex,
        activeTabIndex,
        id,
        label,
        sublabel,
        onClick,
        rounded = false,
        navBoxShadow = false,
    } = props;
    // console.log("Input.Field :: {Props} = ", props);

    const tabNavItemStyles = {
        // borderRadius: `${rounded ? "8px" : "0px"}`,
        boxShadow: `${navBoxShadow ? "0 0 5px black" : "none"}`,
        // padding: `${spinnerPadding}px`,
        // textAlign: "right",
        // transition: "width 1s ease-in-out",
        // display: "flex",
        // justifyContent: "flex-end",
        // alignItems: "center",
        // top: "50%",
        // left: "50%",
        // margin: "-25px 0 0 -25px",
        // width: "50px",
        // height: "50px",
    };

    return (
        <div
            style={tabNavItemStyles}
            className={`tab-nav-item ${
                activeTabIndex === tabIndex ? "tab-active" : ""
            } ${rounded ? "tab-nav-rounded" : ""}`}
            onClick={(event) => {
                onClick(tabIndex);
            }}
            id={id === "" ? "" : id}
            key={id === "" ? "" : id}>
            {label && label !== undefined && label !== null && (
                <div className="tab-nav-item-label">{label ? label : "-"}</div>
            )}
            {sublabel && sublabel !== undefined && sublabel !== null && (
                <div className="tab-nav-item-sublabel">
                    {sublabel ? sublabel : "-"}
                </div>
            )}
        </div>
    );
    // return (
    //     <div className="input-field">
    //         {children && children !== false && children}
    //     </div>
    // );
}

Tabs.Nav = Nav;

function Content(props) {
    const {
        children,
        show = true,
        showChildren = true,
        // Content settings.
        defaultActiveIndex,
        activeTabIndex,
        // Content-area style settings.
        overflowLock = false,
        centered = true,
        padContent = true,
        padding = `0.5rem 1.0rem`,
        fillArea = true,
        contentBoxShadow = true,
        boxShadow = "0px 0px 6px 1px #00000077",
        // Can import extra styles.
        styles = {},
        debug = false,
    } = props;

    const tabContentStyles = {
		// gap: `${padContent ? padding : "0rem"}`,
		// boxShadow: `${contentBoxShadow ? boxShadow : "none"}`,
		minHeight: `${fillArea ? "100% !important" : "auto"}`,
		height: `${fillArea ? "100% !important" : "auto"}`,
		// padding: `${padContent ? padding : "0.0rem 0.0rem"}`,
		overflow: `${overflowLock ? "hidden" : "auto"}`,
		// filter: `blur(0.4rem)`,
		// backdropFilter: `blur(100%)`,
		// opacity: `0.7`,
	};

    // Runs through all child elements and removes any that are invalid and/or do not contain the designated properties.
    const validateChildren = (input, mustHaveProps = []) => {
        let output = [];
        if (typeof input === "object" && !Array.isArray(input)) {
            input = [input];
        }
        if (utils.val.isValidArray(input, true)) {
            output = input.filter((tab, index) => {
                if (tab) {
                    if (utils.ao.has(tab, "props")) {
                        if (utils.ao.has(tab.props, "children")) {
                            return utils.ao.has(tab.props, "enabled") ? (tab.props.enabled ? tab : "") : tab;
                        }
                    }
                    return false;
                }
            });
        }
        return output;
    };

    const childHasProps = (input, props = []) => {
        if (input) {
            if (utils.ao.has(input, "props")) {
                let props = input.props;
                props.forEach((prop, index) => {
                    if (!props.includes(prop)) {
                        return false;
                    }
                });
            }
            return true;
        }
        return false;
    };

    const validateChild = (input, mustHaveProps = []) => {
        if (input) {
            if (utils.ao.has(input, "props")) {
                if (utils.ao.has(input.props, "children")) {
                    if (utils.ao.has(input.props, "enabled")) {
                        if (input.props.enabled) {
                            return true;
                        }
                    } else {
                        // DEVNOTE ::
                        //      Assume enabled by default, even if the property isn't provided.
                        //      I'll iron out this messy way of handling tabs and their children and properties later when I convert it into a compound component later in development.
                        return true;
                    }
                }
            }
        }
    };

    const getTabContentQuickRender = ( input ) =>
    {
        // This version creates the content for all tabs and hides the ones that aren't currently active.
        if (input) {
            if (debug) console.log("getTabContent :: input = ", input, typeof input, Array.isArray(input));
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            if (utils.ao.has(tab.props, "children")) {
                                // return tab.props.children;
                                return (
                                    <div
                                        style={tabContentStyles}
                                        className={`tab-content ${padContent ? "tab-content-padded" : ""} ${index !== activeTabIndex ? "tab-content-hidden" : ""}`}>
                                        {tab.props.children}
                                    </div>
                                );
                            }
                        }
                    }
                    return "";
                });
            }
        }
    };

    const getTabContent = (input) => {
        // This version only renders the content for the currently active tab index. 
        if (input) {
            // console.log(
            //     "getTabContent :: input = ",
            //     input,
            //     typeof input,
            //     Array.isArray(input),
            // );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (index !== activeTabIndex) {
                            return undefined;
                        } else {
                            if (utils.ao.has(tab, "props")) {
                                if (utils.ao.has(tab.props, "children")) {
                                    if (utils.ao.has(tab.props, "enabled")) {
                                        if (tab.props.enabled) {
                                            return tab.props.children;
                                        }
                                    } else {
                                        // DEVNOTE ::
                                        //      Assume enabled by default, even if the property isn't provided.
                                        //      I'll iron out this messy way of handling tabs and their children and properties later when I convert it into a compound component later in development.
                                        return tab.props.children;
                                    }
                                }
                            }
                            return undefined;
                        }
                    } else {
                        return "";
                    }
                });
            }
        }
    };

    // console.log("Tabs.Content :: {Props} = ", props);
    return (
        <div className={`tab-content-container ${contentBoxShadow ? `tab-content-container-shadow` : ``}`}>
            <div
                style={tabContentStyles}
                className={ `tab-content ${ ``
                    // padContent ? "tab-content-padded" : "" 
                } ` }>
                {
                    // getTabContent(children)
                    getTabContent(children)
                }
            </div>
        </div>
    );
    // return <div className="input-field">{children && children !== false && children}</div>;
}
Tabs.Content = Content;

export default Tabs;

/*
    const getTabContent2 = (input) => {
        if (input) {
            // console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (has(tab, "props")) {
                            if (has(tab.props, "children")) {
                                return (
                                    <div
                                        style={tabContentStyles}
                                        className={`tab-content ${
                                            padContent
                                                ? "tab-content-padded"
                                                : ""
                                        } ${
                                            index !== activeTabIndex
                                                ? "tab-content-hidden"
                                                : ""
                                        }`}>
                                        {tab.props.children}
                                    </div>
                                );
                            }
                        }
                    } else {
                        return "";
                    }
                });
            }
        }
    };

    
    const getTabContentQuickRender = (input) => {
        if (input) {
            console.log( "getTabContent :: input = ", input, typeof input, Array.isArray(input) );
            if (typeof input === "object" && !Array.isArray(input)) {
                input = [input];
            }
            if (utils.val.isValidArray(input, true)) {
                return input.map((tab, index) => {
                    if (tab) {
                        if (utils.ao.has(tab, "props")) {
                            if (utils.ao.has(tab.props, "children")) {
                                return tab.props.children;
                                // return (
                                //     <div
                                //         style={tabContentStyles}
                                //         className={`tab-content ${
                                //             padContent
                                //                 ? "tab-content-padded"
                                //                 : ""
                                //         } ${
                                //             index !== activeTabIndex
                                //                 ? "tab-content-hidden"
                                //                 : ""
                                //         }`}>
                                //         {tab.props.children}
                                //     </div>
                                // );
                            }
                        }
                    }
                    return "";
                });
            }
        }
    };

*/

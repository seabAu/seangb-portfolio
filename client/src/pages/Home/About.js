import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Section from "../../components/Section";
import * as utils from 'akashatools';
import Tags from "../../components/Tags";
import Droplist from "../../components/Droplist";

function About () {
    const { portfolioData } = useSelector( ( state ) => state.root );

    const { about, projects } = portfolioData;
    const {
        _id,
        firstName,
        lastName,
        lottieURL,
        statement,
        description,
        description1,
        description2,
        certifications,
        achievements,
        skills,
        summary,
        social,
    } = about; // = abouts[0];

    // State for skills cell list.
    const [ skillsList, setSkillsList ] = useState( [] );
    const [ skillCategories, setSkillCategories ] = useState( [] );
    const [ skillCategoryFilter, setSkillCategoryFilter ] = useState( [] );

    // Hooks for skills cell list.
    useEffect( () => {
        // On load, get all skills listed, for the filters. Doing it other ways results in an infinite loop due to useEffect's quirks on state change.
        /*  // Each skill has the following structure:
            {
                "_id": "640d9f030e3b63c5c6959316",
                "index": 0,
                "showIndex": 0,
                "enabled": true,
                "name": "HTML5",
                "category": "Web Development",
                "tags": [
                    "Front End Development"
                ],
                "proficiency": 7,
                "years": 6
            }
        */
        if ( utils.val.isValidArray( skills ) ) {
            // Case of being given all projects.
            let s = [];
            let names = [];
            let categories = [];
            skills.forEach( ( skill ) => {
                if ( utils.ao.has( skill, "name" ) ) {
                    if ( !names.includes( skill.name ) ) {
                        if ( !categories.includes( skill.category ) ) {
                            categories.push( skill.category );
                        }
                        names.push( skill.name );
                        s.push( skill );
                    }
                }
            } );
            if ( s ) {
                setSkillsList( s );
            }
            if ( categories ) {
                setSkillCategories( categories );
            }
        }
    }, [] );

    const [ screenWidth, setScreenWidth ] = useState( window.innerWidth );
    const [ screenHeight, setScreenHeight ] = useState( window.innerHeight );
    const updateDimensions = () => {
        setScreenWidth( window.innerWidth );
        setScreenHeight( window.innerHeight );
    };
    useEffect( () => {
        window.addEventListener( "resize", updateDimensions );
        return () => window.removeEventListener( "resize", updateDimensions );
    }, [] );

    return (
        <Section
            overflowY={ `auto` }
        >
            <Section.Text
                content="About Me"
                type="title"
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
            <Section
                showSection={ true }
                showChildren={ true }
                responsive={ true }
                responsiveBreakpoints={ 768 }
                // Style settings
                display={ 'block' }
                flexDirection={ "row" }
                fillArea={ true }
                height={ "fit-content" }
                minHeight={ "auto" }
                maxHeight={ "100%" }
                width={ "100%" }
                minWidth={ "auto" }
                maxWidth={ "100%" }
                // padding={ "0.25rem 1.0rem" }
                padding={ "0.0rem 0.0rem" }
                margin={ "0.0rem" }
                border={ "none" }
                overflowY={ `auto` }
                boxShadowEnabled={ false }
                styles={ {} }>
                <Section.Content
                    type={ "default" }
                    responsive={ true }
                    responsiveBreakpoints={ 768 }
                    classes={ `flex !justify-start !items-start` }
                    styles={ {} }>
                    <Section.Pane
                        key={ `section-pane-${ "collection-container" }` }
                        type={ "default" }
                        responsive={ true }
                        responsiveBreakpoints={ 768 }
                        // Style settings
                        // flexDirection={"column"}
                        // alignContent={"center"}
                        // justifyContent={"flex-start"}
                        height={ "100%" }
                        // minHeight={"auto"}
                        // maxHeight={"100%"}
                        width={ "100%" }
                        minWidth={ "40%" }
                        // maxWidth={"100%"}
                        padding={ "0.0rem" }
                        margin={ "0.0rem" }
                        border={ "none" }
                        borderRadius={ "0%" }
                        boxShadowEnabled={ false }
                        styles={ {} }>
                        <Section.Collection
                            content={ utils.ao.extractKeys( projects, [
                                "image",
                                "link",
                            ] ) }
                            datakeys={ [ "images", "link" ] }
                            data={ projects }
                            type={ `slideshow` }
                            key={ `section-img-collection-mosaic` }
                            lockHeight={ true }
                            setLockHeight={ `500px` }
                            scrollTimer={ 20000 }
                            classes={ `section-img-collection-mosaic` }
                            styles={ {
                                minHeight: `100% !important`,
                                border: `1px solid green`,
                            } }></Section.Collection>
                    </Section.Pane>
                    <Section.Pane
                        type={ "default" }
                        responsive={ true }
                        responsiveBreakpoints={ 768 }
                        // Style settings
                        flexDirection={ "column" }
                        alignContent={ "center" }
                        justifyContent={ "flex-start" }
                        height={ "100%" }
                        // minHeight={"auto"}
                        // maxHeight={"100%"}
                        width={ "auto" }
                        minWidth={ "40%" }
                        // maxWidth={"100%"}
                        padding={ "0.25rem 1.0rem" }
                        margin={ "0.0rem" }
                        border={ "none" }
                        borderRadius={ "0%" }
                        boxShadowEnabled={ false }
                        overflowX={ `auto` }
                        overflowY={ `auto` }
                        styles={
                            {
                                // border: `1px solid white`,
                            }
                        }>
                        { utils.val.isValidArray( about.description )
                            ? about.description.map( ( section, i ) => {
                                return (
                                    <Section.Text
                                        key={ `section-text-${ i }` }
                                        type={ "text" }
                                        content={ section }
                                        classes={ 
                                            `text-sm justify-start items-start `
                                            //  hover:opacity-90 animate-slidein transition-opacity duration-300 delay-150 opacity-100 delay-150 
                                            // animate-slidein animate-[animate-fade-down animate-duration-[${ 400 + 200 * i }ms] animate-delay-${ ( 400 + 200 * i ) + ( 200 * i ) / 2 } animate-ease-in-out] animate-[slidein_5s_ease-in-out_${i*2}] transition-opacity duration-300 delay-150 opacity-100 delay-${i*150}
                                        }
                                        // scale={ `sm` }
                                        color={ `${ [
                                            "text-highlightColor",
                                            "text-highlightColor2",
                                            "text-white",
                                        ][ i % 3 ]
                                            }` }
                                        styles={
                                            {
                                                // border: `1px solid green`,
                                                textAlign: `start`,
                                                opacity: 1,
                                                // transition: 'opacity 1s ease',
                                                transitionDelay: `${i * 150}ms`,
                                                transitionProperty: 'opacity',
                                                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                                transitionDuration: `150ms`,
                                                animation: `appearIn ${i}s`,
                                            }
                                        }
                                    >
                                    </Section.Text>
                                );
                            } )
                            : "" }
                    </Section.Pane>
                </Section.Content>
            </Section>
            <Section
                showSection={ true }
                showChildren={ true }
                responsive={ true }
                responsiveBreakpoints={ 768 }
                // Style settings
                flexDirection={ "row" }
                fillArea={ true }
                height={ "100%" }
                width={ "100%" }
                // padding={ "0.25rem 1.0rem" }
                margin={ "0.0rem" }
                border={ "none" }
                borderRadius={ "0%" }
                boxShadowEnabled={ false }
                styles={ {} }>
                <Section.Content
                    type={ "default" }
                    responsive={ true }
                    responsiveBreakpoints={ 768 }
                    styles={ {} }>
                    <Section.Pane
                        key={ `section-pane-${ "cell-list-container" }` }
                        type={ "default" }
                        responsive={ true }
                        responsiveBreakpoints={ 768 }
                        // Style settings
                        height={ "100%" }
                        width={ "100%" }
                        minWidth={ "40%" }
                        margin={ "0.0rem" }
                        border={ "none" }
                        borderRadius={ "0%" }
                        boxShadowEnabled={ false }
                        overflowX={ `unset` }
                        overflowY={ `unset` }
                        styles={ {} }>
                        <div
                            className={ `section-viewport` }
                            style={ {
                                display: `${ `flex` }`,
                                flexDirection: `${ `row` }`,
                                justifyContent: `${ `center` }`,
                                alignContent: `${ `stretch` }`,
                            } }>
                            <Tags
                                dataLabel={
                                    // "Here are a few of my skills and the technologies i've been working with:"
                                    `A comprehensive list of my skills can be found below. You can interact with the elements on top to filter for the skills you are seeking to empower your team's next big idea. To see more detail about any, click on the cell to expand.`
                                }
                                dataLabelSize={ "1" }
                                dataList={ skillsList }
                                dataDisplayKey={ "name" }
                                usePopover={ true }
                                popoverTitleKey={ skillsList }
                                popoverData={ skillsList }
                                popoverContentKeys={ [ "name", "proficiency", "years", "tags", "category" ] }
                                hoverPopupEnabled={ false }
                                progressDisplayEnabled={ true }
                                progressDisplayKey={ "proficiency" }
                                filterOptionsList={ skillCategories }
                                filterActiveList={ skillCategoryFilter }
                                filteringEnabled={ true }
                                dataFilterKey={ "category" }
                                dataFilterFunction={ setSkillCategoryFilter }
                            />

                        </div>
                    </Section.Pane>
                </Section.Content>
            </Section>
        </Section>
    );
}

export default About;

/*
<button className="transition delay-150 duration-300 ease-in-out ...">Button A</button>
<button className="transition delay-300 duration-300 ease-in-out ...">Button B</button>
<button className="transition delay-700 duration-300 ease-in-out ...">Button C</button>
*/
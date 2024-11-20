import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { FaPowerOff } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as utils from 'akashatools';
import TextCarousel from "../../components/Carousel/index.js";
import Section from "../../components/Section/index.js";
import Effects from "../../components/Effects/Effects.jsx";
import './../../components/Effects/Effects.jsx';

function Intro () {
    const navigate = useNavigate();
    const { loading, portfolioData, debug } = useSelector( ( state ) => state.root );
    // Destructure data.
    const { intro, about } = portfolioData;

    const [ skills, setSkills ] = useState( [] );

    const renderSkillsCarousel = () => {
        let elements = [];
        if ( about ) {
            // About data is loaded, get skills list.
            if ( utils.val.isValidArray( about.skills, true ) ) {
                // Skills list present. 
                let skillList = [ ...about.skills ];

                // Filter out any disabled projects.
                skillList = skillList.filter( ( skill ) => {
                    return ( skill.enabled === true );
                } );

                let skillNames = skillList.map( ( skill ) => { return skill.name; } );
                if ( debug ) console.log( skillNames );
                // return <TextCarousel items={skillNames} num={8}/>
                skillNames.forEach( ( skill ) => {
                    elements.push(
                        <div className="skill-marquee-item">
                            { skill }
                        </div>
                    );
                } );
            }
        }
        return (
            <div className="skill-marquee" style={ {
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            } }>
                { elements }
            </div>
        );
    };


    // transition-delay: 900ms;
    // transition-property: opacity;
    // transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    // transition-duration: 200ms;
    // animation: 5s ease 0s 1 normal none running appearIn;
    // animation-duration: 5s;
    // animation-timing-function: ease;
    // animation-delay: 0s;
    // animation-iteration-count: 1;
    // animation-direction: normal;
    // animation-fill-mode: none;
    // animation-play-state: running;
    // animation-name: appearIn;
    // animation-timeline: auto;
    // animation-range-start: normal;
    // animation-range-end: normal;

    const onLoadAnimStyles = {
        // border: `1px solid green`,
        // transition: 'opacity 1s ease',
        // transitionDelay: `${ 150 }ms`,
        transitionProperty: 'opacity',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: `${ 200 }ms`,
        animation: `${ `appearIn` } ${ 5 }s`,
    };

    const giveFadeInCascade = ( arr ) => {
        // Given an array of strings to display, 
    };

    return (

        <div className={ `page-content-container` }>

            <div className={ `page-content-section page-content-section-col` }>
                {/* 
                    <div className="inner-glow">
                    </div>
                    <Section.Text
                        type="title"
                        // scale={ `3xl` }
                        classes={ 'text-3xl' }
                        // content={ intro.welcomeText || "" }
                        content={ intro?.welcomeText != "" && (
                            <div className={ `text-2xl text-start` }>
                                { intro.welcomeText }
                            </div>
                        ) }
                        separator={ false }
                    >
                </Section.Text>
                */}
                <div className={ `page-content-section-col gap-4 p-4` }>

                    <div
                        className={ `flex flex-col md:flex-row items-center justify-center gap-4` }
                    // style={ { ...onLoadAnimStyles, transitionDelay: `${ 150 }ms` } }
                    >
                        <div className={ `page-content-section-row` }>
                            <h1
                                className={ `page-content-section-col text-4xl text-start sm:text-2xl text-highlightColor font-semibold gap-2 px-2 py-2` }
                            >
                                { `Hello! I am` }
                            </h1>
                            {/* 
                            <h1 className="text-4xl text-start sm:text-2xl text-highlightColor2 font-bold">
                                { intro.firstName || "" } { intro.lastName || "" }
                            </h1>
                            */}
                            {/* <Effects.Glow content={`${intro.welcomeText}`} filters={`glow`}/> */ }
                        </div>
                    </div>

                    <div className={ `intro-content-container page-content-section-row gap-x-4` }>
                        <div
                            // style={ { ...onLoadAnimStyles, transitionDelay: `${ 350 + 200 }ms` } }
                            className={ `intro-content flex flex-col px-2 gap-2` }
                        >
                            <div className={ `intro-content-container page-content-section-row flex flex-col gap-2 px-2 mdmax:flex-col` }>
                                <div className={ `intro-content-name flex flex-col gap-1` }>
                                    <h1 className={ `text-5xl text-start sm:text-3xl text-highlightColor2 font-semibold text-nowrap px-0 pb-4` }>
                                        { intro.firstName || "" } { intro.lastName || "" }
                                    </h1>
                                </div>
                                <div className={ `intro-content-caption flex flex-col gap-4 pt-4` }>
                                    {
                                        utils.val.isValid( intro?.caption ) && (
                                            intro?.caption.split( ", " ).map( ( item, index ) => {
                                                let ease = `cubic-bezier(0.4, 0, 0.2, 1)`;
                                                return (
                                                    <div
                                                        className={ `intro-content-caption-item` }
                                                        style={
                                                            {
                                                                // transition: `all 1s ${ease}`,
                                                                // animation: `${ 0 + index * 1 }s ${ease} ${ 1 + index * 1 }s 1 normal none running appearIn`,
                                                                // transitionDelay: `${ index }s`,
                                                                // transitionProperty: 'all',
                                                                // transitionTimingFunction: `${ ease }`,
                                                                // transitionDuration: `${ 700 }ms`,
                                                                // animation: `${ `appearIn` } ${ index }s`,
                                                                transitionDelay: `${ 2 + index * 6 }s`,
                                                                transitionProperty: `all`,
                                                                transitionTimingFunction: `${ ease }`,
                                                                transitionDuration: `${ 700 }ms`,
                                                                animationDuration: `${ 2 + index * 3 }s`,
                                                                animationTimingFunction: `${ ease }`,
                                                                // animationDelay: `${ 2 + index * 1 }s`,
                                                                animationIterationCount: `1`,
                                                                animationDirection: `normal`,
                                                                animationFillMode: `none`,
                                                                animationPlayState: `running`,
                                                                animationName: `appearIn`,
                                                                animationTimeline: `auto`,
                                                                animationRangeStart: `entry`,
                                                                animationRangeEnd: `exit`,
                                                            }
                                                        }
                                                    >
                                                        <h1 className={ `intro-content-caption-item text-3xl text-start sm:text-2xl text-highlightColor font-semibold text-nowrap` }>
                                                            { item }
                                                        </h1>
                                                    </div>
                                                );
                                            } )
                                        )
                                    }
                                </div>

                                <div className={ `flex flex-row` }>
                                    <div className={ `skill-marquee-container` }>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={ { ...onLoadAnimStyles, transitionDelay: `${ 700 + 200 }ms` } }
                            className={ `intro-content-info-container page-content-section-col gap-4 px-4` }
                        >
                            <p className={ `text-white text-start` }>{ intro.description || "" }</p>
                            <p className={ `text-white text-start` }>{ `To learn more, press "Get Started" to see what I can bring to the table.` }</p>
                            <p className={ `text-gray text-start text-med sm:text-sm` }>
                                { `If you wish to explore this site's extensive back-end dashboard, you may make an account by pressing "Log In" in the top right corner. This will never ask for personal information. To send me a message, you can click on Get Started, then enter the Contact Me tab. Happy exploring!` }
                            </p>
                        </div>
                    </div>

                    <div className={ `flex flex-row justify-end items-center` }>
                        <Button
                            id={ `landing-page-nav-button` }
                            icon={ <FaPowerOff className={ `button-text button-icon` } /> }
                            label={ `Get Started` }
                            appearance={ `glassmorphic` }
                            onClick={ ( e ) => {
                                navigate( "/portfolio" );
                            } }>

                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Intro;


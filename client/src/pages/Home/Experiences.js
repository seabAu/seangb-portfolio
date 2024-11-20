import React from "react";
import { useSelector } from "react-redux";
import Tabs from "../../components/Tabs";
import * as utils from 'akashatools';
import Section from "../../components/Section";
import { FaCirclePlay, FaCircleStop } from "react-icons/fa6";
// import { experiences } from "../../resources/experiences";

function Experiences () {
    const { portfolioData } = useSelector( ( state ) => state.root );
    // Destructure data.
    const { experiences } = portfolioData;

    const formatTimes = ( timeString ) => {
        let elements = [];
        let time = timeString.toString().split( ' - ' ).join( '-' ).split( '-' );
        // We now have an array of the start and finish time.
        if ( utils.val.isValidArray( time, true ) ) {
            time.forEach( ( item, index ) => {
                elements.push(
                    <div className={ `tab-nav-item-sublabel-content` }>
                        {
                            index === 0 ? (
                                <FaCirclePlay className={ `tab-nav-item-sublabel-icon` } />
                            ) : (
                                <FaCircleStop className={ `tab-nav-item-sublabel-icon` } />
                            )
                        }
                        <p className={ `tab-nav-item-sublabel-text` }>
                            { item }
                        </p>
                    </div>
                );
            }
            );
        }

        return (
            <div className={ `tab-nav-item-sublabel-container` }>
                { elements }
            </div>
        );
    };

    const getExperiences = ( data ) => {
        // Sort by index. 
        if ( utils.val.isValidArray( data, true ) ) {
            let sortedData = [ ...data ].sort( ( a, b ) => {
                if ( a.showIndex > b.showIndex ) return 1;
                if ( a.showIndex < b.showIndex ) return -1;
                return 0;
            } );

            return sortedData
                .map( ( experience, index ) => {
                    return (
                        <div
                            className="p-4"
                            label={
                                <div className={ `tab-nav-item-label-container` }>
                                    {
                                        experience?.label ? experience.label : experience.company
                                    }
                                </div>
                            }
                            sublabel={
                                experience.period ? formatTimes( experience.period ) : <></>
                            }
                            key={ experience._id }
                            id={ experience._id }
                            index={ index }>
                            <div className="flex-group flex-row-spread">
                                <div className="flex-col-spread">
                                    <h1 className="header-section text-xl">{ experience.title }</h1>
                                    <h2 className="text-highlightColor text-sm">{ experience.period }</h2>
                                </div>
                                <div className="flex-col-shrink">
                                    <h1 className="header-subsection text-xl">{ experience.company }</h1>
                                    <h2 className="text-highlightColor text-sm">{ experience.location }</h2>
                                </div>
                            </div>
                            <div className="flex-group flex-row-spread">
                                <p className="text-white">{ experience.description }</p>
                            </div>
                            <ul className="info-list">
                                { experience.duties.map( ( duty ) => (
                                    <li
                                        className="info-list-item"
                                        key={ `experiences-list-item-${ duty }` }
                                        id={ `experiences-list-item-${ duty }` }>
                                        <h3 className="info-list-item-text">{ duty }</h3>
                                    </li>
                                ) ) }
                            </ul>
                        </div>
                    );
                } );
        }
    };

    return (
        <div
            className={ `section-container-flex` }
            style={ {
                // display: 'flex !important',
                // height: '100% !important',
                // minHeight: '100%',
                // maxHeight: '100%',
                // width: '100% !important',
                // minWidth: '100%',
                // maxWidth: '100%',
                // overflow: 'hidden !important',
                // border: 'none',
                // padding: '0.125rem 0.5rem',
                // margin: '0rem',
                // transition: 'width 1s ease-in-out 0s',
                // boxShadow: 'none',
            } }
        >
            <Section.Text
                type="title"
                content="Experience"
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
            { portfolioData && (
                <Tabs
                    scrollableContainer={ true }
                    scrollableContent={ true }
                    navPosition={ 'left' }
                    type={ "left" }
                    rounded={ false }
                    centered={ true }
                    padContent={ true }
                    contentPadding={ `0.25rem 0.25rem` }
                    overflow
                    fillArea={ true }
                    roundedNav={ true }
                    contentBoxShadow={ true }
                    navBoxShadow={ true }>
                    { getExperiences( experiences ) }
                </Tabs>
            ) }
        </div>
    );
};

export default Experiences;

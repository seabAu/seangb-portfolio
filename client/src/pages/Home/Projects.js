// import { has } from "immer/dist/internal";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as utils from 'akashatools';
import Section from '../../components/Section';
import Card from '../../components/Card';
import Tags from '../../components/Tags';
import Button from '../../components/Button';
import clsx from 'clsx';
import { data } from 'autoprefixer';
import { FaExpand } from 'react-icons/fa';
import ProjectGrid from '../../components/ProjectGrid/ProjectGrid';
// Implement skills filter
// Implement projects grid
// Create projects on new codepen account
function Projects () {
    const { portfolioData, debug } = useSelector( ( state ) => state.root );
    // Destructure data.
    const { projects, about } = portfolioData;
    const [ activeProjects, setActiveProjects ] = useState( projects );
    const [ sortBy, setSortBy ] = useState( '' );
    const [ technologies, setTechnologies ] = useState( [] );
    const [ technologyFilter, setTechnologyFilter ] = useState( [] );
    const [ technologyFilterOptions, setTechnologyFilterOptions ] = useState( [] );
    const [ gridLayout, setGridLayout ] = useState( 'Grid' ); // List, Grid, Flex, Mosaic, Fill / Overlay
    // const { skills } = about; // = abouts[0];
    const [ focusProject, setFocusProject ] = useState( null ); //
    const [ expanded, setExpanded ] = useState( false ); // Controls whether its expanded or not


    useEffect( () => {
        // On load, get all technologies listed, for the filters. Doing it other ways results in an infinite loop due to useEffect's quirks on state change.
        if ( utils.val.isValidArray( projects ) ) {
            // Case of being given all projects.
            let techs = [];
            let technames = [];
            projects.forEach( ( item ) => {
                // Map for each project
                if ( item ) {
                    if ( 'technologies' in item ) {
                        // Map for each technology listed.
                        item.technologies.forEach( ( tech ) => {
                            if ( utils.ao.has( tech, 'name' ) ) {
                                if ( !technames.includes( tech.name ) ) {
                                    technames.push( tech.name );
                                    techs.push( tech );
                                }
                            }
                        } );
                    }
                }
            } );

            // Update compiled technologies list.
            setTechnologies( techs );

            // Update list of technology filters.
            setTechnologyFilterOptions(
                techs.map( ( tech ) =>
                    utils.ao.has( tech, 'name' ) ? tech.name : '',
                ),
            );
        }
    }, [] );

    // Purge the filters list if the list of technologies changes.
    useEffect( () => {
        setTechnologyFilter( [] );
    }, [ technologies ] );

    useEffect( () => {
        // Update list of active projects if base list of projects changes.

    }, [ projects ] );

    const getProjects = ( data ) => {
        if ( utils.val.isValidArray( data, true ) ) {
            // Sort projects list by the "Show Index" value.
            let sortedProjects = [ ...data ].sort( ( a, b ) => {
                if ( a.showIndex > b.showIndex ) return 1;
                if ( a.showIndex < b.showIndex ) return -1;
                return 0;
            } );

            // Filter out any disabled projects.
            sortedProjects = sortedProjects.filter( ( project ) => {
                return project.enabled === true;
            } );

            let datamap = sortedProjects.map( ( item, itemIndex ) => {
                // For each project
                if ( technologyFilter.length > 0 ) {
                    // Check if this project has any technologies listed in the filter list.
                    if ( utils.ao.has( item, 'technologies' ) ) {
                        let techs = item.technologies;
                        // Get a list of tech names.
                        let technames = techs.map( ( tech ) =>
                            utils.ao.has( tech, 'name' ) ? tech.name : '',
                        );
                        let match = false;
                        technames.forEach( ( tech ) => {
                            if ( technologyFilter.includes( tech ) ) {
                                match = true;
                            }
                        } );
                        if ( match === true ) {
                            return '';
                        }
                    }
                }

                // Else proceed like normal. Render the grid of cards.
                return (
                    <Card classes='text-white shadow px-4'>
                        <Card.Header
                            title={ item.title }
                            padding={ '1' }
                            borderBottom={ true }
                        >
                            { 'technologies' in item && (
                                // Get a cell list for the listed technologies used.
                                <Section flexDirection={ `column` }>
                                    <Tags
                                        dataLabel={ 'Technologies used:' }
                                        dataLabelSize={ '2xl' }
                                        dataList={ item.technologies }
                                        dataDisplayKey={ 'name' }
                                        filteringEnabled={ false }
                                        separator={ false }
                                    />
                                </Section>
                            ) }
                        </Card.Header>
                        <Card.Body>
                            <Section flexDirection={ `column` }>
                                { 'context' in item && (
                                    <Section.Text
                                        classes='grid-card-body-text'
                                        type='subtitle'
                                        scale={ `1xl` }
                                        separator={ true }
                                        content={ item.context }
                                    />
                                ) }

                                { 'description' in item && (
                                    <Section.Text
                                        classes='grid-card-body-text'
                                        type='text'
                                        scale={ `1xl` }
                                        content={ item.description }
                                    />
                                ) }

                                { 'image' in item &&
                                    utils.file.checkImageURL( item.image ) && (
                                        <Section.Image
                                            classes='grid-card-image-container'
                                            styles={ { padding: `${ 10 }px` } }
                                            content={ {
                                                image: item.image,
                                                link: item.link,
                                            } }
                                        />
                                    ) }

                                { 'title' in item && (
                                    <Card.Frame
                                        src={ item.link }
                                        title={ item.title }
                                        styles={ { border: `none` } }
                                        height={ `400` }
                                        width={ `100%` }
                                    />
                                ) }
                            </Section>
                        </Card.Body>

                        <Card.Footer>
                            <a
                                href={ item.link }
                                className='button button-neumorphic'
                            >
                                See It Here
                            </a>
                        </Card.Footer>
                    </Card>
                );
            } );

            return [ datamap ];
        }
    };

    // Purge the filters list if the list of technologies changes.
    useEffect( () => {
        if ( focusProject !== null ) {
            setExpanded( true );
        } else {
            setExpanded( false );
        }
    }, [ focusProject, expanded ] );

    const handleExpand = ( project ) => {
        if ( project !== null ) {
            // setExpanded( true );
            setFocusProject( project );
        } else {
            // setExpanded( false );
            setFocusProject( null );
        }
    };

    const handleExpandProject = ( project ) => {
        setExpanded( true );
        setFocusProject( project );
    };

    const handleCloseExpanded = () => {
        setExpanded( false );
        setFocusProject( null );
    };

    const filterProjects = ( data, filters ) => {
        if ( utils.val.isValidArray( data, true ) ) {
            // Sort projects list by the "Show Index" value.
            let sortedProjects = [ ...data ].sort( ( a, b ) => {
                if ( a.showIndex > b.showIndex ) return 1;
                if ( a.showIndex < b.showIndex ) return -1;
                return 0;
            } );

            // Filter out any disabled projects.
            sortedProjects = sortedProjects.filter( ( project ) => {
                return project.enabled === true;
            } );

            let filteredProjects = sortedProjects.filter( ( project ) => {
                // Compare this project's techs to the tech filter list.
                if ( project?.technologies ) {
                    let projectTechNames = project.technologies.map( ( t, index ) => t.name );
                    function haveCommonItems ( arr1, arr2 ) {
                        const set1 = new Set( arr1 );
                        const commonItems = arr2.filter( item => set1.has( item ) );
                        return commonItems.length > 0;
                    }

                    // return haveCommonItems( projectTechNames, technologyFilter );
                    return !projectTechNames.some( ( item ) => technologyFilter.includes( item ) );
                }
                else {
                    // No technologies listed. Just return true (show).
                    return true;
                }
            } );

            if ( debug ) console.log( "sorted/filtered projects = ", "filteredProjects = ", filteredProjects );

            return filteredProjects;
        }
    };

    useEffect( () => {
        // Update the list of visible projects if filters are changed. 
        let sortedProjects = filterProjects( projects, technologyFilter );
        // console.log(
        //     "Projects",
        //     " :: ", "projects = ", projects,
        //     " :: ", " filtered == ", JSON.stringify( sortedProjects )
        // );

        setActiveProjects( sortedProjects );
    }, [ technologyFilter ] );


    return (
        <>
            <Section.Text
                type='title'
                content='Projects'
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
            <div
                className={ `flex flex-col` }
            // style={ {
            //     padding: "0.5rem 0.75rem"
            // } }
            >
                <div className={ `` }>
                    <div className={ `` }>
                        <div className={ `section-text  text-highlightColor font-semibold text-lg text-white sm:text-md` }>
                            Here are a few examples of my work and the technologies i've worked with:
                        </div>
                        <div className={ `` }>
                            <Tags
                                dataListEnabled={ false }
                                dataLabel={ 'Click on a category to filter projects' }
                                dataLabelSize={ '1' }
                                hoverPopupEnabled={ false }
                                progressDisplayEnabled={ true }
                                progressDisplayKey={ '' }
                                filterOptionsList={ technologyFilterOptions }
                                filterActiveList={ technologyFilter }
                                filteringEnabled={ true }
                                dataFilterFunction={ setTechnologyFilter }
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={ `` }
                >
                    { expanded ? (
                        <ProjectGrid.ExpandedView
                            projects={ activeProjects }
                            project={ focusProject }
                            onClose={ handleCloseExpanded }
                            focusProject={ focusProject }
                            setFocusProject={ setFocusProject }
                        />
                    ) : (
                        <ProjectGrid
                            items={ activeProjects }
                            layout={ gridLayout }
                            onExpandProject={ handleExpandProject }
                            focusProject={ focusProject }
                            setFocusProject={ setFocusProject }
                            classes={ '' }
                        />
                    ) }
                </div>
            </div>
        </>
    );
};

export default Projects

/*

<Section flexDirection={ `column` }>

    {
        "context" in item &&
        <Section.Text
            classes="grid-card-body-text"
            type="subtitle"
            scale={ `1xl` }
            separator={ true }
            content={ item.context }
        />
    }

    {
        "description" in item &&
        <Section.Text
            classes="grid-card-body-text"
            type="text"
            scale={ `1xl` }
            content={ item.description }
        />
    }

    {
        "image" in item && utils.file.checkImageURL( item.image ) &&
        <Section.Image
            classes="grid-card-image-container"
            styles={ { padding: `${ 10 }px` } }
            content={ { image: item.image, link: item.link } }
        />
    }

    {
        "title" in item &&
        <Card.Frame
            src={ item.link }
            title={ item.title }
            styles={ { border: `none` } }
            height={ `400` }
            width={ `100%` }
        />
    }

</Section>
*/

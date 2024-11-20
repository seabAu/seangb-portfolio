import React, { useState, useEffect } from 'react';
import * as utils from 'akashatools';
import clsx from 'clsx';
import { data } from 'autoprefixer';
import { FaExpand } from 'react-icons/fa';
import '../../components/ProjectGrid/ProjectGrid.css';
import Section from '../Section';
import Button from '../Button';
import Tags from '../Tags';

function ProjectGrid ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        show = true,
        showChildren = true,
        title = '',
        items,
        layout = 'grid',
        onExpandProject,
        focusProject,
        setFocusProject,
        // Can import extra styles.
        gridClasses,
        cardClasses,
        styles = {},
        debug = false,
    } = props;

    const [ gridLayout, setGridLayout ] = useState( layout );

    const getGridClass = ( type ) => {
        switch ( type ) {
            case 'mosaic':
                return 'project-grid project-grid--mosaic';
            case 'list':
                return 'project-grid project-grid--list';
            case 'bento':
                return 'project-grid project-grid--bento';
            default:
                return 'project-grid project-grid--default';
        }
    };

    const buildProjectGrid = ( projects ) => {
        let cards = [];

        projects.forEach( ( project ) => {
            cards.push(
                project ? (
                    <ProjectCard
                        key={ project.id }
                        data={ project }
                        onExpand={ () => onExpandProject( project ) }
                        focusProject={ focusProject }
                        setFocusProject={ setFocusProject }
                    />
                ) : (
                    <></>
                ),
            );
        } );

        return cards;
    };

    return (
        <div className={ `overflow-y-auto ${ getGridClass( gridLayout ) }` }>
            { utils.val.isValidArray( items, true ) && buildProjectGrid( items ) }
        </div>
    );
}

function ProjectCard ( props ) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        show = true,
        data,
        onExpand,
        isCompact = false,
        isFocus = false,
        setFocusProject,
        // Can import extra styles.
        cardClasses,
        styles = {},
        debug = false,
    } = props;

    const [ isDescriptionExpanded, setIsDescriptionExpanded ] = useState( false );
    const [ showModal, setShowModal ] = useState( false );

    const toggleDescription = () => {
        setIsDescriptionExpanded( !isDescriptionExpanded );
    };

    /*
        <article class="hover:scale-105 hover:border-orange-500  transition-all relative  flex items-center  h-[300px] w-[350px] rounded-xl border border bg-gradient-to-t from-white p-5 drop-shadow-2xl">
         
          <div class="flex  absolute -top-6 w-fit items-center justify-center rounded-full bg-gradient-to-t from-pink-700 to-orange-300 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
          </div>
      
          <div class="flex flex-col justify-start gap-5">
            <h1 class="text-3xl font-bold leading-10 text-black/75">Animation</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto dignissimos quis tempora autem vel a!</p>
            <button class="w-fit py-2 text-xl font-bold text-red-600">Get Started</button>
          </div>
        </article>
    */

    const buildCard = ( project ) => {
        if ( isCompact ) {
            // Build the compact sidebar-arranged card views. 
            return (
                <div
                    className='flex flex-col items-center border rounded-[0.5rem] shadow md:max-w-full border-secondary border-r-8 bg-secondary hover:bg-quinary h-auto cursor-pointer flex-shrink p-0'
                    onClick={ () => {
                        // onExpand( project );
                        setFocusProject( project );
                    } }
                >
                    <div className={ `rounded-all` }>
                        {
                            project?.image != "" && (
                                <img
                                    className='object-contain w-full rounded-[0.5rem] h-max md:rounded-s-lg'
                                    src={ project.image }
                                    alt={ project.title }
                                />
                            )
                        }

                        <div className='flex flex-col justify-between p-0 leading-normal gap-2 '
                            style={ {
                                // padding: `0.25rem 0.5rem`,
                                gap: `0.25rem`,
                            } }>
                            <h5 className='mb-2 text-2xl font-bold tracking-tight text-white'>
                                { project?.title }
                            </h5>
                            <p className='project-card__context'>
                                { project.context }
                            </p>

                            <p
                                className={ `project-card__description-text ${ isDescriptionExpanded ? 'project-card__description-text--expanded' : '' } mb-3 font-normal text-gray-400 whitespace-pre-wrap` }
                            >
                                { project?.description }
                            </p>
                            { project.description.length > 128 && (
                                <Button
                                    onClick={ toggleDescription }
                                    classes={ 'project-card__description-toggle' }
                                >
                                    { isDescriptionExpanded
                                        ? 'Read less'
                                        : 'Read more' }
                                </Button>
                            ) }
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='project-card'>
                <div className='project-card__header'>
                    <h2 className='project-card__title'>{ project.title }</h2>
                    <p className='project-card__context'>{ project.context }</p>
                </div>
                <div className='project-card__body'>
                    <div className='project-card__description'>
                        <p
                            className={ `project-card__description-text ${ isDescriptionExpanded ? 'project-card__description-text--expanded' : '' }` }
                        >
                            { project.description }
                        </p>
                        { project.description.length > 128 && (
                            <button
                                onClick={ toggleDescription }
                                className='project-card__description-toggle'
                            >
                                { isDescriptionExpanded
                                    ? 'Read less'
                                    : 'Read more' }
                            </button>
                        ) }
                    </div>
                    <div className='project-card__image-container'>
                        {
                            project?.image != "" && (
                                <img
                                    src={ project.image }
                                    alt={ project.title }
                                    className='project-card__image'
                                    onClick={ () => setShowModal( true ) }
                                />
                            )
                        }
                        <button
                            onClick={ () => onExpand( project ) }
                            className='project-card__expand-button'
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                <div className='project-card__footer'>
                    <a
                        href={ project.url }
                        target='_blank'
                        rel='noopener noreferrer'
                        className='button button-glassmorphic px-2 py-1 w-auto justify-center items-center flex flex-row h-auto'
                    >
                        <FaExpand className={ `button-text button-icon` } />
                        <div className={ `button-text` }>{ `See Project` }</div>
                    </a>
                </div>
                { showModal && (
                    <div
                        className='project-card__modal'
                        onClick={ () => setShowModal( false ) }
                    >
                        <div className='project-card__modal-content'>
                            {
                                project?.image != "" && (
                                    <img
                                        src={ project.image }
                                        alt={ project.title }
                                        className='project-card__modal-image'
                                    />
                                )
                            }
                        </div>
                    </div>
                ) }
            </div>
        );
    };

    return <>{ utils.val.isValid( data, true ) && <>{ buildCard( data ) }</> }</>;
}

ProjectGrid.ProjectCard = ProjectCard;

function ExpandedView ( {
    projects,
    project,
    focusProject,
    setFocusProject,
    onClose,
    isCompact = false,
} ) {
    const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 );
    const [ showIframe, setShowIframe ] = useState( false );

    useEffect( () => {
        const timer = setInterval( () => {
            if ( !showIframe && project.images.length > 1 ) {
                setCurrentImageIndex(
                    ( prevIndex ) => ( prevIndex + 1 ) % project.images.length,
                );
            }
        }, 5000 );

        return () => clearInterval( timer );
    }, [ project.images, showIframe ] );

    const buildSidebarCards = ( project ) => {
        if ( utils.val.isValidArray( projects, true ) ) {
            let cards = [];

            projects.forEach( ( project ) => {
                cards.push(
                    project ? (
                        <ProjectCard
                            key={ project.id }
                            data={ project }
                            onExpand={ () => setFocusProject( project ) }
                            isCompact={ true }
                            isFocus={ project.id === focusProject?.id }
                            focusProject={ focusProject }
                            setFocusProject={ setFocusProject }
                        />
                    ) : (
                        <></>
                    ),
                );
            } );

            return <>{ cards }</>;
        }
    };

    return (
        <div className='expanded-view'>
            {/* Sidebar content */ }
            <div className='expanded-view__sidebar'>
                {/* <div className='expanded-view__sidebar__content'> */ }
                {
                    utils.val.isValidArray( projects, true ) &&
                    buildSidebarCards( projects )
                }
                {/* </div> */ }
            </div>
            {/* Main content area (expanded) */ }
            <div className='expanded-view__main'>
                {/* Close Button */ }
                <div className='expanded-view__main__content'>
                    {/* Close Button */ }
                    <div className={ `expanded-view__header` }>
                        <button
                            onClick={ onClose }
                            className='expanded-view__close-button'
                        >
                            Close
                        </button>
                        <h2 className='expanded-view__title'>
                            { project.title }
                        </h2>
                        <div className={ `expanded-view__technologies` }>
                            <Tags
                                dataLabel={ 'Technologies used:' }
                                dataLabelSize={ '2xl' }
                                dataList={ project.technologies }
                                dataDisplayKey={ 'name' }
                                filteringEnabled={ false }
                                separator={ false }
                            />
                        </div>
                        <p className='expanded-view__context'>
                            { project.context }
                        </p>
                    </div>
                    <div className='expanded-view__media'>
                        {/* Toggle image / iframe display mode.  */ }
                        <button
                            onClick={ () => setShowIframe( !showIframe ) }
                            className='expanded-view__toggle-button'
                        >
                            { showIframe ? 'Show Image' : 'Show Project' }
                        </button>
                        {
                            showIframe ? (
                                <iframe
                                    className={ `expanded-view__iframe` }
                                    src={ project?.link }
                                    title={ project.title }
                                    width={ `100%` }
                                    height={ `45rem` }
                                    frameBorder='0'
                                    scrolling='no'
                                    loading={ `eager` }
                                    allowtransparency='true'
                                    allowFullScreen={ true }
                                ></iframe>
                            ) : (
                                utils.val.isValidArray( project?.images, true )
                            ) ? (
                                <Section.Collection
                                    content={ project.images }
                                    datakeys={ [] }
                                    data={ project.images }
                                    type={ `slideshow` }
                                    key={ `section-img-collection-mosaic` }
                                    lockHeight={ true }
                                    setLockHeight={ `500px` }
                                    scrollTimer={ 20000 }
                                    classes={ `section-img-collection-mosaic` }
                                    styles={ {
                                        minHeight: `100% !important`,
                                        border: `1px solid green`,
                                    } } />
                            ) : (
                                project?.image != "" && (
                                    <img
                                        src={ project.image != "" ? project.image : project.images[ currentImageIndex ] }
                                        alt={ project.title }
                                        className='expanded-view__image'
                                    />
                                )
                            )
                        }
                    </div>
                    <div className={ `expanded-view__main__content` }>
                        <div className={ `expanded-view__main__body` }>
                            <p className='expanded-view__description'>
                                { project.description }
                            </p>
                        </div>
                        {
                            /*
                            <div className={ `expanded-view__main__aside` }>
                                <div className='expanded-view__technologies'>
                                    { 'technologies' in project && (
                                        // Get a cell list for the listed technologies used.
                                        <span
                                            key={ project.title }
                                            className='expanded-view__tech-tag'
                                        >
                                        </span>
                                    ) }
                                </div>
                            </div>
                            */
                        }
                    </div>
                    <a
                        href={ project.url }
                        target='_blank'
                        rel='noopener noreferrer'
                        className='expanded-view__link'
                    >
                        Visit Project
                    </a>
                </div>
            </div>
        </div>
    );
}

ProjectGrid.ExpandedView = ExpandedView;

// Images carousel for projects.


export default ProjectGrid;

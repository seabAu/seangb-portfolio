// Avatar and profile buttons dropdown for the header. 


import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as utils from 'akashatools';

// Redux state management
import { useDispatch, useSelector } from "react-redux";
import {
    SetDebug,
    SetLoading,
    ReloadData,
    SetLoggedIn,
    SetUser,
    SetTheme,
    SetThemeBehavior,
    SetThemeMode,
} from "../../redux/rootSlice";
import {
    FaRegMoon,
    FaRegSun,
    FaRegHardDrive,
    FaCirclePlay,
    FaCirclePause,
    FaCircleQuestion,
    FaAngleUp,
    FaAngleDown,
} from "react-icons/fa6";
import { FaIceCream } from "react-icons/fa";
import portfolioIcon from '../../assets/img/portfolio_icon.jpg';

const Avatar = ( props ) => {
    const {
        type,
        navLinks = [],
        navClasses,
        dropdownClasses,
        classes,
        children,
    } = props;

    const {
        debug,
        loading,
        portfolioData,
        reloadData,
        loggedIn,
        token,
        role,
        user,
        // theme,
        themeMode,
        themeBehavior,
    } = useSelector( ( state ) => state.root );
    const dispatch = useDispatch();

    const [ open, setOpen ] = useState( false );
    const [ theme, setTheme ] = useState( false );
    const [ isHovering, setIsHovering ] = useState( false );
    const [ navControls, setNavControls ] = useState( navLinks );

    useEffect( () => {
        console.log( 'Avatar.js :: themeMode = ', themeMode );
        if ( themeBehavior === 'static' ) {
            // Reflect normal style theme changes.
            document.documentElement.setAttribute( "data-theme", themeMode );
        }
        else if ( themeBehavior === 'dynamic' ) {
            // Change theme over time based on eye strain science, and what just looks cool, influenced by the theme mode as a basis.
            document.documentElement.setAttribute( "data-theme", themeMode );
        }
    }, [ themeMode ] );

    useEffect( () => {
        console.log( 'Avatar.js :: themeBehavior = ', themeBehavior );
        if ( themeBehavior === 'static' ) {
            // Reflect normal style theme changes.
        }
        else if ( themeBehavior === 'dynamic' ) {
            // Change theme over time based on eye strain science, and what just looks cool, influenced by the theme mode as a basis.
        }
    }, [ themeBehavior ] );

    useEffect( () => {
        // Update list of nav options in the avatar dropdown if it changes. 
        // We also have a default set of links. 
        if ( navLinks && utils.val.isValidArray( navLinks ) ) {
            setNavControls( navLinks );
        }

        console.table( navControls );
    }, [ navLinks ] );

    useEffect( () => {
        // TODO :: Move this to either the top level, into a theme provider / context, or into the header. 
        // Update theme whenever it changes. 
        // window.addEventListener( "resize", updateDimensions );
        console.log( "Avatar.js :: theme details are now: ", themeBehavior, themeMode, theme );
    }, [ themeMode, themeBehavior, theme ] );

    const getThemeIcon = () => {
        let theme = themeMode;
        let behavior = themeBehavior;

        // Change cycle: Dark -> Light -> System -> Dynamic changing.
        switch ( theme ) {
            case 'Dark':
                return <FaRegSun />;
            case 'Light':
                return <FaRegHardDrive />;
            case 'System':
                return <FaRegMoon />;
            default:
                // Default is dark mode. 
                return <FaRegSun />;
        }
    };

    const switchToNext = ( current, options = [] ) => {
        if ( current !== '' && utils.val.isValidArray( options, true ) ) {
            const currentIndex = options.indexOf( current );
            if ( currentIndex !== -1 ) {
                // Current option is in array.
                let nextOption = options[ currentIndex + 1 ];
                if ( nextOption === undefined ) {
                    // Current was last option, and iterating went off the array. 
                    // Just return the 0th index instead.
                    return options[ 0 ];
                }
                else {
                    // All good!
                    return nextOption;
                }
            }
            else {
                // Not in array, return 1st in array.
                return options[ 0 ];
            }
        }
        else {
            return current;
        }
    };

    const buildDropdownButtons = () => {
        let defaultNavControls = [
            {
                index: 0,
                enabled: loggedIn ? true : false,
                type: 'button',
                name: "theme",
                label: utils.str.toUpperCamelCase( themeMode ),
                // `${ themeMode === 'dark'
                //     ? ( 'Dark' )
                //     : ( themeMode === 'light'
                //         ? (
                //             'Light'
                //         )
                //         : (
                //             themeMode === 'cool'
                //                 ? (
                //                     'cool'
                //                 )
                //                 : (
                //                     themeMode === 'system'
                //                         ? (
                //                             'System'
                //                         )
                //                         : (
                //                             // Default back to Dark mode.
                //                             'Dark'
                //                         )
                //                 )
                //         )
                //     )
                // }`,
                icon:
                    themeMode === 'dark'
                        ? ( <FaRegMoon className={ `nav-button-icon icon` } /> )
                        : ( themeMode === 'light'
                            ? (
                                <FaRegSun className={ `nav-button-icon icon` } />
                            )
                            : (
                                themeMode === 'cool'
                                    ? (
                                        <FaIceCream className={ `nav-button-icon icon` } />
                                    )
                                    : (
                                        themeMode === 'system'
                                            ? (
                                                <FaRegHardDrive className={ `nav-button-icon icon` } />
                                            )
                                            : (
                                                // Default back to Dark mode.
                                                <FaRegMoon className={ `nav-button-icon icon` } />
                                            )
                                    )
                            )
                        ),
                classes: `nav-button`,
                onClick: ( e ) => {
                    let nextTheme = switchToNext(
                        themeMode,
                        [
                            'dark',
                            'light',
                            'cool',
                            'system'
                        ]
                    );

                    let updatedTheme = {
                        ...theme,
                        mode: nextTheme,
                    };

                    console.log( "Current theme: ", theme, " :: ", "Current theme mode: ", themeMode, " :: ", "Next theme mode: ", nextTheme, " :: ", "updated theme: ", updatedTheme );

                    dispatch( SetThemeMode( nextTheme ) );
                }
            },
            {
                index: 1,
                enabled: loggedIn ? true : false,
                type: 'button',
                name: "themeBehavior",
                label: `${ themeBehavior === 'static'
                    ? ( 'Static' )
                    : ( themeBehavior === 'dynamic'
                        ? ( 'Dynamic' )
                        : ( 'Random' )
                    )
                    }`,
                icon:
                    themeBehavior === 'static'
                        ? ( <FaCirclePause className={ `nav-button-icon icon` } /> )
                        : ( themeBehavior === 'dynamic'
                            ? ( <FaCirclePlay className={ `nav-button-icon icon` } /> )
                            : ( <FaCircleQuestion className={ `nav-button-icon icon` } /> )
                        )
                ,
                classes: `nav-button`,
                onClick: ( e ) => {
                    let nextTheme = switchToNext(
                        themeBehavior,
                        [
                            'static',
                            'dynamic',
                            'random'
                        ]
                    );

                    let updatedTheme = {
                        ...theme,
                        behavior: nextTheme,
                    };

                    console.log( "Current theme: ", theme, " :: ", "Current theme behavior: ", themeBehavior, " :: ", "Next theme behavior: ", nextTheme, " :: ", "updated theme: ", updatedTheme );

                    dispatch( SetThemeBehavior( nextTheme ) );
                }
            },
        ];

        let links = [
            ...navControls,
            ...defaultNavControls
        ];

        console.log( "Build nav buttons :: links = ", links );
        let buttons = [];
        if ( utils.val.isValidArray( links, true ) ) {

            links.forEach( ( link, index ) => {
                if ( utils.val.isTruthy( link ) ) {
                    buttons.push(

                        <li className={ `dropdown-item avatar-dropdown-item` }>
                            <button className={
                                `button dropdown-button avatar-dropdown-button`
                                // block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white
                            }
                                onClick={ () => {
                                    console.log( "Button clicked: ", link );
                                    link.onClick();
                                } }
                            >
                                {/* <div className={ `flex flex-row flex-nowrap justify-stretch items-center` }> */ }
                                { link.icon && link.icon }
                                { link.label && <div className={ `button-text` }>{ link.label }</div> }
                                {/* </div> */ }
                            </button>
                        </li>
                    );
                }
            } );
        }

        // return (
        //     <ul class="dropdown-menu px-4 py-2 gap-4 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
        //         { buttons }
        //     </ul>
        // );

        return (
            <ul className="dropdown-menu-items avatar-dropdown-menu-items dropdown-menu avatar-dropdown-menu ">
                { buttons }
            </ul>
        );
    };

    const buildDropdownHoverButton = () => {
        return (
            <DownArrowIcon />
        );
    };

    return (
        <>
            {
                themeMode && (
                    <div className={ `dropdown avatar-dropdown ${ open ? `dropdown-active` : `` } dropdown-right dropdown-row dropdown-hovering` }>

                        <button
                            id="dropdownHoverButton"
                            data-dropdown-toggle="dropdownHover"
                            data-dropdown-trigger="hover"
                            className={
                                `avatar-dropdown-toggle`
                                // bg-inherit hover:bg-quinaryAlt focus:ring-2 focus:outline-none focus:ring-offset-purple-800 rounded-full px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            }
                            type="button"
                        >
                            { /* Dropdown toggle / Avatar icon */ }
                            <img
                                className="page-header-icon"
                                src={ portfolioIcon }
                                alt="User Icon"
                                onClick={ ( event ) => {
                                    // Open / Close dropdown. 
                                    if ( open ) setOpen( false );
                                    else setOpen( true );
                                } }></img>

                            <DownArrowIcon direction={ open ? 'up' : 'down' } />
                        </button>

                        <div
                            id="dropdownHover"
                            className={
                                `dropdown-menu avatar-dropdown-menu ${ open ? '' : 'hidden' }`
                                //  cursor-pointer m-2 z-10 absolute block top-0 bg-slate-800 divide-y divide-gray-100 rounded-lg shadow w-auto dark:bg-gray-700
                            }
                        >
                            {
                                buildDropdownButtons()
                            }
                        </div>

                    </div>

                )
            }
        </>
    );
};


const DownArrowIcon = ( props ) => {
    const {
        direction = "down",
    } = props;
    return (
        (
            direction === 'down'
        ) ? (
            <FaAngleDown className={ `dropdown-arrow-button` } />
        ) : (
            <FaAngleUp className={ `dropdown-arrow-button` } />
        )
    );

    /* 
        <svg
            className={ `dropdownArrowIcon w-2.5 h-2.5 ms-3` }
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
            />
        </svg> 
    */
};

const Dropdown = ( props ) => {

};

Avatar.Dropdown = Dropdown;


export default Avatar; 

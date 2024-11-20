// React
import React from 'react';
import { Link as BrowserLink, Navigate, useNavigate } from "react-router-dom";

// Utilities
import * as utils from 'akashatools';
import Button from '../../Button';

function Nav ( props )
{
    const { children, nav } = props;

    const buildNav = ( input ) =>
    {
        let navButtons = [];
        if ( utils.val.isValidArray( input, true ) )
        {
            input.forEach( ( button, index ) =>
            {
                if ( button.enabled )
                {
                    navButtons.push(
                        <button
                            key={ `nav-menu-button-${ button.name }` }
                            id={ `nav-menu-button-${ button.name }` }
                            className={ `nav-button ${ button.classes ? button.classes : '' }` }
                            onClick={ button.onClick }
                        >
                            { button.icon }
                        </button>
                    );
                }
            } );
        }
        return navButtons;
    };

    return (
        <div className="nav-button-group">
            { nav &&
                utils.val.isValidArray( nav, true ) &&
                buildNav( nav ) }
        </div>
    );
}

const Link = ( props ) =>
{
    const {
        index,
        enabled = true,
        type = 'navlink',
        name = '',
        label = '',
        link,
        icon = '',
        classes = '',
        onClick = {},
    } = props;

    const buildNavLink = () =>
    {

        if ( type === 'navlink' )
        {
            return (
                <li className={ `nav-list-item h-full` }>
                    <BrowserLink
                        className={ `nav-button ${ classes ? classes : '' }` }
                        to={ `${ link }` }>
                        <Button
                            classes={ `nav-button ${ classes ? classes : '' }` }
                            label={ label ? <div className="nav-button-text">{ label }</div> : '' }
                            icon={ icon }
                            onClick={ onClick ? onClick : ( e ) => { } }></Button>
                    </BrowserLink>
                </li>
            );
        }
        else if ( type === 'href' )
        {
            return (
                <li className={ `nav-list-item h-full` }>
                    <a
                        className={ `nav-button ${ classes ? classes : '' }` }
                        href={ `${ link }` }>
                        <Button
                            classes={ `nav-button ${ classes ? classes : '' }` }
                            label={ label ? <div className="nav-button-text">{ label }</div> : '' }
                            icon={ icon }
                            onClick={ onClick ? onClick : ( e ) => { } }></Button>
                    </a>
                </li>
            );
        }
    }

    return (
        link && enabled && (
            buildNavLink()
        )
    );
}

Nav.Link = Link;

export default Nav;


import React, { useEffect, useState } from 'react';

import {
    // Icons for adding content
    FaPlus,
    // Icons for removing content
    FaTimes,
    FaRedoAlt,
    // Icons for adjusting index
    FaMinus,
    FaThLarge,
    FaTh,
    FaThList,
} from "react-icons/fa";

// Creates a controllable, managed unordered list from arbitrary JSON data.
import * as util from 'akashatools';
import './droplist.css';
import Input from '../Form/Input';
import Button from '../Button';

function Droplist ( props ) {
    const {
        label,
        data,
        type,
        // Style settings.
        layout = "default",
        display = "block",
        flexDirection = "column",
        fillArea = true,
        height = "auto",
        width = "auto",
        minHeight, //  = "auto",
        minWidth, //  = "auto",
        maxHeight, //  = "100%",
        maxWidth, //  = "100%",
        showControls = true,
        expandable = true,
        compact = true,
        collapse = false,
        classes = "",
        styles = {},
        debug = false,
    } = props;
    const [ renderData, setRenderData ] = useState( data );
    const [ showExpandable, setShowExpandable ] = useState( expandable ? expandable : false );
    const [ showCompact, setShowCompact ] = useState( compact );
    const [ collapsed, setCollapsed ] = useState( collapse ? collapse : false );

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        // display: `${"flex"}`,
        // flexDirection: `${flexDirection}`,
        // justifyContent: `${justifyContent}`,
        // alignItems: `${alignContent}`,
        // alignContent: `${alignContent}`,
        height: `${ height }`,
        ...{
            ...( minHeight ? { minHeight: `${ minHeight }` } : {} ),
        },
        ...{
            ...( maxHeight ? { maxHeight: `${ maxHeight }` } : {} ),
        },
        // minHeight: `${minHeight}`,
        width: `${ width }`,
        ...{
            ...( minWidth ? { minWidth: `${ minWidth }` } : {} ),
        },
        ...{
            ...( maxWidth ? { maxWidth: `${ maxWidth }` } : {} ),
        },
        // minWidth: `${minWidth}`,
        // padding: `${padding ? padding : "0.0rem"}`,
        // overflowX: `${overflowX}`,
        // overflowY: `${overflowY}`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };

    useEffect( () => {
        if ( debug ) console.log( "Droplist.js :: data changed :: data = ", data );
        setRenderData( data );

    }, [ data ] );

    if ( debug ) console.log( 'Droplist.js :: props = ', props );

    // Generic function to turn any label-value pair into a <li></li> wrapped DOM element with appropriate styling and interactivity elements.
    // When called from functions dealing with array elements, the data label will simply be the array index.
    // When called from functions delaing with object elements, the data label and value will be the key-value pair.
    const valToListElement = (
        dataLabel,
        dataValue,
        classPrefix,
        parentIndex,
        expandable = false,
        checked = false
    ) => {
        if ( !dataValue ) dataValue = "-";
        let value = util.val.isArray( dataValue )
            ? // Object value is a nested array.
            dataToList( dataValue, classPrefix, `${ parentIndex }`, expandable )
            : util.val.isObject( dataValue )
                ? // Object value is a nested object
                dataToList( dataValue, classPrefix, `${ parentIndex }`, expandable )
                : // Object value is not a nested object; is a scalar.
                util.ao.replaceIfInvalid( dataValue.toString(), '-' );
        // console.log(
        //     "elementToListElement :: inputs = [",
        //     " :: dataLabel = ",
        //     dataLabel,
        //     " :: dataValue = ",
        //     dataValue,
        //     " :: classPrefix = ",
        //     classPrefix,
        //     " :: parentIndex = ",
        //     parentIndex,
        //     " :: expandable = ",
        //     expandable,
        //     " :: checked = ",
        //     checked,
        //     "] :: value is: ",
        //     value,
        // );
        if (
            expandable &&
            ( util.val.isObject( dataValue ) || util.val.isArray( dataValue ) )
        ) {
            return (
                <li className={ `${ classPrefix }-item` }>
                    <label
                        htmlFor={ `tab-${ parentIndex }` }
                        name="tab"
                        tabIndex="-1"
                        role="tab"
                        className={ `${ classPrefix }-key` }>
                        { `${ dataLabel } ${ util.val.isArray( dataValue )
                            ? `[${ dataValue.length }]`
                            : util.val.isObject( dataValue )
                                ? `{${ Object.keys( dataValue ).length }}`
                                : ``
                            }` }
                    </label>
                    <input
                        type="checkbox"
                        defaultChecked={ `${ checked ? "checked" : "" }` }
                        className="tab"
                        id={ `tab-${ parentIndex }` }
                        tabIndex={ `${ parentIndex }` }
                    // onChange={}
                    />
                    <span className="open-close-icon">
                        <FaPlus className="fas fa-plus" />
                        <FaMinus className="fas fa-minus" />
                    </span>
                    <div className={ `${ classPrefix }-content` }>{ value }</div>
                </li>
            );
        } else {
            return (
                <li className={ `${ classPrefix }-item` }>
                    <div className={ `${ classPrefix }-key` }>{ dataLabel }: </div>
                    <div className={ `${ classPrefix }-value` }>{ value }</div>
                </li>
            );
        }
    };

    const dataToList = ( input, classPrefix, parentIndex, expandable ) => {
        if ( util.val.isArray( input ) ) {
            // Top-level input is an array.
            return (
                <ul
                    className={ `${ classPrefix }-array ${ expandable ? `${ classPrefix }-expandable` : ''
                        }` }
                >
                    { input.map( ( arrElement, arrayIndex ) => {
                        // Map for each item in the array.
                        return valToListElement(
                            arrayIndex,
                            arrElement,
                            classPrefix,
                            `${ parentIndex }-${ arrayIndex }`,
                            expandable,
                            false,
                        );
                    } ) }
                </ul>
            );
        } else if ( util.val.isObject( input ) ) {
            // Top-level input is an object.
            // return objToList(input, classPrefix, parentIndex, expandable);

            // Input is an object.
            return (
                <ul
                    className={ `${ classPrefix }-obj ${ expandable ? `${ classPrefix }-expandable` : ''
                        }` }
                >
                    { Object.entries( input ).map( ( prop, objIndex ) => {
                        // Iterate for each entry in the object.
                        let objKey = prop[ 0 ];
                        let objValue = prop[ 1 ];
                        return valToListElement(
                            objKey,
                            objValue,
                            classPrefix,
                            `${ parentIndex }-${ objIndex }`,
                            expandable,
                            false
                        );
                    } ) }
                </ul>
            );
        } else {
            if ( debug ) console.log( 'Droplist :: input = ', input );
            return ( <ul
                className={ `${ classPrefix }` }>
                <li>{ input }</li>
            </ul> );

        }
    };

    const controls = [
        {
            name: "setExpandable",
            label: "Expandable",
            icon: <FaThList />,
            classes: `${ showExpandable ? `active` : `` }`,
            onClick: ( e ) => {
                setShowExpandable( showExpandable === true ? false : true );
            },
        },
        {
            name: "setCompact",
            label: "Compact",
            icon: <FaTh />,
            classes: `${ showCompact ? `active` : `` }`,
            onClick: ( e ) => {
                setShowCompact( showCompact === true ? false : true );
            },
        },
        {
            name: "setCollapsed",
            label: "Collapse",
            icon: <FaThLarge />, //FaJira
            classes: `${ collapsed ? `active` : `` }`,
            onClick: ( e ) => {
                setCollapsed( collapsed === true ? false : true );
            },
        },
    ];

    const buildDropListOptions2 = () => {
        return (
            <div className="input-group">
                <div className="input-field input-field-inline">
                    <label
                        className="input-field-label"
                        htmlFor={ `droplist-checkbox-input-toggle-expandable` }>
                        <p className="input-field-label-text">Expandable</p>
                        <input
                            type="checkbox"
                            className={ `input-field-control input-field-checkbox` }
                            name={ `droplist-checkbox-input-toggle-expandable` }
                            key={ `droplist-checkbox-input-toggle-expandable` }
                            id={ `droplist-checkbox-input-toggle-expandable` }
                            defaultChecked={ showExpandable }
                            onChange={ ( event ) => {
                                setShowExpandable( event.target.checked );
                            } }
                            disabled={ "" }
                        />
                    </label>
                </div>
                <div className="input-field input-field-inline">
                    <label
                        className="input-field-label"
                        htmlFor={ `droplist-checkbox-input-toggle-compact` }>
                        <p className="input-field-label-text">Compact View</p>
                        <input
                            type="checkbox"
                            className={ `input-field-control input-field-checkbox` }
                            name={ `droplist-checkbox-input-toggle-compact` }
                            key={ `droplist-checkbox-input-toggle-compact` }
                            id={ `droplist-checkbox-input-toggle-compact` }
                            defaultChecked={ showCompact }
                            onChange={ ( event ) => {
                                setShowCompact( event.target.checked );
                            } }
                            disabled={ "" }
                        />
                    </label>
                </div>
                <div className="input-field input-field-inline">
                    <label
                        className="input-field-label"
                        htmlFor={ `droplist-checkbox-input-toggle-compact` }>
                        <p className="input-field-label-text">Collapse</p>
                        <input
                            type="checkbox"
                            className={ `input-field-control input-field-checkbox` }
                            name={ `droplist-checkbox-input-toggle-compact` }
                            key={ `droplist-checkbox-input-toggle-compact` }
                            id={ `droplist-checkbox-input-toggle-compact` }
                            defaultChecked={ collapsed }
                            onChange={ ( event ) => {
                                setCollapsed( event.target.checked );
                            } }
                            disabled={ "" }
                        />
                    </label>
                </div>
            </div>
        );
    };

    const buildDropListOptions = () => {
        let options = [];
        options.push(
            <Button.Controls
                show={ true }
                controls={ controls }
            />
        );
        return options;
    };

    const buildDropList = ( input ) => {
        return dataToList(
            input,
            `data-list`,
            0,
            showExpandable,
        );
    };

    return (
        <>
            {
                // util.val.isValidArray( renderData, true ) && (
                // util.val.isValidArray( renderData, true ) ||
                // util.val.isObject( renderData ) ) && (
                <div
                    className={ `data-list-container` }
                    style={ componentStyles }>
                    <div className={ `data-list-controls` }>
                        { label && (
                            <div className={ `data-list-label` }>
                                <h4>{ label }:</h4>
                            </div>
                        ) }
                        { showControls && buildDropListOptions() }
                    </div>
                    <div className={ `data-list ${ showCompact ? "data-list-compact" : "" } ${ collapsed ? 'data-list-collapsed' : '' } ` }>{ buildDropList( renderData ) }</div>
                </div>
            }
        </>
    );
}

export default Droplist;

import React from "react";
import "./tags.css";
import * as utils from 'akashatools';
import Section from "../Section";
import { useState } from "react";
import Popover from "../Popover";

function Tags ( props ) {
    const {
        // Data display properties.
        dataListEnabled = true,
        dataLabel = "",
        dataLabelSize = "2xl",
        dataList = [],
        dataDisplayKey = "",
        usePopover = true,
        popoverTitle = "",
        popoverTitleKey,
        popoverData,
        popoverContentKeys,
        hoverPopupEnabled = false,
        hoverPopupKeys = [], // Array of object keys to fetch and display in each hover-popup.
        // Generalized progress display properties.
        progressDisplayEnabled = true,
        progressDisplayKey = "",
        // Filtering properties.
        filteringEnabled = true,
        filterActiveList = [], // The list of selected / active filter strings.
        filterOptionsList = [], // The full list of filterable strings.
        dataFilterKey = "",
        dataFilterFunction,
        // Styling stuff.
        layout = "", // MOSAIC (DEFAULT) | LIST
        appearance = "flat", // FLAT | NEUMORPHIC | GLASSMORPHIC | CONSOLE | OUTSET
        appearanceModifier = "", // 
        padding,
        cellListPadding,
        cellPadding,
        margin,
        cellListMargin,
        cellMargin,
        borderRounding,
        neumorphic,
        neumorphicSharp,
        separator = true,
        separatorAppearance = "neumorphic", // FLAT | NEUMORPHIC | GLASSMORPHIC | CONSOLE | OUTSET
        debug = false,
    } = props;

    const [ clickedIndex, setClickedIndex ] = useState( -1 );
    const [ hoveredIndex, setHoveredIndex ] = useState( -1 );

    const getCellList = ( data, dataDisplayKey, filterList, dataFilterKey ) => {
        // console.log(
        //     "CellList.JS :: getCellList :: Cell data = ",
        //     "\n", "data = ", data,
        //     "\n", "dataDisplayKey = ", dataDisplayKey,
        //     "\n", "filterList = ", filterList,
        //     "\n", "dataFilterKey = ", dataFilterKey,
        // );
        console.log( "Tags :: dataList = ", dataList );
        if ( utils.val.isValidArray( data, true ) ) {
            return (
                <div
                    className={ `cell-list ${ appearance ? `cell-list-${ appearance === 'flat' ? 'flat' :
                        appearance === 'neumorphic' ? 'neumorphic' :
                            appearance === 'glassmorphic' ? 'glassmorphic' :
                                appearance === 'console' ? 'console' : '' }` : ``
                        }` }
                    key={ `cell-list-${ dataDisplayKey }` }
                    id={ `cell-list-${ dataDisplayKey }` }
                >
                    { data.map( ( dataObj, parentIndex ) => {
                        if ( utils.ao.has( dataObj, dataFilterKey ) ) {
                            if ( filterList.length > 0 ) {
                                if ( filterList.includes( dataObj[ dataFilterKey ] ) ) {
                                    return "";
                                }
                            }

                            // let clicked = false;
                            // const handleClickChange = ( open ) => {
                            //     if ( open ) clicked = true;
                            //     else if ( !open ) clicked = false;
                            //     else clicked = !clicked;
                            // };

                            return (
                                usePopover ?
                                    (
                                        <div style={ { padding: '0px' } }>
                                            <Popover
                                                key={ `cell-list-item-${ parentIndex }-${ dataDisplayKey }` }
                                                id={ `cell-list-item-${ parentIndex }-${ dataDisplayKey }` }
                                                position="top"
                                                trigger="click"
                                                header={ <div>
                                                    {
                                                        dataObj.hasOwnProperty( popoverTitleKey ) ? ( dataObj[ popoverTitleKey ] ) : ( '' )
                                                    }
                                                </div> }
                                                title={ dataObj.hasOwnProperty( popoverTitleKey ) ? ( dataObj[ popoverTitleKey ] ) : ( '' ) }
                                                // footer={ <button style={ { padding: '5px 10px' } }>Close</button> }
                                                popoverStyle={ {
                                                    backgroundColor: 'var(--color-secondary)',
                                                    color: 'var(--color-text)',
                                                    maxWidth: 'auto',
                                                    width: '25rem'
                                                } }
                                                // open={ clicked }
                                                // onOpenChange={ handleClickChange }
                                                content={
                                                    popoverContentKeys ?
                                                        (
                                                            <div className={ `popover-content` }>
                                                                {
                                                                    Object.keys( dataObj ).map( ( key, index ) => {
                                                                        if ( popoverContentKeys.includes( key ) ) {
                                                                            let value = dataObj[ key ];
                                                                            //  // console.log( "popover :: {key, value} = {", key, ", ", value, "}" );
                                                                            // console.log( "VALUE in obj = {", JSON.stringify( dataObj ), "} = ", value );
                                                                            return (
                                                                                <div
                                                                                    key={ `popover-content-${ parentIndex }-${ index }` }
                                                                                    className={ `popover-content-item` }
                                                                                >
                                                                                    <div
                                                                                        key={ `popover-content-${ parentIndex }-${ index }` }
                                                                                        className={ `popover-content-item-key` }
                                                                                    >
                                                                                        { key }
                                                                                    </div>

                                                                                    <div
                                                                                        key={ `popover-content-${ parentIndex }-${ index }` }
                                                                                        className={ `popover-content-item-value` }
                                                                                    >
                                                                                        {
                                                                                            utils.val.isValidArray( value, true ) ? (
                                                                                                // Is an array
                                                                                                <ul className={ `info-list` }>
                                                                                                    {
                                                                                                        value.map( ( v, index ) => {
                                                                                                            return (
                                                                                                                <li className={ `info-list-item` }>
                                                                                                                    { v }
                                                                                                                </li>
                                                                                                            );
                                                                                                        } )
                                                                                                    }
                                                                                                </ul>
                                                                                            ) : (
                                                                                                // Is not array
                                                                                                utils.val.isObject( value ) ? (
                                                                                                    // Is an object
                                                                                                    JSON.stringify( value, Object.keys( value ), 2 )
                                                                                                ) : (
                                                                                                    // Is not an object or an array. Assume is a regular value.
                                                                                                    value.toString()
                                                                                                )
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    } )
                                                                }
                                                            </div>
                                                        ) : (
                                                            <div className={ `popover-content` }>
                                                                {
                                                                    Object.keys( dataObj ).forEach( ( key, index ) => {
                                                                        let value = dataObj[ key ];
                                                                        // // console.log( "popover :: key, value = {", key, ", ", value, "}" );
                                                                        return (
                                                                            <div
                                                                                key={ `popover-content-${ parentIndex }-${ index }` }
                                                                                className={ `popover-content-item` }
                                                                            >
                                                                                { key }: { value }
                                                                            </div>
                                                                        );
                                                                    } )
                                                                }
                                                            </div>
                                                        )
                                                }>
                                                <Tags.Cell
                                                    dataObj={ dataObj }
                                                    dataDisplayKey={ dataDisplayKey }
                                                    filterList={ filterList }
                                                    dataFilterKey={ dataFilterKey }
                                                    parentIndex={ parentIndex }
                                                />
                                            </Popover>
                                        </div>
                                    )
                                    :
                                    (
                                        <Tags.Cell
                                            dataObj={ dataObj }
                                            dataDisplayKey={ dataDisplayKey }
                                            filterList={ filterList }
                                            dataFilterKey={ dataFilterKey }
                                            parentIndex={ parentIndex }
                                        />
                                    )
                            );
                        }
                        return "";
                    } ) }
                </div>
            );
        }
    };

    const getFilterCellList = (
        filterElements,
        filterList,
        filterFunction,
        filteringEnabled,
        // onclickEnabled,
    ) => {
        // if (debug) console.log(
        //     "CellList.JS :: getFilterCellList :: Cell data = ",
        //     "\n", "filterElements = ", filterElements,
        //     "\n", "filterList = ", filterList,
        //     "\n", "filterFunction = ", filterFunction,
        //     "\n", "filteringEnabled = ", filteringEnabled,
        // );
        if ( utils.val.isValidArray( filterElements, true ) ) {
            return (
                <div className="cell-list">
                    { filterElements.map( ( filterLabel, parentIndex ) => (
                        <Tags.Filter
                            filterLabel={ filterLabel }
                            filterList={ filterList }
                            filterFunction={ filterFunction }
                            // onclickEnabled={onclickEnabled}
                            filteringEnabled={ filteringEnabled }
                            parentIndex={ parentIndex }
                            key={ `filter-cell-list-item-${ parentIndex }-${ filterLabel }` }
                            id={ `filter-cell-list-item-${ parentIndex }-${ filterLabel }` }
                        />
                    ) ) }
                </div>
            );
        }
    };

    return (
        <div className="cell-list-container">
            { dataLabel && <h1 className={ `text-highlightColor text-${ dataLabelSize ? dataLabelSize : "2xl" }` }>{ dataLabel }</h1> }
            { filteringEnabled && filterOptionsList && filterActiveList && (
                <div className="cell-list-filters">{ getFilterCellList( filterOptionsList, filterActiveList, dataFilterFunction, filteringEnabled ) }</div>
            ) }
            { dataListEnabled && dataList && filterActiveList && (
                <>
                    { separator && <Section.Separator type={ separatorAppearance } height={ `4px` } styles={ { padding: `0.0rem 1.0rem` } } /> }
                    <div className="cell-list-data">
                        { getCellList( dataList, dataDisplayKey, filterActiveList, dataFilterKey ) }
                    </div>
                </>

            ) }
        </div>
    );
}

function Cell ( props ) {
    const {
        dataObj,
        dataDisplayKey,
        filterList,
        dataFilterKey,
        parentIndex = 0,
        useTooltip = true,
        tooltipContent,
        debug = false
    } = props;

    const getDataCell = ( dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0 ) => {
        let value;
        if ( utils.ao.has( dataObj, dataDisplayKey ) ) {
            value = dataObj[ dataDisplayKey ];
        }
        else {
            value = dataObj;
        }

        return (
            <div
                className={ `cell-list-item ${ utils.ao.has( dataObj, dataFilterKey ) ? ( filterList.includes( dataObj[ dataFilterKey ] ) ? "hidden" : "" ) : "" }` }
                key={ `cell-list-item-${ parentIndex }-${ value }-${ dataObj.hasOwnProperty( "index" ) ? dataObj.index : "" }` }
                id={ `cell-list-item-${ parentIndex }-${ value }-${ dataObj.hasOwnProperty( "index" ) ? dataObj.index : "" }` }
            >
                <div className={ `cell-list-item-content badge-content` }>
                    <h1 className={ `cell-list-item-text badge-name` }>{ dataObj.name }</h1>
                    { dataObj.years && <h3 className={ `cell-list-item-text badge-num bg-tahiti-${ dataObj.years * 100 }` }>{ dataObj.years }y</h3> }
                </div>
            </div>
        );
    };

    return getDataCell( dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex );
}

Tags.Cell = Cell;

function Filter ( props ) {
    const {
        filterLabel,
        filterList,
        filterFunction,
        filteringEnabled,
        parentIndex,
        debug = false,
    } = props;
    // Accepts an individial skill object and returns an individual cell-list-item.
    // console.log( "FilterCell :: props = ", props );

    const getFilterCell = (
        filterLabel,
        filterList,
        filterFunction,
        onclickEnabled,
        parentIndex = 0,
    ) => {
        // if (has(filterLabel, "name")) {
        if ( filterLabel && filterLabel !== "" ) {
            return (
                <div
                    className={ `cell-list-item filter-cell-list-item ${ onclickEnabled && !filterList.includes( filterLabel ) ? "active" : "" }` }
                    key={ `filter-cell-list-item-${ parentIndex }-${ filterLabel }` }
                    id={ `filter-cell-list-item-${ parentIndex }-${ filterLabel }` }
                    onClick={
                        onclickEnabled
                            ? ( event ) => {
                                if ( filterList.indexOf( filterLabel ) > -1 ) {
                                    // Already in filters list, remove it.
                                    filterFunction( filterList.filter( ( filter ) => filter !== filterLabel ) );
                                } else {
                                    // Not in filters list, add it.
                                    filterFunction( [ ...filterList, filterLabel ] );
                                }
                            }
                            : () => { }
                    }>
                    <h1 className={ `cell-list-item-text m-0 p-0 text-[8pt]` }>{ filterLabel }</h1>
                </div>
            );
        }
        return "";
    };

    return (
        filteringEnabled && // filterList &&
        getFilterCell(
            filterLabel,
            filterList,
            filterFunction,
            filteringEnabled,
            parentIndex,
        )
    );
}


Tags.Filter = Filter;

export default Tags;

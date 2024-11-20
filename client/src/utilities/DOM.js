// A set of utility functions centered around updating and managing the site DOM.
import React from "react";
import * as utils from "akashatools";

// Detect Dark Mode
// Source: https://github.com/phuocng/1loc/blob/master/contents/misc/detect-dark-mode.md
export const isDarkMode =
    window.matchMedia &&
    window.matchMedia( "(prefers-color-scheme: dark)" ).matches;


export function setElementValueById ( id, value )
{
    if ( id && value )
    {
        // Valid inputs, proceed.
        const element = document.getElementById( id );
        if ( element )
        {
            element.value = value.latitude;
            return element; // Return element if successful.
        } else
        {
            // console.error("setElementValueById :: ERR: Invalid ID: ", id);
        }
    } else
    {
        // console.error("setElementValueById :: ERR: Invalid Inputs: ", value, ", ", id);
    }
}


// Turns an object into an unordered list, except as json-friendly text instead of HTML elements.
export const obj2ListText = ( input ) =>
{
    // console.log( "obj2ListText :: input = ", input );
    let result = "";
    if ( typeof input === "object" )
    {
        Object.entries( input ).forEach( ( prop, index ) =>
        {
            let objKey = prop[ 0 ];
            let objValue = prop[ 1 ];
            if ( typeof objValue === "object" && objValue !== null )
            {
                // Nested object
                result += `<li className="obj-list-item">${ objKey }:` + obj2ListText( objValue ) + `</li>`;
            } else
            {
                // Not a nested object.
                result += `<li className="obj-list-item">${ objKey }: ${ utils.ao.replaceIfInvalid( objValue, "-" ) }</li>`;
            }
        } )

    }

    return `<ul>` + result + `</ul>`;
}


// Turns an object array into an unordered list, with recursion.
export const objArray2List = ( input ) =>
{
    // console.log("objArray2List :: input = ", input);
    if ( utils.val.isArray( input ) )
    {
        return (
            <ul className="obj-list">
                { input.map( ( object, arrayIndex ) =>
                {
                    return (
                        Object.entries( object ).map( ( prop, objIndex ) =>
                        {
                            let objKey = prop[ 0 ];
                            let objValue = prop[ 1 ];
                            if (
                                typeof objValue === "object" &&
                                objValue !== null
                            )
                            {
                                // Nested object
                                return (
                                    <li className="obj-list-item">
                                        <div className="obj-list-key">
                                            { objKey }
                                        </div>
                                        :{ " " }
                                        <div className="obj-list-value">
                                            { obj2List( objValue ) }
                                        </div>
                                    </li>
                                );
                            } else
                            {
                                // Not a nested object.

                                // Sanitize the value if it's null or undefined.
                                return (
                                    <li className="obj-list-item">
                                        <div className="obj-list-key">
                                            { objKey }
                                        </div>
                                        :{ " " }
                                        <div className="obj-list-value">
                                            { utils.ao.replaceIfInvalid( objValue, "-" ) }
                                        </div>
                                    </li>
                                );
                            }
                        } )
                    );
                } ) }
            </ul>
        );
    } else if ( typeof input === "object" )
    {
        return obj2List( input );
    }
};

export const value2List = ( input ) =>
{
    return ( !( utils.val.isArray( input ) ) && !( typeof input === "object" ) ) ? ( <div className="obj-list-value">
        { utils.ao.replaceIfInvalid( input, "-" ) }
    </div> ) : '';
}

// Turns an object into an unordered list, with recursion.
export const array2List = ( input ) =>
{
    // console.log("array2List :: input = ", input);
    if ( utils.val.isArray( input ) )
    {
        return array2List( input );
    } else if ( typeof input === "object" )
    {
        return obj2List( input );
    } else
    {

    }
};

// Turns an object into an unordered list, with recursion.
export const obj2List = ( input ) =>
{
    // console.log("obj2List :: input = ", input);
    if ( utils.val.isArray( input ) )
    {
        return objArray2List( input );
    } else if ( typeof input === "object" )
    {
        return (
            <ul className="obj-list">
                { Object.entries( input ).map( ( objProperty, index ) =>
                {
                    let objKey = objProperty[ 0 ];
                    let objValue = objProperty[ 1 ];
                    if ( typeof objValue === "object" && objValue !== null )
                    {
                        // Nested object
                        return (
                            <li className="obj-list-item">
                                <div className="obj-list-key">{ objKey }</div>:{ " " }
                                <div className="obj-list-value">
                                    { obj2List( objValue ) }
                                </div>
                            </li>
                        );
                    } else
                    {
                        // Not a nested object.
                        // Sanitize the value if it's null or undefined.
                        return (
                            <li className="obj-list-item">
                                <div className="obj-list-key">{ objKey }</div>:{ " " }
                                <div className="obj-list-value">{ utils.ao.replaceIfInvalid( objValue, "-" ) }</div>
                            </li>
                        );
                    }
                } ) }
            </ul>
        );
    }
};



///////////////////////////////////////////////////////






// Turns an object into an unordered list, with recursion.
export const objArrayToList = ( input ) =>
{
    // console.log("arrayToList :: input = ", input);
    return utils.val.isObject( input )
        ? objToList( input )
        : utils.val.isArray( input )
            ? arrayToList( input )
            : valToList( input );
};

// Turns an object array into an unordered list, with recursion.
export const arrayToList = ( input ) =>
{
    // console.log("objArrayToList :: input = ", input);
    if ( utils.val.isArray( input ) && utils.val.isValidArray( input ) )
    {
        return (
            <ul className="obj-list">
                { input.map( ( element, arrayIndex ) =>
                {
                    // Run through each element in the array.
                    // For each, check if it's an array, object, or scalar, and build nested elements accordingly. 
                    return (
                        <li className="obj-list-item">
                            <div className="obj-list-key">
                                `${ arrayIndex }: `
                            </div>
                            <div className="obj-list-value">
                                {
                                    utils.val.isObject( element )
                                        ?
                                        ( ( objToList( element ) ) )
                                        :
                                        ( ( utils.val.isArray( element ) )
                                            ?
                                            ( arrayToList( element ) )
                                            :
                                            ( valToList( element ) ) )
                                }
                            </div>
                        </li>
                    );
                }
                )
                }
            </ul>
        );
    } else if ( typeof input === "object" )
    {
        return objToList( input );
    }
};

// Turns an object into an unordered list, with recursion.
export const objToList = ( input ) =>
{
    // console.log("objToList :: input = ", input);
    if ( utils.val.isObject( input ) )
    {
        // Input is an object.
        return (
            <ul className="obj-list">
                {
                    Object.entries( input ).map( ( prop, objIndex ) =>
                    {
                        let objKey = prop[ 0 ];
                        let objValue = prop[ 1 ];
                        if ( typeof objValue === "object" && objValue !== null )
                        {
                            // Nested object
                            return (
                                <li className="obj-list-item">
                                    <div className="obj-list-key">
                                        `${ objKey }: `
                                    </div>
                                    <div className="obj-list-value">
                                        { objToList( objValue ) }
                                    </div>
                                </li>
                            );
                        } else if ( utils.val.isArray( objValue ) )
                        {
                            // Nested array
                            return (
                                <li className="obj-list-item">
                                    <div className="obj-list-key">
                                        `${ objKey }: `
                                    </div>
                                    <div className="obj-list-value">
                                        { arrayToList( objValue ) }
                                    </div>
                                </li>
                            );
                        } else
                        {
                            // Just a scalar.
                            // Sanitize the value if it's null or undefined.
                            return (
                                <li className="obj-list-item">
                                    <div className="obj-list-key">
                                        `${ objKey }: `
                                    </div>
                                    <div className="obj-list-value">
                                        { valueToList( objValue ) }
                                    </div>
                                </li>
                            );
                        }
                    } )
                }</ul>
        );
    } else if ( utils.val.isArray( input ) )
    {
        // Input is an array.
        return arrayToList( input );
    } else
    {
        // Input is just a scalar value.
        return valToList( input );
    }
};

// export const valueToList = ( input ) => ( !( utils.val.isArray( input ) ) && !( typeof input === "object" ) ) ? ( utils.ao.replaceIfInvalid( input, "-" )) : '';
export const valueToList = ( input ) =>
    !utils.val.isArray( input ) && !( typeof input === "object" )
        ? utils.ao.replaceIfInvalid( input, "-" )
        : "";

export const valToList = ( input ) =>
    utils.val.isArray( input ) ? (
        // Array
        <div className="obj-list-value">{ arrayToList( input ) }</div>
    ) : (
        ( typeof input === "object" ) ? (
            // Object
            ( <div className="obj-list-value">{ objToList( input ) }</div> )
        ) : (
            // Scalar
            <div className="obj-list-value">{ utils.ao.replaceIfInvalid( input, "-" ) }</div>
        )
    );

export const hasClass = ( e, classes = "" ) =>
{
    if ( e.target )
    {
        let targetClasses = e.target.classList;
        if ( targetClasses.contains( classes ) )
        {
            return true;
        }
    }
    return false;
}

// A function that creates HTML lists
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
export function list(type) {
    let html = `<${type}l><li>`;
    const args = Array.prototype.slice.call(arguments, 1);
    html += args.join("</li><li>");
    html += `</li></${type}l>`; // end list
    return html;
}


export function ObjMap ( { object, elementWrap } )
{
    console.log( "ObjMap():\n\n", object, elementWrap );
    // This flattens an object into HTML elements.
    const flatMapObj = (obj, wrap = "") => {
        let wrapBefore = "";
        let wrapAfter = "";
        if (wrap) {
            wrapBefore = `<${wrap}>`;
            wrapAfter = `</${wrap}>`;
        } else {
            wrap = "div";
        }
        console.log("flatMapObj(): ", obj, wrap);
        return Object.entries(obj)
            .map((objProperty) => {
                const wrapElement = document.createElement(`${wrap}`);
                if (
                    typeof objProperty[1] === "object" &&
                    objProperty[1] !== null
                ) {
                    wrapElement.innerText = `${flatMapObj(
                        objProperty[1],
                        wrap,
                    )}`;
                    // console.log(wrapElement);
                    return wrapElement;
                    // return `${ flatMapObj( objProperty[ 1 ], ) }`;
                } else {
                    wrapElement.innerText = `${objProperty[0]}: ${objProperty[1]}`;
                    // console.log(wrapElement);
                    return wrapElement;
                    // return `${wrapBefore}${objProperty[0]}: ${objProperty[1]}${wrapAfter}`;
                }
            })
            .join("");
    };

    return (
        <div>
            {flatMapObj(object, elementWrap)}
        </div>
    );
}

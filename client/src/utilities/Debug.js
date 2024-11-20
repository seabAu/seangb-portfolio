import * as utils from 'akashatools';

export function getArgs() {
    // const args = Array.prototype.slice.call( arguments );
    // const args = Array.from(arguments);
    const args = [ ...arguments ];
    return args;
}

export function args2obj ( ...args )
{
    // Attempts to turn arguments into one object whose keys are the variable names, and values are the variable values.
    console.log( "args2obj :: args provided: ", args );
}

function x(...args) {
    console.log( {...[...args] } ); 
}
// x( { a: 1, b: 2 }, 'test' );

export function debug(
    src,
    vars,
    options,
    ...values
)
{
    let config = {
        ...options,
        format: 'default',
        location: '',
        spacer: ' :: ',
        newlines: true
    };
    
    // let args = getArgs( arguments );
    // let args = Array.from( arguments );
    // console.log( "Debug :: args = ", args, Array.from( args.keys ), args.map( arg => `${ arg.name }: ${ arg.value }` ), " :: ", 'values = ', values );
    // args2obj( ...arguments );

    let output = [ 'DEBUG' ];

    if ( utils.val.isArray( src ) && utils.val.isValidArray( src, true ) )
    {
        output.push( src.join( config.spacer ) );
    }
    else
    {
        output.push( src.toString() );
    }

    if (utils.val.isObject(vars) && !utils.val.isArray(vars)) {
        // Vars is an object.
        Object.keys( vars ).forEach( ( key, index ) =>
        {
            let value = vars[ key ];
            if ( utils.val.isObject( value ) || utils.val.isArray( value ) || utils.val.isObjectArray )
            {
                // Json pretty print it for now.
                // value = JSON.stringify( value, Object.keys( value ), 2 );
                value = value.toString();
            }
            output.push(
                `${ key } = ${ value }`
            );
        } );
    } 
    else if ( utils.val.isArray(vars) && utils.val.isValidArray( vars, true ) )
    {
        // Have vars to print out.
        vars.forEach( ( value, index ) =>
        {
            let name = Object.keys( value )[ 0 ];
            output.push(
                // `${ index }: ${ value }`
                `${ index }: ${ name } = ${ value }`
                
            );
        } );
    }

    // Compile all output strings into a single printable display.
    console.log( output.join( ( config.newlines ? '\n' : '' ) + config.spacer ) );
}

export const nameOf = (f) => (f).toString().replace(/[ |\(\)=>]/g,'');

// Testing debug functionality: 
/*
    console.log( utils.debug.debug( 'Home.js', [ ...items ].map( ( item, index ) => item.label ) ) );
    console.log( utils.debug.debug( [ 'Home.js', '0th item' ], items[ 0 ], { format: 'default', spacer: ' -> ', newlines: false } ) );
    
    let avalue1 = 'bees';
    let avalue2 = 'knees';
    let avalue3 = 'trees';
    let combined = [ avalue1, avalue2, avalue3 ];
    let combined2 = { avalue1: avalue1, avalue2: avalue2, avalue3: avalue3};
    
    // console.log( utils.debug.debug(
    //     'Home.js',
    //     Object.fromEntries(
    //         Object.keys( combined2 ).map( ( item, index ) =>
    //         {
    //             return { item: item.label };
    //         } ) )
    //     )
    // );
    console.log( utils.debug.debug(
            'Home.js',
            [ avalue1, avalue2, avalue3 ],
            {}, 
            avalue1,
            avalue2,
            avalue3,
            0
        )
    );

    console.log( 'name of variable: ', avalue1, combined, combined2, Object.getOwnPropertyDescriptors( combined2 ) );

*/
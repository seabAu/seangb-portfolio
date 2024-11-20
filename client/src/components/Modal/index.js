// Example of a compound component. 
// Source: https://itnext.io/unlock-the-full-potential-of-react-with-the-compound-components-pattern-495a1bdb8b8f // 

import React, { useState, useEffect, useContext, createContext } from "react";

/// * Sharing State between Compound Components using Context API
/// * By using the React Context API in conjunction with the “Compound Components” pattern, you can share state or information between the child components easily, without having to pass it down through props.
const ModalContext = createContext( {} );

const Modal = ( { children } ) =>
{
    const [ isOpened, setIsOpened ] = useState( false )

    const childrenArray = React.Children.toArray( children );
    const header = childrenArray.find( child => child.type === Modal.Header );
    const body = childrenArray.find( child => child.type === Modal.Body );
    const footer = childrenArray.find( child => child.type === Modal.Footer );

    return (
        <ModalContext.Provider value={ { isOpened, setIsOpened } }>
            <div className="modal">
                <div className="modal-header">{ header }</div>
                <div className="modal-body">{ body }</div>
                <div className="modal-footer">{ footer }</div>
            </div>
        </ModalContext.Provider>
    );
};

const Header = ( { children } ) =>
{
    const { setIsOpened } = useContext( ModalContext )
    return <div className="modal-header">{ children }<button onClick={ () => setIsOpened( false ) }>X</button></div>;
};
Modal.Header = Header;

const Body = ( { children } ) =>
{
    return <div className="modal-body">{ children }</div>;
};
Modal.Body = Body;

const Footer = ( { children } ) =>
{
    const { setIsOpened } = useContext( ModalContext )
    return <div className="modal-footer">{ children }<button onClick={ () => setIsOpened( false ) }>Close</button></div>;
};
Modal.Footer = Footer;

export default Modal;
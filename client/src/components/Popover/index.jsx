import React, { useState, useRef, useEffect } from 'react';
import './popover.css';
import { createPortal } from 'react-dom';

const Popover = ( {
    children,
    header = null,
    content,
    footer = null,
    trigger = 'click', // Can be 'click', 'hover', or both (e.g., 'click hover')
    popoverStyle = {},
    containerStyle = {},
    onShow = () => { },
    onHide = () => { },
} ) => {
    const [ gIsPopoverVisible, setGIsPopoverVisible ] = useState( false );
    const gPopoverRef = useRef( null );

    const handleShow = () => {
        setGIsPopoverVisible( true );
        onShow();
    };

    const handleHide = () => {
        setGIsPopoverVisible( false );
        onHide();
    };

    const handleToggle = () => {
        gIsPopoverVisible ? handleHide() : handleShow();
    };

    // Hover events
    const handleMouseEnter = () => {
        if ( trigger.includes( 'hover' ) ) {
            handleShow();
        }
    };

    const handleMouseLeave = () => {
        if ( trigger.includes( 'hover' ) ) {
            handleHide();
        }
    };

    // Click event
    const handleClick = () => {
        if ( trigger.includes( 'click' ) ) {
            handleToggle();
        }
    };

    const contentContainerStyle = {
        position: 'absolute',
        zIndex: 1000,
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        ...popoverStyle,
    };

    // Triangle pointer styling
    const triangleStyle = {
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid #fff',
        zIndex: 1000,
    };

    return (
        <div
            className={ `popover-container` }
            style={ {
                position: 'relative',
                display: 'inline-block',
                ...containerStyle
            } }
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
            onClick={ handleClick }
            ref={ gPopoverRef }
        >
            { children }
            { gIsPopoverVisible && (
                ( <div
                    className={ `popover-content-container` }
                    style={ contentContainerStyle }
                >
                    {/* Triangle Pointer */ }
                    <div
                        className={ `popover-arrow` }
                        style={ triangleStyle }
                    />

                    {/* Popover Header */ }
                    { header && (
                        <div
                            className={ `popover-content-header` }
                            style={ {
                                borderBottom: '1px solid #eee',
                                padding: '0.0rem 0.0rem',
                                fontWeight: 'bold'
                            } }
                        >
                            { header }
                        </div>
                    ) }

                    {/* Popover Content */ }
                    <div
                        className={ `popover-content-container` }
                        style={ { padding: '0.0rem 0.0rem' } }
                    >
                        { content }
                    </div>

                    {/* Popover Footer */ }
                    { footer && (
                        <div
                            className={ `popover-content-footer` }
                            style={ {
                                borderTop: '1px solid #eee',
                                padding: '0.0rem 0.0rem',
                                textAlign: 'right'
                            } }
                        >
                            { footer }
                        </div>
                    ) }
                </div> )
            ) }
        </div>
    );
};

const Popover3 = ( {
    children,
    content,
    trigger = 'click', // Can be 'click', 'hover', or both (e.g., 'click hover')
    position = 'bottom', // Can be 'top', 'bottom', 'left', 'right'
    popoverStyle = {},
    containerStyle = {},
    onShow = () => { },
    onHide = () => { },
} ) => {
    const [ gIsPopoverVisible, setGIsPopoverVisible ] = useState( false );
    const gPopoverRef = useRef( null );

    const handleShow = () => {
        setGIsPopoverVisible( true );
        onShow();
    };

    const handleHide = () => {
        setGIsPopoverVisible( false );
        onHide();
    };

    const handleToggle = () => {
        gIsPopoverVisible ? handleHide() : handleShow();
    };

    // Hover events
    const handleMouseEnter = () => {
        if ( trigger.includes( 'hover' ) ) {
            handleShow();
        }
    };

    const handleMouseLeave = () => {
        if ( trigger.includes( 'hover' ) ) {
            handleHide();
        }
    };

    // Click event
    const handleClick = () => {
        if ( trigger.includes( 'click' ) ) {
            handleToggle();
        }
    };

    // Determine popover position
    const getPopoverPosition = () => {
        switch ( position ) {
            case 'top':
                return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' };
            case 'right':
                return { top: '50%', left: '100%', transform: 'translateY(-50%)' };
            case 'left':
                return { top: '50%', right: '100%', transform: 'translateY(-50%)' };
            case 'bottom':
            default:
                return { top: '100%', left: '50%', transform: 'translateX(-50%)' };
        }
    };

    return (
        <div
            className={ `popover-container` }
            style={ { position: 'relative', display: 'inline-block', ...containerStyle } }
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseLeave }
            onClick={ handleClick }
            ref={ gPopoverRef }
        >
            { children }
            { gIsPopoverVisible && (
                <div
                    className={ `popover-content-container` }
                    style={ {
                        position: 'absolute',
                        zIndex: 1000,
                        padding: '0px',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        ...getPopoverPosition(),
                        ...popoverStyle,
                    } }
                >
                    { content }
                </div>
            ) }
        </div>
    );
};


const Popover2 = ( { children, content } ) => {
    const [ isVisible, setIsVisible ] = useState( false ); // Manages the visibility state of the popover
    const popoverRef = useRef( null ); // Reference to the popover element
    const triggerRef = useRef( null ); // Reference to the button element that triggers the popover

    const toggleVisibility = () => {
        setIsVisible( !isVisible );
    };

    useEffect( () => {
        const handleClickOutside = ( event ) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains( event.target ) &&
                !triggerRef.current.contains( event.target )
            ) {
                setIsVisible( false ); // Close the popover if clicked outside
            }
        };

        document.addEventListener( 'mousedown', handleClickOutside );
        return () => {
            document.removeEventListener( 'mousedown', handleClickOutside );
        };
    }, [] );

    return (
        <div className="popover-container">
            <button
                ref={ triggerRef }
                onClick={ toggleVisibility }
                className="popover-trigger"
                aria-haspopup="true"
                aria-expanded={ isVisible }
                aria-controls="popover-content"
            >
                { children }
            </button>
            { isVisible && (
                <div
                    id="popover-content"
                    ref={ popoverRef }
                    className="popover-content"
                    role="dialog"
                    aria-modal="true"
                >
                    { content }
                </div>
            ) }
        </div>
    );
};

export default Popover;
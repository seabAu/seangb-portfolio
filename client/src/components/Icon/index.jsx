import React from 'react';
import './icon.css';

const Icon = () => {
    return (
        <div>

        </div>
    );
};

const Hamburger = ( props ) => {
    const {
        active = false,
        onClick,
    } = props;

    return (
        <div>
            <svg
                className={ `ham hamRotate ham8 ${ active ? 'active' : '' }` }
                viewBox="0 0 100 100"
                width="80"
                onClick={ () => onClick() }
            >
                <path
                    className="line top"
                    d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
                <path
                    className="line middle"
                    d="m 30,50 h 40" />
                <path
                    className="line bottom"
                    d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
            </svg>

            {/*
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 200 200">
                    <g stroke-width="6.5" stroke-linecap="round">
                        <path
                            d="M72 82.286h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                        />
                        <path
                            d="M100.75 103.714l72.482-.143c.043 39.398-32.284 71.434-72.16 71.434-39.878 0-72.204-32.036-72.204-71.554"
                            fill="none"
                            stroke="#fff"
                        />
                        <path
                            d="M72 125.143h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                        />
                        <path
                            d="M100.75 103.714l-71.908-.143c.026-39.638 32.352-71.674 72.23-71.674 39.876 0 72.203 32.036 72.203 71.554"
                            fill="none"
                            stroke="#fff"
                        />
                        <path
                            d="M100.75 82.286h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                        />
                        <path
                            d="M100.75 125.143h28.75"
                            fill="#009100"
                            fill-rule="evenodd"
                            stroke="#fff"
                        />
                    </g>
                </svg> */
            }
        </div>
    );
};

Icon.Hamburger = Hamburger;

export default Icon;


{/* <svg
        id="menu-button"
        xmlns="http://www.w3.org/2000/svg"
        // lg:hidden
        className={ `nav-toggle-button h-6 w-6 cursor-pointer text-lg text-gray-700` }
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={ ( e ) => { setShowDropdown( showDropdown === true ? false : true ); } }
    // onClick={onHover(true)}
    // onMouseOver={onHover(true)}
    // onMouseOut={onHover(false)}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg> 
*/
}
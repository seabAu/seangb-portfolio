import React from 'react';
import Section from '../components/Section';
import Button from '../components/Button';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const Errpage = ( props ) => {
    const {
        enabled = true,
        nav = [],
        layout = 'column',
    } = props;

    const navigate = useNavigate();

    return (
        <div className={ `page-content-container px-10 ` }>
            <div className={ `page-content-section page-content-section-col items-center bg-gradient-to-r from-violet-800 from-10% via-sky-500 via-30% to-orange-500 to-90%` }>
                <div className={ `page-content-section-row h-[200px]` }>
                    <div className={ `flex flex-col md:flex-row w-3/12 page-content-section-col border-r border-highlightColor items-center ` }>
                        <h1 className={ `text-5xl sm:text-3xl text-highlightColor font-semibold` }>
                            404
                        </h1>
                    </div>
                    <div className={ `flex flex-col flex-wrap md:flex-row w-9/12 items-left justify-between align-center items-center` }>
                        <h2 className="text-2xl text-gray text-med w-full sm:text-sm items-center">
                            { `Nothing to see here!` }
                        </h2>
                        <div className={ `justify-end items-center` }>
                            <Button
                                id={ `landing-page-nav-button` }
                                icon={ <FaArrowLeft className={ `button-text button-icon` } /> }
                                label={ `Return to safety!` }
                                appearance={ `neumorphic` }
                                onClick={ ( e ) => {
                                    navigate( "/" );
                                } }></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Errpage;

import React from 'react';
import Section from '../../components/Section';

/* This will be a collection of various tools I find useful, or have built myself and wish to provide as a service to others.
    Some ideas:
        - URL Shortener Service
            - Will require a secondary backend.
                - Would be good practice for configuring advanced NGINX setups.
            - Could bring in a little bit of passive income. This is pretty common for things like this, or other dev tools like jsonplaceholder.
        - Dev Converter Toolkit
            - If-else statement to nested ternary block.
                if(cond){(trueState)} else {(falseState)}
                turns into: 
                (cond) ? (trueState) : (falseState)
                
                if      (cond1) {(cond1State)}
                else if (cond2) {(cond2State)}
                else if (cond3) {(cond3State)}
                else if (cond4) {(cond4State)}
                else {(falseState)}
                turns into: 
                (cond1) ? (cond1State) : (
                    (cond2) ? (cond2State) : (
                        (cond3) ? (cond3State) : (
                            (cond4) ? (cond4State) : (elseState)
                        )
                    )
                )
            * And any other utilities I find useful in my workflow. 

*/
const Tools = ( props ) => {
    const {
        children
    } = props;
    return (
        <Section>
            <Section.Text
                type="title"
                content="Tools"
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
        </Section>
    );
};

export default Tools;

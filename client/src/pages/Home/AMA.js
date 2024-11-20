import React from 'react';
import Section from '../../components/Section';

const AMA = () => {
    return (
        <div>
            <Section.Text
                type="title"
                content="Ask Me Anything"
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
        </div>
    );
};

export default AMA;
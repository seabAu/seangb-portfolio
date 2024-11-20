import React, {useState, useEffect} from 'react';
import * as utils from 'akashatools';
const TextCarousel = (props) => {
    const {
        items = [],
        num = 1,
        height = "auto",
        width = "auto",
        padding = '2px',
        timer = 1000,
    } = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 2000); // Update interval to 2 seconds
        return () => clearInterval(interval);
    }, []);

    const getItemStyle = (index) => {
        const diff = Math.abs(currentIndex - index);
        const opacity = Math.max(1 - 0.25 * diff, 0);
        const offset = (index - currentIndex) * 100;
        return {opacity: opacity, transform: `translateX(${offset}%)`, transition: 'opacity 0.5s ease, transform 0.5s ease', whiteSpace: 'nowrap'};
    };

    const getItems = ( data, index, count ) =>
        {
            let res = [];
            if ( utils.val.isValidArray( data, true ) )
            {
                let len = data.length;
                for ( var i = 0; i < count; i++ )
                {
                    let elem = data[ ( index + i ) % items.length ];
                    res.push( elem );
                }
            }
    
            return res;
        }
    
    const getItemOpacity = ( index ) =>
        {
            const diff = Math.abs( currentIndex - index );
            return Math.max( 1 - 0.25 * diff, 0 );
        };
        
    return (
        <div
            style={{
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}>
            {items.map((text, index) => (
                <span key={index} style={getItemStyle(index)}>
                    {text}
                </span>
            ))}
        </div>
    );
};

export default TextCarousel;
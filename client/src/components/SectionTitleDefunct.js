import React from "react";

function SectionTitle ( { title, scale } )
{
    // Select the scale class based on the scale value provided.
    var scaleClass;
    // text-9xl, text-9xl, text-8xl,text-7xl,text-6xl, text-5xl, text-4xl,text-3xl,text-2xl, text-xl, text-lg,text-md, text-sm, text-xs
    switch (scale) {
        case "1":
            scaleClass = "text-4xl";
            break;
        case "2":
            scaleClass = "text-3xl";
            break;
        case "3":
            scaleClass = "text-2xl";
            break;
        case "4":
            scaleClass = "text-xl";
            break;
        case "5":
            scaleClass = "text-lg";
            break;
        case "6":
            scaleClass = "text-md";
            break;
        default:
            scaleClass = "text-3xl";
            break;
    }
    return (
        <div className="section-title">
            <h1
                className={`section-title-text ${scaleClass} text-highlightColor`}>
                {title}
            </h1>
            <div className="section-title-bar"></div>
        </div>
    );
}

export default SectionTitle;

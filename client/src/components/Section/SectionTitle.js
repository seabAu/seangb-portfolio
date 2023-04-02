import React from "react";
import * as utils from "../Utilities/index.js";

function SectionTitle ( props )
{
    const {
        // Child components passed inside this component's element.
        children,
        // Style settings.
        title = "",
        scale = "3",
        // Style settings.
        type = "default",
        color = "highlightColor",
        // Can import extra styles.
        classes = "text-highlightColor",
        styles = {},
        debug = false,
    } = props;

    // Select the scale class based on the scale value provided.
    // text-9xl, text-8xl, text-7xl, text-6xl, text-5xl, text-4xl, text-3xl, text-2xl, text-xl, text-lg, text-md, text-sm, text-xs
    const getScale = ( scale ) => {
        switch (scale) {
            case `9`: return "text-9xl";
            case `8`: return "text-8xl";
            case `7`: return "text-7xl";
            case `6`: return "text-6xl";
            case `5`: return "text-5xl";
            case `4`: return "text-4xl";
            case `3`: return "text-3xl";
            case `2`: return "text-2xl";
            case `1`: return "text-xl";
            case `lg`: return "text-lg";
            case `md`: return "text-md";
            case `sm`: return "text-sm";
            case `sx`: return "text-xs";
            default: return "text-2xl";
        }
    }

    return (
        <div className={`section-title`}>
            <h1 className={`section-title-text ${getScale(scale)} ${color !== '' ? `text-${color}` : ``}`} styles={styles}>
                {title}
            </h1>
            <div className={`section-title-bar`}></div>
        </div>
    );
}

export default SectionTitle;

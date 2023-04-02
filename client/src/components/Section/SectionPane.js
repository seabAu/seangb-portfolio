import React from 'react'
import * as utils from "../Utilities/index.js";

function SectionPane(props) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Responsive settings.
        responsive = true,
        responsiveBreakpoints = 768,
        // Style settings.
        type = "default",
        flexDirection = `${"column"}`,
        alignContent = `${"flex-start"}`,
        justifyContent = `${"flex-start"}`,
        flexWrap = `${"wrap"}`,
        height = `${"auto"}`,
        minHeight = `${"auto"}`,
        maxHeight = `${"100%"}`,
        width = `${"auto"}`,
        minWidth = `${"auto"}`,
        maxWidth = `${"100%"}`,
        padding = `${"0.25rem 1.0rem"}`,
        margin = `${"0.0rem"}`,
        border = `${"none"}`,
        borderRadius = `${"0%"}`,
        boxShadowEnabled = `${true}`,
        overflowX = `hidden`,
        overflowY = `hidden`,

        // Can import extra styles.
        classes = "",
        styles = {},
        debug = false,
    } = props;

    const componentStyles = {
        // Default styles go here.
        // User-set styles override default settings.{{
        display: `${"flex"}`,
        // flexDirection: `${flexDirection}`,
        justifyContent: `${justifyContent}`,
        alignItems: `${alignContent}`,
        alignContent: `${alignContent}`,
        height: `${height}`,
        minHeight: `${minHeight}`,
        width: `${width}`,
        minWidth: `${minWidth}`,
        padding: `${ padding ? padding : "0.0rem" }`,
        overflowX: `${overflowX}`,
        overflowY: `${overflowY}`,
        // border: `1px solid white`,
        ...styles,
        // Responsiveness overrides go here.
    };
    
    return (
        showParent && (
            <div className={`section-pane`} style={{}
                // componentStyles
            }>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
}


export default SectionPane

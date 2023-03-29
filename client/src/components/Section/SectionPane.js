import React from 'react'
import * as utils from "../Utilities/index.js";

function SectionPane(props) {
    const {
        // Child components passed inside this component's element.
        children,
        // Render overrides, if ever needed.
        showParent = true,
        showChildren = true,
        // Style settings.
        type = "default",
        // Can import extra styles.
        classes = "",
        styles = {},
    } = props;

    return (
        showParent && (
            <div className="section-pane" style={styles}>
                {showChildren && children && children !== false && children}
            </div>
        )
    );
}


export default SectionPane

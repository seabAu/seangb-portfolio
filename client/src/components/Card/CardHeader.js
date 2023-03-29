import React from 'react'
import * as util from "../Utilities/index.js";
import "./CardGrid.css";

function CardHeader(props) {
    const { children } = props;
    return (
        <div className="grid-card-header">
            {children &&
                (util.val.isValidArray(children, true) ||
                    util.val.valIsValid(children)) &&
                children}
        </div>
    );
}

export default CardHeader

import React from 'react'
import * as util from "../Utilities/index.js";
import "./CardGrid.css";

function CardFooter(props) {
    const { children } = props;
    return (
        <div className="grid-card-footer items-end">
            {children &&
                (util.val.isValidArray(children, true) ||
                    util.val.valIsValid(children)) &&
                children}
        </div>
    );
}

export default CardFooter

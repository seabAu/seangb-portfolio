import React from 'react'
import * as util from "../Utilities/index.js";
import "./CardGrid.css";

function CardBody(props) {
    const { children } = props;
    return (
        <div className="grid-card-body">
            {children &&
                (util.val.isValidArray(children, true) ||
                    util.val.valIsValid(children)) &&
                children}
            <div className="grid-card-iframe"></div>
            <div className="grid-card-body-text"></div>
        </div>
    );
}

export default CardBody

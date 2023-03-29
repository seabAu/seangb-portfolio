import React from "react";
import Card from "./Card";
import * as util from "../Utilities/index.js";
import "./CardGrid.css";

function CardGrid(props) {
    const { 
        // Child components passed inside this component's element. 
        children, 
        // Grid layout settings.
        gridRows, 
        gridRowHeight = `auto`, 
        gridCols, 
        gridColWidth = `1fr`, 
        gridGap = `1.0`, 
        // Style settings.
        margin, 
        padding, 
        height, 
        width 
} = props;

    const gridStyles = {
        display: "grid",
        gridTemplateRows: `auto 1fr auto`,
        gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        gridGap: `${gridGap}rem`,
        grid: `repeat(auto-fit, 1fr) / auto-flow 1fr`,
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // flexDirection: "row",
        // alignContent: "center",
        // height: height,
        // width: `${width > 100 ? 100 : width}%`,
        // backgroundColor: fillercolor,
        // borderRadius: borderRadius,
        padding: `${padding}`,
        margin: `${margin}`,
        width: `${height}`,
        height: `${width}`,
        textAlign: "middle",
        transition: "width 1s ease-in-out",
        // top: "50%",
        // left: "50%",
    };

    <div className="grid-card-container" style={gridStyles}>
        {children &&
            (util.val.isValidArray(children, true) ||
                util.val.valIsValid(children)) &&
            children}
    </div>;
}

export default CardGrid;

/*
        {children.map((childElement) => (
            <Card header={""} body={""} footer={""}>
                childElement
            </Card>
        ))}
*/
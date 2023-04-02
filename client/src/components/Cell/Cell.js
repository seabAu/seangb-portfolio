import React from "react";
import * as utils from "../Utilities/index.js";

function Cell(props) {
    const { dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0 } =
        props;

    const getCell = (
        dataObj,
        dataDisplayKey,
        filterList,
        dataFilterKey,
        parentIndex = 0,
    ) => {
        // console.log(
        //     "CellList.JS :: getCell :: Cell data = ",
        //     "\n", "dataObj = ", dataObj,
        //     "\n", "dataDisplayKey = ", dataDisplayKey,
        //     "\n", "filterList = ", filterList,
        //     "\n", "dataFilterKey = ", dataFilterKey,
        //     "\n", "parentIndex = ", parentIndex,
        // );
        if (utils.ao.has(dataObj, dataDisplayKey)) {
            return (
                <div
                    className={`cell-list-item ${
                        utils.ao.has(dataObj, dataFilterKey)
                            ? filterList.includes(dataObj[dataFilterKey])
                                ? "hidden"
                                : ""
                            : ""
                    }`}
                    key={`cell-list-item-${parentIndex}-${
                        dataObj[dataDisplayKey]
                    }-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}
                    id={`cell-list-item-${parentIndex}-${
                        dataObj[dataDisplayKey]
                    }-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}>
                    <h1 className={`cell-list-item-text m-0 text-[8pt]`}>
                        {dataObj[dataDisplayKey]}
                    </h1>
                </div>
            );
        }
        return "";
    };

    return getCell(
        dataObj,
        dataDisplayKey,
        filterList,
        dataFilterKey,
        parentIndex,
    );
}

export default Cell;

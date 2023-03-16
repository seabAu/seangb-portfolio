import React from "react";
import { has } from "../Utilities/AO";

function Cell(props) {
    const { dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex } =
        props;

    const getCell = (
        dataObj,
        dataDisplayKey,
        filterList,
        dataFilterKey,
        parentIndex,
    ) => {
        // console.log(
        //     "CellList.JS :: getCell :: Cell data = ",
        //     "\n", "dataObj = ", dataObj,
        //     "\n", "dataDisplayKey = ", dataDisplayKey,
        //     "\n", "filterList = ", filterList,
        //     "\n", "dataFilterKey = ", dataFilterKey,
        //     "\n", "parentIndex = ", parentIndex,
        // );
        if (has(dataObj, dataDisplayKey)) {
            return (
                <div
                    className={`cell-list-item p-0 ${
                        has(dataObj, dataFilterKey)
                            ? filterList.includes(dataObj[dataFilterKey])
                                ? "hidden"
                                : ""
                            : ""
                    }`}
                    key={`item-${parentIndex}-${dataObj[dataDisplayKey]}-${
                        dataObj.hasOwnProperty("index") ? dataObj.index : ""
                    }`}
                    id={`item-${parentIndex}-${dataObj[dataDisplayKey]}-${
                        dataObj.hasOwnProperty("index") ? dataObj.index : ""
                    }`}>
                    <h1 className={`cell-list-item-text m-0 p-0 text-[8pt]`}>
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

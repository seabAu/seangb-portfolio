import React from "react";
import { has } from "../Utilities/AO";
import { isValidArray } from "../Utilities/Val";
import Cell from "./Cell";
import FilterCell from "./FilterCell";
import "./cell.css";

function CellList(props) {
    const {
        // Data display properties.
        dataListEnabled = true,
        dataLabel = "",
        dataLabelSize = "2xl",
        dataList = [],
        dataDisplayKey = "",
        hoverPopupEnabled = false,
        hoverPopupKeys = [], // Array of object keys to fetch and display in each hover-popup.
        // Generalized progress display properties.
        progressDisplayEnabled = true,
        progressDisplayKey = "",
        // Filtering properties.
        filteringEnabled = true,
        filterActiveList = [], // The list of selected / active filter strings.
        filterOptionsList = [], // The full list of filterable strings.
        dataFilterKey = "",
        dataFilterFunction,
        // Styling stuff.
        padding,
        cellListPadding,
        cellPadding,
        margin,
        cellListMargin,
        cellMargin,
        borderRounding,
        neumorphic,
        neumorphicSharp,
    } = props;

    const getCellList = (data, dataDisplayKey, filterList, dataFilterKey) => {
        // console.log(
        //     "CellList.JS :: getCellList :: Cell data = ",
        //     "\n", "data = ", data,
        //     "\n", "dataDisplayKey = ", dataDisplayKey,
        //     "\n", "filterList = ", filterList,
        //     "\n", "dataFilterKey = ", dataFilterKey,
        // );
        if (isValidArray(data, true)) {
            return (
                <div className="cell-list">
                    {data.map((dataObj, parentIndex) => {
                        if (has(dataObj, dataFilterKey)) {
                            if (filterList.length > 0) {
                                if (
                                    filterList.includes(dataObj[dataFilterKey])
                                ) {
                                    return "";
                                }
                            }
                            return (
                                <Cell
                                    dataObj={dataObj}
                                    dataDisplayKey={dataDisplayKey}
                                    filterList={filterList}
                                    dataFilterKey={dataFilterKey}
                                    parentIndex={parentIndex}
                                />
                            );
                        }
                        return "";
                    })}
                </div>
            );
        }
    };

    const getFilterCellList = (
        filterElements,
        filterList,
        filterFunction,
        filteringEnabled,
        // onclickEnabled,
    ) => {
        // console.log(
        //     "CellList.JS :: getFilterCellList :: Cell data = ",
        //     "\n", "filterElements = ", filterElements,
        //     "\n", "filterList = ", filterList,
        //     "\n", "filterFunction = ", filterFunction,
        //     "\n", "filteringEnabled = ", filteringEnabled,
        // );
        if (isValidArray(filterElements, true)) {
            return (
                <div className="cell-list">
                    {filterElements.map((filterLabel, parentIndex) => (
                        <FilterCell
                            filterLabel={filterLabel}
                            filterList={filterList}
                            filterFunction={filterFunction}
                            // onclickEnabled={onclickEnabled}
                            filteringEnabled={filteringEnabled}
                            parentIndex={parentIndex}
                        />
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="cell-list-container">
            {dataLabel && (
                <h1
                    className={`text-highlightColor text-${
                        dataLabelSize ? dataLabelSize : "2xl"
                    }`}>
                    {dataLabel}
                </h1>
            )}
            {filteringEnabled && filterOptionsList && filterActiveList && (
                <div className="cell-list-filters">
                    {getFilterCellList(
                        filterOptionsList,
                        filterActiveList,
                        dataFilterFunction,
                        filteringEnabled,
                    )}
                </div>
            )}
            {dataListEnabled && dataList && filterActiveList && (
                <div className="cell-list-data">
                    <hr className="pt-2 pb-2" />
                    {getCellList(
                        dataList,
                        dataDisplayKey,
                        filterActiveList,
                        dataFilterKey,
                    )}
                </div>
            )}
        </div>
    );
}

export default CellList;

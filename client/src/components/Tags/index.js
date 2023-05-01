import React from "react";
import "./tags.css";
import * as utils from "../../utilities/index.js";
import Section from "../Section";

function Tags(props) {
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
        layout = "", // MOSAIC (DEFAULT) | LIST
        appearance = "neumorphic", // FLAT | NEUMORPHIC | GLASSMORPHIC | CONSOLE | OUTSET
        appearanceModifier = "", // 
        padding,
        cellListPadding,
        cellPadding,
        margin,
        cellListMargin,
        cellMargin,
        borderRounding,
        neumorphic,
        neumorphicSharp,
        debug = false,
    } = props;

        const getCellList = (data, dataDisplayKey, filterList, dataFilterKey) => {
            // console.log(
            //     "CellList.JS :: getCellList :: Cell data = ",
            //     "\n", "data = ", data,
            //     "\n", "dataDisplayKey = ", dataDisplayKey,
            //     "\n", "filterList = ", filterList,
            //     "\n", "dataFilterKey = ", dataFilterKey,
            // );
            if (utils.val.isValidArray(data, true)) {
                return (
                    <div className={ `cell-list ${ appearance ? `cell-list-${
                        // appearance === 'flat' ? '' : 
                        appearance === 'neumorphic' ? 'neumorphic' :
                            appearance === 'glassmorphic' ? 'glassmorphic' : 
                            appearance === 'console' ? 'console' : ''}` : ``
                    }`}>
                        {data.map((dataObj, parentIndex) => {
                            if (utils.ao.has(dataObj, dataFilterKey)) {
                                if (filterList.length > 0) {
                                    if (filterList.includes(dataObj[dataFilterKey])) {
                                        return "";
                                    }
                                }
                                return (
                                    <Tags.Cell
                                        dataObj={dataObj}
                                        dataDisplayKey={dataDisplayKey}
                                        filterList={filterList}
                                        dataFilterKey={dataFilterKey}
                                        parentIndex={parentIndex}
                                        key={`cell-list-item-${parentIndex}-${dataDisplayKey}`}
                                        id={`cell-list-item-${parentIndex}-${dataDisplayKey}`}
                                    />
                                );
                            }
                            return "";
                        })}
                    </div>
                );
            }
        };

    const getCellListObj = (data, dataDisplayKey, filterList, dataFilterKey) => {
        if (debug)
            console.log(
                "CellList.JS :: getCellList :: Cell data = ",
                "\n",
                "data = ",
                data,
                "\n",
                "dataDisplayKey = ",
                dataDisplayKey,
                "\n",
                "filterList = ",
                filterList,
                "\n",
                "dataFilterKey = ",
                dataFilterKey,
            );
        if ( utils.val.isValidArray( data, true ) )
        {
            return (
                <div className="cell-list">
                    { data.map( ( element, parentIndex ) =>
                    {
                        let value;
                        if (element) {
                            // Array element is valid.
                            if (utils.val.isObject(element)) {
                                // Given an object in this array.
                                if ( utils.ao.has( element, dataFilterKey ) )
                                {
                                    value = element[dataFilterKey];
                                }
                            } else {
                                // Given a scalar.
                                value = element;
                            }
                        }

                        if (value) {
                            if (filterList.length > 0) {
                                if (filterList.includes(value)) {
                                    return "";
                                }
                            }
                            return (
                                <Tags.Cell
                                    element={element}
                                    dataDisplayKey={dataDisplayKey}
                                    filterList={filterList}
                                    dataFilterKey={dataFilterKey}
                                    parentIndex={parentIndex}
                                    key={`cell-list-item-${parentIndex}-${dataDisplayKey}`}
                                    id={`cell-list-item-${parentIndex}-${dataDisplayKey}`}
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
        // if (debug) console.log(
        //     "CellList.JS :: getFilterCellList :: Cell data = ",
        //     "\n", "filterElements = ", filterElements,
        //     "\n", "filterList = ", filterList,
        //     "\n", "filterFunction = ", filterFunction,
        //     "\n", "filteringEnabled = ", filteringEnabled,
        // );
        if (utils.val.isValidArray(filterElements, true)) {
            return (
                <div className="cell-list">
                    {filterElements.map((filterLabel, parentIndex) => (
                        <Tags.Filter
                            filterLabel={filterLabel}
                            filterList={filterList}
                            filterFunction={filterFunction}
                            // onclickEnabled={onclickEnabled}
                            filteringEnabled={filteringEnabled}
                            parentIndex={parentIndex}
                            key={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                            id={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                        />
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="cell-list-container">
            {dataLabel && <h1 className={`text-highlightColor text-${dataLabelSize ? dataLabelSize : "2xl"}`}>{dataLabel}</h1>}
            {filteringEnabled && filterOptionsList && filterActiveList && (
                <div className="cell-list-filters">{getFilterCellList(filterOptionsList, filterActiveList, dataFilterFunction, filteringEnabled)}</div>
            )}
            {dataListEnabled && dataList && filterActiveList && (
                <div className="cell-list-data">
                    <Section.Separator type={"neumorphic"} height={`4px`}/>
                    {getCellList(dataList, dataDisplayKey, filterActiveList, dataFilterKey)}
                </div>
            )}
        </div>
    );
}

function Cell(props) {
    const { dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0, debug = false } = props;

    const getCell2 = (dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0) => {
        if (debug)
            console.log(
                "CellList.JS :: getCell :: Cell data = ",
                "\n",
                "dataObj = ",
                dataObj,
                "\n",
                "dataDisplayKey = ",
                dataDisplayKey,
                "\n",
                "filterList = ",
                filterList,
                "\n",
                "dataFilterKey = ",
                dataFilterKey,
                "\n",
                "parentIndex = ",
                parentIndex,
            );
        let value;
        if (utils.ao.has(dataObj, dataDisplayKey)) {
            value = dataObj[dataDisplayKey];
        } else {
        }
        return (
            <div
                className={`cell-list-item ${utils.ao.has(dataObj, dataFilterKey) ? (filterList.includes(dataObj[dataFilterKey]) ? "hidden" : "") : ""}`}
                key={`cell-list-item-${parentIndex}-${value}-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}
                id={`cell-list-item-${parentIndex}-${value}-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}>
                <h1 className={`cell-list-item-text m-0 text-[8pt]`}>{value}</h1>
            </div>
        );
    };

    const getCell = (dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0) => {
        if (debug)
            console.log(
                "CellList.JS :: getCell :: Cell data = ",
                "\n",
                "dataObj = ",
                dataObj,
                "\n",
                "dataDisplayKey = ",
                dataDisplayKey,
                "\n",
                "filterList = ",
                filterList,
                "\n",
                "dataFilterKey = ",
                dataFilterKey,
                "\n",
                "parentIndex = ",
                parentIndex,
            );
        let value;
        if (utils.ao.has(dataObj, dataDisplayKey)) {
            value = dataObj[dataDisplayKey];
        }
        else
        {
            value = dataObj;
        }
        return (
            <div
                className={`cell-list-item ${utils.ao.has(dataObj, dataFilterKey) ? (filterList.includes(dataObj[dataFilterKey]) ? "hidden" : "") : ""}`}
                key={`cell-list-item-${parentIndex}-${value}-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}
                id={`cell-list-item-${parentIndex}-${value}-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}>
                <h1 className={`cell-list-item-text m-0 text-[8pt]`}>{value}</h1>
            </div>
        );
    };

    return getCell(dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex);
}

Tags.Cell = Cell;

function Filter(props) {
    const {
        filterLabel,
        filterList,
        filterFunction,
        filteringEnabled,
        parentIndex,
        debug = false,
    } = props;
    // Accepts an individial skill object and returns an individual cell-list-item.
    // console.log( "FilterCell :: props = ", props );
    const getFilterCell = (
        filterLabel,
        filterList,
        filterFunction,
        onclickEnabled,
        parentIndex = 0,
    ) => {
        // if (has(filterLabel, "name")) {
        if (filterLabel && filterLabel !== "") {
            // if (debug) console.log(
            //     "CellList.JS :: getFilterCell :: Cell data = ",
            //     "\n",
            //     "filterLabel = ",
            //     filterLabel,
            //     "\n",
            //     "filterList = ",
            //     filterList,
            //     "\n",
            //     "filterFunction = ",
            //     filterFunction,
            //     "\n",
            //     "onclickEnabled = ",
            //     onclickEnabled,
            //     "\n",
            //     "parentIndex = ",
            //     parentIndex,
            // );
            return (
                <div
                    className={`cell-list-item ${onclickEnabled && filterList.includes(filterLabel) ? "active" : ""}`}
                    key={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                    id={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                    onClick={
                        onclickEnabled
                            ? (event) => {
                                  if (filterList.indexOf(filterLabel) > -1) {
                                      // Already in filters list, remove it.
                                      filterFunction(filterList.filter((filter) => filter !== filterLabel));
                                  } else {
                                      // Not in filters list, add it.
                                      filterFunction([...filterList, filterLabel]);
                                  }
                              }
                            : () => {}
                    }>
                    <h1 className={`cell-list-item-text m-0 p-0 text-[8pt]`}>{filterLabel}</h1>
                </div>
            );
        }
        return "";
    };

    return (
        filteringEnabled && // filterList &&
        getFilterCell(
            filterLabel,
            filterList,
            filterFunction,
            filteringEnabled,
            parentIndex,
        )
    );
}


Tags.Filter = Filter;

export default Tags;


/*
    import React from "react";
    import "./tags.css";
    import * as utils from "../../utilities/index.js";
    import Section from "../Section";

    function Tags(props) {
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
            if (utils.val.isValidArray(data, true)) {
                return (
                    <div className="cell-list">
                        {data.map((dataObj, parentIndex) => {
                            if (utils.ao.has(dataObj, dataFilterKey)) {
                                if (filterList.length > 0) {
                                    if (filterList.includes(dataObj[dataFilterKey])) {
                                        return "";
                                    }
                                }
                                return (
                                    <Tags.Cell
                                        dataObj={dataObj}
                                        dataDisplayKey={dataDisplayKey}
                                        filterList={filterList}
                                        dataFilterKey={dataFilterKey}
                                        parentIndex={parentIndex}
                                        key={`cell-list-item-${parentIndex}-${dataDisplayKey}`}
                                        id={`cell-list-item-${parentIndex}-${dataDisplayKey}`}
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
            if (utils.val.isValidArray(filterElements, true)) {
                return (
                    <div className="cell-list">
                        {filterElements.map((filterLabel, parentIndex) => (
                            <Tags.Filter
                                filterLabel={filterLabel}
                                filterList={filterList}
                                filterFunction={filterFunction}
                                // onclickEnabled={onclickEnabled}
                                filteringEnabled={filteringEnabled}
                                parentIndex={parentIndex}
                                key={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                                id={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                            />
                        ))}
                    </div>
                );
            }
        };

        return (
            <div className="cell-list-container">
                {dataLabel && <h1 className={`text-highlightColor text-${dataLabelSize ? dataLabelSize : "2xl"}`}>{dataLabel}</h1>}
                {filteringEnabled && filterOptionsList && filterActiveList && (
                    <div className="cell-list-filters">{getFilterCellList(filterOptionsList, filterActiveList, dataFilterFunction, filteringEnabled)}</div>
                )}
                {dataListEnabled && dataList && filterActiveList && (
                    <div className="cell-list-data">
                        <Section.Separator type={"neumorphic"} height={`4px`}/>
                        {getCellList(dataList, dataDisplayKey, filterActiveList, dataFilterKey)}
                    </div>
                )}
            </div>
        );
    }

    function Cell(props) {
        const { dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0 } = props;

        const getCell = (dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex = 0) => {
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
                        className={`cell-list-item ${utils.ao.has(dataObj, dataFilterKey) ? (filterList.includes(dataObj[dataFilterKey]) ? "hidden" : "") : ""}`}
                        key={`cell-list-item-${parentIndex}-${dataObj[dataDisplayKey]}-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}
                        id={`cell-list-item-${parentIndex}-${dataObj[dataDisplayKey]}-${dataObj.hasOwnProperty("index") ? dataObj.index : ""}`}>
                        <h1 className={`cell-list-item-text m-0 text-[8pt]`}>{dataObj[dataDisplayKey]}</h1>
                    </div>
                );
            }
            return "";
        };

        return getCell(dataObj, dataDisplayKey, filterList, dataFilterKey, parentIndex);
    }

    Tags.Cell = Cell;

    function Filter(props) {
        const {
            filterLabel,
            filterList,
            filterFunction,
            filteringEnabled,
            parentIndex,
        } = props;
        // Accepts an individial skill object and returns an individual cell-list-item.
        // console.log( "FilterCell :: props = ", props );
        const getFilterCell = (
            filterLabel,
            filterList,
            filterFunction,
            onclickEnabled,
            parentIndex = 0,
        ) => {
            // if (has(filterLabel, "name")) {
            if (filterLabel && filterLabel !== "") {
                // console.log(
                //     "CellList.JS :: getFilterCell :: Cell data = ",
                //     "\n",
                //     "filterLabel = ",
                //     filterLabel,
                //     "\n",
                //     "filterList = ",
                //     filterList,
                //     "\n",
                //     "filterFunction = ",
                //     filterFunction,
                //     "\n",
                //     "onclickEnabled = ",
                //     onclickEnabled,
                //     "\n",
                //     "parentIndex = ",
                //     parentIndex,
                // );
                return (
                    <div
                        className={`cell-list-item ${
                            onclickEnabled && filterList.includes(filterLabel)
                                ? "active"
                                : ""
                        }`}
                        key={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                        id={`filter-cell-list-item-${parentIndex}-${filterLabel}`}
                        onClick={
                            onclickEnabled
                                ? (event) => {
                                      if (filterList.indexOf(filterLabel) > -1) {
                                          // Already in filters list, remove it.
                                          filterFunction(
                                              filterList.filter(
                                                  (filter) =>
                                                      filter !== filterLabel,
                                              ),
                                          );
                                      } else {
                                          // Not in filters list, add it.
                                          filterFunction([
                                              ...filterList,
                                              filterLabel,
                                          ]);
                                      }
                                  }
                                : () => {}
                        }>
                        <h1 className={`cell-list-item-text m-0 p-0 text-[8pt]`}>
                            {filterLabel}
                        </h1>
                    </div>
                );
            }
            return "";
        };

        return (
            filteringEnabled && // filterList &&
            getFilterCell(
                filterLabel,
                filterList,
                filterFunction,
                filteringEnabled,
                parentIndex,
            )
        );
    }


    Tags.Filter = Filter;

    export default Tags;

*/
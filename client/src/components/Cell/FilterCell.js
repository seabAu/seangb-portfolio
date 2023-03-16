import React from "react";

function FilterCell(props) {
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

export default FilterCell;

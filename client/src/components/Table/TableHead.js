import React, { useEffect, useState } from 'react';
import * as utils from "../../utilities/index.js";

function TableHead ( props )
{
	const {
		// isVisible,
		// isFetching,
		tableID,
		tableHeadings,
		isFilterable,
		isSortable,
		headerOnClick,
		hideColumns,
		changeFilters,
		actionsEnabled = false,
		debug = false,
	} = props;

	const [sortKey, setSortKey] = useState("");
	const [order, setOrder] = useState("asc");
	const [columnData, setColumnData] = useState(tableHeadings);

	const formatText = (text = "") => {
		// return capitalizeFirstLetter(text.replace("_", " "));
		return capitalizeFirstLetter(text.includes("_") ? text.split("_").join(" ") : text);
	};

	const capitalizeFirstLetter = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	const isColumnHidden = (heading_id) => {
		// hideColumns ? (Array.isArray(hideColumns) ? (hideColumns.includes(column.key) ? " col-hidden" : "") : '') : ''
		if (hideColumns) {
			if (Array.isArray(hideColumns)) {
				if (hideColumns.length > 0) {
					return hideColumns.includes(heading_id);
				}
			}
		}
		return false;
	};

    const buildTableHeaderCell = ( column, columnIndex, filterable = true ) =>
    {
        let columnHead = [];
        if ( column.hasOwnProperty( "key" ) )
        {
			let headingId = column.key;
            let headingLabel = utils.str.formatText( column.key );
            return (
                <th
                    data-label={ `${ column.key }` }
                    colSpan="1"
                    key={ `table-${ tableID }-${ filterable ? 'search-filter' : 'header-label' }-${ column.key }` }
                    id={ `table-${ tableID }-${ filterable ? 'search-filter' : 'header-label' }-${ column.key }` }
                    className={ `${filterable ? 'col-head' : ''} ${ isColumnHidden( column.key ) ? " col-hidden" : "" }` }
                    // className={`${isColumnHidden(column.key) ? " col-hidden" : ""}`}
                    onClick={ ( index ) =>
                    {
                        if ( isSortable )
                        {
                            const sortOrder = headingId === sortKey && order === "asc" ? "desc" : "asc";
                            setSortKey( headingId );
                            setOrder( sortOrder );
                            headerOnClick( index, headingId, sortOrder );
                        }
                    } }>
                    { filterable ? ( <div className={ `input-field input-field-inline` }>
                        <input
                            className="table-search-filter input-field-control"
                            type="text"
                            key={ `table-${ tableID }-search-filter-input-${ column.key }` }
                            id={ `table-${ tableID }-search-filter-input-${ column.key }` }
                            placeholder={ `Filter ${ column.key }` }
                            onChange={ ( event ) =>
                            {
                                changeFilters( column.key, event.target.value );
                            } }
                        />
                    </div> ) : ( headingLabel ) }
                </th> );
        }
    };

    const buildTableHeader = (headers) =>
    {
        return (
			<thead>
				<tr data-label={`table-header`}>
					{headers.map((column, columnIndex) => {
						return buildTableHeaderCell(column, columnIndex, false);
					})}
				</tr>
				{isFilterable ? (
					<tr data-label={`table-header`}>
						{headers.map((column, columnIndex) => {
							return buildTableHeaderCell(column, columnIndex, isFilterable);
						})}
					</tr>
				) : (
					<></>
				)}
			</thead>
		);
    }
    
	if (debug) console.log("TableHead :: ", tableHeadings);
	return buildTableHeader(tableHeadings);
}

export default TableHead;

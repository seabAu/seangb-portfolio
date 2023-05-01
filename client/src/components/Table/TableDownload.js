import React from "react";
import { ExportToCsv } from "export-to-csv";
import * as utils from "../../utilities/index.js";
import Button from "../Button/index.js";

function TableDownload ( { dataName, tableData, downloadFileType, debug = false } )
{
    const options = {
        filename:`Portfolio_Data__${dataName}`,
        fieldSeparator: ",",
        quoteStrings: '"',
        decimalSeparator: ".",
        showLabels: true,
        showTitle: true,
        title: `Portfolio_Data__${dataName}`,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const download = ( data, filetype ) =>
    {
		const flattenedData = utils.ao.flattenObjArray(data);
		const csvExporter = new ExportToCsv(options);
		csvExporter.generateCsv(flattenedData);
		// if ( debug ) console.log(
		//     "TableDownload: ",
		//     "\nData = ",
		//     data,
		//     "\nData has ",
		//     data.length,
		//     "elements.",
		//     "\nFlattenedData = ",
		//     flattenedData,
		//     "\nFlattenedData has ",
		//     flattenedData.length,
		//     "elements.",
		// );
	};

    return (
		<div className="table-download-container">
			<Button
                classes="button"
                appearance={'control'}
				label={"Download Results (CSV)"}
				onClick={() => {
					download(tableData, downloadFileType);
				}} />
		</div>
	);
}

export default TableDownload;

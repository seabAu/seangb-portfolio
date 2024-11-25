// This is an off-canvas panel set on the right side of the window
// for showing additional information after clicking on a row in the table.

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
// import CopyButton from "../../DataViewer/CopyButton";
import * as utils from 'akashatools';
import * as dom from './../../utilities/DOM.js';
import "./SidePanel.css";
// import { Button, Offcanvas } from "bootstrap";
// import { flatMapObjText, obj2List } from "../../Utilities/ObjectUtils";

function SidePanel(props) {
	const {
		children,
		isFetching,
		label,
		copydata = [],
		showAside=false,
		setShowAside,
		data=[],
	} = props;
	console.log("Sidepanel :: props = ", props);
	// console.log(
	//     "SidePanel :: ",
	//     show,
	//     isFetching,
	//     setShow,
	//     panelDataID,
	//     panelData,
	// );
	const [ show, setShow ] = useState( showAside );
	
	return (
		<div className={`side-panel-container ${showAside ? "" : "hidden"}`}>
			<div className="side-panel">
				<div className="side-panel-header">
					<div className="side-panel-header-buttons">
						<button
							className="close-button side-panel-close-button"
							onClick={() => {
								setShowAside(false);
							}}>
							<FiX />
						</button>
					</div>
					<div className="side-panel-label">{label ? label : ""}</div>
				</div>
				<div className="side-panel-body">
					<div className="side-panel-content-title">{label ? label : ""}</div>
					<div className="side-panel-content">{showAside && !isFetching && children && children}</div>
					<div className="side-panel-content">{showAside && dom.objToList( data ) }</div>
				</div>
				<div className="side-panel-footer">
                    {
                        // util.val.isValidArray( copydata, true ) && (
    					// 	<CopyButton
    					// 		label={"Copy data to clipboard"}
    					// 		data={copydata}></CopyButton>
                        // )
                    }
				</div>
			</div>
		</div>
	);
}

export default SidePanel;

/*
    <Offcanvas
        show={isVisible}
        onHide={() => onClick(false)}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            Some text as placeholder. In real life you can have the
            elements you have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
    </Offcanvas>
*/

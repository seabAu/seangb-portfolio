import React from "react";
import * as util from "../Utilities/index.js";
import './CardGrid.css';
function Card(props) {
    const { children } = props;
    
    return (
        <div className="grid-card text-white shadow ">
            { children && ( util.val.isValidArray( children, true ) || util.val.valIsValid( children ) ) && (
                children
            )}
        </div>
    );
}

export default Card;

/*
<div className="grid-card">
    <div className="grid-card-header">
        <h1 className="text-xl font-bold">{project.title}</h1>
    </div>
    <div className="grid-card-body">
        <div className="grid-card-image-container">
            <img src={project.image} alt="" className="grid-card-image"></img>
        </div>
        <div className="grid-card-iframe">
            <input
                id="link"
                className=""
                type="text"
                value={project.link}></input>
        </div>
        <div className="grid-card-body-text">
            <h1 className="">{project.description}</h1>
        </div>
        Technologies used:{" "}
        <div className="cell-list">
            {project.technologies.map((technology) => (
                <div className="cell-list-item">
                    <h1 className="cell-list-item-text">
                        {
                            // JSON.stringify(technology)
                            technology.name
                        }
                    </h1>
                </div>
            ))}
        </div>
    </div>
    <div className="grid-card-footer">
    </div>
</div>;
*/
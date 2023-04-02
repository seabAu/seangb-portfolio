// import { has } from "immer/dist/internal";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/Section/SectionTitle";
import CellList from "../../components/Cell/CellList";
import * as utils from "../../components/Utilities/index.js";
import '../../components/Card/CardGrid.css';
// import { projects } from "../../resources/projects";
// Implement skills filter
// Implement projects grid
// Create projects on new codepen account
function Projects() {
    const { portfolioData } = useSelector((state) => state.root);
    // Destructure data.
    const { projects, about } = portfolioData;
    const [technologies, setTechnologies] = useState([]);
    const [technologyFilter, setTechnologyFilter] = useState([]);
    const [technologyFilterOptions, setTechnologyFilterOptions] = useState([]);
    // const { skills } = about; // = abouts[0];

    useEffect(() => {
        // On load, get all technologies used, for the filters. Doing it other ways results in an infinite loop??
        if (utils.val.isValidArray(projects)) {
            // Case of being given all projects.
            let techs = [];
            let technames = [];
            projects.forEach((item) => {
                // Map for each project
                if (item) {
                    if ("technologies" in item) {
                        // Map for each technology listed.
                        item.technologies.forEach((tech) => {
                            if (utils.ao.has(tech, "name")) {
                                if (!technames.includes(tech.name)) {
                                    technames.push(tech.name);
                                    techs.push(tech);
                                }
                            }
                        });
                    }
                }
            });
            setTechnologies( techs );
            setTechnologyFilterOptions(
                techs.map((tech) => (utils.ao.has(tech, "name") ? tech.name : "")),
            );
        }
    }, []);

    // Purge the filters list if the list of technologies changes.
    useEffect(() => {
        setTechnologyFilter([]);
    }, [technologies]);

    // * Debug.
    // * useEffect(() => {
    // *     console.log( `Projects.js :: Debug :: `,
    // *         "\n", "projects = ", projects,
    // *         "\n", "technologies = ", technologies,
    // *         "\n", "technologyFilter = ", technologyFilter,
    // *     )
    // * });

    const getProjects = (data) => {
        if ( utils.val.isValidArray( data, true ) )
        {
            let datamap = data.map((item, itemIndex) => {
                // For each project
                if ( technologyFilter.length > 0 )
                {
                    // Check if this project has any technologies listed in the filter list.
                    if (utils.ao.has(item, "technologies")) {
                        let techs = item.technologies;
                        // Get a list of tech names.
                        let technames = techs.map((tech) =>
                            utils.ao.has(tech, "name") ? tech.name : "",
                        );
                        let match = false;
                        technames.forEach( ( tech ) =>
                        {
                            if ( technologyFilter.includes( tech ) )
                            {
                                match = true;
                            }
                        } )
                        if ( match === true )
                        {
                            return "";
                        }
                    }
                }
                // Else proceed like normal.
                return (
                    <div
                        className="grid-card text-white shadow "
                        id={ item._id === `` ? `grid-card-item-${Math.random() * 100}` : `grid-card-item-${item._id }` }
                        key={ item._id === `` ? `grid-card-item-${Math.random() * 100}` : `grid-card-item-${item._id }` }
                    >
                        <div className="grid-card-header">
                            <h1 className="text-xl font-bold">{item.title}</h1>
                        </div>
                        <div className="grid-card-body">
                            <div className="grid-card-iframe">
                                <iframe
                                    src={item.link}
                                    title={item.title}
                                    style={{ border: "none" }}
                                    height="400px"
                                    width="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    loading="lazy"
                                    allowtransparency="true"
                                    allowFullScreen={true}></iframe>
                            </div>
                            <div className="grid-card-body-text">
                                <h1 className="">{item.description}</h1>
                            </div>
                            {"technologies" in item && (
                                // Get a cell list for the listed technologies used.
                                <CellList
                                    dataLabel={"Technologies used:"}
                                    dataLabelSize={"2xl"}
                                    dataList={item.technologies}
                                    dataDisplayKey={"name"}
                                    filteringEnabled={false}
                                />
                            )}
                        </div>
                        <div className="grid-card-footer items-end">
                            <a href={item.link} className="button mt-2">
                                See It Here
                            </a>
                        </div>
                    </div>
                );
            });
            // console.log(
            //     "Projects.JS :: getProjects :: datamap = ",
            //     datamap,
            //     datamap.toString(),
            // );
            return [datamap];
        }
    };

    return (
        <div>
            <SectionTitle title="Projects"></SectionTitle>
            <div className="py-5">
                <h1 className="text-highlightColor text-2xl">
                    Here are a few examples of my skills and the technologies
                    i've been working with:
                </h1>
                {
                    // getAllTechnologies( projects )
                    <CellList
                        dataListEnabled={false}
                        dataLabel={"Click on a category to filter projects"}
                        dataLabelSize={"1"}
                        hoverPopupEnabled={false}
                        progressDisplayEnabled={true}
                        progressDisplayKey={""}
                        filterOptionsList={technologyFilterOptions}
                        filterActiveList={technologyFilter}
                        filteringEnabled={true}
                        dataFilterFunction={setTechnologyFilter}
                    />
                }
            </div>
            <div className="grid-card-container">{getProjects(projects)}</div>
        </div>
    );
}

export default Projects;

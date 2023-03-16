// import { has } from "immer/dist/internal";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import CellList from "../../components/Cell/CellList";
import { isValidArray } from "../../components/Utilities/Val";
import { has } from "../../components/Utilities/AO";
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
        if (isValidArray(projects)) {
            // Case of being given all projects.
            let techs = [];
            let technames = [];
            projects.forEach((item) => {
                // Map for each project
                if (item) {
                    if ("technologies" in item) {
                        // Map for each technology listed.
                        item.technologies.forEach((tech) => {
                            if (has(tech, "name")) {
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
                techs.map((tech) => (has(tech, "name") ? tech.name : "")),
            );
        }
    }, []);

    // Purge the filters list if the list of technologies changes.
    useEffect(() => {
        setTechnologyFilter([]);
    }, [technologies]);

    // Debug.
    useEffect(() => {
        console.log( `Projects.js :: Debug :: `,
            "\n", "projects = ", projects,
            "\n", "technologies = ", technologies,
            "\n", "technologyFilter = ", technologyFilter,
        )
    });

    const getProjects = (data) => {
        // console.log(
        //     "Projects.JS :: getProjects :: Data = ",
        //     data,
        //     portfolioData,
        // );
        if ( isValidArray( data, true ) )
        {
            let datamap = data.map((item, itemIndex) => {
                // For each project
                // console.log(
                //     "Projects.JS :: getProjects :: mapping each project :: ",
                //     item,
                //     itemIndex,
                // );
                if ( technologyFilter.length > 0 )
                {
                    // Check if this project has any technologies listed in the filter list.
                    if (has(item, "technologies")) {
                        let techs = item.technologies;
                        // Get a list of tech names.
                        let technames = techs.map((tech) =>
                            has(tech, "name") ? tech.name : "",
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
                        id={item._id === "" ? "" : item._id}>
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

    /*
    const getProjects = ( data ) =>
    {
        console.log(
            "Projects.JS :: getProjects :: Data = ",
            data,
            portfolioData,
        );
        if ( isValidArray( data, true ) )
        {
            data.map((item) => (
                <div
                    className="grid-card text-white shadow "
                    id={item._id === "" ? "" : item._id}>
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
                                frameBorder="0"
                                scrolling="no"
                                loading="lazy"
                                allowtransparency="true"
                                allowFullScreen={true}></iframe>
                        </div>
                        <div className="grid-card-body-text">
                            <h1 className="">{item.description}</h1>
                        </div>
                        Technologies used:{" "}
                        <div className="cell-list">
                            {item.technologies.map((technology) => (
                                <div className="cell-list-item">
                                    <h1 className="cell-list-item-text">
                                        {technology}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid-card-footer items-end">
                        <a href={item.link} className="button mt-2">
                            See It Here
                        </a>
                    </div>
                </div>
            ));
        }
    }
*/

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

/*
    // Accepts the technologies field from a specific project entry and returns a cell-list.
    const getTechnologies = (data) => {
        console.log(
            "Projects.JS :: getTechnologies :: Project data = ",
            data,
            portfolioData,
        );
        if (has(data, "technologies")) {
            // Case of being given one project, as an object.
            return (
                <CellList
                    dataLabel={"Technologies used:"}
                    dataList={data.technologies}
                    dataDisplayKey={"name"}
                    filteringEnabled={false}
                />
                // <div className="cell-list flex flex-wrap">
                //     {data.technologies.map((tech, techindex) => {
                //         return getTechnologyCell(data.index, tech, false);
                //     })}
                // </div>
            );
        }
    };

    // Accepts an individial technology object and returns an individual cell-list-item.
    const getTechnologyCell = (parentIndex, tech, onclickEnabled) => {
        if (has(tech, "name")) {
            // console.log(
            //     "Projects.JS :: getTechnologyCell :: Cell data = ",
            //     parentIndex,
            //     tech,
            //     onclickEnabled,
            //     portfolioData,
            //     "Tech.name = ", tech.name
            // );
            return (
                <div
                    className={`cell-list-item border border-tertiary ${
                        technologyFilter.includes(tech.name) ? "active" : ""
                    }`}
                    key={`item-${parentIndex}-${tech.name}-${tech.index}`}
                    id={`item-${parentIndex}-${tech.name}-${tech.index}`}
                    onClick={
                        onclickEnabled
                            ? (event) => {
                                  let techIndex = technologyFilter.indexOf(
                                      tech.name,
                                  );
                                  if (techIndex > -1) {
                                      // if ( technologyFilter.includes( tech.name ) )
                                      // Already in filters list, remove it.
                                      setTechnologyFilter(
                                          technologyFilter.filter(
                                              (filter) =>
                                                  filter !== tech.name,
                                          ),
                                      );
                                  } else {
                                      // Not in filters list, add it.
                                      setTechnologyFilter([
                                          ...technologyFilter,
                                          tech.name,
                                          // tech,
                                      ]);
                                  }
                              }
                            : () => {}
                    }>
                    <h1 className={`cell-list-item-text text-white`}>
                        {tech.name}
                    </h1>
                </div>
            );
        }
        return "";
    };

    const getAllTechnologies = ( data ) =>
    {
        console.log(
            "Projects.JS :: getAllTechnologies :: Project data = ",
            data,
            portfolioData,
        );
        if ( isValidArray( technologies ) )
        {
            return (
                <div className="cell-list flex flex-wrap">
                    { technologies.map( ( tech, index ) =>
                    {
                        return getTechnologyCell( index, tech, true );
                    } )
                    }
                </div> )
        }
    };

    const ProjectList = ({ projects, selectedTechnologies }) => {
        const filteredProjects = projects.filter((project) =>
            project.technologies.some((technology) =>
                selectedTechnologies.includes(technology),
            ),
        );

        return (
            <div>
                <h3>Projects:</h3>
                <ul>
                    {filteredProjects.map((project) => (
                        <li key={project.name}>{project.name}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const getSkills = (data) => {
        console.log("Projects.JS :: getSkills :: Data = ", data, portfolioData);
        if (isValidArray(data, true)) {
            return (
                <div className="cell-list flex flex-wrap gap-5 mt-5">
                    {data.map((item, index) => (
                        <div
                            className="cell-list-item border border-tertiary"
                            id={`skill-${index}`}>
                            <h1 className="cell-list-item-text text-white">
                                {item}
                            </h1>
                        </div>
                    ))}
                </div>
            );
        }
    };

*/


/*
    const getAllTechnologies = ( data ) =>
    {
        console.log(
            "Projects.JS :: getAllTechnologies :: Project data = ",
            data,
            portfolioData,
        );
        if ( isValidArray( technologies ) )
        {
            // Case of being given all projects.
            // let techs = [];
            // let celllist = (
            //     <div className="cell-list flex flex-wrap">
            //         {data.map((item) => {
            //             // Map for each project
            //             if (item) {
            //                 if ("technologies" in item) {
            //                     // Map for each technology listed.
            //                     return item.technologies.map((tech) => {
            //                         if (has(tech, "name")) {
            //                             if (!techs.includes(tech.name)) {
            //                                 techs.push(tech.name);
            //                                 return getTechnologyCell(
            //                                     data.index,
            //                                     tech,
            //                                     true,
            //                                     // (event, tech) =>
            //                                     //     cellOnClick(event, tech),
            //                                 );
            //                             }
            //                         }
            //                         return "";
            //                     });
            //                 }
            //             }
            //             return "";
            //         })}
            //     </div>
            // );
            // // setTechnologies( techs );
            // return celllist;
            return (
                <div className="cell-list flex flex-wrap">
                    { technologies.map( ( tech, index ) =>
                    {
                        return getTechnologyCell( index, tech, true );
                    } )
                    }
                </div> )
        }
    };

    const cellOnClick = ( event, tech ) =>
    {
        let techIndex =
            technologyFilter.indexOf(
                tech.name,
            );
        if (techIndex > -1) {
            // if ( technologyFilter.includes( tech.name ) )
            // Already in filters list, remove it.
            setTechnologyFilter(
                technologyFilter.filter(
                    (filter) =>
                        filter !==
                        tech.name,
                ),
            );
        } else {
            // Not in filters list, add it.
            setTechnologyFilter([
                ...technologyFilter,
                tech.name,
            ]);
        }
    }
*/


/*
    function Projects() {
        const { portfolioData } = useSelector((state) => state.root);
        // Destructure data.
        const { projects, about } = portfolioData;
        const { skills } = about; // = abouts[0];
        return (
            <div>
                <SectionTitle title="Projects"></SectionTitle>
                <div className="py-5">
                    <h1 className="text-highlightColor text-2xl">
                        Here are a few of my skills and the technologies i've been
                        working with:
                    </h1>
                    <h1 className="text-white">
                        Click on a skill to filter projects
                    </h1>
                    <div className="cell-list flex flex-wrap gap-5 mt-5">
                        {skills.map((skill, index) => (
                            <div className="cell-list-item border border-tertiary">
                                <h1 className="cell-list-item-text text-white">
                                    {skill}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid-card-container">
                    {projects.map((project) => (
                        <div className="grid-card text-white shadow ">
                            <div className="grid-card-header">
                                <h1 className="text-xl font-bold">
                                    {project.title}
                                </h1>
                            </div>
                            <div className="grid-card-body">
                                <div className="grid-card-image">
                                    <img
                                        className="h-60 w-80"
                                        src={project.image}
                                        alt=""></img>
                                </div>
                                <div className="grid-card-iframe">
                                    <iframe
                                        src={project.link}
                                        title={project.title}
                                        style={{ border: "none" }}
                                        width="100%"
                                        height="400px"
                                        frameborder="0"
                                        scrolling="no"
                                        loading="lazy"
                                        allowtransparency="true"
                                        allowfullscreen="true"></iframe>
                                </div>
                                <div className="grid-card-body-text">
                                    <h1 className="">{project.context}</h1>
                                    <h1 className="">{project.description}</h1>
                                </div>
                                Technologies used:{" "}
                                <div className="cell-list">
                                    {project.technologies.map((technology) => (
                                        <div className="cell-list-item">
                                            <h1 className="cell-list-item-text">
                                                {technology}
                                            </h1>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid-card-footer items-end">
                                <a href={project.link} className="button mt-2">
                                    See It Here
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    <div className="flex sm:flex-col py-10 gap-10">
        <div className="flex flex-col gap-5 border-l-2 border-[#bdacac] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
            {projects.map((project, index) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        setSelectedItemIndex(index);
                    }}>
                    <h1
                        className={`text-xl px-5 py-3 sm:w-40 ${
                            selectedItemIndex === index
                                ? "text-highlightColor2 border-highlightColor2 border-l-4 -ml-[2px] bg-[#3f5e809b]"
                                : "text-white"
                        }`}>
                        {project.title}
                    </h1>
                </div>
            ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
            <img
                src={projects[selectedItemIndex].image}
                alt=""
                className="h-60 w-72"
            />
            <div className="flex flex-col gap-5">
                <h1 className="text-highlightColor text-xl">
                    {projects[selectedItemIndex].title}
                </h1>
                <p className="text-highlightColor2">
                    {projects[selectedItemIndex].description}
                </p>
                <p className="text-white">
                    {projects[selectedItemIndex].context}
                </p>
            </div>
        </div>
    </div>
*/

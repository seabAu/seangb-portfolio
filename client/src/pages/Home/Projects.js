// import { has } from "immer/dist/internal";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as utils from "../../utilities/index.js";
// import "../../components/Card/CardGrid.css";
import Section from "../../components/Section";
import Card from "../../components/Card";
import Tags from "../../components/Tags";
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
		// On load, get all technologies listed, for the filters. Doing it other ways results in an infinite loop due to useEffect's quirks on state change.
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
			setTechnologies(techs);
			setTechnologyFilterOptions(techs.map((tech) => (utils.ao.has(tech, "name") ? tech.name : "")));
		}
	}, []);

    // Purge the filters list if the list of technologies changes.
    useEffect(() => {
        setTechnologyFilter([]);
    }, [technologies]);

    const getProjects = (data) => {
        if (utils.val.isValidArray(data, true)) {
            let datamap = data.map((item, itemIndex) => {
                // For each project
                if (technologyFilter.length > 0) {
                    // Check if this project has any technologies listed in the filter list.
                    if (utils.ao.has(item, "technologies")) {
                        let techs = item.technologies;
                        // Get a list of tech names.
                        let technames = techs.map((tech) => (utils.ao.has(tech, "name") ? tech.name : ""));
                        let match = false;
                        technames.forEach((tech) => {
                            if (technologyFilter.includes(tech)) {
                                match = true;
                            }
                        });
                        if (match === true) {
                            return "";
                        }
                    }
                }
                // Else proceed like normal.
                return (
                    <Card classes="text-white shadow ">
                        <Card.Header>
                            <Section.Text
                                classes="text-xl font-bold"
                                type="text"
                                content={item.title}></Section.Text>
                        </Card.Header>
                        <Card.Body>
                            <Section flexDirection={`column`}>
                                <Section.Text
                                    classes="grid-card-body-text"
                                    type="text"
                                    content={item.description}></Section.Text>
                                <Card.Frame
                                    src={item.link}
                                    title={item.title}
                                    styles={{ border: `none` }}
                                    height={`400px`}
                                    width={`100%`}
                                />
                                <Section.Image
                                    classes="grid-card-image-container"
                                    content={{ image: item.image, link: item.link }}
                                />
                                {"technologies" in item && (
                                    // Get a cell list for the listed technologies used.
                                    <Tags
                                        dataLabel={"Technologies used:"}
                                        dataLabelSize={"2xl"}
                                        dataList={item.technologies}
                                        dataDisplayKey={"name"}
                                        filteringEnabled={false}
                                    />
                                )}
                            </Section>
                        </Card.Body>
                        <Card.Footer>
                            <a
                                href={item.link}
                                className="button button-neumorphic">
                                See It Here
                            </a>
                        </Card.Footer>
                    </Card>
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
        <Section>
            <Section.Text
                type="title"
                content="Projects"
                scale={`3xl`}
                separator={true}
            />
            <Section.Content classes="py-5">
                <h1 className="text-highlightColor text-2xl">Here are a few examples of my skills and the technologies i've been working with:</h1>
                {
                    // getAllTechnologies( projects )
                    <Tags
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
            </Section.Content>
            <Card.Grid>{getProjects(projects)}</Card.Grid>
        </Section>
    );
}

export default Projects;

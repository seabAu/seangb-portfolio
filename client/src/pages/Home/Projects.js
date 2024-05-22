// import { has } from "immer/dist/internal";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as utils from "../../utilities/index.js";
import Section from "../../components/Section";
import Card from "../../components/Card";
import Tags from "../../components/Tags";
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
            } );
            
            // Update compiled technologies list.
            setTechnologies( techs );
            
            // Update list of technology filters.
            setTechnologyFilterOptions( techs.map( ( tech ) => ( utils.ao.has( tech, "name" ) ? tech.name : "" ) ) );
		}
	}, []);

    // Purge the filters list if the list of technologies changes.
    useEffect(() => {
        setTechnologyFilter([]);
    }, [technologies]);

    const getProjects = (data) => {
        if ( utils.val.isValidArray( data, true ) )
        {
            // Sort projects list by the "Show Index" value.
            let sortedProjects = [ ...data ].sort( ( a, b ) =>
            {
                if ( a.showIndex > b.showIndex ) return 1;
                if ( a.showIndex < b.showIndex ) return -1;
                return 0;
            } );

            // Filter out any disabled projects.
            sortedProjects = sortedProjects.filter( ( project ) =>
            {
                return ( project.enabled === true );
            } );

            let datamap = sortedProjects.map((item, itemIndex) => {
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

                // Else proceed like normal. Render the grid of cards.
                return (
                    <Card classes="text-white shadow">

                        <Card.Header>

                            <Section.Text
                                classes="text-xl font-bold"
                                type="text"
                                content={item.title}></Section.Text>
                        </Card.Header>
                        <Card.Body>

                            <Section flexDirection={ `column` }>
                                
                                {
                                    "context" in item &&
                                        <Section.Text
                                            classes="grid-card-body-text"
                                            type="subtitle"
                                            scale={ `1xl` }
                                            separator={ true } 
                                            content={ item.context }
                                        />
                                }
                                
                                {
                                    "description" in item &&
                                        <Section.Text
                                            classes="grid-card-body-text"
                                            type="text"
                                            scale={ `1xl` }
                                            content={ item.description }
                                        />
                                }

                                {
                                    "image" in item && utils.file.checkImageURL( item.image ) &&
                                    <Section.Image
                                        classes="grid-card-image-container"
                                            styles={{ padding: `${10}px` }}
                                            content={{ image: item.image, link: item.link }}
                                    />
                                }
                                
                                {
                                    "title" in item &&
                                        <Card.Frame
                                            src={item.link}
                                            title={item.title}
                                            styles={{ border: `none` }}
                                            height={`400`}
                                            width={`100%`}
                                        />
                                }

                            </Section>
                        </Card.Body>
                        <Card.Footer>

                            {"technologies" in item && (
                                // Get a cell list for the listed technologies used.
                                <Section flexDirection={`column`} >
                                    <Tags
                                        dataLabel={"Technologies used:"}
                                        dataLabelSize={"2xl"}
                                        dataList={item.technologies}
                                        dataDisplayKey={"name"}
                                        filteringEnabled={ false }
                                        separator={false}
                                    />
                                </Section>
                            ) }

                            <a
                                href={item.link}
                                className="button button-neumorphic">
                                See It Here
                            </a>
                        </Card.Footer>
                    </Card>
                );
            } );
            
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
                <h1 className="text-highlightColor text-2xl">Here are a few examples of my work and the technologies i've worked with:</h1>
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
            <Card.Grid>
                {
                    getProjects( projects )
                }
            </Card.Grid>
        </Section>
    );
}

export default Projects;

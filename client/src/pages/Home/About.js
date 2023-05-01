import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Section from "../../components/Section";
import * as utils from "../../utilities/index.js";
import Tags from "../../components/Tags";

function About() {
    const { portfolioData } = useSelector((state) => state.root);

    const { about, projects } = portfolioData;
    const {
        _id,
        firstName,
        lastName,
        lottieURL,
        statement,
        description,
        description1,
        description2,
        certifications,
        achievements,
        skills,
        summary,
        social,
    } = about; // = abouts[0];

    // State for skills cell list.
    const [skillsList, setSkillsList] = useState([]);
    const [skillCategories, setSkillCategories] = useState([]);
    const [skillCategoryFilter, setSkillCategoryFilter] = useState([]);

    // Hooks for skills cell list.
    useEffect(() => {
		// On load, get all skills listed, for the filters. Doing it other ways results in an infinite loop due to useEffect's quirks on state change.
		/*  // Each skill has a structure like: 
            {
                "_id": "640d9f030e3b63c5c6959316",
                "index": 0,
                "showIndex": 0,
                "enabled": true,
                "name": "HTML5",
                "category": "Web Development",
                "tags": [
                    "Front End Development"
                ],
                "proficiency": 7,
                "years": 6
            }
        */
		if (utils.val.isValidArray(skills)) {
			// Case of being given all projects.
			let s = [];
			let names = [];
			let categories = [];
			skills.forEach((skill) => {
				if (utils.ao.has(skill, "name")) {
					if (!names.includes(skill.name)) {
						if (!categories.includes(skill.category)) {
							categories.push(skill.category);
						}
						names.push(skill.name);
						s.push(skill);
					}
				}
			});
			if (s) {
				setSkillsList(s);
			}
			if (categories) {
				setSkillCategories(categories);
			}
		}
	}, []);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <Section>
            <Section
                showSection={true}
                showChildren={true}
                responsive={true}
                responsiveBreakpoints={768}
                // Style settings
                display={'block'}
                flexDirection={"row"}
                fillArea={true}
                height={"fit-content"}
                minHeight={"auto"}
                maxHeight={"100%"}
                width={"100%"}
                minWidth={"auto"}
                maxWidth={"100%"}
                padding={"0.25rem 1.0rem"}
                margin={"0.0rem"}
                border={"none"}
                borderRadius={"0%"}
                boxShadowEnabled={false}
                styles={{}}>
                <Section.Text type="title" content="About Me" scale={`3xl`} separator={true} />
                <Section.Content
                    type={"default"}
                    responsive={true}
                    responsiveBreakpoints={768}
                    styles={{}}>
                    <Section.Pane
                        key={`section-pane-${"collection-container"}`}
                        type={"default"}
                        responsive={true}
                        responsiveBreakpoints={768}
                        // Style settings
                        // flexDirection={"column"}
                        // alignContent={"center"}
                        // justifyContent={"flex-start"}
                        height={"100%"}
                        // minHeight={"auto"}
                        // maxHeight={"100%"}
                        width={"100%"}
                        minWidth={"40%"}
                        // maxWidth={"100%"}
                        padding={"0.0rem"}
                        margin={"0.0rem"}
                        border={"none"}
                        borderRadius={"0%"}
                        boxShadowEnabled={false}
                        styles={{}}>
                        <Section.Collection
                            content={utils.ao.extractDataList(projects, [
                                "image",
                                "link",
                            ])}
                            datakeys={["image", "link"]}
                            data={projects}
                            type={`slideshow`}
                            key={ `section-img-collection-mosaic` }
                            lockHeight={ true }
                            setLockHeight={ `500px` }
                            scrollTimer={20000}
                            classes={`section-img-collection-mosaic`}
                            styles={{
                                border: `1px solid green`,
                            }}></Section.Collection>
                    </Section.Pane>
                    <Section.Pane
                        type={"default"}
                        responsive={true}
                        responsiveBreakpoints={768}
                        // Style settings
                        // flexDirection={"column"}
                        // alignContent={"center"}
                        // justifyContent={"flex-start"}
                        height={"100%"}
                        // minHeight={"auto"}
                        // maxHeight={"100%"}
                        width={"auto"}
                        minWidth={"40%"}
                        // maxWidth={"100%"}
                        padding={"0.25rem 1.0rem"}
                        margin={"0.0rem"}
                        border={"none"}
                        borderRadius={"0%"}
                        boxShadowEnabled={false}
                        overflowX={`auto`}
                        overflowY={`auto`}
                        styles={
                            {
                                // border: `1px solid white`,
                            }
                        }>
                        {utils.val.isValidArray(about.description)
                            ? about.description.map( ( section, index ) =>
                            {
                                  return (
                                      <Section.Text
                                          key={ `section-text-${ index }` }
                                          type={"text"}
                                          content={section}
                                          color={`${
                                              [
                                                  "text-highlightColor",
                                                  "text-highlightColor2",
                                                  "text-white",
                                              ][index % 3]
                                              }` }
                                          scale={`sm`}
                                          styles={
                                              {
                                                  // border: `1px solid green`,
                                              }
                                          }>
                                          
                                      </Section.Text>
                                  );
                              })
                            : ""}
                    </Section.Pane>
                </Section.Content>
            </Section>
            <Section
                showSection={true}
                showChildren={true}
                responsive={true}
                responsiveBreakpoints={768}
                // Style settings
                flexDirection={"row"}
                fillArea={true}
                height={"100%"}
                width={"100%"}
                padding={"0.25rem 1.0rem"}
                margin={"0.0rem"}
                border={"none"}
                borderRadius={"0%"}
                boxShadowEnabled={false}
                styles={{}}>
                <Section.Content
                    type={"default"}
                    responsive={true}
                    responsiveBreakpoints={768}
                    styles={{}}>
                    <Section.Pane
                        key={`section-pane-${"cell-list-container"}`}
                        type={"default"}
                        responsive={true}
                        responsiveBreakpoints={768}
                        // Style settings
                        // flexDirection={"column"}
                        // alignContent={"center"}
                        // justifyContent={"flex-start"}
                        height={"100%"}
                        // minHeight={"auto"}
                        // maxHeight={"100%"}
                        width={"100%"}
                        minWidth={"40%"}
                        // maxWidth={"100%"}
                        padding={"0.25rem 1.0rem"}
                        margin={"0.0rem"}
                        border={"none"}
                        borderRadius={"0%"}
                        boxShadowEnabled={false}
                        overflowX={`unset`}
                        overflowY={`unset`}
                        styles={{}}>
                        <Tags
                            dataLabel={
                                "Here are a few of my skills and the technologies i've been working with:"
                            }
                            dataLabelSize={"1"}
                            dataList={skillsList}
                            dataDisplayKey={"name"}
                            hoverPopupEnabled={false}
                            progressDisplayEnabled={true}
                            progressDisplayKey={"proficiency"}
                            filterOptionsList={skillCategories}
                            filterActiveList={skillCategoryFilter}
                            filteringEnabled={true}
                            dataFilterKey={"category"}
                            dataFilterFunction={setSkillCategoryFilter}
                        />
                    </Section.Pane>
                </Section.Content>
            </Section>
        </Section>
    );
}

export default About;

/* // Old iteration of the image slideshow:
    <SectionPane
        key={`section-pane-${"img-container"}`}
        type={"default"}
        responsive={true}
        responsiveBreakpoints={768}
        // Style settings
        // flexDirection={"column"}
        // alignContent={"center"}
        // justifyContent={"flex-start"}
        height={"100%"}
        // minHeight={"auto"}
        // maxHeight={"100%"}
        width={"auto"}
        // minWidth={"auto"}
        // maxWidth={"100%"}
        padding={"0.25rem 1.0rem"}
        margin={"0.0rem"}
        border={"none"}
        borderRadius={"0%"}
        boxShadowEnabled={false}
        overflowX={`hidden`}
        overflowY={`hidden`}
        styles={
            {
                // border: `1px solid white`,
            }
        }>
        <SectionImage
            content={getDataList(projects, "image")}
            type={"slideshow"}
            key={`section-img-${""}`}
            classes={`section-img-collection ${""}`}
            containerStyles={{
                height: `${"min-content"}`,
                // minHeight: `${"100%"}`,
                minHeight: `${"100%"}`,
                width: `${"auto"}`,
                minWidth: `${"min-content"}`,
                // verticalAlign: `top`,
                // height: `100%`,
                // width: `100%`,
                // position: `relative`,
                // overflowX: `auto`,
            }}
            elementStyles={
                {
                    // border: `1px solid green`,
                }
            }></SectionImage>
    </SectionPane>
*/ 
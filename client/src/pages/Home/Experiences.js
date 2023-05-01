import React from "react";
import { useSelector } from "react-redux";
import Tabs from "../../components/Tabs/Tabs";
import * as utils from "../../utilities/index.js";
import Section from "../../components/Section";
// import { experiences } from "../../resources/experiences";

function Experiences (){
    const { portfolioData } = useSelector((state) => state.root);
    // Destructure data.
    const { experiences } = portfolioData;
    
    const getExperiences = (data) => {
        if (utils.val.isValidArray(data, true)) {
            return data.map((experience, index) => {
                return (
                    <div
                        label={`${experience.company}`}
                        sublabel={`${experience.period}`}
                        key={experience._id}
                        id={experience._id}
                        index={index}>
                        <div className="flex-group flex-row-spread">
                            <div className="flex-col-spread">
                                <h1 className="header-section text-xl">{experience.title}</h1>
                                <h2 className="text-highlightColor text-sm">{experience.period}</h2>
                            </div>
                            <div className="flex-col-shrink">
                                <h1 className="header-subsection text-xl">{experience.company}</h1>
                                <h2 className="text-highlightColor text-sm">{experience.location}</h2>
                            </div>
                        </div>
                        <p className="text-white">{experience.description}</p>
                        <ul className="list">
                            {experience.duties.map((duty) => (
                                <li
                                    className="list-item"
                                    key={`experiences-list-item-${duty}`}
                                    id={`experiences-list-item-${duty}`}>
                                    <h1 className="list-item-text">{duty}</h1>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            });
        }
    };

    return (
        <Section>
            <Section.Text
                type="title"
                content="Experience"
                scale={`3xl`}
                separator={true}
            />
            {portfolioData && (
                <Tabs
                    type={"top"}
                    rounded={false}
                    centered={true}
                    padContent={true}
                    fillArea={false}
                    roundedNav={false}
                    contentBoxShadow={true}
                    navBoxShadow={true}>
                    {getExperiences(experiences)}
                </Tabs>
            )}
        </Section>
    );
}

export default Experiences;

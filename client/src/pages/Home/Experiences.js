import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/Section/SectionTitle";
import Tabs from "../../components/Tabs/Tabs";
import * as utils from "../../components/Utilities/index.js";
// import { experiences } from "../../resources/experiences";

function Experiences (){
    const { portfolioData } = useSelector((state) => state.root);
    // Destructure data.
    const { experiences } = portfolioData;
    
    const getExperiences = (data) => {
        // console.log( "getExperiences :: data = ", data, portfolioData );
        if (utils.val.isValidArray(data, true)) {
            return data.map((experience, index) => {
                return (
                    <div
                        label={`${experience.company}`}
                        sublabel={`${experience.period}`}
                        key={experience._id}
                        id={experience._id}
                        index={index}>
                        <div className="flex-row-spread">
                            <h1 className="header-section">
                                {experience.title}
                            </h1>
                            <h2 className="text-highlightColor text-xl">
                                {experience.period}
                            </h2>
                        </div>
                        <div className="flex-row-spread">
                            <h1 className="header-subsection">
                                {experience.company}
                            </h1>
                            <h2 className="text-highlightColor text-xl">
                                {experience.location}
                            </h2>
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
        <>
            <SectionTitle title="Experience"></SectionTitle>
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
        </>
    );
}

export default Experiences;

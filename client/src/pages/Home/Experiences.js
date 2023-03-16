import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import Tabs from "../../components/Tabs/Tabs";
import { sortDataByKey } from "../../components/Utilities/AO";
import { dateStr2LocaleDateStr } from "../../components/Utilities/Time";
import { isValidArray } from "../../components/Utilities/Val";
// import { experiences } from "../../resources/experiences";

function Experiences (){
    const { portfolioData } = useSelector((state) => state.root);
    // Destructure data.
    const { experiences } = portfolioData;
    
    const getExperiences = (data) => {
        // console.log( "getExperiences :: data = ", data, portfolioData );
        // // To make the update easier, add the new fields here and copy and paste.
        // let tempExp = experiences.map((exp, index) => {
        //     let period = exp.period.split(" - ");
        //     return {
        //         ...exp,
        //         index: index,
        //         showIndex: index,
        //         enabled: true,
        //         startdate: dateStr2LocaleDateStr(period[0]),
        //         enddate: dateStr2LocaleDateStr(period[1]),
        //     };
        // });
        // console.log(
        //     "tempExp = ",
        //     tempExp,
        //     ", tempExp sorted by key startdate :: ",
        //     sortDataByKey(tempExp, "startdate", "desc"),
        // );
        if ( isValidArray( data, true ) )
        {
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
                    rounded={true}
                    centered={true}
                    padContent={true}
                    fillArea={false}
                    roundedNav={true}
                    contentBoxShadow={true}
                    navBoxShadow={true}>
                    {getExperiences(experiences)}
                </Tabs>
            )}
        </>
    );
}

export default Experiences;

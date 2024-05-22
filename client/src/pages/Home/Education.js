import React from "react";
import { useSelector } from "react-redux";
import Tabs from "../../components/Tabs/Tabs";
// import { courses } from "../../resources/courses";
import * as utils from "../../utilities/index.js";
import Section from "../../components/Section";

function Education() {
    // Destructure data.
    const { portfolioData } = useSelector((state) => state.root);
    const { educations } = portfolioData;

    const getEducations = (data) => {
        if (utils.val.isValidArray(data, true)) {
            return data.map((degree, index) => {
                return (
					<div
						className=""
						label={degree.degree}
						key={degree._id}
						id={degree._id}
						index={index}>
						<div className="flex flex-row mdmax:flex-col w-full h-auto justify-between items-start">
							<div className="flex flex-col mdmax:flex-row flex-grow flex-wrap w-50 mdmax:w-full ">
								<h1 className="header-section w-full whitespace-nowrap px-2 py-1">{degree.degree}</h1>
								<h2 className="text-highlightColor text-xl w-full px-2 py-1">Graduated: {degree.date}</h2>
								<h1 className="header-subsection w-full whitespace-nowrap px-2 py-1">Major: {degree.major}</h1>
								<h2 className="text-highlightColor text-xl w-full px-2 py-1">Location: {degree.location}</h2>
								<div className="flex-row-shrink">
									{utils.val.isValidArray(degree.subjects, true) && (
										<div className="flex-row-shrink">
											<ul className="list">
												{degree.subjects.map((subject) => (
													<li
														className="list-item"
														key={`education-subjects-${degree.index}-list-item-${subject}`}
														id={`education-subjects-${degree.index}-list-item-${subject}`}>
														<h1 className="list-item-text">{subject}</h1>
													</li>
												))}
											</ul>
										</div>
									)}
								</div>
								<div className="flex-row-shrink">
									<a
										href={degree.link}
										className="button">
										University Website
									</a>
								</div>
							</div>
							<div className="flex flex-col mdmax:flex-row flex-shrink w-50 mdmax:w-full ">
								<img
									src={degree.image}
									alt=""
									className="w-full h-full"
								/>
							</div>
						</div>
					</div>
				);
            });
        }
    };

    return (
        <>
            <Section.Text
                type="title"
                content="Education"
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
                    {getEducations(educations)}
                </Tabs>
            )}
        </>
    );
}

export default Education;

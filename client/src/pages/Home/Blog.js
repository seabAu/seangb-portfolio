// This will eventually house blog posts populated by data stored in the database, but for now, it's a testing ground for Section and CardGrid components.

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Section from "../../components/Section";
import SectionContent from "../../components/Section/SectionContent";
import SectionImage from "../../components/Section/SectionImage";
import SectionPane from "../../components/Section/SectionPane";
import SectionText from "../../components/Section/SectionText";
import SectionTitle from "../../components/Section/SectionTitle";
import { deepGetKey, has } from "../../components/Utilities/AO";
import { isObject, isValidArray } from "../../components/Utilities/Val";
import * as utils from "../../components/Utilities/index.js";

function Blog() {
    const { portfolioData } = useSelector((state) => state.root);

    const { about, projects } = portfolioData;

    const getProjectImages = () =>
    {
        let images = [];
        if ( isValidArray( projects, true ) )
        {
            projects.forEach( ( item, index ) =>
            {
                if ( isObject( item ) )
                {
                    let img = deepGetKey( item, "image" );
                    if ( img && img != '' )
                    {
                        if ( img.toString().includes( 'http' ) )
                        {
                            // Is a (hopefully) valid url.
                            images.push(img);
                        }
                    }
                }
            })
        }
        return images;
    }

    return (
        <Section
            showSection={true}
            showChildren={true}
            // Style settings
            flexDirection={"row"}
            fillArea={true}
            height={"auto"}
            minHeight={"auto"}
            maxHeight={"100%"}
            width={"auto"}
            minWidth={"auto"}
            maxWidth={"100%"}
            padding={"0.25rem"}
            margin={"0.0rem"}
            border={"none"}
            borderRadius={"0%"}
            boxShadowEnabled={true}
            styles={{
                flexDirection: `${"column"}`,
                height: `100%`,
                width: `100%`,
                padding: `0.25rem 1.0rem`,
            }}>
            <SectionTitle title="Blog" scale={`3`}></SectionTitle>
            <SectionContent
                type={"default"}
                styles={{
                    display: `${"flex"}`,
                    flexDirection: `${"row"}`,
                    justifyContent: `${"center"}`,
                    alignItems: `${"center"}`,
                    alignContent: `${"center"}`,
                    height: `${"100%"}`,
                    minHeight: `${"auto"}`,
                    width: `${"100%"}`,
                    minWidth: `${"50%"}`,
                    padding: `0.25rem 1.0rem`,
                    border: `1px dashed black`,
                }}>
                <SectionPane
                    key={`section-pane-${"img-container"}`}
                    type={"default"}
                    styles={{
                        display: `${"flex"}`,
                        flexDirection: `${"column"}`,
                        justifyContent: `${"center"}`,
                        alignItems: `${"center"}`,
                        alignContent: `${"center"}`,
                        // justifyContent: `${"flex-start"}`,
                        // alignItems: `${"flex-start"}`,
                        // alignContent: `${"flex-start"}`,
                        height: `${"100%"}`,
                        minHeight: `${"100%"}`,
                        width: `${"auto"}`,
                        minWidth: `${"50%"}`,
                        // border: `1px solid white`,
                    }}>
                    <SectionImage
                        content={getProjectImages()}
                        type={"slideshow"}
                        key={`section-img-${""}`}
                        classes={`section-img-aside ${""}`}
                        containerStyles={{
                            height: `${"100%"}`,
                            minHeight: `${"100%"}`,
                            // width: `${"auto"}`,
                            width: `${"100%"}`,
                            minWidth: `${"50%"}`,
                            /// display: `${"flex"}`,
                            /// flexDirection: `${"column"}`,
                            /// justifyContent: `${"center"}`,
                            /// alignItems: `${"center"}`,
                            /// alignContent: `${"center"}`,
                            // verticalAlign: `top`,
                            // height: `100%`,
                            // width: `100%`,
                        }}
                        elementStyles={{
                            border: `1px solid green`,
                        }}></SectionImage>
                </SectionPane>
                <SectionPane
                    type={"default"}
                    styles={{
                        display: `${"flex"}`,
                        flexDirection: `${"column"}`,
                        justifyContent: `${"flex-start"}`,
                        alignItems: `${"center"}`,
                        alignContent: `${"center"}`,
                        // height: `100%`,
                        // width: `50%`,
                        height: `${"100%"}`,
                        minHeight: `${"100%"}`,
                        width: `${"auto"}`,
                        minWidth: `${"50%"}`,
                        padding: `0.25rem 1.0rem`,
                        border: `1px solid black`,
                    }}>
                    {isValidArray(about.description)
                        ? about.description.map((section, index) => {
                              return (
                                  <SectionText
                                      key={`section-text-${index}`}
                                      classes={`section-text ${
                                          [
                                              "text-highlightColor",
                                              "text-highlightColor2",
                                              "text-white",
                                          ][index % 3]
                                      }`}
                                      styles={{
                                          // display: `${"flex"}`,
                                          // flexDirection: `${"row"}`,
                                          // justifyContent: `${"flex-start"}`,
                                          // alignItems: `${"flex-start"}`,
                                          // alignContent: `${"flex-start"}`,
                                          verticalAlign: `top`,
                                          textAlign: `left`,
                                          // height: `100%`,
                                          // width: `100%`,
                                          // border: `1px solid green`,
                                      }}>
                                      {section}
                                  </SectionText>
                              );
                          })
                        : ""}
                </SectionPane>
            </SectionContent>
        </Section>
    );
}

export default Blog;

/*
            <SectionTitle title="Blog"></SectionTitle>
            <SectionContent>
                {isValidArray(about.description)
                    ? about.description.map((section, index) => {
                          return (
                              <div
                                  className={`section-text-container`}
                                  key={`about-section-description-${index}`}>
                                  <h1
                                      className={`section-text ${
                                          [
                                              "text-highlightColor",
                                              "text-highlightColor2",
                                              "text-white",
                                          ][index % 3]
                                      }`}>
                                      {section}
                                  </h1>
                              </div>
                          );
                      })
                    : ""}
            </SectionContent>
            <div className="flex-set">
                <div className="flex-col-shrink"></div>
                <div className="flex-col-shrink"></div>
            </div>
            <CellList
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
*/

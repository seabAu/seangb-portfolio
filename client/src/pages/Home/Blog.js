// This will eventually house blog posts populated by data stored in the database, but for now, it's a testing ground for Section and CardGrid components.

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Section from "../../components/Section";
import SectionContent from "../../components/Section/SectionContent";
import SectionImage from "../../components/Section/SectionImage";
import SectionPane from "../../components/Section/SectionPane";
import SectionText from "../../components/Section/SectionText";
import SectionTitle from "../../components/Section/SectionTitle";
import SectionCollection from "../../components/Section/SectionCollection";
import CellList from "../../components/Cell/CellList";
import * as utils from "../../components/Utilities/index.js";

/*  // Sample blog post layout:
    <Blog>
        <BlogTitle></BlogTitle>
        <BlogInfo></BlogInfo>
        <BlogContent>
            List all posts here.
            <BlogPostFilters />
            <BlogPosts>
                <BlogPost>
                    <BlogPostHeader>
                        <BlogPostControl>
                            <Fullscreen />
                            <ReturnHome />
                        </BlogPostControl>
                    </BlogPostHeader>
                    <BlogPostBody></BlogPostBody>
                    <BlogPostFooter>
                        <BlogPostControl>
                            <Edit />
                            <Delete />
                        </BlogPostControl>
                        <BlogPostInfo>
                            Date posted
                            Author
                        </BlogPostInfo>
                    </BlogPostFooter>
                </BlogPost>
            </BlogPosts>
        </BlogContent>
        <BlogControl>
            Create new posts here.
            <BlogForm>
                Title
                Author
                Tags
                Categories
                Content
                Context
                Meta
                ...etc
            </BlogForm>
        </BlogControl>
    </Blog>


    https://www.koyeb.com/tutorials/get-started-with-the-mern-stack-build-a-blog-with-mongodb-atlas
    <>
      <Container className="my-5 text-justified" style={{ maxWidth: '800px' }}>
        <h1>{post.title}</h1>
        <div className="text-secondary mb-4">{formatDate(post.createdAt)}</div>
        {post.tags?.map((tag) => <span>{tag} </span>)}
        <div className="h4 mt-5">{post.content}</div>
        <div className="text-secondary mb-5">- {post.author}</div>
        <div className="mb-5">
          <Link
            variant="primary"
            className=" btn btn-primary m-2"
            to={`/posts/${postId}/edit`}
          >
            Edit
          </Link>
          <Button variant="danger" onClick={deletePost}>Delete</Button>
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>&#8592; Back to Home</Link>
      </Container>
    </>
*/

function Blog() {
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
    const debug = false;
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
    // Hooks for skills cell list.
    useEffect(() => {
        // On load, get all skills listed, for the filters. Doing it other ways results in an infinite loop??
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

    const getDataList = (data, key = "") => {
        let list = [];
        if (utils.val.isValidArray(data, true)) {
            projects.forEach((item, index) => {
                if (utils.val.isObject(item)) {
                    let val = utils.ao.deepGetKey(item, key);
                    if (val && val !== "") {
                        list.push(val);
                    }
                }
            });
        }
        return list;
    };

    // Fetches specific keys from an object array.
    const extractDataList = (data, keys = []) => {
        let list = [];
        if (utils.val.isValidArray(data, true)) {
            // Run for each element in the array.
            data.forEach((item, index) => {
                if (utils.val.isObject(item)) {
                    // Run for each key given.
                    let res = {};
                    let skip = false;
                    keys.forEach((key, i) => {
                        let val = utils.ao.deepGetKey(item, key);
                        if (val && val !== "" && val !== "''") {
                            // && !isBlank(val)) {
                            res[key] = val;
                        } else {
                            skip = true;
                        }
                    });
                    if (!skip) {
                        list.push(res);
                    }
                    skip = false; // Reset skip temp value.
                }
            });
        }
        if(debug)console.log(
            "extractDataList :: data = ",
            data,
            " :: keys = ",
            keys,
            " :: list results = ",
            list,
        );
        return list;
    };

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    return (
        <>
            <Section
                showSection={true}
                showChildren={true}
                responsive={true}
                responsiveBreakpoints={768}
                // Style settings
                flexDirection={"row"}
                fillArea={true}
                height={"100%"}
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
                <SectionTitle title="Blog" scale={`3`}></SectionTitle>
                <SectionContent
                    type={"default"}
                    responsive={true}
                    responsiveBreakpoints={768}
                    styles={{}}>
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
                    <SectionPane
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
                        overflowX={`auto`}
                        overflowY={`auto`}
                        styles={
                            {
                                // border: `1px solid white`,
                            }
                        }>
                        {utils.val.isValidArray(about.description)
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
                                          styles={
                                              {
                                                  // border: `1px solid green`,
                                              }
                                          }>
                                          {section}
                                      </SectionText>
                                  );
                              })
                            : ""}
                    </SectionPane>
                </SectionContent>
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
                padding={"0.0rem"}
                margin={"0.0rem"}
                border={"none"}
                borderRadius={"0%"}
                boxShadowEnabled={true}
                styles={{}}>
                <SectionTitle
                    title="Blog Posts"
                    scale={`3`}></SectionTitle>
                <SectionContent
                    type={"default"}
                    responsive={true}
                    responsiveBreakpoints={768}
                    styles={{}}>
                    <SectionPane
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
                        // minWidth={"auto"}
                        // maxWidth={"100%"}
                        padding={"0.0rem"}
                        margin={"0.0rem"}
                        border={"none"}
                        borderRadius={"0%"}
                        boxShadowEnabled={false}
                        styles={{}}>
                        <SectionCollection
                            content={extractDataList(projects, [
                                "image",
                                "link",
                            ])}
                            datakeys={["image", "link"]}
                            data={projects}
                            type={`slideshow`}
                            key={`section-img-collection-mosaic`}
                            classes={`section-img-collection-mosaic`}
                            styles={{
                                border: `1px solid green`,
                            }}></SectionCollection>
                    </SectionPane>
                </SectionContent>
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
                <SectionContent
                    type={"default"}
                    responsive={true}
                    responsiveBreakpoints={768}
                    styles={{}}>
                    <SectionPane
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
                        // minWidth={"auto"}
                        // maxWidth={"100%"}
                        padding={"0.25rem 1.0rem"}
                        margin={"0.0rem"}
                        border={"none"}
                        borderRadius={"0%"}
                        boxShadowEnabled={false}
                        styles={{}}>
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
                    </SectionPane>
                </SectionContent>
            </Section>
        </>
    );
};
export default Blog;

/*

*/ 

/*
            <SectionTitle title="Blog"></SectionTitle>
            <SectionContent>
                {utils.val.isValidArray(about.description)
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

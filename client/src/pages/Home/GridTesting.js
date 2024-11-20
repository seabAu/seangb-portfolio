// This will eventually house blog posts populated by data stored in the database, but for now, it's a testing ground for Section and CardGrid components.

import React, { useState, useEffect } from "react";

// Redux state management
import { useDispatch, useSelector } from "react-redux";
import {
    SetDebug,
    SetLoading,
    SetPortfolioData,
    SetAppsData,
    SetBlogData,
    ReloadData,
} from "../../redux/rootSlice";
import API from "../../api/api.js";

// Components
import Loader from "../../components/Loader/Loader";


import Section from "../../components/Section";
import Tabs from "../../components/Tabs";
import * as utils from 'akashatools';
import Post from "../../components/Posts/index.js";
import Posts from "../../components/Posts/Posts";

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
    const dispatch = useDispatch();
    const {
        debug,
        loading,
        portfolioData,
        blogData,
        reloadData,
        loggedIn,
        // token,
        // role,
        user,
    } = useSelector((state) => state.root);

    const getPosts = async () => {
        try {
            dispatch(SetLoading(true));
            dispatch(ReloadData(false));
            const response = await API.get(`/api/blog/posts`)
                .then((res) => {
                    if ( debug ) 
                        console.log("Blog.js :: getPosts :: res = ", res);
                    dispatch(SetBlogData(res.data));

                    // Set reloadData flag false.
                    dispatch(ReloadData(false));
                })
                .catch((err) => {
                    if (debug) console.error(err);

                    // Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
                    dispatch(ReloadData(false));
                });

            // if ( debug ) console.log( response.data );
            dispatch(SetBlogData(response.data));
            // Set reloadData flag false.
            /// dispatch(ReloadData(false));
            dispatch(SetLoading(false));
        } catch (error) {
            dispatch(SetLoading(false));
        }
    };

    const { posts, about, projects } = portfolioData;
    // const { posts } = blogData;
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
    // Tracking the window size.
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [postsData, setPostsData] = useState();
    const [numPerPage, setNumPerPage] = useState(10);
    const [postIndex, setPostIndex] = useState(-1);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        // On initial mount, fetch posts.
        let postsTemp = getPosts();
        if ( debug ) console.log("Blog.js :: postsTemp: ", postsTemp);
    }, []);

    useEffect(() => {
        if ( debug ) console.log("Blog.js :: blogData: ", blogData);
    }, [blogData]);

    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

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

    const fetchPromise = (call, fetchOptions = {}) => {
        console.log("fetchPromise = ", call);
        return new Promise((resolve, reject) => {
            fetch(call, fetchOptions)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
        // return handleBasicFetch(call);
    };

    useEffect(() => {
        if (!posts && !utils.val.isValidArray(postsData, true)) {
            let call = `https://jsonplaceholder.typicode.com/posts${
                postIndex > -1 ? `/${postIndex}` : ""
            }`;
            let postList = [];
            try {
                Promise.resolve(fetchPromise(call))
                    .then((data) => {
                        postList = data;
                        console.log("posts = ", data);
                        if (utils.val.isValidArray(data, true)) {
                            setPostsData(data);
                        }
                    })
                    .then((data) => (postList = data))
                    .catch((error) =>
                        console.log(
                            "Blog :: getting posts onload :: Allsettled error: ",
                            error,
                        ),
                    );
                // .then(() => setIsLoading(false));
            } catch (error) {
                console.log("error: ", error);
            }
            if (utils.val.isValidArray(postList, true)) {
                setPostsData(postList);
            }
        }
    }, []);

    let defaultPost = {
        // Post content
        author: "",
        title: "",
        imageUrl: "",
        content: "",
        // Post Timestamps
        timestampPosted: Date.now(),
        timestampUpdated: Date.now(),
        // Allows for customized styling for specific posts, if provided.
        options: [],
        // Post categorization
        topic: "",
        categories: [],
        tags: [],
        // Post Interactions
        views: 0,
        comments: [],
        likes: 0,
        dislikes: 0,
    };

    return (
        <div className={`section-container`}>
            <Section.Text
                type="title"
                content="GridTesting"
                scale={`3xl`}
                separator={true}
            />
            {
                // posts && utils.val.isValidArray( posts, true ) && buildPosts()
                blogData && utils.val.isValidArray(blogData.posts, true) && (
                    <Posts
                        layout={`flex`}
                        dataModel={defaultPost}
                        data={blogData.posts}
                        // rowHeight={`300px`}
                        // colWidth={`400px`}
                        activeFocusIndex={-1}
                        gap={`0.5rem`}
                        margin={`0.0rem`}
                        padding={`0.0rem`}></Posts>
                )
            }
        </div>
    );
}
export default Blog;

/* 

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
        console.log(
            "extractDataList :: data = ",
            data,
            " :: keys = ",
            keys,
            " :: list results = ",
            list,
        );
        return list;
    };

    const getPosts2 = (call, fetchOptions = {}) => {
        return new Promise((resolve, reject) => {
            fetch(call, fetchOptions)
                .then((response) => response.json())
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
        // return handleBasicFetch(call);
    };

*/ 

/*
    const buildPosts = () => {
        // Fetch sample posts from jsonplaceholder for now.
        // getHeapCodeStatistics
        // console.log("Blog :: GetPosts :: posts = ", posts, postsPromises, res);
        console.log("Blog :: GetPosts :: posts = ", posts);
        let postCollection = [];
        if (utils.val.isValidArray(posts, true)) {
            posts.forEach((post, index) => {
                if ( utils.val.isObject( post ) )
                {
                    // console.log( "Post = ", post );
                    let keys = Object.keys(post);
                    if (keys.length > 0) {
                        // ( keys.contains( 'id' ) )
                        // ( keys.contains( 'title' ) )
                        // ( keys.contains( 'body' ) )
                        // ( keys.contains( 'userId' ) )
                        postCollection.push(
                            <Post
                                label={""}
                                name={""}
                                title={utils.ao.has(post, "title") ? post.title : ''}
                                layout={"column"}
                                alignContent={"center"}
                                padding={"0.5rem 1.0rem"}
                                // margin={"0.5rem 0.0rem"}
                                border={"none"}
                                borderRadius={"0%"}
                                boxShadowEnabled={ true }
                                opacity={`0.9`}
                                // Can import extra styles.
                                classes={""}
                                styles={{}}
                                debug={false}>
                                    {utils.ao.has(post, "title") ? (
                                        <Post.Text
                                            index={post.id ? post.id : 0}
                                            name={post.id ? post.id : 0}
                                            label={post.title}
                                            content={post.title}
                                            type={"title"}
                                            scale={`lg`}
                                            color={"text-highlightColor"}
                                            separator={true}
                                            style={{}}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {utils.ao.has(post, "body") ? (
                                        <Post.Text
                                            index={post.id ? post.id : 0}
                                            name={post.id ? post.id : 0}
                                            label={post.body}
                                            content={post.body}
                                            type={"text"}
                                            scale={`sm`}
                                            color={"text-white"}
                                            separator={false}
                                            style={{}}
                                        />
                                    ) : (
                                        <></>
                                    )}
                            </Post>,
                        );
                    }
                }
            });
        } 
        return postCollection;
    };

    return (
        <div className={`page-section-container`}>
            <SectionTitle title="Blog" scale={`3`}></SectionTitle>
            <div className={`blog-posts`}>
                {posts && ( // utils.val.isValidArray(posts, true) &&
                    <Posts
                        layout={`flex`}
                        // rowHeight={`300px`}
                        // colWidth={`400px`}
                        gap={`0.5rem`}
                        margin={`0.0rem`}
                        padding={`0.0rem`}>
                        {buildPosts()}
                    </Posts>
                )}
            </div>
        </div>
    );
*/
/*

    const buildPosts = async (post, page, numPerPage) => {
        // Fetch sample posts from jsonplaceholder for now.
        // getHeapCodeStatistics
        let call = `https://jsonplaceholder.typicode.com/posts${
            post ? `/${post}` : ""
        }`;
        let posts = [];
        // let postsCall = await fetch(call)
        //     .then( ( response ) =>
        //     {
        //         console.log( "Blog :: GetPosts :: res = ", response.json() );
        //         if ( response.status === 200 )
        //         {
        //             posts.push(response);
        //         }
        //         return response.json();
        //     })
        //     .then((json) => {
        //         console.log(json);
        //     } );
        let postsPromises = await getPosts( call );
        try {
            posts = await Promise.all( postsPromises )
                .then( ( data ) => (
                    // posts.push(data)
                    posts = data
                ))
                .catch((error) => console.log("Allsettled error: ", error));
        } catch ( error )
        {
            console.log( "error: ", error );
        }

        // console.log("Blog :: GetPosts :: posts = ", posts, postsPromises, res);
        console.log("Blog :: GetPosts :: posts = ", posts);
        let postCollection = [];
        if (utils.val.isValidArray(posts, true)) {
            posts.forEach((post, index) => {
                if ( utils.val.isObject( post ) )
                {
                    // console.log( "Post = ", post );
                    let keys = Object.keys(post);
                    if (keys.length > 0) {
                        // ( keys.contains( 'id' ) )
                        // ( keys.contains( 'title' ) )
                        // ( keys.contains( 'body' ) )
                        // ( keys.contains( 'userId' ) )
                        postCollection.push(
                            <Post
                                label={""}
                                name={""}
                                layout={"column"}
                                alignContent={"center"}
                                padding={"0.25rem 1.0rem"}
                                margin={"0.0rem"}
                                border={"none"}
                                borderRadius={"0%"}
                                boxShadowEnabled={true}
                                // Can import extra styles.
                                classes={""}
                                styles={{}}
                                debug={false}>
                                {utils.ao.has(post, "title") ? (
                                    <Post.Content
                                        index={post.id ? post.id : 0}
                                        name={post.id ? post.id : 0}
                                        label={post.title}
                                        type={"title"}
                                        scale={3}
                                        color={"text-highlightColor"}
                                        separator={true}
                                        style={{}}
                                    />
                                ) : (
                                    <></>
                                )}
                                {utils.ao.has(post, "body") ? (
                                    <Post.Content
                                        index={post.id ? post.id : 0}
                                        name={post.id ? post.id : 0}
                                        label={post.body}
                                        type={"text"}
                                        scale={3}
                                        color={"text-white"}
                                        separator={false}
                                        style={{}}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Post>,
                        );
                    }
                }
            });
        }
        return postCollection;
    };

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

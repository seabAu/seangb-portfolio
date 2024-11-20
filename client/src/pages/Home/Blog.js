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
import API from "../../lib/services/api.js";

// Components
import Loader from "../../components/Loader/Loader";


import Section from "../../components/Section";
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

function Blog () {
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
    } = useSelector( ( state ) => state.root );

    const getPosts = async () => {
        try {
            dispatch( SetLoading( true ) );
            dispatch( ReloadData( false ) );
            const response = await API.get( `/api/blog/posts` )
                .then( ( res ) => {
                    if ( debug )
                        console.log( "Blog.js :: getPosts :: res = ", res );
                    dispatch( SetBlogData( res.data ) );

                    // Set reloadData flag false.
                    dispatch( ReloadData( false ) );
                } )
                .catch( ( err ) => {
                    if ( debug ) console.error( err );

                    // Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
                    dispatch( ReloadData( false ) );
                } );

            // if ( debug ) console.log( response.data );
            dispatch( SetBlogData( response.data ) );
            // Set reloadData flag false.
            /// dispatch(ReloadData(false));
            dispatch( SetLoading( false ) );
        } catch ( error ) {
            dispatch( SetLoading( false ) );
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
    const [ skillsList, setSkillsList ] = useState( [] );
    const [ skillCategories, setSkillCategories ] = useState( [] );
    const [ skillCategoryFilter, setSkillCategoryFilter ] = useState( [] );
    // Tracking the window size.
    const [ width, setWidth ] = useState( window.innerWidth );
    const [ height, setHeight ] = useState( window.innerHeight );
    const [ postsData, setPostsData ] = useState();
    const [ numPerPage, setNumPerPage ] = useState( 10 );
    const [ postIndex, setPostIndex ] = useState( -1 );
    const updateDimensions = () => {
        setWidth( window.innerWidth );
        setHeight( window.innerHeight );
    };
    useEffect( () => {
        // On initial mount, fetch posts.
        let postsTemp = getPosts();
        if ( debug ) console.log( "Blog.js :: postsTemp: ", postsTemp );
    }, [] );

    useEffect( () => {
        if ( debug ) console.log( "Blog.js :: blogData: ", blogData );
    }, [ blogData ] );

    useEffect( () => {
        window.addEventListener( "resize", updateDimensions );
        return () => window.removeEventListener( "resize", updateDimensions );
    }, [] );

    useEffect( () => {
        // On load, get all skills listed, for the filters. Doing it other ways results in an infinite loop??
        if ( utils.val.isValidArray( skills ) ) {
            // Case of being given all projects.
            let s = [];
            let names = [];
            let categories = [];
            skills.forEach( ( skill ) => {
                if ( utils.ao.has( skill, "name" ) ) {
                    if ( !names.includes( skill.name ) ) {
                        if ( !categories.includes( skill.category ) ) {
                            categories.push( skill.category );
                        }
                        names.push( skill.name );
                        s.push( skill );
                    }
                }
            } );
            if ( s ) {
                setSkillsList( s );
            }
            if ( categories ) {
                setSkillCategories( categories );
            }
        }
    }, [] );

    const fetchPromise = ( call, fetchOptions = {} ) => {
        if ( debug ) console.log( "fetchPromise = ", call );
        return new Promise( ( resolve, reject ) => {
            fetch( call, fetchOptions )
                .then( ( response ) => response.json() )
                .then( ( data ) => resolve( data ) )
                .catch( ( error ) => reject( error ) );
        } );
        // return handleBasicFetch(call);
    };

    useEffect( () => {
        if ( !posts && !utils.val.isValidArray( postsData, true ) ) {
            let call = `https://jsonplaceholder.typicode.com/posts${ postIndex > -1 ? `/${ postIndex }` : ""
                }`;
            let postList = [];
            try {
                Promise.resolve( fetchPromise( call ) )
                    .then( ( data ) => {
                        postList = data;
                        if ( debug ) console.log( "posts = ", data );
                        if ( utils.val.isValidArray( data, true ) ) {
                            setPostsData( data );
                        }
                    } )
                    .then( ( data ) => ( postList = data ) )
                    .catch( ( error ) => {
                        if ( debug )
                            console.log(
                                "Blog :: getting posts onload :: Allsettled error: ",
                                error,
                            );
                    }
                    );
                // .then(() => setIsLoading(false));
            } catch ( error ) {
                if ( debug ) console.log( "error: ", error );
            }
            if ( utils.val.isValidArray( postList, true ) ) {
                setPostsData( postList );
            }
        }
    }, [] );

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
        <Section>
            <Section.Text
                type="title"
                content="Blog"
                // scale={ `3xl` }
                classes={ 'text-3xl' }
                separator={ true }
            />
            {
                // posts && utils.val.isValidArray( posts, true ) && buildPosts()
                blogData && utils.val.isValidArray( blogData.posts, true ) && (
                    <Posts
                        layout={ `flex` }
                        dataModel={ defaultPost }
                        data={ blogData.posts }
                        // rowHeight={`300px`}
                        // colWidth={`400px`}
                        activeFocusIndex={ -1 }
                        gap={ `0.5rem` }
                        margin={ `0.0rem` }
                        padding={ `0.0rem` }></Posts>
                )
            }
        </Section>
    );
}
export default Blog;

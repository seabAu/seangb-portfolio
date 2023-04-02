// Import system stuff
import React from "react";
import { useSelector } from "react-redux";

// Import components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
// import { Tabs } from "antd";
import Tabs from "../../components/Tabs/Tabs";
import Blog from "./Blog";

// Import UI components
// import 'bootstrap/dist/css/bootstrap.css';

function Home() {
    const { portfolioData } = useSelector((state) => state.root);
    const items = [
        {
            key: "1",
            label: `About`,
            children: <About />,
        },
        {
            key: "2",
            label: `Projects`,
            children: <Projects />,
        },
        {
            key: "3",
            label: `Experience`,
            children: <Experiences />,
        },
        {
            key: "4",
            label: `Education`,
            children: <Education />,
        },
        {
            key: "5",
            label: `Contact`,
            children: <Contact />,
        },
    ];
    
    return (
        portfolioData && (
            <div className="page-container">
                <Header></Header>
                <div className="page-content">
                    <Tabs
                        defaultActiveKey="2"
                        items={items}
                        tabPosition={"top"}
                        size={"large"}
                        style={{ margin: 4 }}
                        type="top"
                        centered={true}
                        padContent={false}
                        fillArea={true}
                        roundedNav={false}
                        contentBoxShadow={false}
                        navBoxShadow={false}
                        // onChange={onChange}
                    >
                        {
                            /*  FUTURE PAGES
                                - Blog
                                - Tutorials
                                - Tools & Other Resources
                                - Ask Me Anything
                                    -> Very similar to Contact page, except it will post the messages directly to the front end page, and I will be able to post responses to them.
                                    -> For obvious reasons, i'll include a feature to remove inappropriate questions. 
                                - Updates

                                Beyond its initial release as a portfolio site, my end goal is to have a personal site that doubles as a portfolio-serving front page. To do that, it should include various features that are worth me checking in on the site every day, such as a weight and exercise tracker, message board, a blog, etc. 
                            */
                        }
                        <div className="tab-item" label="About" enabled={true}>
                            <About />
                        </div>
                        <div className="tab-item" label="Projects" enabled={true}>
                            <Projects />
                        </div>
                        <div className="tab-item" label="Experience" enabled={true}>
                            <Experiences />
                        </div>
                        <div className="tab-item" label="Education" enabled={true}>
                            <Education />
                        </div>
                        <div className="tab-item" label="Blog" enabled={false}>
                            <Blog />
                        </div>
                        <div className="tab-item" label="Contact" enabled={true}>
                            <Contact />
                        </div>
                    </Tabs>
                </div>
                <Footer></Footer>
            </div>
        )
    );
}

export default Home;

/*
    return (
        <div>
            {portfolioData && (
                <div className="page-container">
                    <Header></Header>
                    <div className="page-content">
                        <div className="portfolio-tabs-bar ">
                            <Tabs
                                defaultActiveKey="2"
                                items={items}
                                tabPosition={"top"}
                                type="card"
                                size={"large"}
                                style={{ margin: 10 }}
                                // onChange={onChange}
                            />
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </div>
    );

        <div className="">
            {portfolioData && (
                <div className="page-container">
                    <Header></Header>
                    <div className="page-content px-20 sm:px-5 ">
                        <div className="portfolio-tabs-bar ">
                            <Tabs
                                defaultActiveKey="1"
                                items={items}
                                tabPosition={"top"}
                                type="card"
                                size={"large"}
                                style={{ margin: 10 }}
                                // onChange={onChange}
                            />
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </div>
*/

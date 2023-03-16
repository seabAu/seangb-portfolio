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
import { arrayIsValid, has } from "../../components/Utilities/AO";

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
        <>
            {portfolioData && (
                <div className="page-container">
                    <Header></Header>
                    <div className="page-content">
                        <Tabs
                            defaultActiveKey="2"
                            items={items}
                            tabPosition={"top"}
                            size={"large"}
                            style={{ margin: 10 }}
                            type="top"
                            centered={true}
                            padContent={false}
                            fillArea={true}
                            roundedNav={false}
                            contentBoxShadow={false}
                            navBoxShadow={false}
                            // onChange={onChange}
                        >
                            <div className="tab-item" label="About" key="1">
                                <About />
                            </div>
                            <div className="tab-item" label="Projects" key="2">
                                <Projects />
                            </div>
                            <div
                                className="tab-item"
                                label="Experience"
                                key="3">
                                <Experiences />
                            </div>
                            <div className="tab-item" label="Education" key="4">
                                <Education />
                            </div>
                            <div className="tab-item" label="Contact" key="5">
                                <Contact />
                            </div>
                        </Tabs>
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </>
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

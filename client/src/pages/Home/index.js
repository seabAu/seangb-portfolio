// Import system stuff
import React from "react";
import { useSelector } from "react-redux";

// Import components
// import { Tabs } from "antd";
import Tabs from "../../components/Tabs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Education from "./Education";
import Contact from "./Contact";
import Blog from "./Blog";
import Tools from "./Tools";
import AMA from "./AMA";

// Import UI components
// import 'bootstrap/dist/css/bootstrap.css';

function Home() {
    const { portfolioData } = useSelector((state) => state.root);
    const items = [
        {
            key: "1",
            label: `About`,
            children: <About />,
            enabled: true,
        },
        {
            key: "2",
            label: `Projects`,
            children: <Projects />,
            enabled: true,
        },
        {
            key: "3",
            label: `Experiences`,
            children: <Experiences />,
            enabled: true,
        },
        {
            key: "4",
            label: `Education`,
            children: <Education />,
            enabled: true,
        },
        {
            key: "5",
            label: `Blog`,
            children: <Blog />,
            enabled: false,
        },
        {
            key: "6",
            label: `Tools`,
            children: <Tools />,
            enabled: false,
        },
        {
            key: "7",
            label: `AMA`,
            children: <AMA />,
            enabled: false,
        },
        {
            key: "8",
            label: `Contact`,
            children: <Contact />,
            enabled: true,
        },
    ];

    return (
		portfolioData && (
			<div className="page-container">
				<Header></Header>
				<div className="page-content">
					<Tabs
						defaultActiveKey="5"
						items={items}
						tabPosition={"top"}
						size={"large"}
						styles={{ margin: 1 }}
						type="top"
						centered={true}
						padContent={true}
						fillArea={false}
						roundedNav={false}
						contentBoxShadow={false}
						navBoxShadow={false}
						// onChange={onChange}
					>
						{/*  FUTURE PAGES
                                - Blog
                                - Tutorials
                                - Tools & Other Resources
                                - Ask Me Anything
                                    -> Very similar to Contact page, except it will post the messages directly to the front end page, and I will be able to post responses to them.
                                    -> For obvious reasons, i'll include a feature to remove inappropriate questions. 
                                - Updates

                                Beyond its initial release as a portfolio site, my end goal is to have a personal site that doubles as a portfolio-serving front page. To do that, it should include various features that are worth me checking in on the site every day, such as a weight and exercise tracker, message board, a blog, etc. 
                            */}
						{/*
                        <div
                            className="tab-item"
                            label="About"
                            enabled={true}>
                            <About />
                        </div>
                        <div
                            className="tab-item"
                            label="Projects"
                            enabled={true}
                            access={"*"}>
                            <Projects />
                        </div>
                        <div
                            className="tab-item"
                            label="Experience"
                            enabled={true}
                            access={"*"}>
                            <Experiences />
                        </div>
                        <div
                            className="tab-item"
                            label="Education"
                            enabled={true}
                            access={"*"}>
                            <Education />
                        </div>
                        <div
                            className="tab-item"
                            label="Blog"
                            enabled={true}
                            access={"admin"}>
                            <Blog />
                        </div>
                        <div
                            className="tab-item"
                            label="Tools"
                            enabled={true}
                            access={"admin"}>
                            <Tools />
                        </div>
                        <div
                            className="tab-item"
                            label="AMA"
                            enabled={true}
                            access={"admin"}>
                            <AMA />
                        </div>
                        <div
                            className="tab-item"
                            label="Contact"
                            enabled={true}
                            access={"*"}>
                            <Contact />
                        </div>
                        */}
					</Tabs>
				</div>
				<Footer></Footer>
			</div>
		)
	);
}

export default Home;

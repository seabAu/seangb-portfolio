// Import system stuff
import React from "react";
import { useSelector } from "react-redux";

// Import components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Intro from "./Intro";
import Tabs from "../../components/Tabs/Tabs";

// Import UI components

function Landing() {
    const { portfolioData } = useSelector((state) => state.root);
    return (
        <>
            {portfolioData && (
                <div className="page-container">
                    <Header></Header>
                    <div className="page-content">
                        <Intro />
                    </div>
                    <Footer></Footer>
                </div>
            )}
        </>
    );
}

export default Landing;

/*

                <div className="px-20 sm:px-5 ">
                    <Intro></Intro>
                    <About></About>
                    <Experiences></Experiences>
                    <Projects></Projects>
                    <Courses></Courses>
                    <Contact></Contact>
                    <Footer></Footer>
                    <SocialIcons></SocialIcons>
                </div>
*/

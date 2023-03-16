import React, { useEffect } from "react";
import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import AdminEducations from "./AdminEducations";
import AdminProjects from "./AdminProjects";
import AdminExperiences from "./AdminExperiences";
import AdminContact from "./AdminContact";
import { useSelector } from "react-redux";

// Ant components
// import { Tabs } from "antd";
import Tabs from "../../components/Tabs/Tabs";
import AdminMessages from "./AdminMessages";
import SectionTitle from "../../components/SectionTitle";
// import { TabsProps } from "antd";
// const { TabPane } = Tabs;

function Admin() {
    const { portfolioData } = useSelector( ( state ) => state.root );
    
    // Make sure a visitor is successfully logged in before letting them access any page other than "/admin-login".
    useEffect( () =>
    {
        if ( !localStorage.getItem( "token" ) )
        {
            window.location.href = "/admin-login";
        }
    }, [] );

    const items = [
        {
            key: "1",
            label: `Intro`,
            children: <AdminIntro />,
        },
        {
            key: "2",
            label: `About`,
            children: <AdminAbout />,
        },
        {
            key: "3",
            label: `Experiences`,
            children: <AdminExperiences />,
        },
        {
            key: "4",
            label: `Projects`,
            children: <AdminProjects />,
        },
        {
            key: "5",
            label: `Education`,
            children: <AdminEducations />,
        },
        {
            key: "6",
            label: `Contact`,
            children: <AdminContact />,
        },
        {
            key: "7",
            label: `Messages`,
            children: <AdminMessages />,
        },
    ];

    return (
        <div className="page-container">
            <Header></Header>
            <div className="admin-page-content-header">
                <SectionTitle
                    title="Portfolio Admin Panel"
                    scale="1"></SectionTitle>
            </div>
            {portfolioData && (
                <div className="admin-page-content">
                    <div className="admin-tabs-bar">
                        <Tabs
                            defaultActiveKey="2"
                            items={items}
                            type="left"
                            centered={true}
                            padContent={true}
                            fillArea={true}
                            roundedNav={false}
                            contentBoxShadow={true}
                            navBoxShadow={true}
                            // onChange={onChange}
                        >
                            <div className="tab-item" label="Intro" key="1">
                                <AdminIntro />
                            </div>
                            <div className="tab-item" label="About" key="2">
                                <AdminAbout />
                            </div>
                            <div
                                className="tab-item"
                                label="Experiences"
                                key="3">
                                <AdminExperiences />
                            </div>
                            <div className="tab-item" label="Projects" key="4">
                                <AdminProjects />
                            </div>
                            <div className="tab-item" label="Education" key="5">
                                <AdminEducations />
                            </div>
                            <div className="tab-item" label="Messages" key="6">
                                <AdminMessages />
                            </div>
                        </Tabs>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;

/*

    return (
        <div className="">
            <Header></Header>
            <div className="admin-page-content-header">
                    <SectionTitle
                        title="Portfolio Admin Panel"
                        scale="1"></SectionTitle>
            </div>
            {portfolioData && (
                <div className="admin-page-content">
                    <div className="admin-tabs-bar">
                        <Tabs
                            defaultActiveKey="1"
                            items={items}
                            tabPosition={"left"}
                            type="card"
                            size={"small"}
                            style={{ margin: 0 }}
                            // onChange={onChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
*/
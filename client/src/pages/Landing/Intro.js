import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { FaPowerOff } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as utils from "../../utilities/index.js";
import TextCarousel from "../../components/Carousel/index.js";

function Intro() {
    const navigate = useNavigate();
    const { loading, portfolioData, debug } = useSelector((state) => state.root);
    // Destructure data.
    const { intro, about } = portfolioData;

    const [ skills, setSkills ] = useState([]);

    const renderSkillsCarousel = () =>
    {
        let elements = [];
        if ( about )
        {
            // About data is loaded, get skills list.
            if ( utils.val.isValidArray( about.skills, true ) )
            {
                // Skills list present. 
                let skillList = [ ...about.skills ];
                
                // Filter out any disabled projects.
                skillList = skillList.filter( ( skill ) =>
                {
                    return ( skill.enabled === true );
                } );

                let skillNames = skillList.map( ( skill ) => { return skill.name; } );
                if ( debug ) console.log( skillNames );
                // return <TextCarousel items={skillNames} num={8}/>
    			skillNames.forEach((skill) => {
                    elements.push(
                        <div className="skill-marquee-item">
                            { skill }
                        </div>
                    );
    			});
            }
        }
        return (
            <div className="skill-marquee" style={{
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
            }}>
                { elements }
            </div>
        );
    }

    return (
        <div className=" bg-secondary px-10 flex flex-col items-start justify-start gap-8 py-10">

            <h1 className="text-white">{ intro.welcomeText || "" }</h1>
            
            <h1 className="text-5xl sm:text-3xl text-highlightColor font-semibold">
                {intro.firstName || ""} {intro.lastName || ""}
            </h1>

            <h1 className="text-3xl sm:text-2xl text-highlightColor2 font-semibold">{ intro.caption || "" }</h1>
            
            <p className="text-white w-3/5">{ intro.description || "" }</p>

            <p className="text-white w-3/5">{ `To learn more, press "Get Started" to see what I can bring to the table.` }</p>
            <p className="text-gray w-3/5 text-med sm:text-sm ">{ `If you wish to explore this site's extensive back-end dashboard, you may make an account by pressing "Log In" in the top right corner. This will never ask for personal information. To send me a message, you can click on Get Started, then enter the Contact Me tab. Happy exploring!` }</p>
            
            <div className="skill-marquee-container">
                {
                    // renderSkillsCarousel()
                }
            </div>

            
            <Button
                id={`landing-page-nav-button`}
                icon={<FaPowerOff className={`button-text button-icon`} />}
                label={`Get Started`}
                appearance={`glassmorphic`}
                onClick={(e) => {
                    navigate("/portfolio");
                } }></Button>
            
        </div>
    );
}

export default Intro;

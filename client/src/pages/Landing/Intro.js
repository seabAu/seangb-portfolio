import React from "react";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import { FaPowerOff } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Intro() {
    const navigate = useNavigate();
    const { loading, portfolioData } = useSelector((state) => state.root);
    // Destructure data.
    const { intro } = portfolioData;
    return (
        <div className=" bg-secondary px-10 flex flex-col items-start justify-start gap-8 py-10">
            <h1 className="text-white">{intro.welcomeText || ""}</h1>
            <h1 className="text-5xl sm:text-3xl text-highlightColor font-semibold">
                {intro.firstName || ""} {intro.lastName || ""}
            </h1>
            <h1 className="text-3xl sm:text-2xl text-highlightColor2 font-semibold">{intro.caption || ""}</h1>
            <p className="text-white w-3/5">{intro.description || ""}</p>
            <Button
                id={`landing-page-nav-button`}
                icon={<FaPowerOff className={`button-text button-icon`} />}
                label={`Get Started`}
                appearance={`neumorphic`}
                onClick={(e) => {
                    /// window.location.href = "/portfolio";
                    navigate("/portfolio");
                }}></Button>
        </div>
    );
}

export default Intro;

/*
            <button className="border-2 border-tertiary text-white px-10 py-5">
                Get Started
            </button>
*/

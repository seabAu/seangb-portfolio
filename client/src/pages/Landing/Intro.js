import React from "react";
import { useSelector } from "react-redux";

function Intro() {
    const { loading, portfolioData } = useSelector((state) => state.root);
    // Destructure data.
    const { intro } = portfolioData;
    const { firstName, lastName, welcomeText, description, caption } = intro; // intros[0]
    return (
        <div className=" bg-secondary px-10 flex flex-col items-start justify-start gap-8 py-10">
            <h1 className="text-white">{intro.welcomeText || ""}</h1>
            <h1 className="text-5xl sm:text-3xl text-highlightColor font-semibold">
                {intro.firstName || ""} {intro.lastName || ""}
            </h1>
            <h1 className="text-3xl sm:text-2xl text-highlightColor2 font-semibold">
                {intro.caption || ""}
            </h1>
            <p className="text-white w-3/5">{intro.description || ""}</p>

            <button
                className="button button-big"
                onClick={() => {
                    window.location.href = "/portfolio";
                }}>
                Get Started
            </button>
        </div>
    );
}

export default Intro;

/*
            <button className="border-2 border-tertiary text-white px-10 py-5">
                Get Started
            </button>
*/

// Redux state management
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
    SetDebug,
    SetLoading,
    SetPortfolioData,
    ReloadData,
    // SetRole,
    // SetToken,
    SetLoggedIn,
    SetUser,
} from "../../redux/rootSlice";

import API from "../../lib/services/api";

export const usePortfolio = () => {
    const dispatch = useDispatch();
    const {
        debug,
        loading,
        portfolioData,
        blogData,
        appsData,
        reloadData,
        loggedIn,
        user,
    } = useSelector( ( state ) => state.root );

    const getPortfolioData = async () => {
        try {
            dispatch( SetLoading( true ) );
            dispatch( ReloadData( false ) );
            const response = await API.get( `/api/portfolio/get-portfolio-data` )
                .then( ( res ) => {
                    if ( debug )
                        console.log(
                            "App.js :: getPortfolioData :: res = ",
                            res,
                        );
                    dispatch( SetPortfolioData( res.data ) );

                    // Set reloadData flag false.
                    dispatch( ReloadData( false ) );
                } )
                .catch( ( err ) => {
                    if ( debug ) console.error( err );

                    // Set reloadData flag false. Again. JUST IN CASE. This causes infinite loops very easily.
                    dispatch( ReloadData( false ) );
                } );

            // console.log( response.data );
            dispatch( SetPortfolioData( response.data ) );
            // Set reloadData flag false.
            /// dispatch(ReloadData(false));
            dispatch( SetLoading( false ) );
        } catch ( error ) {
            dispatch( SetLoading( false ) );
        }
    };

    return ( {
        getPortfolioData
    } );
};


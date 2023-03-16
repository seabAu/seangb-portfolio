import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
    name: "root",
    initialState: {
        loading: false,
        portfolioData: null,
        reloadData: false,
        loggedIn: false,
        userData: null,
    },
    reducers: {
        SetLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        SetUserData: (state, action) => {
            state.userData = action.payload;
        },
        SetLoading: (state, action) => {
            state.loading = action.payload;
        },
        SetPortfolioData: (state, action) => {
            state.portfolioData = action.payload;
        },
        ReloadData: (state, action) => {
            state.reloadData = action.payload;
        },
    },
});

export default rootSlice.reducer;
export const { ShowLoading, HideLoading, SetLoading, SetPortfolioData, ReloadData } =
    rootSlice.actions;
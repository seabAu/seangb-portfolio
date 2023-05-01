import { createSlice } from "@reduxjs/toolkit";
const rootSlice = createSlice({
	name: "root",
	initialState: {
		debug: false,
		loading: false,
		portfolioData: null,
		blogData: null,
		appsData: null,
		reloadData: false,
		loggedIn: false,
		user: {
			auth: false,
			role: "guest",
			token: "",
		},
		dataSchema: null,
		// {
        //     blog: {},
        //     planner: {},
        //     portfolioData: {},
        //     user: {},
        // },
	},
	reducers: {
		SetDebug: (state, action) => {
			// Boolean.
			// Toggles whether or not debug messages come through to the console, or via messages (via ANTD) in the window.
			state.debug = action.payload;
		},
		SetLoading: (state, action) => {
			// Boolean.
			// Toggles loading screen on or off.
			state.loading = action.payload;
		},
		SetDataSchema: (state, action) => {
			// Array.
			// Cached schema data.
			state.dataSchema = action.payload;
		},
		SetPortfolioData: (state, action) => {
			// Array.
			// Cached portfolio data.
			state.portfolioData = action.payload;
		},
		ReloadData: (state, action) => {
			// Boolean.
			// Handles triggering a new call to the API to get the latest data.
			// Triggered by form submissions if the data has anything to do with the portfolio data.
			// It is important to turn this back to FALSE immediately after sending the API call, so it doesn't loop endlessly if the call returns an error.
			state.reloadData = action.payload;
		},
		SetUser: (state, action) => {
			// Array.
			// Keeps track of the user's data if they are logged in.
			// If they are not logged in, this will be null.
			state.user = action.payload;
		},
		SetLoggedIn: (state, action) => {
			// Boolean.
			// Keeps track of whether or not the user is logged in or not.
			state.loggedIn = action.payload;
		},
		SetBlogData: (state, action) => {
			// Array.
			// Cached blog posts data.
			state.blogData = action.payload;
		},
		SetAppsData: (state, action) => {
			// Array.
			// Cached blog posts data.
			state.appsData = action.payload;
		},
	},
});

export default rootSlice.reducer;
export const {
    SetDebug,
    SetLoading,
    ReloadData,
    SetPortfolioData,
    SetDataSchema,
    SetBlogData,
    SetAppsData,
    SetUser,
    SetLoggedIn,
} = rootSlice.actions;

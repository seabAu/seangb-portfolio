import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import axios from "axios";
import API from "../../lib/services/api.js";
import * as utils from 'akashatools';

// Redux state management
import {
	SetLoading,
	// SetPortfolioData,
	// ReloadData,
	// SetRole,
	// SetToken,
	SetLoggedIn,
	SetUser,
} from "../../redux/rootSlice";
import Input from "../../components/Form/Input.js";
import Button from "../../components/Button/index.js";
import Header from "../../components/Header/index.js";

function Login () {
	// const { loading, portfolioData, reloadData, loggedIn, token, role } = useSelector((state) => state.root);
	const {
		debug,
		loading,
		portfolioData,
		reloadData,
		loggedIn,
		// token,
		// role,
		user,
	} = useSelector( ( state ) => state.root );

	const [ credentials, setCredentials ] = React.useState( {
		username: "",
		password: "",
		email: "",
		display_name: "",
	} );
	const [ mode, setMode ] = React.useState( "login" );

	// const [ dispatch, setDispatch ] = React.useState( null );
	const dispatch = useDispatch();
	const login = async () => {
		try {
			dispatch( SetLoading( true ) );
			// const response = await API.post( "/api/users/login", // user
			const response = await API.post(
				"/api/users/auth", // user
				{
					username: credentials.username,
					password: credentials.password,
				},
			);
			dispatch( SetLoading( false ) );
			if ( debug )
				console.log( "Login.js :: login :: response = ", response );
			if ( response.data.success ) {
				// Successfully logged in.
				message.success( response.data.message );
				let token = utils.ao.deepGetKey( response.data, "token" );
				let role = utils.ao.deepGetKey( response.data, "role" );
				let userdata = utils.ao.deepGetKey( response.data, "user" );
				localStorage.setItem(
					"token",
					token,
				);
				if ( debug )
					console.log(
						"Login.js :: login :: token = ",
						token,
						", role = ",
						role,
						", userdata = ",
						userdata,
					);
				dispatch( SetLoggedIn( true ) );
				// dispatch(SetRole(role));
				// dispatch( SetToken( token ) );
				dispatch( SetUser( userdata ) );
				// Check the role of the user. If guest, return to /portfolio. If admin, send to /admin.
				if ( debug )
					console.log(
						"Login.js :: login :: token = ",
						token,
						", role = ",
						role,
						", user = ",
						user,
					);
				if ( role ) {
					// Handle routing based on role permissions.
					if ( role === "guest" ) {
						window.location.href = "/portfolio";
					} else if ( role === "admin" ) {
						window.location.href = "/admin";
					} else {
						window.location.href = "/";
					}
				} else {
					window.location.href = "/";
				}
			} else {
				// Failed to log in. Return to homepage.
				message.error( response.data.message );
				window.location.href = "/";
			}
		} catch ( error ) {
			message.error( error.message );
			dispatch( SetLoading( false ) );
		}
	};

	const signup = async () => {
		try {
			dispatch( SetLoading( true ) );
			const response = await API.post(
				"/api/users/signup", // user
				{
					username: credentials.username,
					password: credentials.password,
					email: credentials.email,
					display_name: credentials.display_name,
				},
			);
			dispatch( SetLoading( false ) );
			if ( debug )
				console.log( "Login.js :: signup :: response = ", response );
			if ( response.data.success ) {
				// Successfully logged in.
				// Retrieve the token.
				message.success( response.data.message );
				// localStorage.setItem("token", JSON.stringify(response.message));
				// window.location.href = "/admin";
				login();
			} else {
				// Failed to log in. Return to homepage.
				message.error( response.data.message );
				// window.location.href = "/";
			}
		} catch ( error ) {
			message.error( error.message );
			dispatch( SetLoading( false ) );
		}
	};

	return (
		<div className="page-content">
			<div className="admin-login-container flex justify-center items-center h-screen">
				{ mode === "login" && (
					<div className="admin-login-card w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 text-white bg-tertiary">
						<h1 className="text-2xl">Login</h1>
						<hr />
						<Input.Group
							model={ [
								{
									name: `username`,
									label: `Username`,
									type: `text`,
									layout: `inline`,
									inputProps: {
										value: credentials.username,
										placeholder: `Username`,
									},
									onChange: ( e ) =>
										setCredentials( {
											...credentials,
											username: e.target.value,
										} ),
								},
								{
									name: `password`,
									label: `Password`,
									type: `password`,
									layout: `inline`,
									inputProps: {
										value: credentials.password,
										placeholder: `Password`,
									},
									onChange: ( e ) =>
										setCredentials( {
											...credentials,
											password: e.target.value,
										} ),
								},
							] }></Input.Group>
						<div className="button-rows">
							<Button
								classes={ `button admin-button admin-button-red` }
								label={ `Sign In` }
								onClick={ login }
							/>
							<Button
								classes={ `button admin-button admin-button-primary` }
								label={ `Sign Up` }
								onClick={ () => {
									setMode( "signup" );
								} }
								appearance={ 'console' }
							/>
						</div>
					</div>
				) }
				{ mode === "signup" && (
					<div className="admin-login-card w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 text-white bg-tertiary">
						<h1 className="text-2xl">Sign Up</h1>
						<hr />
						<Input.Group
							model={ [
								{
									name: `username`,
									label: `Username`,
									type: `text`,
									layout: `inline`,
									inputProps: {
										value: credentials.username,
										placeholder: `Username`,
									},
									onChange: ( e ) =>
										setCredentials( {
											...credentials,
											username: e.target.value,
										} ),
								},
								{
									name: `password`,
									label: `Password`,
									type: `password`,
									layout: `inline`,
									inputProps: {
										value: credentials.password,
										placeholder: `Password`,
									},
									onChange: ( e ) =>
										setCredentials( {
											...credentials,
											password: e.target.value,
										} ),
								},
								{
									name: `display_name`,
									label: `Display Name`,
									type: `text`,
									layout: `inline`,
									inputProps: {
										value: credentials.display_name,
										placeholder: `Display Name`,
									},
									onChange: ( e ) =>
										setCredentials( {
											...credentials,
											display_name: e.target.value,
										} ),
								},
								{
									name: `email`,
									label: `Email`,
									type: `text`,
									layout: `inline`,
									inputProps: {
										value: credentials.email,
										placeholder: `Email`,
									},
									onChange: ( e ) =>
										setCredentials( {
											...credentials,
											email: e.target.value,
										} ),
								},
							] }></Input.Group>
						<div className="button-rows">
							<Button
								classes={ `button admin-button admin-button-primary` }
								label={ `Sign In` }
								onClick={ () => {
									setMode( "login" );
								} }
							/>
							<Button
								classes={ `button admin-button admin-button-red` }
								label={ `Sign Up` }
								onClick={ signup }
							/>
						</div>
					</div>
				) }
			</div>
		</div>
	);
}

export default Login;

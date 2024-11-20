import React from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import API from "../../api/api.js";

function LoginForm () {
	const [ user, setUser ] = React.useState( {
		username: "",
		password: "",
	} );

	// const [ dispatch, setDispatch ] = React.useState( null );
	const dispatch = useDispatch();
	const login = async () => {
		try {
			dispatch( SetLoading( true ) );
			const response = await API.post( "/api/portfolio/login", user );
			dispatch( SetLoading( false ) );
			if ( response.data.success ) {
				// Successfully logged in.
				message.success( response.data.message );
				localStorage.setItem( "token", JSON.stringify( response.message ) );
				window.location.href = "/admin";
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

	return (
		<div className="form-login">
			<h2 className="form-label">Login</h2>
			<div className="form-inputs">
				<div className="input-group">
					<label className="input-label">Username</label>
					<input
						className="input-field"
						type="text"
						name=""
						placeholder="your_name@domain.com"
					/>
				</div>
				<div className="input-group">
					<label className="input-label">Password</label>
					<input
						className="input-field"
						type="password"
						name=""
						placeholder="********"
					/>
				</div>
				<div className="input-group">
					<input
						type="submit"
						name="submit"
						value="Sign In"
						className="button form-button"
						onClick={ login }
					/>
				</div>
			</div>
			<p className="forget">
				Forgot Password? <a href="#"> Click here</a>
			</p>
		</div>
	);
}

export default LoginForm;

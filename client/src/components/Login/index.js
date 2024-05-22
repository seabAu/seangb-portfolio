import React from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";
import API from "../../api/api.js";

function LoginForm() {
	const [user, setUser] = React.useState({
		username: "",
		password: "",
	});

	// const [ dispatch, setDispatch ] = React.useState( null );
	const dispatch = useDispatch();
	const login = async () => {
		try {
			dispatch(SetLoading(true));
			const response = await API.post("/api/portfolio/login", user);
			dispatch(SetLoading(false));
			if (response.data.success) {
				// Successfully logged in.
				message.success(response.data.message);
				localStorage.setItem("token", JSON.stringify(response.message));
				window.location.href = "/admin";
			} else {
				// Failed to log in. Return to homepage.
				message.error(response.data.message);
				window.location.href = "/";
			}
		} catch (error) {
			message.error(error.message);
			dispatch(SetLoading(false));
		}
	};

	return (
		<div class="form-login">
			<h2 class="form-label">Login</h2>
			<div class="form-inputs">
				<div class="input-group">
					<label class="input-label">Username</label>
					<input
						class="input-field"
						type="text"
						name=""
						placeholder="your_name@domain.com"
					/>
				</div>
				<div class="input-group">
					<label class="input-label">Password</label>
					<input
						class="input-field"
						type="password"
						name=""
						placeholder="********"
					/>
				</div>
				<div class="input-group">
					<input
						type="submit"
						name="submit"
						value="Sign In"
						class="button form-button"
						onClick={login}
					/>
				</div>
			</div>
			<p class="forget">
				Forgot Password? <a href="#"> Click here</a>
			</p>
		</div>
	);
}

export default LoginForm;

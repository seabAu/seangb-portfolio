import { message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/rootSlice";

function Login() {
    const [user, setUser] = React.useState({
        username: "",
        password: "",
    });

    // const [ dispatch, setDispatch ] = React.useState( null );
    const dispatch = useDispatch();
    const login = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post(
                "api/portfolio/login",
                user,
            );
            dispatch(SetLoading(false));
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", JSON.stringify(response.message));
                window.location.href = "/admin";

            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));
        }
    };
    return (
        <div>
            <div className="admin-login-container flex justify-center items-center h-screen bg-primary">
                <div className="admin-login-card w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 text-white bg-tertiary">
                    <h1 className="text-2xl">Login</h1>
                    <hr />
                    <input
                        name="username"
                        type="text"
                        value={user.username}
                        placeholder="Username"
                        label="Username"
                        className="bg-secondary"
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }></input>
                    <input
                        name="password"
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        label="Password"
                        className=""
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }></input>
                    <button
                        className="button"
                        onClick={login}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;

import {useContext, useState} from "react";
import {Button, Form, Input} from "antd";
import "./styles/Login.css";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)

    const [loginCredentials, setLoginCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(false)
    const handleChange = (e, input) => {
        setLoginCredentials((prev) =>
            ({...prev, [input]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginCredentials);
            navigate('/')
        } catch (e) {
            setError(true)
        }
    };
    return (
        <div className="formWrapper">
            <div className="form">
                <h2>User Log In</h2>
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Username">
                        <Input
                            value={loginCredentials.username}
                            onChange={(e) => handleChange(e, "username")}
                            placeholder="Enter your username"
                        />
                    </Form.Item>
                    <Form.Item label="Password">
                        <Input.Password
                            value={loginCredentials.password}
                            onChange={(e) => handleChange(e, "password")}
                            placeholder="Enter your password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary" htmlType="submit"
                            onClick={handleSubmit}
                            className="formButton"
                            disabled={loginCredentials.username === "" || loginCredentials.password === ""}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p>
                            Don’t have an account yet?{" "}
                            <Link
                                to="/register"
                            >
                                Register
                            </Link>
                        </p>
                    </Form.Item>
                    {error && (
                        <p className="errorForm">Please give the right credentials!</p>
                    )}
                </Form>
            </div>
        </div>
    );
}

export default Login

import {Button, Form, Input} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import "./styles/Login.css"

const Register = () => {
    const navigate = useNavigate();

    const [loginCredentials, setLoginCredentials] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState(null)

    const handleChange = (e, input) => {
        setLoginCredentials((prev) =>
            ({...prev, [input]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                "http://localhost:8080/register",
                loginCredentials
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate('/')
        } catch (e) {
            setError(e.response.status)
        }
    };

    return (
        <div className="formWrapper">
            <div className="form">
                <h2>Register</h2>
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Firstname">
                        <Input
                            value={loginCredentials.firstname}
                            onChange={(e) => handleChange(e, "firstname")}
                            placeholder="Enter your firstname"
                        />
                    </Form.Item>
                    <Form.Item label="Lastname">
                        <Input
                            value={loginCredentials.lastname}
                            onChange={(e) => handleChange(e, "lastname")}
                            placeholder="Enter your lastname"
                        />
                    </Form.Item>
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
                            type="primary"
                            htmlType="submit"
                            onClick={handleSubmit}
                            className="formButton"
                            disabled={
                                loginCredentials.username === ""
                                || loginCredentials.firstname === ""
                                || loginCredentials.lastname === ""
                                || loginCredentials.password === ""
                            }
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p>
                            Already have an account?{" "}
                            <Link
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </Form.Item>
                    {error === 409 && (
                        <p className="errorForm">This username already exists</p>
                    )}
                </Form>
            </div>
        </div>
    )
}

export default Register
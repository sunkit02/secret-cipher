import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {GrLogin} from "react-icons/gr";

interface LoginPageProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginPageProps> = ({
                                                 setUsername,
                                                 loggedIn,
                                                 setLoggedIn
                                             }) => {

    const [usernameInput, setUsernameInput] = useState("");

    const navigate = useNavigate();
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // if logged in successfully
        setUsername(usernameInput);
        setLoggedIn(true);
        navigate("/message",
            {
                replace: true,
            });
        // navigate("../home");
    };

    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <article className="login">
            <div className="login__form-container gen-container">
                <h2 className="login__form-title">
                    Please Enter</h2>
                <form className="login__form"
                      onSubmit={handleLogin}
                >
                    <input
                        className="login__input gen-input"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsernameInput(e.target.value)}/>
                    <input
                        className="login__input gen-input"
                        type="password"
                        placeholder="Password"
                    />
                    <button
                        id="login__login-btn"
                        className="login__login-btn gen-btn rounded-btn"
                    >Login
                    </button>
                </form>
                <hr
                    className="login__strike-through"
                    data-content="OR"
                />
                <button
                    id="login__signup-btn"
                    className="gen-btn rounded-btn"
                    onClick={handleSignUp}>Sign Up
                </button>
            </div>
        </article>
    );
}

export default LoginPage;
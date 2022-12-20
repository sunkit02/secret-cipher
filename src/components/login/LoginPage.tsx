import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

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
        navigate("/message");
        // navigate("../home");
    };

    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" onChange={(e) => setUsernameInput(e.target.value)}/>
                <input type="password"/>
                <button>Login</button>
            </form>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
}

export default LoginPage;
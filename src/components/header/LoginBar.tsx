import React from "react";

interface LoginBarProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
}


const LoginBar: React.FC<LoginBarProps> = ({
                                               loggedIn,
                                               setLoggedIn,
                                               username
                                           }) => {
    return (
        <div className="header__login-bar">
            <span className="header__login-bar-username">
                Welcome, <span className="italics">{username}</span> !
            </span>
            <button
                className="header__login-bar-btn generic-btn rounded-btn"
                onClick={() => setLoggedIn(!loggedIn)}
            >
                {loggedIn ? "Logout" : "Login"}
            </button>
        </div>
    );
}

export default LoginBar;
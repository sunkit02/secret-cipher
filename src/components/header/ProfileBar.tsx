import React from "react";
import {useNavigate} from "react-router-dom";

interface LoginBarProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}


const ProfileBar: React.FC<LoginBarProps> = ({
                                               loggedIn,
                                               setLoggedIn,
                                               username,
                                               setUsername
                                           }) => {
    const navigate = useNavigate();

    const handleLogButtonClick = () => {
        if (loggedIn) {
            setUsername("Guest");
            setLoggedIn(false);
        }
        navigate("login");
    }
    return (
        <div className="header__login-bar">
            <span className="header__login-bar-username">
                Welcome, <span className="italics">{username}</span> !
            </span>
            <button
                className="header__login-bar-btn gen-btn rounded-btn"
                onClick={handleLogButtonClick}
            >
                {loggedIn ? "Logout" : "Login"}
            </button>
        </div>
    );
}

export default ProfileBar;
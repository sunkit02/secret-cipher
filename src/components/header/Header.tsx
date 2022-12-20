import React from "react";
import LoginBar from "./LoginBar";
import NavBar from "./NavBar";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
                                           loggedIn,
                                           setLoggedIn,
                                           username,
                                           setUsername
                                       }) => {
    const navigate = useNavigate();

    return (
        <article className="header">
            <h1
                className="header__site-name text--nowrap"
                onClick={() => navigate("/")}
            >
                Secret Cipher
            </h1>
            <div className="header__nav-container">
                <LoginBar
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    username={username}
                />
                <NavBar/>
            </div>
        </article>
    );
}

export default Header;
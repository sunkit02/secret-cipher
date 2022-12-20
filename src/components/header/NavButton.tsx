import React from 'react';
import {useNavigate} from "react-router-dom";

interface NavButtonProps {
    name: string;
    to: string;
}

const NavButton: React.FC<NavButtonProps> = ({name, to}) => {
    const navigate = useNavigate();

    return (
        <button
            className="header__nav-btn generic-btn"
            onClick={() => navigate(to)}
        >
            {name}
        </button>
    );
}

export default NavButton;
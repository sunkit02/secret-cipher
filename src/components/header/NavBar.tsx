import React from 'react';
import NavButton from "./NavButton";

const NavBar: React.FC = () => {
    return (
        <div className="header__navbar">
            <NavButton to="/" name="Home"/>
            <NavButton to="/encoder" name="Encoder"/>
            {/*<NavButton to="/inbox" name="Inbox"/>*/}
            <NavButton to="/message" name="Message"/>
        </div>
    );
}

export default NavBar;
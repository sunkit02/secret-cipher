import React from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import MessageSideNavBar from "./MessageSideNavBar";

interface MessagePageProps {
    loggedIn: boolean;
    username: string;
}
const MessagePage: React.FC<MessagePageProps> = ({loggedIn, username}) => {

    if (!loggedIn) {
        return <Navigate to="/login" />
    }

    return (
        <div className="message">
            <div className="message__container gen-container">
                <MessageSideNavBar />
                <div
                    id="message__outlet-container"
                    className="gen-container"
                >
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default MessagePage;
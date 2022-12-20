import React from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";

interface MessagePageProps {
    loggedIn: boolean;
}
const MessagePage: React.FC<MessagePageProps> = ({loggedIn}) => {
    const navigate = useNavigate();

    if (!loggedIn) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <h3>Message</h3>
            <button onClick={() => navigate("./send")}>Send</button>
            <button onClick={() => navigate("./received")}>Received</button>
            <button onClick={() => navigate("./sent")}>Sent</button>
            <br/>
            <Outlet/>
        </>
    );
}

export default MessagePage;
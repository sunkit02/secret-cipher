import React, {useEffect} from "react";
import {Outlet, useNavigate} from "react-router-dom";

interface MessagePageProps {
    loggedIn: boolean;
}
const MessagePage: React.FC<MessagePageProps> = ({loggedIn}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn)
            navigate("/login");
    }, [loggedIn, navigate]);

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
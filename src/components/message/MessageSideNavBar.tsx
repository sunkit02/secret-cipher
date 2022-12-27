import React from "react";
import {useNavigate} from "react-router-dom";
import {BiSend} from "react-icons/bi";
import {MdMail, MdOutgoingMail} from "react-icons/md";
const MessageSideNavBar: React.FC = () => {
    let navigate = useNavigate();

    return (
        <div className="message__nav-bar">
            <span
                className="message__nav-btn text--nowrap"
                onClick={() => navigate("./send")}
            >
                <BiSend />
                Send New</span>
            <span
                className="message__nav-btn text--nowrap"
                onClick={() => navigate("./received")}
            >
                <MdMail />
                Inbox</span>
            <span
                className="message__nav-btn text--nowrap"
                onClick={() => navigate("./sent")}
            >
                <MdOutgoingMail/>
                Sent</span>
        </div>
    );
}

export default MessageSideNavBar;
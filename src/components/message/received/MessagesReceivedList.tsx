import React from "react";
import {MessageReceived} from "../../../models/message-models";
import MessageReceivedCard from "./MessageReceivedCard";

interface MessagesReceivedListProps {
    filteredMessagesReceived: MessageReceived[];
}

const MessagesReceivedList: React.FC<MessagesReceivedListProps> = ({filteredMessagesReceived}) => {
    return (
        <div
            id="message__received__message-list"
            className="message__message-list gen-container"
        >
            {
                filteredMessagesReceived.map(message => {
                    console.log("Message Received: ", message);
                    return <MessageReceivedCard key={message.id} messageReceived={message}/>
                })
            }
        </div>
    );
}

export default MessagesReceivedList;
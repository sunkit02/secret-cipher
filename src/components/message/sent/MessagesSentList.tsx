import React from "react";
import {MessageSent} from "../../../models/message-models";
import MessageSentCard from "./MessageSentCard";

interface MessagesSentListProps {
    filteredMessagesSent: MessageSent[];
}

const MessagesSentList: React.FC<MessagesSentListProps> = ({filteredMessagesSent}) => {
    return (
        <div
            id="message__sent__message-list"
            className="message__sent__message-list gen-container">
            {
                filteredMessagesSent.map(message => {
                    return <MessageSentCard key={message.id} messageSent={message}/>
                })
            }
        </div>
    );
}

export default MessagesSentList;
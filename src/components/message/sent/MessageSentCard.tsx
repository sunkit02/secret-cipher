import React from "react";
import {MessageSent} from "../../../models/message-models";

interface MessageSentCardProps {
    messageSent: MessageSent;
}

const MessageSentCard: React.FC<MessageSentCardProps> = ({messageSent}) => {
    return (
        <div className="message__sent__message-card">{messageSent.message}</div>
    );
}

export default MessageSentCard;
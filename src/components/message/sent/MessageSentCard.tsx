import React from "react";
import {MessageSent} from "../../../models/message-models";

interface MessageSentCardProps {
    messageSent: MessageSent;
}

const MessageSentCard: React.FC<MessageSentCardProps> = ({messageSent}) => {
    return (
        <div className="message__sent__message-card">
            <span className="message__sent__message-card-recipient text--nowrap">{messageSent.recipientUsername}</span>
            <div>
                <span className="message__sent__message-card-subject text--nowrap">{messageSent.subject}</span>
                <span className="message__sent__message-card-message text--nowrap">{messageSent.message}</span>
            </div>
            {/*<span>{messageSent.timeSent}</span>*/}
        </div>
    );
}

export default MessageSentCard;
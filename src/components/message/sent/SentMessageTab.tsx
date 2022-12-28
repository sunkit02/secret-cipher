import React, {useState} from "react";
import {MessageSent} from "../../../models/message-models";
import MessagesSentSearchBar from "./MessagesSentSearchBar";
import MessagesSentList from "./MessagesSentList";

interface SentMessagesTabProps {
    messagesSent: MessageSent[];
    setMessagesSent: React.Dispatch<React.SetStateAction<MessageSent[]>>;
}

const SentMessageTab: React.FC<SentMessagesTabProps> = ({
                                                            messagesSent,
                                                            setMessagesSent
                                                        }) => {
    const [filteredMessagesSent, setFilteredMessagesSent] = useState<MessageSent[]>(messagesSent);



    return (
        <section className="message__sent__container">
            <h3 className="message__sent__title">Sent Messages</h3>
            <MessagesSentSearchBar
                setFilteredMessages={setFilteredMessagesSent}
                messagesSent={messagesSent}
            />
            <MessagesSentList filteredMessagesSent={filteredMessagesSent} />
        </section>
    );
}

export default SentMessageTab;
import React from "react";
import {MessageSent} from "../../../models/message-models";

interface ReceivedMessageTabProps {
    messagesReceived: MessageSent[];
    setMessagesReceived: React.Dispatch<React.SetStateAction<MessageSent[]>>
}

const ReceivedMessageTab: React.FC<ReceivedMessageTabProps> = ({
                                                                   messagesReceived,
                                                                   setMessagesReceived
                                                               }) => {
    return (
        <>
            Received messages
        </>
    );
}

export default ReceivedMessageTab;
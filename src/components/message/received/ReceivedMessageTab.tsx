import React from "react";
import {SecretMessage} from "../../../models/message-models";

interface ReceivedMessageTabProps {
    messagesReceived: SecretMessage[];
    setMessagesReceived: React.Dispatch<React.SetStateAction<SecretMessage[]>>
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
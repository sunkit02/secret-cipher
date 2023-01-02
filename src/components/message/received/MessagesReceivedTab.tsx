import React, {useEffect, useState} from "react";
import {MessageReceived} from "../../../models/message-models";
import {fetchReceivedMessages} from "../../../services/message-service";
import {GetMessagesReceivedRequest} from "../../../models/payload-models";
import {JwtTokens} from "../../../models/models";
import {parseErrorMessage} from "../../../utils/error-utils";
import {PopUpMessage, PopUpMsgType} from "../../../models/popup-models";
import PopUpMessageBox from "../../popups/PopUpMessage";
import MessagesReceivedSearchBar from "./MessagesReceivedSearchBar";
import MessagesReceivedList from "./MessagesReceivedList";

interface MessagesReceivedTabProps {
    username: string;
    messagesReceived: MessageReceived[];
    setMessagesReceived: React.Dispatch<React.SetStateAction<MessageReceived[]>>
    jwtTokens: JwtTokens | null;
}

const MessagesReceivedTab: React.FC<MessagesReceivedTabProps> = ({
                                                                   username,
                                                                   messagesReceived,
                                                                   setMessagesReceived,
                                                                   jwtTokens,
                                                               }) => {

    const [popUpMessage, setPopUpMessage] = useState<PopUpMessage>({type: PopUpMsgType.NONE});
    const [filteredMessagesReceived, setFilteredMessagesReceived] = useState<MessageReceived[]>([]);

    const messagesEqual = (a: MessageReceived[], b: MessageReceived[]) => {
        return a.length === b.length &&
            a.every((message, index) => {
                return message.id === b[index].id;
            });
    }

    useEffect(() => {
        let request: GetMessagesReceivedRequest = {
            username
        };
        fetchReceivedMessages(request, jwtTokens?.accessToken)
            .then(messages => {
                if (!messagesEqual(messages, messagesReceived)) {
                    setMessagesReceived(messages);
                }
            })
            .catch(errorMessage => {
                errorMessage = parseErrorMessage(errorMessage);
                setPopUpMessage({
                    type: PopUpMsgType.ERROR,
                    message: errorMessage
                })
            });
    }, [])

    return (
        <section className="message__tab__container">
            <h3 className="message__tab__title">Inbox</h3>
            <PopUpMessageBox popUpMessage={popUpMessage}/>
            <MessagesReceivedSearchBar
                setFilteredMessages={setFilteredMessagesReceived}
                messagesReceived={messagesReceived}
            />
            <MessagesReceivedList filteredMessagesReceived={filteredMessagesReceived} />
        </section>
    );
}

export default MessagesReceivedTab;
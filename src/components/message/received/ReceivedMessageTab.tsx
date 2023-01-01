import React, {useEffect, useState} from "react";
import {MessageReceived} from "../../../models/message-models";
import {fetchReceivedMessages} from "../../../services/message-service";
import {GetMessagesReceivedRequest} from "../../../models/payload-models";
import {JwtTokens} from "../../../models/models";
import {parseErrorMessage} from "../../../utils/error-utils";
import {PopUpMessage, PopUpMsgType} from "../../../models/popup-models";
import PopUpMessageBox from "../../popups/PopUpMessage";

interface ReceivedMessageTabProps {
    username: string;
    messagesReceived: MessageReceived[];
    setMessagesReceived: React.Dispatch<React.SetStateAction<MessageReceived[]>>
    jwtTokens: JwtTokens | null;
}

const ReceivedMessageTab: React.FC<ReceivedMessageTabProps> = ({
                                                                   username,
                                                                   messagesReceived,
                                                                   setMessagesReceived,
                                                                   jwtTokens,
                                                               }) => {

    const [popUpMessage, setPopUpMessage] = useState<PopUpMessage>({type: PopUpMsgType.NONE});

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
        <section className="message_received_container">
            Received messages
            <PopUpMessageBox popUpMessage={popUpMessage}/>
            {
                messagesReceived.map(message => {
                    return <li>{message.message}</li>
                })
            }
        </section>
    );
}

export default ReceivedMessageTab;
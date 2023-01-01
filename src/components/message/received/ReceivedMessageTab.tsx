import React, {useEffect, useState} from "react";
import {MessageReceived, MessageSent} from "../../../models/message-models";
import {fetchReceivedMessages} from "../../../services/message-service";
import {GetMessagesReceivedRequest} from "../../../models/payload-models";
import {JwtTokens} from "../../../models/models";
import {parseErrorMessage} from "../../../utils/error-utils";
import {PopUpMessage, PopUpMsgType} from "../../../models/popup-models";

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
        <>

            Received messages
            {
                popUpMessage.type === PopUpMsgType.NONE
                    ? (<div></div>)
                    : popUpMessage.type === PopUpMsgType.ERROR ? (
                        <div className="login__pop-up-message error-message">{popUpMessage.message}</div>
                    ) : (
                        <div className="login__pop-up-message success-message">{popUpMessage.message}</div>
                    )
            }
            {
                messagesReceived.map(message => {
                    return <li>{message.message}</li>
                })
            }
        </>
    );
}

export default ReceivedMessageTab;
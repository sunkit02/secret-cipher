import React, {useEffect, useState} from "react";
import {MessageSent} from "../../../models/message-models";
import MessagesSentSearchBar from "./MessagesSentSearchBar";
import MessagesSentList from "./MessagesSentList";
import {fetchSentMessages} from "../../../services/message-service";
import {GetMessagesSentRequest} from "../../../models/payload-models";
import {PopUpMessage, PopUpMsgType} from "../../../models/popup-models";

interface SentMessagesTabProps {
    username: string;
    messagesSent: MessageSent[];
    setMessagesSent: React.Dispatch<React.SetStateAction<MessageSent[]>>;
}

const SentMessageTab: React.FC<SentMessagesTabProps> = ({
                                                            username,
                                                            messagesSent,
                                                            setMessagesSent
                                                        }) => {
    const [popUpMessage, setPopUpMessage] = useState<PopUpMessage>({type: PopUpMsgType.NONE});
    const [filteredMessagesSent, setFilteredMessagesSent] = useState<MessageSent[]>(messagesSent);

    const parseErrorMessage = (errorMessage: any) => {
        let result: string | null = null;
        // ensure that the error message is a string
        // and convert to string if not
        if (typeof errorMessage !== "string") {
            try {
                result = errorMessage?.toString();
            } catch (e) {
                // default error message if cannot call toString method
                result = "An error occurred"
            }
        }

        return result === null ? errorMessage : result;
    }

    const messagesEqual = (a: MessageSent[], b: MessageSent[]) => {
        return a.length === b.length &&
            a.every((message, index) => {
                return message.id === b[index].id;
            });
    }

    useEffect(() => {
        let fetchRequest: GetMessagesSentRequest = {
            username
        }
        fetchSentMessages(fetchRequest)
            // update sent message list if not equal
            // todo: optimize solution
            .then(sentMessages => {
                console.log(sentMessages);
                if (!messagesEqual(sentMessages, messagesSent))
                    setMessagesSent(sentMessages);
            })
            // display error message if an error occurs
            .catch(errorMessage => {
                console.log(errorMessage);
                errorMessage = parseErrorMessage(errorMessage);
                setPopUpMessage({
                    type: PopUpMsgType.ERROR,
                    message: errorMessage.toString()
                });
                // set countdown for error message to disappear
                setTimeout(() => {
                    setPopUpMessage({type: PopUpMsgType.NONE})
                }, 3000);
            });
    }, [])


    return (
        <section className="message__sent__container">
            <h3 className="message__sent__title">Sent Messages</h3>
            {
                popUpMessage.type === PopUpMsgType.NONE
                    ? (<div></div>)
                    : popUpMessage.type === PopUpMsgType.ERROR ? (
                        <div className="message__sent__pop-up-message error-message">{popUpMessage.message}</div>
                    ) : (
                        <div className="message__sent__pop-up-message success-message">{popUpMessage.message}</div>
                    )
            }
            <MessagesSentSearchBar
                setFilteredMessages={setFilteredMessagesSent}
                messagesSent={messagesSent}
            />
            <MessagesSentList filteredMessagesSent={filteredMessagesSent}/>
        </section>
    );
}

export default SentMessageTab;
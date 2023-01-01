import React, {useEffect, useState} from "react";
import {MessageSent} from "../../../models/message-models";
import MessagesSentSearchBar from "./MessagesSentSearchBar";
import MessagesSentList from "./MessagesSentList";
import {fetchSentMessages} from "../../../services/message-service";
import {GetMessagesSentRequest} from "../../../models/payload-models";
import {PopUpMessage, PopUpMsgType} from "../../../models/popup-models";
import {parseErrorMessage} from "../../../utils/error-utils";
import {JwtTokens} from "../../../models/models";
import PopUpMessageBox from "../../popups/PopUpMessage";

interface SentMessagesTabProps {
    username: string;
    messagesSent: MessageSent[];
    setMessagesSent: React.Dispatch<React.SetStateAction<MessageSent[]>>;
    jwtTokens: JwtTokens | null;
}

const SentMessageTab: React.FC<SentMessagesTabProps> = ({
                                                            username,
                                                            messagesSent,
                                                            setMessagesSent,
                                                            jwtTokens,
                                                        }) => {
    const [popUpMessage, setPopUpMessage] = useState<PopUpMessage>({type: PopUpMsgType.NONE});
    const [filteredMessagesSent, setFilteredMessagesSent] = useState<MessageSent[]>(messagesSent);

    const messagesEqual = (a: MessageSent[], b: MessageSent[]) => {
        return a.length === b.length &&
            a.every((message, index) => {
                return message.id === b[index].id;
            });
    }

    const sortMessagesByTimeSent = (messages: MessageSent[]): MessageSent[] => {
        return messages.sort((a, b) => {
            let date1 = new Date(a.timeSent).getTime();
            let date2 = new Date(b.timeSent).getTime();
            return date1 > date2 ? -1 : date1 < date2 ? 1 : 0;
        });
    }

    useEffect(() => {
        let fetchRequest: GetMessagesSentRequest = {
            username
        }
        fetchSentMessages(fetchRequest, jwtTokens?.accessToken)
            // update sent message list if not equal
            // todo: optimize solution
            .then(sentMessages => {
                console.log("Before sort: ", sentMessages);
                sentMessages = sortMessagesByTimeSent(sentMessages)
                console.log("After sort: ", sentMessages);
                if (!messagesEqual(sentMessages, messagesSent))
                    setMessagesSent(sentMessages);
            })
            // display error message if an error occurs
            .catch(errorMessage => {
                console.log(errorMessage);
                errorMessage = parseErrorMessage(errorMessage);
                setPopUpMessage({
                    type: PopUpMsgType.ERROR,
                    message: errorMessage
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
            <PopUpMessageBox popUpMessage={popUpMessage}/>
            <MessagesSentSearchBar
                setFilteredMessages={setFilteredMessagesSent}
                messagesSent={messagesSent}
            />
            <MessagesSentList filteredMessagesSent={filteredMessagesSent}/>
        </section>
    );
}

export default SentMessageTab;
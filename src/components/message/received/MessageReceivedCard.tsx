import React, {useState} from "react";
import {MessageReceived} from "../../../models/message-models";
import {getDateString} from "../../../utils/date-utils";
import {IoIosArrowDown} from "react-icons/io";

interface MessageReceivedCardProps {
    messageReceived: MessageReceived;
}

const MessageReceivedCard: React.FC<MessageReceivedCardProps> = ({messageReceived}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [mouseOver, setMouseOver] = useState<boolean>(false);
    const [displayKey, setDisplayKey] = useState<boolean>(false);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    }

    const toggleKeyDisplayed = () => {
        setDisplayKey(!displayKey);
    }

    if (!isExpanded) {
        // render unexpanded card
        return (
            <div
                className="message__tab__message-card"
                onClick={toggleExpanded}
                onMouseOver={_ => setMouseOver(true)}
                onMouseLeave={_ => setMouseOver(false)}
            >
                <span
                    className="message__tab__message-card__recipient text--nowrap">{messageReceived.recipientUsername}</span>
                <span className="message__tab__message-card__subject-message text--nowrap">
                <b>{messageReceived.subject}</b>{": " + messageReceived.message}
            </span>
                <span
                    className="message__tab__message-card__sent-time text--nowrap">{getDateString(new Date(messageReceived.timeSent))}</span>
                {
                    mouseOver ? (<span className="message__tab__message-card__expand-arrow">
                                <IoIosArrowDown
                                    style={{
                                        transition: "0.2s",
                                        transform: "rotate(90deg)"
                                    }}
                                />
                                </span>)
                        : <></>
                }
            </div>
        );
    } else {
        // render expanded card
        return (
            <div className="message__tab__message-card-expanded">
                <div
                    className="message__tab__message-card"
                    onClick={toggleExpanded}
                    onMouseOver={_ => setMouseOver(true)}
                    onMouseLeave={_ => setMouseOver(false)}
                >
                    <span
                        className="message__tab__message-card__recipient text--nowrap"
                    >
                        {"To: " + messageReceived.recipientUsername}
                    </span>
                    <span
                        className="message__tab__message-card__subject-message text--nowrap"
                        style={{textAlign: "center"}}
                    >
                        <b>{messageReceived.subject}</b>
                    </span>
                    <span
                        className="message__tab__message-card__sent-time text--nowrap">{getDateString(new Date(messageReceived.timeSent))}</span>
                    {
                        mouseOver ? (<span className="message__tab__message-card__expand-arrow">
                                        <IoIosArrowDown/>
                                    </span>)
                            : <></>
                    }

                </div>
                <div
                    className="message__tab__message-card-expanded__container"
                >
                    <pre className="message__sent__message-card-expanded__message">{messageReceived.message}</pre>
                </div>
            </div>
        );
    }
}

export default MessageReceivedCard;
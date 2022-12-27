import React, {useRef, useState} from "react";
import {SecretMessage} from "../../../models/message-models";
import {sendNewMessage} from "../../../services/message-service";

interface SendNewMassageTabProps {
    username: string;
    messagesSent: SecretMessage[];
    setMessagesSent: React.Dispatch<React.SetStateAction<SecretMessage[]>>
}

const SendNewMessageTab: React.FC<SendNewMassageTabProps> = ({
                                                                 username,
                                                                 messagesSent,
                                                                 setMessagesSent
                                                             }) => {
    const [recipient, setRecipient] = useState<string>("");
    const [encodingKey, setEncodingKey] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const formRef = useRef<HTMLFormElement>(null);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newMessage: SecretMessage = {
            senderUsername: username,
            recipientUsername: recipient,
            key: encodingKey,
            message
        };

        sendNewMessage(newMessage)
            .then(message => {
                console.log("Message sent successfully!")
                setMessagesSent([...messagesSent, message]);
                // @ts-ignore
                formRef.current.reset();
            })
            .catch(error => console.error(error));
    }


    return (
        <section className="message__send-new__container">
            <h3 className="message__send-new__title">
                New Message</h3>
            <form
                ref={formRef}
                className="message__send-new__message-form"
                onSubmit={handleSendMessage}
            >

                <input
                    type="text"
                    name="recipient-username"
                    placeholder="Recipient"
                    className="message__send-new__input gen-text-input"
                    onChange={e => setRecipient(e.target.value)}
                />
                <input
                    type="text"
                    name="key"
                    placeholder="Encoding key"
                    className="message__send-new__input gen-text-input"
                    onChange={e => setEncodingKey(e.target.value)}
                />
                <textarea
                    name="message"
                    placeholder="Message content ..."
                    className="message__send-new__input-textarea gen-text-input"
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    className="message__send-new__send-btn
                                gen-btn rounded-btn"
                >Send Message
                </button>
            </form>
        </section>
    );
}

export default SendNewMessageTab;
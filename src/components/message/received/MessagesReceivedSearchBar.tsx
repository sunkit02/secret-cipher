import React, {useEffect, useState} from "react";
import {MessageReceived} from "../../../models/message-models";

interface MessageReceivedSearchBarProps {
    setFilteredMessages: React.Dispatch<React.SetStateAction<MessageReceived[]>>;
    messagesReceived: MessageReceived[];
}


const MessagesReceivedSearchBar: React.FC<MessageReceivedSearchBarProps> = ({
                                                                                setFilteredMessages,
                                                                                messagesReceived,
                                                                            }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filterMessages = (messages: MessageReceived[], query: string) => {
        let queryUpper = query.toUpperCase();

        // matches all messages where the recipient, subject, or message
        // includes the search query (case-insensitive)
        return messages.filter(m => {
            return m.message.toUpperCase().includes(queryUpper)
                || m.recipientUsername.toUpperCase().includes(queryUpper)
                || m.subject.toUpperCase().includes(queryUpper);
        });
    }

    // updates the filtered messages when
    // there are new messages sent or the search query changes
    useEffect(() => {
        let filteredMessages = filterMessages(messagesReceived, searchQuery);
        setFilteredMessages(filteredMessages);
    }, [messagesReceived, searchQuery, setFilteredMessages])

    const handleSearchOnClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let filteredMessages = filterMessages(messagesReceived, searchQuery);
        setFilteredMessages(filteredMessages);
    };

    const handleSearchOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section className="message__searchbar-container">
            <form
                className="message__searchbar-form"
                onSubmit={handleSearchOnClick}
            >
                <input
                    className="message__searchbar-input gen-text-input"
                    type="text"
                    placeholder="Search keyword"
                    onChange={handleSearchOnInputChange}
                />
                <button className="message__searchbar-btn gen-btn rounded-btn"
                >Search
                </button>
            </form>
        </section>
    );
}

export default MessagesReceivedSearchBar;
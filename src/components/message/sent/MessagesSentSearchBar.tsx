import React, {useEffect, useState} from "react";
import {MessageSent} from "../../../models/message-models";

interface SearchBarProps {
    setFilteredMessages: React.Dispatch<React.SetStateAction<MessageSent[]>>;
    messagesSent: MessageSent[];
}

const MessagesSentSearchBar: React.FC<SearchBarProps> = ({
                                                             setFilteredMessages,
                                                             messagesSent
                                                         }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filterMessages = (messages: MessageSent[], query: string) => {
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
        let filteredMessages = filterMessages(messagesSent, searchQuery);
        setFilteredMessages(filteredMessages);
    }, [messagesSent, searchQuery, setFilteredMessages])

    const handleSearchOnClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let filteredMessages = filterMessages(messagesSent, searchQuery);
        setFilteredMessages(filteredMessages);
    };

    const handleSearchOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section className="message__sent__searchbar-container">
            <form
                className="message__sent__searchbar-form"
                onSubmit={handleSearchOnClick}
            >
                <input
                    className="message__sent__searchbar-input gen-text-input"
                    type="text"
                    placeholder="Search keyword"
                    onChange={handleSearchOnInputChange}
                />
                <button className="message__sent__searchbar-btn gen-btn rounded-btn"
                >Search
                </button>
            </form>
        </section>
    );
}

export default MessagesSentSearchBar;
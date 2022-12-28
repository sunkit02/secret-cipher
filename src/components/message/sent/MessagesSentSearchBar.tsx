import React, {useState} from "react";
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
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilteredMessages(
            messagesSent.filter(m => m.message.includes(searchQuery)));
    }

    return (
        <section className="message__sent__searchbar">
            <form
                className="message__sent__searchbar-form"
                onSubmit={handleSearch}
            >
                <input
                    className="message__sent__searchbar-input gen-text-input"
                    type="text"
                    placeholder="Search keyword"
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        setFilteredMessages(
                            messagesSent.filter(m => m.message.includes(e.target.value)));
                    }}
                />
                <button className="message__sent__searchbar-btn gen-btn rounded-btn"
                >Search</button>
            </form>
        </section>
    );
}

export default MessagesSentSearchBar;
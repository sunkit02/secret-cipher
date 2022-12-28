import React from "react";
import {MessageSent} from "../../../models/message-models";
import MessageSentCard from "./MessageSentCard";

interface MessagesSentListProps {
    filteredMessagesSent: MessageSent[];
}

const MessagesSentList: React.FC<MessagesSentListProps> = ({filteredMessagesSent}) => {
  return (
      <div className="message__sent__message-list">
          {
              filteredMessagesSent.sort((a, b) => {
                  // sort in descending order by id
                  // todo: sort by time sent
                  return a.id > b.id ? -1 : a.id < b.id ? 1 : 0
              }).map(message => {
                  return <MessageSentCard key={message.id} messageSent={message}/>
              })
          }
      </div>
  );
}

export default MessagesSentList;
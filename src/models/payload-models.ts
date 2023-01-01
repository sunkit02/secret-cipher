interface SendNewMessageRequest {
    senderUsername: string;
    recipientUsername: string;
    key: string;
    subject: string;
    message: string;
}

interface GetMessagesSentRequest {
    username: string;
}

interface GetMessagesReceivedRequest {
    username: string;
}

export type {
    SendNewMessageRequest,
    GetMessagesSentRequest,
    GetMessagesReceivedRequest
};
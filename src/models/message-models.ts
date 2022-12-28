interface SendNewMessageRequest {
    senderUsername: string;
    recipientUsername: string;
    key: string;
    subject: string;
    message: string;
}

interface Message {
    id: number;
    senderUsername: string;
    recipientUsername: string;
    message: string;

    // todo: implement timestamp
}
interface MessageSent extends Message{
    id: number;
    senderUsername: string;
    recipientUsername: string;
    key: string;
    message: string;
}

interface MessageReceived extends Message {

}

export type {MessageSent, SendNewMessageRequest, MessageReceived, Message};
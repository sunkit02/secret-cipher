

interface Message {
    id: number;
    senderUsername: string;
    recipientUsername: string;
    subject: string;
    message: string;
    timeSent: string;
}
interface MessageSent extends Message{
    key: string;
}

interface MessageReceived extends Message {

}

export type {MessageSent, MessageReceived, Message};
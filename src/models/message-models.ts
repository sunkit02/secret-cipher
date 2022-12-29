

interface Message {
    id: number;
    senderUsername: string;
    recipientUsername: string;
    subject: string;
    message: string;

    // todo: implement timestamp
}
interface MessageSent extends Message{
    id: number;
    senderUsername: string;
    recipientUsername: string;
    key: string;
    message: string;
    timeSent: string;
}

interface MessageReceived extends Message {

}

export type {MessageSent, MessageReceived, Message};
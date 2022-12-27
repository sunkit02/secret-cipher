
interface SecretMessage {
    senderUsername: string;
    recipientUsername: string;
    key: string;
    message: string;
}

export type {SecretMessage};
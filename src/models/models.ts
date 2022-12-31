import {MessageReceived, MessageSent} from "./message-models";

type UsernameAndPassword = {
    username: string,
    password: string,
}

type SignUpRequest = {
    username: string,
    password: string,
    email: string,
}

type User = {
    username: string,
    email: string,
    messagesSent: MessageSent[],
    messagesReceived: MessageReceived[],
}

type LoginResponse = {
    user: User,
};

export type {UsernameAndPassword, LoginResponse, SignUpRequest, User};
import {MessageReceived, MessageSent} from "../models/message-models";
import {GET_RECEIVED_MESSAGES_URL, GET_SENT_MESSAGES_URL, SEND_NEW_MESSAGE_URL} from "./web-config";
import {GetMessagesReceivedRequest, GetMessagesSentRequest, SendNewMessageRequest} from "../models/payload-models";

const AUTH_TOKEN_PREFIX = "Bearer ";

async function sendNewMessage(message: SendNewMessageRequest, accessToken?: string): Promise<MessageSent> {
    console.info("Sending new message: ", message);

    let headers: any = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (typeof accessToken !== "undefined") {
        headers["Authorization"] = AUTH_TOKEN_PREFIX + accessToken;
    }
    return fetch(SEND_NEW_MESSAGE_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(message)
    }).then(handleResponse);
}

async function fetchSentMessages(request: GetMessagesSentRequest, accessToken?: string): Promise<MessageSent[]> {
    console.info(`Fetching all sent messages for user '${request.username}'`);
    let headers: any = {
        "Content-Type": "application/json"
    };

    if (typeof accessToken !== "undefined") {
        headers["Authorization"] = AUTH_TOKEN_PREFIX + accessToken;
    }
    return fetch(GET_SENT_MESSAGES_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(request)
    }).then(handleResponse);
}

async function fetchReceivedMessages(request: GetMessagesReceivedRequest, accessToken?: string): Promise<MessageReceived[]> {
    console.log(`Fetching all received messages for user '${request.username}'`)
    let headers: any = {
        "Content-Type": "application/json"
    };

    if (typeof accessToken !== "undefined") {
        headers["Authorization"] = AUTH_TOKEN_PREFIX + accessToken;
    }
    return fetch(GET_RECEIVED_MESSAGES_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(request)
    }).then(handleResponse);
}

function handleResponse(response: Response) {
    if (response.ok) {
        return response.json();
    } else if (response.status === 403) {
        return Promise.reject<string>("You have no authorization to perform this action.")
    }
    return response.text()
        .then(errorMessage => {
            return Promise.reject<string>(errorMessage);
        });
}

export {
    sendNewMessage,
    fetchSentMessages,
    fetchReceivedMessages
};
import {MessageSent} from "../models/message-models";
import {GET_SENT_MESSAGES_URL, SEND_NEW_MESSAGE_URL} from "./web-config";
import {GetMessagesSentRequest, SendNewMessageRequest} from "../models/payload-models";

async function sendNewMessage(message: SendNewMessageRequest): Promise<MessageSent> {
    console.info("Sending new message: ", message);

    return fetch(SEND_NEW_MESSAGE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(message)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.text()
            .then(errorMessage => {
                return Promise.reject<string>(errorMessage);
            });
    });
}

async function fetchSentMessages(request: GetMessagesSentRequest): Promise<MessageSent[]> {
    console.info(`Fetching all sent messages for user '${request.username}'`);
    return fetch(GET_SENT_MESSAGES_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.text()
            .then((errorMessage) => {
                return Promise.reject<string>(errorMessage);
            });
    });
}

export {sendNewMessage, fetchSentMessages};
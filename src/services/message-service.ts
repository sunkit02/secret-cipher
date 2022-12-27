import {SecretMessage} from "../models/message-models";
import {SEND_NEW_MESSAGE_URL} from "./web-config";

async function sendNewMessage(message: SecretMessage): Promise<SecretMessage> {
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
        return response.text().then(errorMessage => {
            return Promise.reject<string>(errorMessage);
        });
    })
}

export {sendNewMessage};
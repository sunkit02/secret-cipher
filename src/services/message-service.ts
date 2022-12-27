import {SecretMessage} from "../models/message-models";
import {SEND_NEW_MESSAGE_URL} from "./web-config";

async function sendNewMessage(message: SecretMessage): Promise<SecretMessage> {
    console.info("Sending new message: ", message);

    return fetch(SEND_NEW_MESSAGE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }).then(response => response.json())
}

export {sendNewMessage};
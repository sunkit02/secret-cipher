import {Buffer} from "buffer";
import {ENCODING_URL} from "./web-config";
import {EncodingKeyType, EncodingRequest, EncodingResult} from "../models/encoder-models";

/**
 * Encodes string via caesar cipher with key provided
 * @param username the username of current client
 * @param message the string to be encoded
 * @param key the key used to encode the input.
 *            Note: the key can either be a string or a
 *            comma seperated array of integers, otherwise
 *            undefined behavior can occur
 *
 * @returns the encoded string
 */
function encodeString(username: string, message: string, key: string): Promise<EncodingResult> {

    let payload: EncodingRequest = {
        username,
        message,
        key,
    }

    return fetch(ENCODING_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload),
    }).then(response => response.json());
}

function decodeString(encodedInput: string, key: string): string {
    let keys = parseKey(key);

    // check for byte array decoding
    if (encodedInput.startsWith("[") && encodedInput.endsWith("]")) {
        let isByteArray = true;
        let byteArray: number[] = [];
        let byteString = encodedInput
            .substring(1, encodedInput.length - 1)
            .replaceAll(",", "");
        // parse byte array
        for (let c of byteString) {
            let byte = parseInt(c);
            // exit operation and default to decode string
            // if a non number is parsed
            if (isNaN(byte)) {
                isByteArray = false;
                break;
            }

            // decode the byte
            let key = keys.shift();
            // @ts-ignore
            byteArray.push(byte -= key);
            // @ts-ignore
            keys.push(key);
        }

        if (isByteArray) {
            return encodedInput;
        }
    }

    // default string decoding

    let inputBuffer = Buffer.from(encodedInput);
    // decode the input
    for (let i = 0; i < inputBuffer.length; i++) {
        // @ts-ignore
        let key: number = keys.shift();
        // @ts-ignore
        inputBuffer[i] -= key;
        keys.push(key);
    }
    return encodedInput;
}

function parseKey(key: string): number[] {
    key = key.trim();
    if (key.length === 0) {
        return [0];
    }

    let keyQueue = []
    let isStringKey = false; // assumes an int array

    let noCommaKey = key.replaceAll(",", "");
    for (let c of noCommaKey) {
        let parsedChar = parseInt(c);
        if (!isNaN(parsedChar)) {
            keyQueue.push(parsedChar);
        } else {
            // defaults to string key if parse fails
            isStringKey = true;
            break;
        }
    }
    if (isStringKey) {
        // empty key queue from faulty values
        keyQueue = [];
        for (let i = 0; i < key.length; i++) {
            keyQueue.push(key.charCodeAt(i));
        }
    }

    return keyQueue;
}

export {encodeString, decodeString};
function encodeString(rawInput: string, key: string): string {
    return rawInput + " encoded with key: " + key;
}

function decodeString(encodedInput: string, key: string): string {
    return encodedInput + " decoded with key: " + key
}

export {encodeString, decodeString};
import {Message} from "stompjs";

const enum PopUpMsgType {
    "ERROR",
    "SUCCESS",
    NONE
}

type PopUpMessage = {
    type: PopUpMsgType,
    message?: string,
}

const enum OperationType {
    ENCODE = "ENCODE",
    DECODE = "DECODE"
}

const enum EncodingKeyType {
    STRING="STRING",
    NUM_ARRAY="NUM_ARRAY"
}

type EncodingRequest = {
    username: string,
    key: string,
    message: string,
}
type DecodingRequest = {
    username: string,
    key: string,
    message: string,
}

export type Channel = {
    route: string;
    // @ts-ignore
    callBack: (message: Message) => void;
}


const enum SocketMessageType {
    ENCODING_RESULT = "ENCODING_RESULT",
    DECODING_RESULT = "DECODING_RESULT",
}

type EncodingResult = {
    type: SocketMessageType.ENCODING_RESULT,
    encodedString: string,
    encodedBytes: number[],
}

type DecodingResult = {
    type: SocketMessageType.DECODING_RESULT,
    decodedString: string,
    decodedBytes: number[],
}



export {
    PopUpMsgType, SocketMessageType,
    EncodingKeyType, OperationType
}
export type { EncodingRequest, DecodingRequest }
export type { PopUpMessage, EncodingResult, DecodingResult };


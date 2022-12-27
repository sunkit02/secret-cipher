import React, {useEffect} from "react";
import SockJS from "sockjs-client";
import {Client, over} from "stompjs";
import {Channel} from "../models/models";


interface EncodeDecodeSocketProps {
    url: string;
    username: string;
    onError: () => void;
    encodingPayload: string | null;
    setEncodingPayload: React.Dispatch<React.SetStateAction<string | null>>;
    decodingPayload: string | null;
    setDecodingPayload: React.Dispatch<React.SetStateAction<string | null>>;
    channels: Channel[]

}

let socket: WebSocket | null = null;
// @ts-ignore
let stompClient: Client | null = null;

const EncodeDecodeSocket: React.FC<EncodeDecodeSocketProps> = ({
                                                                   url,
                                                                   username,
                                                                   onError,
                                                                   encodingPayload,
                                                                   setEncodingPayload,
                                                                   decodingPayload,
                                                                   setDecodingPayload,
                                                                   channels,
                                                               }) => {

    // connect to the server
    useEffect(() => {
        socket = new SockJS(url, {
            cors: {
                origin: "http://localhost:3000"
            }
        });
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    }, [url, username]);

    // send new message to the server
    useEffect(() => {
        if (encodingPayload != null) {
            console.log("sending private message")
            stompClient.send("/app/private-encode", {}, encodingPayload);
            setEncodingPayload(null);
        }
    }, [encodingPayload]);


    // send new message to the server
    useEffect(() => {
        if (decodingPayload != null) {
            console.log("sending private message")
            stompClient.send("/app/private-decode", {}, decodingPayload);
            setDecodingPayload(null);
        }
    }, [decodingPayload]);

    const onConnected = () => {
        console.log("socket connected")
        // @ts-ignore
        for (let channel of channels) {
            stompClient.subscribe(channel.route, channel.callBack);
        }
    };

    return (
        <></>
    );
};

export default EncodeDecodeSocket;
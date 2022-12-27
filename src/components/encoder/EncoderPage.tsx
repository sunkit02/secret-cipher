import React, {ChangeEvent, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {SOCKET_URL} from "../../services/websocket-service";
import {
    Channel, DecodingRequest,
    DecodingResult,
    EncodingRequest,
    EncodingResult,
    OperationType
} from "../../models/models";
import {Client, Message, over} from "stompjs";
import KeyInputBar from "./KeyInputBar";
import InputOutputTextAreas from "./InputOutputTextAreas";
import SockJS from "sockjs-client";

interface EncoderPageProps {
    loggedIn: boolean;
    username: string;
}

// todo: optimize websocket connection to avoid reconnecting everytime the component is reloaded (lifting the state up?)

// todo: fix copy function for output byte array (current: copying an array of characters => desired: copy byte array in string form)
const EncoderPage: React.FC<EncoderPageProps> = ({loggedIn, username}) => {


    const [connected, setConnected] = useState<boolean>(false);
    const [operationType, setOperationType] = useState<OperationType>(OperationType.ENCODE);
    const [textAreaHeight, setTextAreaHeight] = useState<number>(200);
    const [key, setKey] = useState<string>("");

    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [copyOutput, setCopyOutput] = useState<number[] | string>([]);

    // @ts-ignore
    const [stompClient, ] = useState<Client | null>(over(new SockJS(SOCKET_URL)));


    const onConnected = () => {
        console.log("socket connected")

        // @ts-ignore
        for (let channel of channels) {
            stompClient.subscribe(channel.route, channel.callBack);
        }
    };

    const onError = () => {
        console.log("An error occurred...");
    }

    const connectToServer = () => {
        if (!connected) {
            stompClient.connect({}, onConnected, onError);
            setConnected(true);
        }
    };

    // todo: make this not reconnect on every refresh
    useEffect(() => {
        connectToServer();
    }, []);

    // @ts-ignore
    const onEncodingResultReceived = (message: Message) => {
        let encodingResult: EncodingResult = JSON.parse(message.body);
        setOutput(encodingResult.encodedString);
        setCopyOutput(encodingResult.encodedBytes);
    }

    // @ts-ignore
    const onDecodingResultReceived = (message: Message) => {
        let decodingResult: DecodingResult = JSON.parse(message.body);
        setOutput(decodingResult.decodedString);
        setCopyOutput(decodingResult.decodedBytes);
    }
    // @ts-ignore
    const [channels, ] = useState<Channel[]>([
        {
            route: "/user/topic/private-encode",
            callBack: onEncodingResultReceived
        },
        {
            route: "/user/topic/private-decode",
            callBack: onDecodingResultReceived
        }
    ]);


    // handles user input to the input text area
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let height = e.target.scrollHeight;
        let text = e.target.value;

        // updates the rendered input value
        // and sends encoding or decoding request to the server via websocket
        setInput(() => {
            if (operationType === OperationType.ENCODE) {
                let encodingRequest: EncodingRequest = {
                    key,
                    username,
                    message: text
                }
                sendEncodingRequest(encodingRequest);
            } else {
                let decodingRequest: DecodingRequest = {
                    key,
                    message: text,
                    username
                }
                sendDecodingRequest(decodingRequest);
            }
            return text;
        });

        // updates the text area height for both input and output text areas
        setTextAreaHeight(height);
    }


    // updates the operation type state when user selection changes
    const handleOperationTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newOperationType = e.target.value;
        console.info(`New encoding mode: "${newOperationType}"`);

        if (newOperationType === OperationType.ENCODE) {
            setOperationType(OperationType.ENCODE);
        } else {
            setOperationType(OperationType.DECODE);
        }
    };


    // send new message to the server
    const sendEncodingRequest = (encodingPayload: EncodingRequest) => {
        if (encodingPayload != null) {
            stompClient.send(
                "/app/private-encode",
                {},
                JSON.stringify(encodingPayload));
        }
    };


    // send new message to the server
    const sendDecodingRequest = (decodingPayload: DecodingRequest) => {
        if (decodingPayload != null) {
            stompClient.send(
                "/app/private-decode",
                {},
                JSON.stringify(decodingPayload)
            );
        }
    };

    if (!loggedIn) {
        console.error("User is not logged in. Redirecting to login page...");
        return <Navigate to={"/login"}/>
    }

    return (
        <article className="encoder">
            <h3>Encoder</h3>
            <KeyInputBar
                encodeKey={key}
                setKey={setKey}
                operationType={operationType}
                handleOperationTypeChange={handleOperationTypeChange}
            />
            <InputOutputTextAreas operationType={operationType}
                                  input={input}
                                  handleInputChange={handleInputChange}
                                  textAreaHeight={textAreaHeight}
                                  setTextAreaHeight={setTextAreaHeight}
                                  output={output}
                                  copyOutput={copyOutput}
            />
        </article>
    );
}

export default EncoderPage;
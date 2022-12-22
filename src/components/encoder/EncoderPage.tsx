import React, {ChangeEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {TbArrowsRight} from "react-icons/tb";

import TextAreaAutoResize from "react-textarea-autosize";
import {decodeString, encodeString} from "../../services/encoding-service";

interface EncoderPageProps {
    loggedIn: boolean;
}

const enum OperationType {
    ENCODE = "ENCODE",
    DECODE = "DECODE"
}

const EncoderPage: React.FC<EncoderPageProps> = ({loggedIn}) => {
    const [operationType, setOperationType] = useState<OperationType>(OperationType.ENCODE);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [key, setKey] = useState<string>("");

    const [textAreaHeight, setTextAreaHeight] = useState<number>(200);


    if (!loggedIn) {
        return <Navigate to={"/login"}/>
    }

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let height = e.target.scrollHeight;
        let text = e.target.value;

        setInput(text);
        if (operationType === OperationType.ENCODE) {
            setOutput(encodeString(text, key));
        } else {
            setOutput(decodeString(text, key));
        }
        setTextAreaHeight(height);
    }

    const handleOperationTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newOperationType = e.target.value;
        console.log(newOperationType);
        if (newOperationType === OperationType.ENCODE) {
            setOperationType(OperationType.ENCODE);
        } else {
            setOperationType(OperationType.DECODE);
        }
    };

    return (
        <article className="encoder">
            <h3>Encoder</h3>

            <div className="encoder__key-input-container">
                <input
                    className="encoder__key-input gen-input"
                    type="text"
                    onChange={(e) => setKey(e.target.value)}
                    placeholder="Enter key here"
                    value={key}
                />
                <label className="encoder__operation-type">
                    <input
                        className="encoder__operation-type"
                        type="radio"
                        name="operation-type"
                        value={OperationType.ENCODE}
                        onChange={handleOperationTypeChange}
                        checked={operationType === OperationType.ENCODE}
                    />
                    Encode
                </label>

                <label className="encoder__operation-type">
                    <input
                        className="encoder__operation-type"
                        type="radio"
                        name="operation-type"
                        value={OperationType.DECODE}
                        onChange={handleOperationTypeChange}
                        checked={operationType === OperationType.DECODE}
                    />
                    Decode
                </label>
            </div>
            <div className="encoder__input-container">
                <div className="encoder__input-title-container">
                    <span className="encoder__input-title">
                        {operationType === OperationType.ENCODE
                            ? "Decoded"
                            : "Encoded"}
                    </span>
                    <span className="encoder__input-arrow">
                    <TbArrowsRight style={{fontSize: "1.2rem"}}/>
                </span>
                    <span className="encoder__input-title">
                        {operationType === OperationType.ENCODE
                        ? "Encoded"
                        : "Decoded"}
                    </span>

                </div>
                <div className="encoder__textarea-container">
                    <TextAreaAutoResize
                        className="encoder__text-area"
                        onChange={handleInputChange}
                        onHeightChange={h => setTextAreaHeight(h)}
                        style={{
                            width: "50%",
                            resize: "none",
                            overflow: "hidden",
                            backgroundColor: "ghostwhite",
                            height: textAreaHeight,
                            border: "none",
                            borderRadius: "0 0 0 5px"
                        }}
                        placeholder="Enter message here"
                        value={input}
                    />
                    <div
                        id="encoder__output"
                        className="encoder__text-area"
                        style={{height: textAreaHeight}}
                    >
                        {output}
                    </div>
                </div>
            </div>
        </article>
    );
}

// todo: implement encoding and decoding logic

export default EncoderPage;
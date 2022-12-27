import React, {ChangeEvent} from "react";
import {OperationType} from "../../models/models";
import {TbArrowsRight} from "react-icons/tb";
import TextAreaAutoResize from "react-textarea-autosize";
import {MdContentCopy} from "react-icons/md";

interface InputOutputTextAreaProps {
    operationType: OperationType;
    input: string;
    // setInput: React.Dispatch<React.SetStateAction<string>>;
    handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    textAreaHeight: number;
    setTextAreaHeight: React.Dispatch<React.SetStateAction<number>>;
    output: string;
    copyOutput: number[] | string;
}

const InputOutputTextAreas: React.FC<InputOutputTextAreaProps> = ({
                                                                      operationType,
                                                                      input,
                                                                      handleInputChange,
                                                                      textAreaHeight,
                                                                      setTextAreaHeight,
                                                                      output,
                                                                      copyOutput
                                                                  }) => {
    return (
        <div className="encoder__input-container gen-container">
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
                <div className="encoder__textarea-sub-container">
                    <TextAreaAutoResize
                        className="encoder__text-area"
                        onChange={handleInputChange}
                        onHeightChange={h => setTextAreaHeight(h)}
                        style={{
                            resize: "none",
                            overflow: "hidden",
                            backgroundColor: "ghostwhite",
                            height: textAreaHeight,
                            border: "none",
                        }}
                        placeholder="Enter message here"
                        value={input}
                    />
                    <span
                        className="encoder__copy-btn"
                        onClick={() => navigator.clipboard.writeText(input.toString())}
                    ><MdContentCopy/></span>
                </div>
                <div
                    id="encoder__textarea-right-sub-container"
                    className="encoder__textarea-sub-container">
                    <div
                        id="encoder__output"
                        className="encoder__text-area"
                        style={{height: textAreaHeight}}
                    >
                        {output}
                    </div>
                    <span
                        className="encoder__copy-btn"
                        onClick={() => navigator.clipboard.writeText(`[${copyOutput.toString()}]`)}
                    ><MdContentCopy/></span>
                </div>
            </div>
        </div>
    );
}

export default InputOutputTextAreas;
import React, {ChangeEvent} from "react";
import {OperationType} from "../../models/encoder-models";

interface KeyInputBarProps {
    encodeKey: string;
    handleKeyChange: (e: ChangeEvent<HTMLInputElement>) => void;
    operationType: OperationType;
    handleOperationTypeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const KeyInputBar: React.FC<KeyInputBarProps> = ({
                                                     encodeKey,
                                                     handleKeyChange,
                                                     operationType,
                                                     handleOperationTypeChange
                                                 }) => {
    return (
        <div className="encoder__key-input-container">
            <input
                className="encoder__key-input gen-text-input"
                type="text"
                onChange={handleKeyChange}
                placeholder="Enter key here"
                value={encodeKey}
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
    );
}

export default KeyInputBar;
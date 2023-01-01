import React from "react";
import {PopUpMessage, PopUpMsgType} from "../../models/popup-models";

interface PopUpMessageBoxProps {
    popUpMessage: PopUpMessage;
}

const PopUpMessageBox: React.FC<PopUpMessageBoxProps> = ({popUpMessage}) => {
    return (
        <>
            {
                popUpMessage.type === PopUpMsgType.NONE
                    ? (<div></div>)
                    : popUpMessage.type === PopUpMsgType.ERROR ? (
                        <div className="login__pop-up-message error-message">{popUpMessage.message}</div>
                    ) : (
                        <div className="login__pop-up-message success-message">{popUpMessage.message}</div>
                    )
            }
        </>
    );
}

export default PopUpMessageBox;
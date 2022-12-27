const enum PopUpMsgType {
    "ERROR",
    "SUCCESS",
    NONE
}

type PopUpMessage = {
    type: PopUpMsgType,
    message?: string,
}

export {
    PopUpMsgType
}
export type { PopUpMessage }

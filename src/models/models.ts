const enum MsgType {
    "ERROR",
    "SUCCESS",
    NONE
}

type PopUpMessage = {
    type: MsgType,
    message?: string,
}

export {MsgType};
export type { PopUpMessage };

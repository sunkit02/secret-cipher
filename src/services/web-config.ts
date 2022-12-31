const API_URL = "http://localhost:8080/api";
const ENCODING_URL = API_URL + "/encoding/encode";
const DECODING_URL = API_URL + "/encoding/decode";

// Messages controller
const SEND_NEW_MESSAGE_URL = API_URL + "/messages/send";


// User controller
const GET_SENT_MESSAGES_URL = API_URL + "/user/sent-messages";


// Auth controller
const REGISTER_URL = API_URL + "/auth/register";

export {
    API_URL,
    DECODING_URL,
    ENCODING_URL,
    SEND_NEW_MESSAGE_URL,
    GET_SENT_MESSAGES_URL,
    REGISTER_URL
};
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";

import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";

import EncoderPage from "./components/encoder/EncoderPage";
import MessagePage from "./components/message/MessagePage";

import "./App.css";
import "./css/header.css";
import "./css/login.css";
import "./css/sign-up.css";
import "./css/home.css";
import "./css/encoder.css";
import "./css/message.css";

import MessagesReceivedTab from "./components/message/received/MessagesReceivedTab";
import MessagesSentTab from "./components/message/sent/MessagesSentTab";
import SendNewMessageTab from "./components/message/send/SendNewMessageTab";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import {MessageReceived, MessageSent} from "./models/message-models";
import {JwtTokens} from "./models/models";

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("Guest");
    const [messagesSent, setMessagesSent] = useState<MessageSent[]>([]);
    const [messagesReceived, setMessagesReceived] = useState<MessageReceived[]>([]);

    const [jwtTokens, setJwtTokens] = useState<JwtTokens | null>({accessToken: "", refreshToken: ""});

    return (
        <>
            <Header
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                username={username}
                setUsername={setUsername}
            />
            <div className="body">
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="encoder" element={<EncoderPage loggedIn={loggedIn} username={username}/>}/>
                    <Route path="message" element={<MessagePage loggedIn={loggedIn} username={username}/>}>
                        <Route path="send" element={<SendNewMessageTab username={username} messagesSent={messagesSent} setMessagesSent={setMessagesSent} jwtTokens={jwtTokens}/>}/>
                        <Route path="received" element={<MessagesReceivedTab messagesReceived={messagesReceived} setMessagesReceived={setMessagesReceived} jwtTokens={jwtTokens} username={username}/>}/>
                        <Route path="sent" element={<MessagesSentTab username={username} messagesSent={messagesSent} setMessagesSent={setMessagesSent} jwtTokens={jwtTokens}/>}/>
                    </Route>
                    <Route path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername} setMessagesSent={setMessagesSent} setMessagesReceived={setMessagesReceived} setJwtTokens={setJwtTokens}/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

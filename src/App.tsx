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

import ReceivedMessageTab from "./components/message/received/ReceivedMessageTab";
import SentMessageTab from "./components/message/sent/SentMessageTab";
import SendNewMessageTab from "./components/message/send/SendNewMessageTab";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import {SecretMessage} from "./models/message-models";

const App: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("Guest");


    const [messagesSent, setMessagesSent] = useState<SecretMessage[]>([]);

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
                        <Route path="send" element={<SendNewMessageTab username={username} messagesSent={messagesSent} setMessagesSent={setMessagesSent}/>}/>
                        <Route path="received" element={<ReceivedMessageTab />}/>
                        <Route path="sent" element={<SentMessageTab />}/>
                    </Route>
                    <Route path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

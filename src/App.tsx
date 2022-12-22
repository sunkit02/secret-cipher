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

import ReceivedMessagePage from "./components/message/received/ReceivedMessagePage";
import SentMessagePage from "./components/message/sent/SentMessagePage";
import SendMessagePage from "./components/message/send/SendMessagePage";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("Guest");


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
                    <Route path="encoder" element={<EncoderPage loggedIn={loggedIn}/>}/>
                    <Route path="message" element={<MessagePage loggedIn={loggedIn}/>}>
                        <Route path="send" element={<SendMessagePage />}/>
                        <Route path="received" element={<ReceivedMessagePage />}/>
                        <Route path="sent" element={<SentMessagePage />}/>
                    </Route>
                    <Route path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

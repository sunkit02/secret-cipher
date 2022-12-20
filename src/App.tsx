import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";

import Encoder from "./components/encoder/Encoder";
import Message from "./components/message/Message";

import "./App.css";
import "./css/header.css";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");


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
                    <Route index element={<Home/>}/>
                    <Route path={"/encoder"} element={<Encoder/>}/>
                    <Route path={"/message"} element={<Message/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

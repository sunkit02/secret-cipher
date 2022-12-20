import React from "react";
import {Navigate} from "react-router-dom";

interface EncoderPageProps {
    loggedIn: boolean;
}

const EncoderPage: React.FC<EncoderPageProps> = ({loggedIn}) => {
    if (!loggedIn) {
        return <Navigate to={"/login"}/>
    }
    return (
        <>
            <h3>Encoder</h3>
        </>
    );
}

export default EncoderPage;
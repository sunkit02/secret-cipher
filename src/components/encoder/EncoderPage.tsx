import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface EncoderPageProps {
    loggedIn: boolean;
}

const EncoderPage: React.FC<EncoderPageProps> = ({loggedIn}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!loggedIn)
            navigate("/login");
    },[loggedIn, navigate])
    return (
        <>
            <h3>Encoder</h3>
        </>
    );
}

export default EncoderPage;
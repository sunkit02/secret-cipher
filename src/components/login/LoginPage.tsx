import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../../api/auth-service";
import {User} from "../../api/models";
import {MsgType, PopUpMessage} from "../../models/models";

interface LoginPageProps {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginPageProps> = ({
                                                 setUsername,
                                                 loggedIn,
                                                 setLoggedIn
                                             }) => {

    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");

    const [popUpMessage, setPopUpMessage] = useState<PopUpMessage>({type: MsgType.NONE});

    const formRef = useRef<HTMLFormElement>(null);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        let user: User = {
            username: usernameInput,
            password: passwordInput
        };
        await login(user)
            .then(r => {
                console.log(r.user.username + " logged in successfully!");
                setUsername(usernameInput);
                setLoggedIn(true);

                // show login success popup message
                setPopUpMessage({
                    type: MsgType.SUCCESS,
                    message: "Login success!"
                })

                // slow down execution so user can see popup message
                setTimeout(
                    () => {
                        navigate("/message",
                            {
                                replace: true,
                            });
                    }, 300);
            })
            .catch(err => {
                console.log(err);

                // show error as popup message
                setPopUpMessage({
                    type: MsgType.ERROR,
                    message: err,
                });
                // @ts-ignore
                formRef.current.reset();

                // hide popup message
                setTimeout(() => {
                        setPopUpMessage({
                            type: MsgType.NONE
                        })
                    }
                    , 1500)
            });

    };

    const handleSignUp = () => {
        navigate("/signup")
    }

    return (
        <article className="login">
            <div className="login__form-container gen-container">
                <h2 className="login__form-title"
                >Please Enter</h2>
                {
                    popUpMessage.type === MsgType.NONE
                        ? (<div></div>)
                        : popUpMessage.type === MsgType.ERROR ? (
                            <div className="login__pop-up-message error-message">{popUpMessage.message}</div>
                        ) : (
                            <div className="login__pop-up-message success-message">{popUpMessage.message}</div>
                        )
                }
                <form
                    className="login__form"
                    ref={formRef}
                    onSubmit={handleLogin}
                >
                    <input
                        className="login__input gen-input"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsernameInput(e.target.value)}/>
                    <input
                        className="login__input gen-input"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <button
                        id="login__login-btn"
                        className="login__login-btn gen-btn rounded-btn"
                    >Login
                    </button>
                </form>
                <hr
                    className="login__strike-through"
                    data-content="OR"
                />
                <button
                    id="login__sign-up-btn"
                    className="gen-btn rounded-btn"
                    onClick={handleSignUp}
                >
                    Sign Up
                </button>
            </div>
        </article>
    );
}
// todo: implement more input validation before sending request to server
export default LoginPage;
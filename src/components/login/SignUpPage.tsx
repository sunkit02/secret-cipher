import React, {useState} from "react";
import {signUp} from "../../services/auth-service";
import {SignUpRequest} from "../../models/models";
import {PopUpMessage, PopUpMsgType} from "../../models/popup-models";
import {useNavigate} from "react-router-dom";
import {parseErrorMessage} from "../../utils/error-utils";
import PopUpMessageBox from "../popups/PopUpMessage";

const SignUpPage: React.FC = () => {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState<string>("");

    const [popUpMessage, setPopUpMessage] = useState<PopUpMessage>({type: PopUpMsgType.NONE});
    const [disableSignUpBtn, setDisableSignUpBtn] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPopUpMessage({
                type: PopUpMsgType.ERROR,
                message: "Passwords don't match!"
            });
            return;
        }

        let newUser: SignUpRequest = {
            username: username.trim(),
            password: password.trim(),
            email: email.trim(),
        }

        // todo: disable sign up button
        setDisableSignUpBtn(true);

        await signUp(newUser)
            .then(r => {
                console.log(r)
                console.log(`Successfully registered user ${r.username}`);
                setPopUpMessage({
                    type: PopUpMsgType.SUCCESS,
                    message: "Registration successful!"
                });

                setTimeout(() => {
                    navigate("/login");
                }, 500)
            })
            .catch(err => {
                err = parseErrorMessage(err);
                setPopUpMessage({
                    type: PopUpMsgType.ERROR,
                    message: err,
                });

                // todo: enable sign up button
                setDisableSignUpBtn(false);

                setTimeout(() => {
                    setPopUpMessage({type: PopUpMsgType.NONE})
                }, 1500);
            });
    }

    return (
        <article className="sign-up">
            <div className="sign-up__form-container gen-container">
                <h2 className="sign-up__form-title"
                >Please Fill In</h2>
                <PopUpMessageBox popUpMessage={popUpMessage}/>
                <form
                    className="sign-up__form"
                    onSubmit={handleSignUp}
                >
                    <label className="sign-up__label">
                        Username
                        <input
                            className="sign-up__input gen-text-input"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>

                    <label className="sign-up__label">
                        Password
                        <input
                            className="sign-up__input gen-text-input"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <label className="sign-up__label">
                        Confirm-password
                        <input
                            className="sign-up__input gen-text-input"
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <label className="sign-up__label">
                        Email
                        <input
                            className="sign-up__input gen-text-input"
                            type="email"
                            placeholder="Email (optional)"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <div className="sign-up__sign-up-btn-container">
                        <button
                            id="sign-up__sign-up-btn"
                            className="sign-up__sign-up-btn gen-btn rounded-btn"
                            disabled={disableSignUpBtn}
                        >
                            <span className="text--nowrap">Sign Up</span>
                        </button>
                    </div>
                </form>
            </div>
        </article>
    );
}

export default SignUpPage;
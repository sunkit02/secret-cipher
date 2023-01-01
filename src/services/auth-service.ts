import {LoginResponse, SignUpRequest, User, UsernameAndPassword} from "../models/models";
import {LOGIN_URL, REGISTER_URL} from "./web-config";

async function login(loginUser: UsernameAndPassword): Promise<LoginResponse> {

    return await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginUser)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        return response.text().then(errorMessage => {
            return Promise.reject(errorMessage);
        });
    });
}

async function signUp(signUpRequest: SignUpRequest): Promise<User> {
    return await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpRequest)
    }).then(response => {
        console.log(response);
        if (response.ok) {
            return response.json()
        }
        return response.text()
            .then(errorMessage => {
                console.log("Error: ")
                console.log(errorMessage)
                return Promise.reject<string>(errorMessage);
            });
    })

}


export {login, signUp};
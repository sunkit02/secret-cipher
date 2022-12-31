import {LoginResponse, SignUpRequest, User, UsernameAndPassword} from "../models/models";
import {REGISTER_URL} from "./web-config";


const tempUsers: UsernameAndPassword[] = [
    {
        username: "sunkit25",
        password: "password"
    }
]

function login(loginUser: UsernameAndPassword): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
            for (let user of tempUsers) {
                if (user.username === loginUser.username) {
                    user.password === loginUser.password
                        ? resolve({user: {...loginUser, email: "", messagesSent: [], messagesReceived: []}})
                        : reject("Invalid login credentials!")
                }
            }
            reject("User doesn't exist");
        }
    );
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
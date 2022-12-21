import {LoginResponse, SignUpResponse, User} from "./models";


const tempUsers: User[] = [
    {
        username: "sunkit25",
        password: "password"
    }
]

function login(loginUser: User): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        for (let user of tempUsers) {
            if (user.username === loginUser.username) {
                user.password === loginUser.password
                    ? resolve({user: loginUser})
                    : reject("Invalid login credentials!")
            }
        }
        reject("User doesn't exist");
    });
}

async function signUp(newUser: User): Promise<SignUpResponse> {
    return new Promise((resolve, reject) => {
        for (let user of tempUsers) {
            if (user.username === newUser.username) {
                reject("Username already taken");
            }
        }

        if (newUser.username.length < 6) {
            reject("Username must be at least 6 characters long")
        }

        if (newUser.password.length < 8) {
            reject("Password must be at least 8 characters long")
        }

        tempUsers.push(newUser);
        resolve({user: newUser});
    });
}


export {login, signUp};
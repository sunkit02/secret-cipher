type User = {
    username: string,
    password: string,
}

type LoginResponse = {
    user: User,
};

type SignUpResponse = {
    user: User,
}

export type {User, SignUpResponse, LoginResponse};
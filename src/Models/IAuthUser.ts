export interface IAuthUser {
    uid: string;
    email: string;
    password: string;
    passwordHash: string;
    passwordSalt: string;
    refreshToken: string;
    role: number;
    tokenCreated: Date;
    tokenExpires: Date;
};
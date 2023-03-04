export interface ITokenUser {
    Uid?: string;
    email: string;
    password: string;
    role: number;
    tokenCreated: Date;
    tokenExpires: Date;
    refreshToken: string;
};
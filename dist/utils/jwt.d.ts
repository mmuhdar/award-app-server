interface TokenPayload {
    id: string;
    name: string;
    email: string;
}
export declare const createToken: (payload: TokenPayload) => Promise<string>;
export declare const verifyToken: (token: string) => Promise<any>;
export {};

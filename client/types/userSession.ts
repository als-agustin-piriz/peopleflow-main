export interface UserSession {
    name: string;
    email: string;
    modules: string[];
    isLoggedIn: boolean;
}

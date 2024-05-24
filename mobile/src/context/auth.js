import { createContext } from "react";

export const AuthContext = createContext({
    isSignIn: false,
    setSignIn: () => { },
});
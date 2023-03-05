import axios from "axios";
import {createContext} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const login = async (inputs) => {
        const {data} = await axios.post(
            "http://localhost:8080/login",
            inputs
        );
        console.log('user', JSON.stringify(data))
        localStorage.setItem("userInfo", JSON.stringify(data));
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
    };

    return (
        <AuthContext.Provider value={{login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
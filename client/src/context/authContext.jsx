import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../config/instance";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const initialState = {
    name: "",
    role: "",
    token: "",
    isLoggedIn: false,
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const onLogin = (userData) => {
        const _userData = { ...userData, isLoggedIn: true }
        setUser(_userData)
        localStorage.setItem("user", JSON.stringify(_userData));

        instance.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

    };

    const onLogout = () => {
        setUser(initialState);
        instance.defaults.headers.common['Authorization'] = ``;

        localStorage.removeItem("user");
        toast.success("Logged out successfully")

        navigate('/')
    };

    return (
        <AuthContext.Provider value={{ user, setUser, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

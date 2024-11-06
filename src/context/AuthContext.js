// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for saved user data in localStorage on initial load
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("jwtToken"));
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("jwtToken", JSON.stringify(userData)); // Store user data in localStorage
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("jwtToken"); // Remove user data from localStorage
    };

    return ( <
        AuthContext.Provider value = {
            { user, login, logout } } > { children } <
        /AuthContext.Provider>
    );
};
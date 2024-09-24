"use client"

import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children, value }) => (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
);

export const useUser = () => useContext(UserContext);

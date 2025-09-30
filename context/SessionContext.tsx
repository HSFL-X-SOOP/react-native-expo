import React, { createContext, ReactNode, useContext, useState } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'expo-router';

export interface SessionInfo {
    accessToken: string;
    refreshToken: string | null;
    loggedInSince: Date;
    lastTokenRefresh: Date | null;
}

interface AuthContextType {
    session?: SessionInfo;
    login: (session: SessionInfo) => void;
    logout: () => void;
}

const SessionContext = createContext<AuthContextType>({
    session: undefined,
    login: () => {
    },
    logout: () => {
    },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [stored, setStored] = useLocalStorage<SessionInfo>('session');
    const router = useRouter();

    const login = (newSession: SessionInfo) => {
        setStored(newSession);
    };
    const logout = () => {
        setStored(undefined);
        router.push('/');
    };

    return (
        <SessionContext.Provider value={{session: stored, login, logout}}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

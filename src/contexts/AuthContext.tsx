"use client";

import {User} from "@/entities/User";
import {createContext, ReactNode, useContext, useState} from "react";

import { useRouter } from 'next/navigation';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    const handleLogin = ({user}: {user: User}) => {
        setUser(user);
    }

    const handleLogout = () => {
        setUser(null);
        router.push('/');
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )

}
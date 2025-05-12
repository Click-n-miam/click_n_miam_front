"use client";

import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

import { useAuth } from "@/contexts/AuthContext";
import {usePathname} from "next/navigation";


export default function Header() {
    // const { user, logout } = useAuth();
    // const navigate = useNavigate();

    // const handleLogout = () => {
    //     logout();
    //     navigate('/');
    // };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { user, handleLogout } = useAuth();

    const pathname = usePathname();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <UtensilsCrossed size={28} className="text-orange-700" />
                    <h1 className="text-xl font-bold text-orange-700">Click`n`Miam</h1>
                </div>


                {pathname}

                {user && (
                    <div className="flex items-center">
                        <span className="mr-4 text-sm text-gray-600">{user.email}</span>
                        <button
                            onClick={() => handleLogout()}
                            className="text-sm text-orange-600 hover:text-orange-800 transition-colors"
                        >
                            Se déconnecter
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
"use client";

import React, {ReactNode, useEffect} from 'react';

import Header from './Header';
import Footer from './Footer';

import { useAuth } from "@/contexts/AuthContext";
import {usePathname, useRouter} from "next/navigation";
import SessionOrdersPanel from "@/components/SessionOrdersPanel";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // const location = useLocation();
    // const showPanel = location.pathname !== '/' && location.pathname !== '/payment';
    const showPanel = false;
    const router = useRouter();
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { user } = useAuth();

    const pathname = usePathname();

    useEffect(() => {
        if (!user && pathname !== '/') {
            router.push('/');
        }
    }, [user]);

    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />
            <div className="flex-grow flex">
                <main className={`flex-grow container mx-auto px-4 py-6 ${showPanel ? 'mr-80' : ''}`}>
                    {children}
                </main>
                {user && (
                    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg ">
                        <SessionOrdersPanel />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
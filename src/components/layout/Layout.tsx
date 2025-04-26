import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
// import SessionOrdersPanel from '../Orders/SessionOrdersPanel';
// import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // const location = useLocation();
    // const showPanel = location.pathname !== '/' && location.pathname !== '/payment';
    const showPanel = false;

    return (
        <div className="flex flex-col min-h-screen bg-orange-50">
            <Header />
            <div className="flex-grow flex">
                <main className={`flex-grow container mx-auto px-4 py-6 ${showPanel ? 'mr-80' : ''}`}>
                    {children}
                </main>
                {showPanel && (
                    <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg mt-[73px]">
                        {/*<SessionOrdersPanel />*/}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
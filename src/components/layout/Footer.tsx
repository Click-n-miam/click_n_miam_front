import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-orange-700 text-white py-4">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">© {new Date().getFullYear()} Click`n`Miam. Tous droits réservées.</p>
            </div>
        </footer>
    );
};

export default Footer;
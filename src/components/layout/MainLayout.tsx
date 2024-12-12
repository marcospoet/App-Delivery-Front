import React, { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileMenu from './MobileMenu';
import DesktopHeader from './DesktopHeader';
import Navigation from '../Navigation';

interface MainLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MainLayout = ({ children, activeTab, onTabChange }: MainLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleTabChange = (tab: string) => {
        onTabChange(tab);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <MobileHeader
                isMenuOpen={isMobileMenuOpen}
                onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
            <DesktopHeader />

            <MobileMenu
                isOpen={isMobileMenuOpen}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            <div className="hidden sm:block">
                <Navigation activeTab={activeTab} setActiveTab={onTabChange} />
            </div>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
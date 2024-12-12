import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MobileHeaderProps {
    isMenuOpen: boolean;
    onToggleMenu: () => void;
}

const MobileHeader = ({ isMenuOpen, onToggleMenu }: MobileHeaderProps) => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className={`sm:hidden flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-b'}`}>
            <h1 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                App-Delivery
            </h1>
            <div className="flex items-center">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? (
                        <Sun className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <Moon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
                <button
                    onClick={onToggleMenu}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                    {isMenuOpen ? (
                        <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default MobileHeader;
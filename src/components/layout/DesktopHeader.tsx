import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DesktopHeader = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className="hidden sm:flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                App-Delivery
            </h1>
            <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Cambiar tema"
            >
                {isDarkMode ? (
                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
            </button>
        </div>
    );
};

export default DesktopHeader;
import { Users, UserCircle, Coffee, ShoppingBag, List } from 'lucide-react';

interface MobileMenuProps {
    isOpen: boolean;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MobileMenu = ({ isOpen, activeTab, onTabChange }: MobileMenuProps) => {
    const menuItems = [
        { id: 'vendors', icon: Users, label: 'Vendedores' },
        { id: 'clients', icon: UserCircle, label: 'Clientes' },
        { id: 'categories', icon: List, label: 'Categorías' },
        { id: 'menu', icon: Coffee, label: 'Items Menu' },
        { id: 'orders', icon: ShoppingBag, label: 'Pedidos' },
    ];

    if (!isOpen) return null;

    return (
        <div className="sm:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700">
            <div className="px-2 py-3">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === item.id
                                ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MobileMenu;
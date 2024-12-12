import { Users, UserCircle, Coffee, ShoppingBag, List } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: 'vendors', icon: Users, label: 'Vendedores' },
    { id: 'clients', icon: UserCircle, label: 'Clientes' },
    { id: 'categories', icon: List, label: 'Categorías' },
    { id: 'menu', icon: Coffee, label: 'Items Menu' },
    { id: 'orders', icon: ShoppingBag, label: 'Pedidos' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
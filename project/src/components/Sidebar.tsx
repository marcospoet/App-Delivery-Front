import { Users, UserCircle, Coffee, ShoppingBag, List } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void 
}) => {
  const menuItems = [
    { id: 'vendors', icon: Users, label: 'Vendedores' },
    { id: 'clients', icon: UserCircle, label: 'Clientes' },
    { id: 'categories', icon: List, label: 'Categorías' },
    { id: 'menu', icon: Coffee, label: 'Items Menu' },
    { id: 'orders', icon: ShoppingBag, label: 'Pedidos' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center p-4 hover:bg-gray-50 transition-colors ${
            activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
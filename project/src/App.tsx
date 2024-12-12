import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import SearchBar from './components/SearchBar';
import DataTable from './components/DataTable';
import AddButton from './components/AddButton';
import Modal from './components/Modal';
import VendorForm from './components/forms/VendorForm';
import ClientForm from './components/forms/ClientForm';
import MenuItemForm from './components/forms/MenuItemForm';
import OrderForm from './components/forms/OrderForm';
import CategoryForm from './components/forms/CategoryForm';
import { getVendedores, deleteVendedor } from './services/vendedorService';
import { getClient, deleteClient } from './services/clienteService';
import { getCategories, deleteCategory } from './services/categoriaService';
import { getAllItemsMenu, deleteItemMenu } from './services/itemsMenuService';
import { getPedidos, deletePedido, getDetallesPedido, getPedidoById } from './services/pedidoService';
import { OrderDetail, OrderDetailsModal } from './components/OrderDetailsModals';
import MainLayout from './components/layout/MainLayout';

function App() {
  const [clients, setClients] = useState<any[]>([]);
  const [vendors, setVendors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [itemMenu, setItemsMenu] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('vendors');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  const handleShowOrderDetails = async (orderId: number) => {
    try {
      const detalles = await getDetallesPedido(orderId); // Llama al servicio para obtener detalles
      setOrderDetails(detalles); // Actualiza el estado con los detalles obtenidos
      setIsOrderDetailsModalOpen(true); // Abre el modal
    } catch (error) {
      console.error('Error al obtener detalles del pedido:', error);
    }
  };
  const vendorsColumns = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'direccion', header: 'Dirección' },
    { key: 'latitud', header: 'Latitud' },
    { key: 'longitud', header: 'Longitud' }
  ];

  const clientsColumns = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'direccion', header: 'Dirección' },
    { key: 'email', header: 'Email' },
    { key: 'cuit', header: 'CUIT' },
    { key: 'latitud', header: 'Latitud' },
    { key: 'longitud', header: 'Longitud' }
  ];

  const menuColumns = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'descripcion', header: 'Descripción' },
    { key: 'precio', header: 'Precio' },
    { key: 'categoria', header: 'Categoría' },
    { key: 'peso', header: 'Peso' },
    { key: 'tipo', header: 'Tipo' },
    { key: 'graduacion', header: 'Graduación' },
    { key: 'tamanio', header: 'Tamaño' },
    { key: 'calorias', header: 'Calorías' },
    { key: 'aptoVegano', header: 'Apto Vegano' },
    { key: 'aptoCeliaco', header: 'Apto Celíaco' },
    { key: 'pesoSinEnvase', header: 'Peso Sin Envase' }
  ];

  const ordersColumns = [
    { key: 'id', header: 'ID' },
    { key: 'clienteId', header: 'Cliente ID' },
    { key: 'vendedorId', header: 'Vendedor ID' },
    { key: 'precioTotal', header: 'Precio Total' },
    { key: 'estado', header: 'Estado' }
  ];

  const categoriesColumns = [
    { key: 'id', header: 'ID' },
    { key: 'descripcion', header: 'Descripción' },
    { key: 'tipoItem', header: 'Tipo Item' }
  ];

  const filteredOrders = orders.filter((order) =>
        order.id.toString().includes(searchQuery)
  );

  const filteredItemsMenu = itemMenu.filter((item) =>
      item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toString().includes(searchQuery)
  );

  const filteredCategories = categories.filter((category) =>
      category.id.toString().includes(searchQuery) // Búsqueda por ID
  );

  const filteredClients = clients.filter((client) =>
      client.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVendors = vendors.filter((vendor) =>
      vendor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getActiveData = () => {
    switch (activeTab) {
      case 'vendors':
        return filteredVendors;
      case 'clients':
        return filteredClients;
      case 'menu':
        return filteredItemsMenu;
      case 'orders':
        return filteredOrders;
      case 'categories':
        return filteredCategories;
      default:
        return [];
    }
  };

  const getModalTitle = () => {
    const action = modalMode === 'add' ? 'Agregar' : 'Editar';
    switch (activeTab) {
      case 'vendors':
        return `${action} Vendedor`;
      case 'clients':
        return `${action} Cliente`;
      case 'menu':
        return `${action} Item Menu`;
      case 'orders':
        return `${action} Pedido`;
      case 'categories':
        return `${action} Categoría`;
      default:
        return 'Modal';
    }
  };

  useEffect(() => {
    if (activeTab === 'vendors') {
      fetchVendors();
    }
    if (activeTab === 'clients') {
      fetchClients();
    }
    if (activeTab === 'categories') {
      fetchCategories();
    }
    if (activeTab === 'menu') {
      fetchMenuItems();
    }
    if(activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const data = await getPedidos(); // Obtener los datos de los pedidos
      const formattedData = data.map((pedido) => ({
        id: pedido.id,
        clienteId: pedido.clienteId || 'N/A',
        vendedorId: pedido.vendedorId || 'N/A',
        precioTotal: pedido.precioTotal !== null ? pedido.precioTotal.toFixed(2) : '0.00',
        estado: pedido.estado || 'PENDIENTE',
      }));
      setOrders(formattedData); // Actualizar el estado de pedidos con los datos formateados
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const data = await getAllItemsMenu();
      // @ts-ignore
      const formattedData = data.map((item: any) => ({
        id: item.id,
        nombre: item.nombre || 'N/A',
        descripcion: item.descripcion || 'Sin descripción',
        precio: item.precio !== null && item.precio !== undefined ? item.precio : 'N/A',
        categoria: item.categoria?.descripcion || 'Sin categoría',
        peso: item.peso !== null && item.peso !== undefined ? item.peso : '-',
        tipo: item.tipoItem || 'N/A',
        graduacion: item.graduacionAlcoholica !== null && item.graduacionAlcoholica !== undefined ? item.graduacionAlcoholica : '-',
        tamanio: item.tamanio !== null && item.tamanio !== undefined ? item.tamanio : 'N/A',
        calorias: item.calorias !== null && item.calorias !== undefined ? item.calorias : '-',
        aptoVegano: item.aptoVegano !== null ? (item.aptoVegano ? 'Sí' : 'No') : 'N/A',
        aptoCeliaco: item.aptoCeliaco !== null ? (item.aptoCeliaco ? 'Sí' : 'No') : 'N/A',
        pesoSinEnvase: item.pesoSinEnvase !== null && item.pesoSinEnvase !== undefined ? item.pesoSinEnvase : 'N/A',
      }));
      setItemsMenu(formattedData);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const data = await getClient(); // Obtener los datos de los clientes
      // @ts-ignore
      const formattedData = data.map((client) => ({
        ...client,
        latitud: client.coordenada?.lat || 'N/A',
        longitud: client.coordenada?.lng || 'N/A',
      }));
      setClients(formattedData); // Actualizar el estado de los clientes con los datos formateados
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories(); // Llama a la API para obtener las categorías
      const formattedData = data.map((category) => ({
        id: category.id,
        descripcion: category.descripcion || 'Sin descripción', // Valor predeterminado si falta
        tipoItem: category.tipoItem || 'N/A', // Valor predeterminado si falta
      }));
      setCategories(formattedData); // Actualiza el estado de categorías
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchVendors = async () => {
    try {
      const data = await getVendedores();
      const formattedData = data.map((vendor) => ({
        ...vendor,
        latitud: vendor.coordenada?.lat || 'N/A',
        longitud: vendor.coordenada?.lng || 'N/A',
      }));
      setVendors(formattedData);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const handleDelete = async (item: { id: number }) => {
    if (window.confirm('¿Está seguro que desea eliminar este registro?')) {
      try {
        if (activeTab === 'vendors') {
          // Eliminar un vendedor
          await deleteVendedor(item.id);
          setVendors((prevVendors) =>
              prevVendors.filter((vendor) => vendor.id !== item.id)
          );
        } else if (activeTab === 'clients') {
          // Eliminar un cliente
          await deleteClient(item.id);
          setClients((prevClients) =>
              prevClients.filter((client) => client.id !== item.id)
          );
        } else if (activeTab === 'categories') {
          // Eliminar una categoría
          await deleteCategory(item.id);
          setCategories((prevCategories) =>
              prevCategories.filter((category) => category.id !== item.id)
          );
        } else if (activeTab === 'menu') {
          // Eliminar un ítem del menú
          await deleteItemMenu(item.id); // Llama a la función del servicio
          setItemsMenu((prevItems) =>
              prevItems.filter((menuItem) => menuItem.id !== item.id)
          );
        } else if (activeTab === 'orders') {
            await deletePedido(item.id); // Llama a la función del servicio para eliminar un pedido
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.id !== item.id)
            );
        } else {
          console.error('Tipo desconocido para eliminar:', activeTab);
        }
      } catch (error) {
        console.error(`Error eliminando registro en ${activeTab}:`, error);
      }
    }
  };

  const handleAdd = () => {
    setModalMode('add');
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = async (item: any) => {
    setModalMode('edit');
    try {
      let fullData = item;
      if (activeTab === 'orders') {
        console.log(`Fetching full data for order ID: ${item.id}`);
        fullData = await getPedidoById(item.id);
      }

      setEditingItem(fullData);
      setShowModal(true);
    } catch (error) {
      console.error('Error al obtener los datos para editar:', error);
    }
  };


  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setShowModal(false);
    fetchVendors(); // Fetch updated data
    fetchClients();
    fetchCategories();
    fetchMenuItems();
    fetchOrders();
  };

  const renderForm = () => {
    const props = {
      onSubmit: handleSubmit,
      initialData: editingItem,
      onCancel: () => setShowModal(false)
    };

    switch (activeTab) {
      case 'vendors':
        return <VendorForm {...props} setVendors={setVendors} />;
      case 'clients':
        return <ClientForm {...props} setClients={setClients} />;
      case 'menu':
        return <MenuItemForm {...props} />;
      case 'orders':
        return <OrderForm {...props} />;
      case 'categories':
        return <CategoryForm {...props} setCategories={setCategories} />;
      default:
        return null;
    }
  };


  return (
      <ThemeProvider>
        <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <SearchBar onSearch={setSearchQuery} />
                <AddButton
                    onClick={handleAdd}
                    label={`Agregar ${
                        activeTab === 'vendors' ? 'Vendedor' :
                            activeTab === 'clients' ? 'Cliente' :
                                activeTab === 'menu' ? 'Item Menu' :
                                    activeTab === 'categories' ? 'Categoría' :
                                        'Pedido'
                    }`}
                />
              </div>

              <div className="overflow-hidden">
                <DataTable
                    columns={
                      activeTab === 'vendors'
                          ? vendorsColumns
                          : activeTab === 'clients'
                              ? clientsColumns
                              : activeTab === 'menu'
                                  ? menuColumns
                                  : activeTab === 'orders'
                                      ? ordersColumns
                                      : categoriesColumns
                    }
                    data={getActiveData()}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showOrderDetails={activeTab === 'orders'}
                    // @ts-ignore
                    onShowOrderDetails={handleShowOrderDetails}
                />
                <OrderDetailsModal
                    isOpen={isOrderDetailsModalOpen}
                    onClose={() => setIsOrderDetailsModalOpen(false)}
                    orderDetails={orderDetails}
                />
              </div>
            </div>
          </div>

          <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={getModalTitle()}
          >
            {renderForm()}
          </Modal>
        </MainLayout>
      </ThemeProvider>
  );
}

export default App;
import axios from 'axios';

const BASE_URL = 'https://app-delivery-web-production-4742.up.railway.app/pedidos';

// Obtiene todos los pedidos y retorna un array de Pedido
export const getPedidos = async (): Promise<any[]> => {
    try {
        const response = await axios.get<any[]>(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Obtiene un pedido por ID
export const getPedidoById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get<any>(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw error;
    }
};

// Crea un nuevo pedido
export const createPedido = async (data: Omit<any, 'id'>): Promise<any> => {
    try {
        const response = await axios.post<any>(BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Actualiza un pedido existente
export const updatePedido = async (id: number, data: Partial<any>): Promise<any> => {
    try {
        const response = await axios.put<any>(`${BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

// Elimina un pedido
export const deletePedido = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};

// Cambia el estado de un pedido
export const cambiarEstadoPedido = async (id: number, nuevoEstado: string): Promise<void> => {
    try {
        await axios.put(`${BASE_URL}/${id}/estado`, null, { params: { nuevoEstado } });
    } catch (error) {
        console.error('Error changing order status:', error);
        throw error;
    }
};

// Obtiene los detalles de un pedido por ID
export const getDetallesPedido = async (id: number): Promise<any[]> => {
    try {
        console.log(`Fetching detalles de pedido para ID: ${id}`); // Debug
        const response = await axios.get<any[]>(`${BASE_URL}/${id}/detalles`);
        console.log('Detalles recibidos del backend:', response.data); // Debug
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};
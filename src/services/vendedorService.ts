import axios from 'axios';

const BASE_URL = 'https://app-delivery-web-production.up.railway.app';
// Obtiene todos los vendedores y retorna un array de Vendedor
export const getVendedores = async (): Promise<any[]> => {
    try {
        const response = await axios.get<any[]>(`${BASE_URL}/vendedor/mostrarTodos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vendors:', error);
        throw error;
    }
};

// Obtiene un vendedor por ID
export const getVendedorById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get<any>(`${BASE_URL}/vendedor/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vendor by ID:', error);
        throw error;
    }
};

// Crea un nuevo vendedor
export const createVendedor = async (data: Omit<any, 'id'>): Promise<any> => {
    try {
        const response = await axios.post<any>(`${BASE_URL}/vendedor/crearVendedor`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating vendor:', error);
        throw error;
    }
};

// Actualiza un vendedor existente
export const updateVendedor = async (id: number, data: Partial<any>): Promise<any> => {
    try {
        const response = await axios.put<any>(`${BASE_URL}/vendedor/modificarVendedor/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating vendor:', error);
        throw error;
    }
};

// Elimina un vendedor
export const deleteVendedor = async (id: number) => {
    try {
        const response = await axios.delete<any>(`${BASE_URL}/vendedor/borrarVendedor/${id}`);
        console.log('Vendedor eliminado:', response);
    } catch (error) {
        console.error('Error eliminando vendedor:', error);
        throw error;
    }
};
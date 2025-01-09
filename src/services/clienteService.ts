import axios from 'axios';

const BASE_URL = 'https://app-delivery-web-production-4742.up.railway.app';

export const createClient = async (data: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/cliente/crearCliente`, data);
        return response.data;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

export const updateClient = async (id: number, data: any) => {
    try {
        const response = await axios.put(`${BASE_URL}/cliente/modificarCliente/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

export const deleteClient = async (id: number) => {
    try {
        const response = await axios.delete(`${BASE_URL}/cliente/borrarCliente/${id}`);
        console.log('cliente eliminado:', response);
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};

export const getClient = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cliente/mostrarTodos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client:', error);
        throw error;
    }
};

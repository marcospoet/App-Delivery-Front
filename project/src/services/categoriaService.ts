import axios from 'axios';

const BASE_URL = 'https://app-delivery-web-production.up.railway.app';

export interface Categoria {
    id: number;
    descripcion: string;
    tipoItem: string;
}

// Obtiene todas las categorías
export const getCategories = async (): Promise<Categoria[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/categoria/listar`);
        return response.data as Categoria[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Crea una nueva categoría
export const createCategory = async (data: Omit<Categoria, 'id'>): Promise<Categoria> => {
    try {
        const response = await axios.post(`${BASE_URL}/categoria/crear`, data);
        return response.data as Categoria;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Actualiza una categoría existente
export const updateCategory = async (id: number, data: Partial<Categoria>): Promise<Categoria> => {
    try {
        const response = await axios.put(`${BASE_URL}/categoria/modificar/${id}`, data);
        return response.data as Categoria;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Elimina una categoría
export const deleteCategory = async (id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${BASE_URL}/categoria/eliminar/${id}`);
        console.log('categoria eliminada:', response);
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
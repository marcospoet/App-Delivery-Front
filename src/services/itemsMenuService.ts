import axios from 'axios';

const API_URL = 'https://app-delivery-web-production-4742.up.railway.app/itemMenu';

export const createItemMenu = async (menuItem: any) => {
    try {
        const response = await axios.post(`${API_URL}/crearItem`, menuItem);
        return response.data;
    } catch (error) {
        console.error('Error creating menu item:', error);
        throw error;
    }
};

export const updateItemMenu = async (id: number, menuItem: any) => {
    try {
        const response = await axios.put(`${API_URL}/modificarItem/${id}`, menuItem);
        return response.data;
    } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
    }
};

export const deleteItemMenu = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/eliminarItem/${id}`);
    } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
};

export const getItemMenu = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/buscarItem/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu item:', error);
        throw error;
    }
};
export const getAllItemsMenu = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all menu items:', error);
        throw error;
    }
};
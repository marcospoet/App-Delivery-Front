import React, { useState, useEffect } from 'react';
import { createVendedor, updateVendedor } from '../../services/vendedorService';

interface VendorFormProps {
    onSubmit: (data: any) => void;
    initialData?: any;
    onCancel: () => void;
    setVendors: React.Dispatch<React.SetStateAction<any[]>>;
}
const VendorForm = ({ onSubmit, initialData, onCancel }: VendorFormProps) => {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Construimos el objeto en el formato que el backend necesita
        const finalData = {
            nombre: formData.nombre,
            direccion: formData.direccion,
            coordenada: {
                lat: parseFloat(formData.latitud),
                lng: parseFloat(formData.longitud)
            }
        };

        if (initialData) {
            await updateVendedor(initialData.id, finalData);
        } else {
            await createVendedor(finalData);
        }
        onSubmit(finalData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección</label>
                <input
                    type="text"
                    name="direccion"
                    value={formData.direccion || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Latitud</label>
                <input
                    type="number"
                    name="latitud"
                    step="any"
                    value={formData.latitud || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Longitud</label>
                <input
                    type="number"
                    name="longitud"
                    step="any"
                    value={formData.longitud || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                    required
                />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    {initialData ? 'Guardar Cambios' : 'Agregar'}
                </button>
            </div>
        </form>
    );
};

export default VendorForm;

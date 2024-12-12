import React, { useState } from 'react';

interface NewCategoryFormProps {
    onCategoryCreate: (category: any) => void;
}

const NewCategoryForm = ({ onCategoryCreate }: NewCategoryFormProps) => {
    const [categoryData, setCategoryData] = useState({
        descripcion: '',
        tipoItem: 'Comida',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const updatedData = {
            ...categoryData,
            [name === 'categoriaDescripcion' ? 'descripcion' : name]: value, // Ajustamos el nombre para evitar conflictos
        };
        setCategoryData(updatedData);
        onCategoryCreate(updatedData);
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Descripción de Categoría
                </label>
                <input
                    type="text"
                    name="categoriaDescripcion" // Cambiado para que sea único
                    value={categoryData.descripcion}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tipo de Item
                </label>
                <select
                    name="tipoItem"
                    value={categoryData.tipoItem}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                    required
                >
                    <option value="Comida">Comida</option>
                    <option value="Bebida">Bebida</option>
                </select>
            </div>
        </div>
    );
};

export default NewCategoryForm;

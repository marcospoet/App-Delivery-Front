import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../../services/categoriaService';

interface CategoryFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onCancel: () => void;
  setCategories: React.Dispatch<React.SetStateAction<any[]>>;
}

const CategoryForm = ({ onSubmit, initialData, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      id: formData.id || 0,
      descripcion: formData.descripcion,
      tipoItem: formData.tipoItem
    };

    try {
      if (initialData) {
        await updateCategory(initialData.id, finalData);
      } else {
        await createCategory(finalData);
      }
      onSubmit(finalData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
          <input
              type="text"
              name="descripcion"
              value={formData.descripcion || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
              required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo Item</label>
          <select
              name="tipoItem"
              value={formData.tipoItem || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
              required
          >
            <option value="">Seleccione un tipo</option>
            <option value="Comida">Comida</option>
            <option value="Bebida">Bebida</option>
          </select>
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

export default CategoryForm;
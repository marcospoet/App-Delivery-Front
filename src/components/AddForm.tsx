import React from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  options?: string[];
}

interface AddFormProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  title: string;
}

const AddForm = ({ fields, onSubmit, title }: AddFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => {
        if (value === 'on') return [key, true];
        if (value === '') return [key, null];
        return [key, value];
      })
    );
    onSubmit(data);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                name={field.name}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        <div className="col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
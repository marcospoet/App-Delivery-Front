interface CategorySelectorProps {
    defaultValue?: number;
}

const CategorySelector = ({ defaultValue }: CategorySelectorProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Categoría ID</label>
            <input
                type="number"
                name="categoriaId"
                defaultValue={defaultValue}
                className="mt-1 block w-full rounded-md border dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2"
                required
            />
        </div>
    );
};

export default CategorySelector;

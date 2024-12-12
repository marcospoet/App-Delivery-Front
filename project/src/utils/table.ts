// Utility functions for table operations
export const sortData = <T extends Record<string, any>>(
    data: T[],
    key: keyof T,
    direction: 'asc' | 'desc' = 'asc'
): T[] => {
    return [...data].sort((a, b) => {
        if (direction === 'asc') {
            return a[key] < b[key] ? -1 : 1;
        }
        return a[key] > b[key] ? -1 : 1;
    });
};

export const filterData = <T extends Record<string, any>>(
    data: T[],
    searchQuery: string,
    searchFields: (keyof T)[]
): T[] => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(item =>
        searchFields.some(field => {
            const value = item[field];
            return value?.toString().toLowerCase().includes(query);
        })
    );
};
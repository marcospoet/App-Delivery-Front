import { useState } from 'react';
import { Edit2, Trash2, List } from 'lucide-react';
import OrderDetailsModal from './OrderDetailsModals';
import { getDetallesPedido } from '../services/pedidoService';

interface Column {
  key: string;
  header: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  showOrderDetails?: boolean;
}

const DataTable = ({ columns, data, onEdit, onDelete, showOrderDetails = false }: DataTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
      <>
        <div className="overflow-x-auto rounded-lg border dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                  <th
                      key={column.key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
              ))}
              {(onEdit || onDelete || showOrderDetails) && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
              )}
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  {columns.map((column) => (
                      <td
                          key={column.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300"
                      >
                        {typeof item[column.key] === 'boolean'
                            ? item[column.key]
                                ? 'Sí'
                                : 'No'
                            : item[column.key]}
                      </td>
                  ))}
                  {(onEdit || onDelete || showOrderDetails) && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {showOrderDetails && (
                              <button
                                  onClick={async () => {
                                      try {
                                          const detalles = await getDetallesPedido(item.id); // Llama al servicio
                                          setSelectedOrder({ ...item, detalles }); // Actualiza el estado con los detalles
                                          setShowDetailsModal(true); // Abre el modal
                                      } catch (error) {
                                          console.error('Error al obtener los detalles del pedido:', error);
                                      }
                                  }}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                              >
                                  <List className="h-4 w-4 inline-block mr-1" />
                                  Detalles
                              </button>
                          )}
                        {onEdit && (
                            <button
                                onClick={() => onEdit(item)}
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-3"
                            >
                              <Edit2 className="h-4 w-4 inline-block mr-1" />
                              Editar
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(item)}
                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4 inline-block mr-1" />
                              Eliminar
                            </button>
                        )}
                      </td>
                  )}
                </tr>
            ))}
            {data.length === 0 && (
                <tr>
                  <td
                      colSpan={columns.length + (onEdit || onDelete || showOrderDetails ? 1 : 0)}
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No hay datos disponibles
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>

        <OrderDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            orderDetails={selectedOrder?.detalles || []}
        />
      </>
  );
};

export default DataTable;
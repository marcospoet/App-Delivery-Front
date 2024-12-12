import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

const AddButton = ({ onClick, label }: AddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
    >
      <Plus className="w-5 h-5 mr-2" />
      {label}
    </button>
  );
}

export default AddButton;
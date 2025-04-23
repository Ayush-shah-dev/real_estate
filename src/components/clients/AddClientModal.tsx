import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: {
    name: string;
    contact: string;
  }) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onAddClient,
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    contact: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      contact: '',
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Client name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onAddClient({
      name,
      contact,
    });
    
    // Reset form
    setName('');
    setContact('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Client</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <form onSubmit={handleSubmit} className="p-4">
            <Input
              label="Client Name"
              placeholder="Enter client name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              className="mb-4"
            />
            
            <Input
              label="Contact Details (Optional)"
              placeholder="Phone, email, or address"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              error={errors.contact}
              helperText="This can be any contact information for this client"
              className="mb-4"
            />
            
            {/* Footer */}
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
              >
                Add Client
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
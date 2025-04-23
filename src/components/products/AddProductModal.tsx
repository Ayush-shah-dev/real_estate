import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X, Plus, Minus } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    specifications: string[];
    selling_unit: string;
  }) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState('');
  const [specifications, setSpecifications] = useState<string[]>(['']);
  const [sellingUnit, setSellingUnit] = useState('rolls');
  const [errors, setErrors] = useState({
    name: '',
    specifications: '',
    sellingUnit: '',
  });

  const handleAddSpec = () => {
    setSpecifications([...specifications, '']);
  };

  const handleRemoveSpec = (index: number) => {
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    setSpecifications(newSpecs);
  };

  const handleSpecChange = (index: number, value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index] = value;
    setSpecifications(newSpecs);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      specifications: '',
      sellingUnit: '',
    };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Product name is required';
      isValid = false;
    }

    // Check if any specification is empty
    if (specifications.some(spec => !spec.trim())) {
      newErrors.specifications = 'All specifications are required';
      isValid = false;
    }

    // Check if there are duplicate specifications
    const uniqueSpecs = new Set(specifications);
    if (uniqueSpecs.size !== specifications.length) {
      newErrors.specifications = 'Duplicate specifications are not allowed';
      isValid = false;
    }

    if (!sellingUnit.trim()) {
      newErrors.sellingUnit = 'Selling unit is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Filter out any empty specifications
    const filteredSpecs = specifications.filter(spec => spec.trim() !== '');
    
    onAddProduct({
      name,
      specifications: filteredSpecs,
      selling_unit: sellingUnit,
    });
    
    // Reset form
    setName('');
    setSpecifications(['']);
    setSellingUnit('rolls');
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Product</h3>
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
              label="Product Name"
              placeholder="e.g., POF Shrink Film"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              className="mb-4"
            />
            
            <div className="mb-4">
              <label className="input-label">
                Specifications (e.g., inch, micron)
              </label>
              
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-center mb-2">
                  <Input
                    placeholder="e.g., inch"
                    value={spec}
                    onChange={(e) => handleSpecChange(index, e.target.value)}
                    className="flex-1"
                  />
                  
                  {specifications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="ml-2 p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                  
                  {index === specifications.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddSpec}
                      className="ml-2 p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              ))}
              
              {errors.specifications && (
                <p className="mt-1 text-sm text-red-600">{errors.specifications}</p>
              )}
            </div>
            
            <Input
              label="Selling Unit"
              placeholder="e.g., rolls"
              value={sellingUnit}
              onChange={(e) => setSellingUnit(e.target.value)}
              error={errors.sellingUnit}
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
                Add Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
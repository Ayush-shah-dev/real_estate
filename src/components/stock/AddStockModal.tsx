import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { X } from 'lucide-react';
import { Product, SpecValue } from '../../types/app';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStock: (stock: {
    product_id: string;
    specs: Record<string, string | number>;
    quantity: number;
  }) => void;
  products: Product[];
}

const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  onAddStock,
  products,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<{ value: string; label: string } | null>(null);
  const [specValues, setSpecValues] = useState<SpecValue>({});
  const [quantity, setQuantity] = useState<number>(0);
  const [errors, setErrors] = useState({
    product: '',
    specs: '',
    quantity: '',
  });
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedProduct(null);
      setSpecValues({});
      setQuantity(0);
      setErrors({
        product: '',
        specs: '',
        quantity: '',
      });
    }
  }, [isOpen]);
  
  // Reset specs when product changes
  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p.id === selectedProduct.value);
      if (product) {
        const newSpecValues: SpecValue = {};
        product.specifications.forEach(spec => {
          newSpecValues[spec] = '';
        });
        setSpecValues(newSpecValues);
      }
    } else {
      setSpecValues({});
    }
  }, [selectedProduct, products]);

  const validateForm = () => {
    const newErrors = {
      product: '',
      specs: '',
      quantity: '',
    };
    let isValid = true;

    if (!selectedProduct) {
      newErrors.product = 'Please select a product';
      isValid = false;
    }

    // Check if any specification is empty
    const hasEmptySpec = Object.values(specValues).some(value => value === '');
    if (hasEmptySpec) {
      newErrors.specs = 'All specifications are required';
      isValid = false;
    }

    if (quantity <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedProduct) return;
    
    onAddStock({
      product_id: selectedProduct.value,
      specs: specValues,
      quantity,
    });
  };
  
  const handleSpecChange = (spec: string, value: string) => {
    setSpecValues(prev => ({
      ...prev,
      [spec]: value,
    }));
  };

  const productOptions = products.map(product => ({
    value: product.id,
    label: product.name,
  }));
  
  // Get current product specs
  const currentProduct = selectedProduct 
    ? products.find(p => p.id === selectedProduct.value) 
    : null;

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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Add New Stock</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <Select
                label="Select Product"
                options={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                isSearchable
                placeholder="Choose a product"
                error={errors.product}
              />
            </div>
            
            {currentProduct && (
              <div className="mb-4">
                <label className="input-label">Specifications</label>
                {currentProduct.specifications.map((spec) => (
                  <Input
                    key={spec}
                    label={spec}
                    placeholder={`Enter ${spec}`}
                    value={specValues[spec] || ''}
                    onChange={(e) => handleSpecChange(spec, e.target.value)}
                    className="mb-2"
                  />
                ))}
                {errors.specs && (
                  <p className="mt-1 text-sm text-red-600">{errors.specs}</p>
                )}
              </div>
            )}
            
            <Input
              label="Quantity (in rolls)"
              type="number"
              min="1"
              value={quantity.toString()}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              error={errors.quantity}
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
                disabled={!selectedProduct}
              >
                Add Stock
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStockModal;
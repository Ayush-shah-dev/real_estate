import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { X, Plus, Trash2 } from 'lucide-react';
import { Client, Product, SpecValue } from '../../types/app';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  product_id: string;
  product?: Product;
  specs: Record<string, string | number>;
  quantity: number;
}

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOrder: (order: {
    client_id: string;
    total_amount: number;
    items: OrderItem[];
  }) => void;
  clients: Client[];
}

const AddOrderModal: React.FC<AddOrderModalProps> = ({
  isOpen,
  onClose,
  onAddOrder,
  clients,
}) => {
  const [selectedClient, setSelectedClient] = useState<{ value: string; label: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientContact, setNewClientContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      fetchProducts();
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setSelectedClient(null);
    setOrderItems([]);
    setIsAddingClient(false);
    setNewClientName('');
    setNewClientContact('');
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClient = async () => {
    if (!newClientName.trim()) {
      toast.error('Client name is required');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('clients')
        .insert([{
          name: newClientName,
          contact: newClientContact
        }])
        .select();
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        toast.success('Client added successfully!');
        setSelectedClient({
          value: data[0].id,
          label: data[0].name,
        });
        setIsAddingClient(false);
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client');
    } finally {
      setIsLoading(false);
    }
  };

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: crypto.randomUUID(),
      product_id: '',
      specs: {},
      quantity: 1
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeOrderItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const updateOrderItem = (id: string, field: string, value: any) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        if (field === 'product_id') {
          const selectedProduct = products.find(p => p.id === value);
          if (selectedProduct) {
            const newSpecs: Record<string, string | number> = {};
            selectedProduct.specifications.forEach(spec => {
              newSpecs[spec] = '';
            });
            return {
              ...item,
              product_id: value,
              product: selectedProduct,
              specs: newSpecs
            };
          }
        } else if (field === 'specs') {
          return {
            ...item,
            specs: {
              ...item.specs,
              ...value
            }
          };
        } else if (field === 'quantity') {
          return {
            ...item,
            quantity: value
          };
        }
      }
      return item;
    }));
  };

  const calculateTotalAmount = () => {
    // In a real application, this would include pricing logic
    // For now, let's assume a flat rate of 100 per item
    return orderItems.reduce((total, item) => total + (item.quantity * 100), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClient) {
      toast.error('Please select a client');
      return;
    }
    
    if (orderItems.length === 0) {
      toast.error('Please add at least one item to the order');
      return;
    }
    
    // Validate all items have products selected and specifications filled
    const invalidItems = orderItems.filter(item => {
      if (!item.product_id) return true;
      
      for (const value of Object.values(item.specs)) {
        if (value === '') return true;
      }
      
      if (item.quantity <= 0) return true;
      
      return false;
    });
    
    if (invalidItems.length > 0) {
      toast.error('Please fill all product details and quantities');
      return;
    }
    
    onAddOrder({
      client_id: selectedClient.value,
      total_amount: calculateTotalAmount(),
      items: orderItems
    });
  };

  const clientOptions = clients.map(client => ({
    value: client.id,
    label: client.name,
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="flex items-start justify-center p-4 min-h-full">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl my-8 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Create New Order</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              {/* Client Section */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-white">Client Information</h4>
                
                {isAddingClient ? (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Client Name"
                        placeholder="Enter new client name"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                        required
                      />
                      <Input
                        label="Contact Details (Optional)"
                        placeholder="Phone, email, etc."
                        value={newClientContact}
                        onChange={(e) => setNewClientContact(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingClient(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddClient}
                        isLoading={isLoading}
                      >
                        Add Client
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Select
                        label="Select Client"
                        options={clientOptions}
                        value={selectedClient}
                        onChange={setSelectedClient}
                        isSearchable
                        placeholder="Choose a client"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingClient(true)}
                    >
                      New Client
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Order Items Section */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">Order Items</h4>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    leftIcon={<Plus size={16} />}
                    onClick={addOrderItem}
                  >
                    Add Item
                  </Button>
                </div>
                
                {orderItems.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">No items added to this order</p>
                    <Button
                      type="button"
                      size="sm"
                      leftIcon={<Plus size={16} />}
                      onClick={addOrderItem}
                    >
                      Add First Item
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderItems.map((item, index) => {
                      const productOptions = products.map(product => ({
                        value: product.id,
                        label: product.name,
                      }));
                      
                      const selectedProduct = products.find(p => p.id === item.product_id);
                      
                      return (
                        <div 
                          key={item.id} 
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium">Item #{index + 1}</h5>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              leftIcon={<Trash2 size={16} />}
                              onClick={() => removeOrderItem(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Select
                              label="Product"
                              options={productOptions}
                              value={item.product_id ? { value: item.product_id, label: selectedProduct?.name || '' } : null}
                              onChange={(option) => updateOrderItem(item.id, 'product_id', option?.value || '')}
                              isSearchable
                              placeholder="Select product"
                            />
                            
                            <Input
                              label="Quantity"
                              type="number"
                              min="1"
                              value={item.quantity.toString()}
                              onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            />
                          </div>
                          
                          {selectedProduct && (
                            <div className="mt-2">
                              <label className="input-label mb-2">Specifications</label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {selectedProduct.specifications.map((spec) => (
                                  <Input
                                    key={spec}
                                    label={spec}
                                    placeholder={`Enter ${spec}`}
                                    value={item.specs[spec] || ''}
                                    onChange={(e) => updateOrderItem(item.id, 'specs', { [spec]: e.target.value })}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Order Summary */}
              {orderItems.length > 0 && (
                <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="text-md font-medium mb-2 text-gray-900 dark:text-white">Order Summary</h4>
                  <div className="flex justify-between items-center py-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-lg font-bold">₹{calculateTotalAmount().toFixed(2)}</span>
                  </div>
                </div>
              )}
              
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
                  disabled={orderItems.length === 0 || !selectedClient}
                >
                  Create Order
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrderModal;
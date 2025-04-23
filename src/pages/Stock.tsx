import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { supabase } from '../lib/supabase';
import { Product, Stock as StockType } from '../types/app';
import toast from 'react-hot-toast';
import AddStockModal from '../components/stock/AddStockModal';

interface StockWithProduct extends StockType {
  products: Product;
}

const Stock = () => {
  const [stockItems, setStockItems] = useState<StockWithProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<{ value: string; label: string } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('name');
      
      if (productsError) throw productsError;
      
      setProducts(productsData || []);
      
      // Fetch stock with product info
      const { data: stockData, error: stockError } = await supabase
        .from('stock')
        .select('*, products(*)')
        .order('created_at', { ascending: false });
      
      if (stockError) throw stockError;
      
      setStockItems(stockData as StockWithProduct[] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load stock data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddStock = async (stock: Omit<StockType, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('stock')
        .insert([stock])
        .select('*, products(*)');
      
      if (error) throw error;
      
      toast.success('Stock added successfully!');
      setStockItems([...(data as StockWithProduct[] || []), ...stockItems]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding stock:', error);
      toast.error('Failed to add stock');
    }
  };

  const handleDeleteStock = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stock item?')) return;
    
    try {
      const { error } = await supabase
        .from('stock')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Stock item deleted successfully!');
      setStockItems(stockItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting stock:', error);
      toast.error('Failed to delete stock');
    }
  };

  // Filter stock items based on search term and selected product
  const filteredStockItems = stockItems.filter(item => {
    const matchesSearch = Object.values(item.specs)
      .some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.products.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProduct = selectedProduct ? item.product_id === selectedProduct.value : true;
    
    return matchesSearch && matchesProduct;
  });

  const productOptions = products.map(product => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stock Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your inventory levels</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={16} />}
          >
            Add Stock
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by specification value..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
              fullWidth
            />
          </div>
          
          <div className="md:w-64">
            <Select
              label=""
              placeholder="Filter by product"
              options={productOptions}
              value={selectedProduct}
              onChange={setSelectedProduct}
              isSearchable
            />
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="secondary" 
              leftIcon={<Filter size={16} />}
              onClick={() => {
                setSearchTerm('');
                setSelectedProduct(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Stock list */}
      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredStockItems.length > 0 ? (
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Specifications</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStockItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6 text-sm font-medium">{item.products?.name || 'Unknown'}</td>
                    <td className="py-4 px-6 text-sm">
                      {Object.entries(item.specs).map(([key, value]) => (
                        <span key={key} className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-1 dark:bg-green-900/30 dark:text-green-300 dark:ring-green-500/30">
                          {key}: {value}
                        </span>
                      ))}
                    </td>
                    <td className="py-4 px-6 text-sm text-right font-medium">
                      {item.quantity} {item.products?.selling_unit || 'units'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.updated_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={<Edit size={16} />}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={<Trash2 size={16} />}
                          onClick={() => handleDeleteStock(item.id)}
                          className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No stock items found</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus size={16} />}
              size="sm"
            >
              Add your first stock item
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Stock Modal */}
      <AddStockModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStock={handleAddStock}
        products={products}
      />
    </div>
  );
};

export default Stock;
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import { Product } from '../types/app';
import toast from 'react-hot-toast';
import AddProductModal from '../components/products/AddProductModal';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check authentication state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      subscription?.unsubscribe();
    };
  }, []);
  
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      // Check if user is authenticated
      if (!user) {
        toast.error('You must be logged in to add products');
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();
      
      if (error) throw error;
      
      toast.success('Product added successfully!');
      // Update the products list with the newly added product at the beginning
      setProducts([...(data || []), ...products]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(`Failed to add product: ${error.message}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      // Check if user is authenticated
      if (!user) {
        toast.error('You must be logged in to delete products');
        return;
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Product deleted successfully!');
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(`Failed to delete product: ${error.message}`);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your product catalog</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            onClick={() => {
              if (!user) {
                toast.error('You must be logged in to add products');
                return;
              }
              setIsAddModalOpen(true);
            }}
            leftIcon={<Plus size={16} />}
          >
            Add Product
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
              fullWidth
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="secondary" 
              leftIcon={<Filter size={16} />}
            >
              Filter
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Authentication warning */}
      {!user && (
        <Card className="mb-6 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
          <div className="flex items-center text-yellow-700 dark:text-yellow-400">
            <p>You need to be logged in to add, edit, or delete products.</p>
          </div>
        </Card>
      )}
      
      {/* Products list */}
      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Specifications</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unit</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Added</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6 text-sm font-medium">{product.name}</td>
                    <td className="py-4 px-6 text-sm">
                      {product.specifications.map((spec, index) => (
                        <span key={index} className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 mr-1 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/30">
                          {spec}
                        </span>
                      ))}
                    </td>
                    <td className="py-4 px-6 text-sm">{product.selling_unit}</td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(product.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={<Edit size={16} />}
                          onClick={() => {
                            if (!user) {
                              toast.error('You must be logged in to edit products');
                              return;
                            }
                            // Edit functionality here
                          }}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={<Trash2 size={16} />}
                          onClick={() => handleDeleteProduct(product.id)}
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
            <p className="text-gray-500 dark:text-gray-400 mb-4">No products found</p>
            <Button 
              onClick={() => {
                if (!user) {
                  toast.error('You must be logged in to add products');
                  return;
                }
                setIsAddModalOpen(true);
              }}
              leftIcon={<Plus size={16} />}
              size="sm"
            >
              Add your first product
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Product Modal */}
      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default Products;
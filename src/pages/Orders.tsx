import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Eye, File, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { supabase } from '../lib/supabase';
import { Client, Order } from '../types/app';
import toast from 'react-hot-toast';
import AddOrderModal from '../components/orders/AddOrderModal';
import { format } from 'date-fns';

interface OrderWithClient extends Order {
  client: Client;
}

const Orders = () => {
  const [orders, setOrders] = useState<OrderWithClient[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<{ value: string; label: string } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*')
        .order('name');
      
      if (clientsError) throw clientsError;
      
      setClients(clientsData || []);
      
      // Fetch orders with client info
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*, client:clients(*)')
        .order('created_at', { ascending: false });
      
      if (ordersError) throw ordersError;
      
      setOrders(ordersData as OrderWithClient[] || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load order data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddOrder = async (newOrder: any) => {
    try {
      // First create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          client_id: newOrder.client_id,
          total_amount: newOrder.total_amount,
          status: 'pending'
        }])
        .select();
      
      if (orderError) throw orderError;
      
      if (!orderData || orderData.length === 0) {
        throw new Error('No order was created');
      }
      
      const orderId = orderData[0].id;
      
      // Then create the order items
      const orderItems = newOrder.items.map((item: any) => ({
        order_id: orderId,
        product_id: item.product_id,
        specs: item.specs,
        quantity: item.quantity
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      toast.success('Order created successfully!');
      
      // Refresh the orders list
      fetchData();
      
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding order:', error);
      toast.error('Failed to create order');
    }
  };

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || statusFilter.value === 'all' || order.status === statusFilter.value;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage client orders</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={16} />}
          >
            Create Order
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by client name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
              fullWidth
            />
          </div>
          
          <div className="md:w-64">
            <Select
              label=""
              placeholder="Filter by status"
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="secondary" 
              leftIcon={<Filter size={16} />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Orders list */}
      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6 text-sm font-medium">
                      <span className="text-primary-600 dark:text-primary-400">
                        #{order.id.substring(0, 8)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium">
                      {order.client?.name || 'Unknown Client'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(order.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-right">
                      ₹{order.total_amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={<Eye size={16} />}
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={<File size={16} />}
                        >
                          Invoice
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
            <p className="text-gray-500 dark:text-gray-400 mb-4">No orders found</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus size={16} />}
              size="sm"
            >
              Create your first order
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Order Modal */}
      <AddOrderModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddOrder={handleAddOrder}
        clients={clients}
      />
    </div>
  );
};

export default Orders;
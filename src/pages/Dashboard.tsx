import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabase';
import { BarChart, TrendingUp as TrendUp, Package, Truck, Users, CreditCard } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalStock: 0,
    totalClients: 0,
    totalOrders: 0,
  });
  
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch statistics
        const [
          { count: productsCount },
          { count: stockCount },
          { count: clientsCount },
          { count: ordersCount },
          { data: recentOrdersData },
          { data: lowStockData }
        ] = await Promise.all([
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('stock').select('*', { count: 'exact', head: true }),
          supabase.from('clients').select('*', { count: 'exact', head: true }),
          supabase.from('orders').select('*', { count: 'exact', head: true }),
          supabase.from('orders')
            .select('*, clients(name)')
            .order('created_at', { ascending: false })
            .limit(5),
          supabase.from('stock')
            .select('*, products(name)')
            .lt('quantity', 10)
            .limit(5)
        ]);
        
        setStats({
          totalProducts: productsCount || 0,
          totalStock: stockCount || 0,
          totalClients: clientsCount || 0,
          totalOrders: ordersCount || 0,
        });
        
        setRecentOrders(recentOrdersData || []);
        setLowStockItems(lowStockData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your inventory system</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
            System operational
          </span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
              <Package size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.totalProducts}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-teal-500">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/30 mr-4">
              <BarChart size={24} className="text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stock Items</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.totalStock}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 mr-4">
              <Users size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Clients</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.totalClients}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 mr-4">
              <CreditCard size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{loading ? '...' : stats.totalOrders}</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card title="Recent Orders">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : recentOrders.length > 0 ? (
            <div className="overflow-x-auto -mx-6 -mb-6">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 px-6 text-sm">{order.clients?.name || 'Unknown'}</td>
                      <td className="py-4 px-6 text-sm font-medium">₹{order.total_amount}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : order.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">No recent orders found.</p>
          )}
        </Card>
        
        {/* Low Stock Alert */}
        <Card title="Low Stock Alert" className="bg-white dark:bg-gray-800">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          ) : lowStockItems.length > 0 ? (
            <div className="overflow-x-auto -mx-6 -mb-6">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Specs</th>
                    <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {lowStockItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-4 px-6 text-sm font-medium">{item.products?.name || 'Unknown'}</td>
                      <td className="py-4 px-6 text-sm">
                        {Object.entries(item.specs).map(([key, value]) => (
                          <span key={key} className="mr-2 text-gray-600 dark:text-gray-400">
                            {key}: {value}
                          </span>
                        ))}
                      </td>
                      <td className="py-4 px-6 text-sm text-right font-medium">
                        <span className={`${
                          item.quantity < 5 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {item.quantity} rolls
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">No low stock items found.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
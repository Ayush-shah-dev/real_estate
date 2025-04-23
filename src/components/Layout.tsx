import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Users, 
  ShoppingCart,
  Sun, 
  Moon,
  LogOut
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const Layout = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <div className={`flex h-screen w-full ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 
                        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
                        transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Package size={24} />
            <span>OmTraders</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <LayoutDashboard size={18} className="mr-3" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <Package size={18} className="mr-3" />
            Products
          </NavLink>
          
          <NavLink 
            to="/stock" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <Layers size={18} className="mr-3" />
            Stock
          </NavLink>
          
          <NavLink 
            to="/clients" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <Users size={18} className="mr-3" />
            Clients
          </NavLink>
          
          <NavLink 
            to="/orders" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <ShoppingCart size={18} className="mr-3" />
            Orders
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button 
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-lg 
                       bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm rounded-lg 
                       bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 
                       hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </aside>
      
      {/* Mobile sidebar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-around">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex flex-col items-center p-4 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <LayoutDashboard size={20} />
            <span className="text-xs mt-1">Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              `flex flex-col items-center p-4 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <Package size={20} />
            <span className="text-xs mt-1">Products</span>
          </NavLink>
          
          <NavLink 
            to="/stock" 
            className={({ isActive }) => 
              `flex flex-col items-center p-4 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <Layers size={20} />
            <span className="text-xs mt-1">Stock</span>
          </NavLink>
          
          <NavLink 
            to="/clients" 
            className={({ isActive }) => 
              `flex flex-col items-center p-4 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <Users size={20} />
            <span className="text-xs mt-1">Clients</span>
          </NavLink>
          
          <NavLink 
            to="/orders" 
            className={({ isActive }) => 
              `flex flex-col items-center p-4 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`
            }
          >
            <ShoppingCart size={20} />
            <span className="text-xs mt-1">Orders</span>
          </NavLink>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 md:ml-64 bg-gray-50 dark:bg-gray-950 min-h-screen pb-16 md:pb-0">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
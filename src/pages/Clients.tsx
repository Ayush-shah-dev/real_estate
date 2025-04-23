import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, UserPlus } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';
import { Client } from '../types/app';
import toast from 'react-hot-toast';
import AddClientModal from '../components/clients/AddClientModal';

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const fetchClients = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = async (client: Omit<Client, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select();
      
      if (error) throw error;
      
      toast.success('Client added successfully!');
      setClients([...(data || []), ...clients]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Failed to add client');
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Client deleted successfully!');
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Failed to delete client');
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.contact && client.contact.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your client database</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<UserPlus size={16} />}
          >
            Add Client
          </Button>
        </div>
      </div>
      
      {/* Search and filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search clients by name or contact..."
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
              onClick={() => setSearchTerm('')}
            >
              Clear Filter
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Clients list */}
      <Card>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredClients.length > 0 ? (
          <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact Details</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date Added</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-4 px-6 text-sm font-medium">{client.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                      {client.contact || 'No contact information'}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(client.created_at).toLocaleDateString()}
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
                          onClick={() => handleDeleteClient(client.id)}
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
            <p className="text-gray-500 dark:text-gray-400 mb-4">No clients found</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<UserPlus size={16} />}
              size="sm"
            >
              Add your first client
            </Button>
          </div>
        )}
      </Card>
      
      {/* Add Client Modal */}
      <AddClientModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddClient={handleAddClient}
      />
    </div>
  );
};

export default Clients;
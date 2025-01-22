import React, { useEffect, useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { Participant } from './types/database';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<number | null>(null);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('Participants')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setParticipants(data || []);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast.error('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  const updatePaymentStatus = async (id: number, status: string) => {
    try {
      setUpdating(id);
      const { error } = await supabase
        .from('Participants')
        .update({ Payment: status })
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Payment status updated successfully');
      fetchParticipants();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    } finally {
      setUpdating(null);
    }
  };

  const filteredParticipants = participants.filter(participant => 
    participant.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.ID_no?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Payment Management Dashboard</h1>
            <button
              onClick={fetchParticipants}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">
                        Loading participants...
                      </td>
                    </tr>
                  ) : filteredParticipants.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">
                        No participants found
                      </td>
                    </tr>
                  ) : (
                    filteredParticipants.map((participant) => (
                      <tr key={participant.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {participant.ID_no}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {participant.Name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {participant.Email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {participant.Payment === null ? (
                            <span className="text-gray-500">null</span>
                          ) : (
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              participant.Payment === 'payment successful' ? 'bg-green-100 text-green-800' :
                              participant.Payment === 'payment cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {participant.Payment}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {updating === participant.id ? (
                            <span className="text-gray-500">Updating...</span>
                          ) : participant.Payment !== null ? (
                            <div className="space-x-2">
                              <button
                                onClick={() => updatePaymentStatus(participant.id, 'payment successful')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Mark Successful
                              </button>
                              <button
                                onClick={() => updatePaymentStatus(participant.id, 'payment cancelled')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Mark Cancelled
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">No actions available</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
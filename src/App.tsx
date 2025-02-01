import React, { useEffect, useState } from 'react';
import { Search, RefreshCw, ChevronDown } from 'lucide-react';
import { supabase } from './lib/supabase';
import type { Participant, Event } from './types/database';
import toast, { Toaster } from 'react-hot-toast';
//import { auth } from './firebase';
//import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{
    id: number;
    type: string;
  } | null>(null);
  const [searchEventTerm, setSearchEventTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [perPage] = useState(100);

  const fetchParticipants = async (page: number) => {
    try {
      setLoading(true);
      const from = (page - 1) * perPage;
      const to = from + perPage - 1;

      const { data, error, count } = await supabase
        .from('Participants')
        .select('*', { count: 'exact' })
        .order('id', { ascending: true })
        .range(from, to);

      if (error) throw error;

      setParticipants(data || []);
      setTotalParticipants(count || 0);
    } catch (error) {
      console.error('Error fetching participants:', error);
      toast.error('Failed to load participants');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('Events')
        .select('*');

      if (error) throw error;

      console.log('Fetched events:', data);
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    }
  };

  useEffect(() => {
    fetchParticipants(currentPage);
    fetchEvents();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchParticipants(newPage);
  };

  const Pagination = () => {
    const totalPages = Math.ceil(totalParticipants / perPage);

    return (
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    );
  };

  // Rest of your code...

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <nav className="bg-blue-600 p-4">
        <h1 className="text-white text-2xl font-bold">Payment Management Dashboard</h1>
      </nav>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Your existing UI components */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {/* Table and other components */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

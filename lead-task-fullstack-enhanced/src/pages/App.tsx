import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import LeadsTable from '../components/LeadsTable';
import AddLeadModal from '../components/AddLeadModal';
import { CreateLeadRequest, Lead } from '../types/lead';
import leadService from '../services/leadService';

const App = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('leads');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedLeads = await leadService.getLeads();
        setLeads(fetchedLeads);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
        setError('Failed to load leads. Please check if the backend server is running.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleAddLead = () => {
    setIsAddLeadModalOpen(true);
  };

  const handleCloseAddLeadModal = () => {
    setIsAddLeadModalOpen(false);
  };

  const handleSubmitLead = async (leadData: CreateLeadRequest) => {
    setIsLoading(true);
    try {
      // Call the API to create a new lead
      const newLead = await leadService.createLead(leadData);
      
      // Add the new lead to the local state
      setLeads(prevLeads => [...prevLeads, newLead]);
      
      // Close the modal
      setIsAddLeadModalOpen(false);
      
      console.log('Lead created successfully:', newLead);
    } catch (error) {
      console.error('Failed to create lead:', error);
      // You might want to show a toast notification here
      throw error; // Re-throw to let the modal handle the error state
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return 'Dashboard';
      case 'leads':
        return 'Leads';
      case 'follow-ups':
        return 'Follow-Ups';
      case 'sales-activity':
        return 'Sales Activity';
      case 'products':
        return 'Products';
      case 'notifications':
        return 'Notifications';
      case 'settings':
        return 'Settings';
      default:
        return 'Leads';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {!sidebarCollapsed && (
        <Sidebar
          activeItem={activeMenuItem}
          onItemClick={handleMenuItemClick}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title={getPageTitle()}
          onAddLead={handleAddLead}
          onToggleSidebar={handleToggleSidebar}
        />
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeMenuItem === 'leads' && (
            <LeadsTable leads={leads} isLoading={isLoading} error={error} onAddLead={handleAddLead} />
          )}
          
          {activeMenuItem === 'dashboard' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h2>
              <p className="text-gray-600">Dashboard content will be implemented here.</p>
            </div>
          )}
          
          {activeMenuItem === 'follow-ups' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Follow-Ups</h2>
              <p className="text-gray-600">Follow-ups content will be implemented here.</p>
            </div>
          )}
          
          {activeMenuItem === 'sales-activity' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sales Activity</h2>
              <p className="text-gray-600">Sales activity content will be implemented here.</p>
            </div>
          )}
          
          {activeMenuItem === 'products' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Products</h2>
              <p className="text-gray-600">Products content will be implemented here.</p>
            </div>
          )}
          
          {activeMenuItem === 'notifications' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
              <p className="text-gray-600">Notifications content will be implemented here.</p>
            </div>
          )}
          
          {activeMenuItem === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">Settings content will be implemented here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Lead Modal */}
      <AddLeadModal
        isOpen={isAddLeadModalOpen}
        onClose={handleCloseAddLeadModal}
        onSubmit={handleSubmitLead}
      />
    </div>
  );
};

export default App;